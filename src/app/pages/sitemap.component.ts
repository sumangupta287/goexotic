import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
interface SitemapNode {
  label: string;
  children?: SitemapNode[];
}
@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  sitemapUrls: string[] = [];

  constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.http.get('/assets/sitemap.xml', { responseType: 'text' }).subscribe(xmlString => {
  //     const parser = new DOMParser();
  //     const xml = parser.parseFromString(xmlString, 'application/xml');
  //     const locElements = Array.from(xml.getElementsByTagName('loc'));

  //     this.sitemapUrls = locElements.map(loc => loc.textContent || '');
  //   });
  // }

  urls: string[] = [];
  sitemapTree: SitemapNode[] = [];


  ngOnInit() {
    this.http.get('/assets/sitemap.xml', { responseType: 'text' }).subscribe(xmlData => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlData, 'application/xml');
      const urls = xml.getElementsByTagName('url');

      const treeMap = new Map<string, Map<string, string[]>>();
      const otherPages: { label: string, url: string }[] = [];


      for (let i = 0; i < urls.length; i++) {
        const loc = urls[i].getElementsByTagName('loc')[0]?.textContent;
        if (!loc) continue;

        const path = new URL(loc).pathname.split('/').filter(Boolean);

        if (path[0] === 'pre-owned-used-luxury-car' && path.length >= 2) {
          const brand = decodeURIComponent(path[1]);
          const car = path[2] ? decodeURIComponent(path[2].replace(/-/g, ' ')) : null;

          if (!treeMap.has(brand)) {
            treeMap.set(brand, new Map());
          }

          const brandMap = treeMap.get(brand)!;
          if (car) {
            if (!brandMap.has('cars')) brandMap.set('cars', []);
            brandMap.get('cars')!.push(car);
          }
        }
        else {
    // Collect non-car pages
    const label = path[path.length - 1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
    otherPages.push({ label, url: '/' + path.join('/') });
  }
      }

      this.sitemapTree = [
        {
          label: 'Home',
          children: [
            ...otherPages,
            {
              label: 'Pre-Owned Used Luxury Car',
              children: Array.from(treeMap.entries()).map(([brand, brandData]) => ({
                label: brand,
                children: (brandData.get('cars') || []).map(car => ({ label: car }))
              }))
            }
          ]
        }
      ];
    });
  }

  extractNameFromURL(url: string): string {
  const parts = url.split('/');
  let label = parts.pop() || parts.pop(); // Handles trailing slash
  return label?.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '') || url;
}

  // Optional: Grouping logic can go here if you want to group by brand/category/etc.
}
