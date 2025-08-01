import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog, Tags } from '../blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
   tags: Tags[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getBlogBySlug(slug).subscribe(data => {
        this.blog = data;
      });
    }

  }
    
}
