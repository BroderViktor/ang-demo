import { Component, input } from '@angular/core';

// search-field.component.ts
import { EventEmitter, Output } from '@angular/core';
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
    <div class="flex items-center gap-2">
      @if (searchQuery === "") {<button><mat-icon>search</mat-icon></button>}
      @else {<button>
        <mat-icon>close</mat-icon></button
      >}
      <input
        class="w-full pl-10 p-2"
        type="text"
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearch()"
        placeholder="Search..."
      />
    </div>
  `,
  styles: ``,
})
export class SearchFieldComponent<T> {
  readonly items = input.required<T[]>();
  readonly searchKey = input.required<Paths<T>>();
  readonly doAdvancedSearch = input<boolean>(false);
  searchQuery = '';

  @Output() outputItems = new EventEmitter<T[]>();

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

    if (!doAdvancedSearch) return itemsStartsWithSearchQuery;

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

    console.log(totalResult);
    this.outputItems.emit(totalResult);
    return;
  }
}
