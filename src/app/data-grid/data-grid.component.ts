import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css'
})
export class DataGridComponent {
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];

  dataSource = [
    { id: 1, name: 'Item 1', status: 'Active' },
    { id: 2, name: 'Item 2', status: 'Inactive' },
  ];

  constructor() {}

  ngOnInit(): void {

  }
}
