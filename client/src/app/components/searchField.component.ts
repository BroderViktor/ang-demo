import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

type Paths<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? Paths<T[K], P extends '' ? K : `${P}.${K}`>
        : never;
    }[keyof T]
  : P;

/**
 * A reusable search field component with advanced search capabilities.
 *
 * This component provides a search input with a clear button and emits filtered results
 * based on the provided items and search key. It supports both basic and advanced search
 * modes.
 *
 * @example
 * ```html
 *  <ob-search-field
 *    [items]="listOfItems()"
 *    [searchKey]="'property.key'"
 *    [doAdvancedSearch]="true"
 *    (outputItems)="handleOutputItems($event)"
 *  />
 * ```
 *
 * ```TypeScript
 *  listOfItems = signal<Item[]>([...]);
 *  itemsToDisplay = signal<Item[]>([]);
 *
 *  handleOutputItems(filteredItems: Item[]) {
 *    this.todosToDisplay.set(filteredItems);
 *  }
 * ```
 *
 * @template T The type of the items in the input array.
 * @template P The type of the search key.
 * @param items An array of items to search through.
 * @param searchKey The key to search for in the items.
 * @param doAdvancedSearch A boolean value to enable advanced search mode.
 * @param outputItems An event emitter that emits the filtered items.
 */
@Component({
  selector: 'ob-search-field',
  imports: [MatInputModule, FormsModule, MatIconModule, CommonModule],
  template: `
    <div class="search-container">
      <button class="search-button" (click)="handleSearchClick()">
        @if (searchQuery === "") {
        <mat-icon>search</mat-icon>
        } @else {
        <mat-icon (click)="clearInput()">close</mat-icon>
        }
      </button>
      <input
        #searchInput
        class="search-input"
        type="text"
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearch()"
        placeholder="Search..."
      />
    </div>
  `,
  styles: `
    .search-container {
      position: relative;
    }

    .search-button {
      position: absolute;
      height: 100%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      cursor: pointer;
      color: rgba(55, 71, 79, 0.87);
    }

    .search-input {
      width: 100%;
      height: 42px;
      padding: 8px;
      padding-left: 40px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid rgba(55, 71, 79, 0.87);;
      box-sizing: border-box;
      transition: border-color 0.3s ease;
    }

    .search-input::placeholder {
      opacity: 0.7;
    }

    .search-input:hover {
      border-color: #00818e;
    }

    .search-input:focus {
      outline: #0097A7;
      border: 2px solid #0097A7;
    }
  `,
})
export class SearchFieldComponent<T> {
  readonly class = input('');
  readonly items = input.required<T[]>();
  readonly searchKey = input.required<Paths<T>>();
  readonly doAdvancedSearch = input<boolean>(false);
  searchQuery = '';

  outputItems = output<T[]>();
  @ViewChild('searchInput') searchInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor() {
    effect(
      () => {
        this.onSearch();
      },
      { allowSignalWrites: true }
    );
  }

  handleSearchClick() {
    if (this.searchQuery !== '') this.clearInput();
    if (this.searchInput) this.searchInput.nativeElement.focus();
  }

  clearInput() {
    this.searchQuery = '';
    this.onSearch();
  }

  onSearch() {
    const { items, doAdvancedSearch, searchQuery } = this;
    const key = this.searchKey();

    const lowerCaseSearch = searchQuery.toLowerCase();

    function getValueByPath(obj: T, path: string) {
      return path.split('.').reduce((acc, key) => (acc as never)?.[key], obj);
    }

    function stringify(item: T) {
      const value = getValueByPath(item, key);
      return String(value).toLowerCase();
    }

    const itemsStartsWithSearchQuery = items().filter((item) =>
      stringify(item).startsWith(searchQuery.toLowerCase())
    );

    if (!doAdvancedSearch())
      return this.outputItems.emit(itemsStartsWithSearchQuery);

    const notStartsWith = items().filter(
      (item) => !stringify(item).startsWith(searchQuery.toLowerCase())
    );

    const letters = lowerCaseSearch.split('');

    const filteredItems = notStartsWith.filter((item) => {
      return letters.reduce(
        (acc, letter) => {
          if (!acc.includes) return { includes: acc.includes, key: acc.key };
          const includesLetter = acc.key.includes(letter.toLowerCase());
          return {
            includes: includesLetter,
            key: acc.key.replace(letter.toLowerCase(), ''),
          };
        },
        {
          includes: true,
          key: stringify(item) ?? '',
        }
      ).includes;
    });

    const advancedSearchResult = filteredItems.reverse();

    const totalResult = [
      ...itemsStartsWithSearchQuery,
      ...advancedSearchResult,
    ];

    return this.outputItems.emit(totalResult);
  }
}
