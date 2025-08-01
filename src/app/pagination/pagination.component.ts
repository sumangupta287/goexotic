import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  currentPage = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

 changePage(page: number) {
  if (page < 1 || page > this.totalPages || page === this.currentPage) {
    return;
  }

  this.currentPage = page;
  this.pageChange.emit(this.currentPage);
  window.scrollTo(0, 0);
}


  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

}
