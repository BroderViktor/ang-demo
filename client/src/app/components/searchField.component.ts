import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
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

@Component({
  selector: 'ob-search-field',
  imports: [MatInputModule, FormsModule, MatIconModule],
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
        [class]="
          'search-input' +
          (class() === '' ? ' search-input-basic-design' : class())
        "
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
    }

    .search-input {
      padding-left: 40px;
    }

    .search-input-basic-design {

    }
  `,
})
export class SearchFieldComponent<T> {
  readonly class = input('');
  readonly items = input.required<T[]>();
  readonly searchKey = input.required<Paths<T>>();
  readonly doAdvancedSearch = input<boolean>(false);
  searchQuery = '';

  @Output() outputItems = new EventEmitter<T[]>();
  @ViewChild('searchInput') searchInput:
    | ElementRef<HTMLInputElement>
    | undefined;

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
    console.log(searchQuery);

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

    if (!doAdvancedSearch)
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
