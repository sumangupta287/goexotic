// src/app/models/blog.model.ts
export interface Blog {
  id: number;
  post_title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
  content: string;
  image: string;
  created_at: string;
  category?: string;
}

export interface Tags {
  id: number;
  tag_name: string;
  slug: string;
  created_at: string;
  
}
