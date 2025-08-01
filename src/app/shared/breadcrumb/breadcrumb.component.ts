import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.buildBreadcrumbs();
    });

    this.buildBreadcrumbs();
  }

  buildBreadcrumbs() {
  this.breadcrumbs = [];

  const cleanUrl = this.router.url.split('?')[0]; // 🔥 Remove ?page=1
  const pathSegments = cleanUrl.split('/').filter(Boolean);

  this.breadcrumbs.push({ label: 'Home', url: '/' });

  if (pathSegments[0] === 'pre-owned-used-luxury-car') {
    this.breadcrumbs.push({
      label: 'Pre Owned Used Luxury Cars',
      url: `/${pathSegments[0]}/products`
    });
  }

  if (pathSegments.length >= 2) {
    this.breadcrumbs.push({
      label: this.formatTitle(pathSegments[1]),
      url: `/${pathSegments[0]}/${pathSegments[1]}`
    });
  }

  if (pathSegments.length >= 3) {
    this.breadcrumbs.push({
      label: this.formatTitle(pathSegments[2]),
      url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`
    });
  }
}


  formatTitle(slug: string): string {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}
