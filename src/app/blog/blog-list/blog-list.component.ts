import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog, Tags } from '../blog.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PaginationComponent } from '../../pagination/pagination.component';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  imports:[CommonModule,RouterModule,FormsModule,PaginationComponent],
  styleUrls: ['./blog-list.component.css'],
  standalone: true
})
export class BlogListComponent implements OnInit {
  blogs: Blog[] = [];
  latestcar : any;
  
  tags: Tags[] = [];
  currentPage = 1;
  totalPages = 1;

  selectedTagSlug: string = '';

   searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs(this.currentPage,'','');

     this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
      ).subscribe((searchText) => {
        this.searchTerm=searchText;
          this.loadBlogs(1, searchText, this.selectedTagSlug);
      });

    this.getTags();
    this.getlatestcars();
  }

  onTagSelect(tagSlug: string) {
  this.selectedTagSlug = tagSlug;
  this.loadBlogs(1, this.searchTerm, this.selectedTagSlug);
}

  trackById(index: number, item: any): number {
    return item.id;
  }

  loadBlogs(page: number, search: string = '', tag: string = ''): void {
    this.blogService.getBlogs(page,search,tag).subscribe(response => {
      this.blogs = response.data;
      this.totalPages = Math.ceil(response.total / 9); // Adjust if page size varies
      this.currentPage = page;

      // this.getRealtedBlogs();
    });
  


  }

  onSearchChange() {
    if (this.searchTerm.length >= 3 || this.searchTerm.length === 0) {
      this.searchSubject.next(this.searchTerm);
    }
  }
  
  getlatestcars( ){
      this.blogService.getlatestcars().subscribe(response => {
      this.latestcar = response.data;
    });

  }
  getTags(){
      this.blogService.getTags().subscribe(response => {
      this.tags = response.data;
    });

  }

  changePage(newPage: number, search: string = ''): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.loadBlogs(newPage,search);
    }
  }

     formatCarName(carName: string): string {
      //return carName.replace(/\s+/g, '-');
      return carName.replace(/-/g, '--').replace(/\s+/g, '-');
      //return carName.replace(/-/g, '--').replace(/\s+/g, '-');
     }

  getFontClass(carName: string): string {
    if (carName.length > 40) {
      return 'small-font';
    } else if (carName.length > 30) {
      return 'medium-font';
    } else {
      return 'large-font';
    }
  }
}
