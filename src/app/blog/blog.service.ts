import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, Tags } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  //private apiUrl = 'http://localhost/goexoctic'; // Replace with your actual API URL
  private apiUrl = 'https://goexotic.co/admin/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getTags(): Observable<{ data: Tags[] }> {
    return this.http.get<{ data: Tags[] }>(`${this.apiUrl+'/api/alltags'}`);
  }

  // getBlogs(page: number = 1): Observable<{ data: Blog[]; total: number }> {
  //   return this.http.get<{ data: Blog[]; total: number }>(`${this.apiUrl+'/api/allbloglist'}?page=${page}`);
  // }

  getBlogs(page: number = 1, search: string = '', tag: string = ''): Observable<{ data: Blog[]; total: number }> {
  let params = `?page=${page}`;
  if (search && search.length >= 3) {
    params += `&search=${encodeURIComponent(search)}`;
  }
  if (tag) {
    params += `&tag=${encodeURIComponent(tag)}`;
  }

  return this.http.get<{ data: Blog[]; total: number }>(`${this.apiUrl}/api/allbloglist${params}`);
}

  getlatestcars(): Observable<any> {
    return this.http.get(`${this.apiUrl+'/api/latestcar'}`);
  }

  getBlogBySlug(slug: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl+'/api/blogbyslug'}?slug=${slug}`);
  }
}
