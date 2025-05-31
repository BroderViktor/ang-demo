import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchFieldComponent } from './searchField.component';

interface Item {
  name: string;
  category: {
    type: string;
  };
}

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [SearchFieldComponent, CommonModule],
  template: `
    <app-search-field
      [items]="items"
      searchKey="name"
      (outputItems)="handleOutputItems($event)"
      [doAdvancedSearch]="true"
    />

    <ul>
      <li *ngFor="let item of filteredItemsResult">
        {{ item.name }} - {{ item.category.type }}
      </li>
    </ul>
  `,
  styles: ``,
})
export class ParentComponent {
  items: Item[] = [
    { name: 'Apple', category: { type: 'Fruit' } },
    { name: 'Banana', category: { type: 'Fruit' } },
    { name: 'Carrot', category: { type: 'Vegetable' } },
    { name: 'Broccoli', category: { type: 'Vegetable' } },
    { name: 'Avocado', category: { type: 'Fruit' } },
  ];

  filteredItemsResult: Item[] = this.items;

  handleOutputItems(filteredItems: Item[]) {
    this.filteredItemsResult = filteredItems;
    console.log('Filtered items received:', filteredItems);
  }
}
