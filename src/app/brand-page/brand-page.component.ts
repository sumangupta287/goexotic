import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BrandServiceService } from '../brand-service.service';

@Component({
  selector: 'app-brand-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './brand-page.component.html',
  styleUrl: './brand-page.component.css'
})
export class BrandPageComponent {

  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  apiService = inject(BrandServiceService);
  brandSlug = '';
  brandInfo: any = {};
  cars: any[] = [];
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const brandParam = params.get('brand');
      if (brandParam) {
        this.brandSlug = brandParam.replace('-brand', '');

        this.apiService.getBrandPage({ id: this.brandSlug }).subscribe((res: any) => {        
            this.brandInfo =res;
         
        });

      }
    });
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

