// product-details.component.ts

import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductsModule } from '../products.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MagnificPopup } from 'angular-magnific-popup';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../../seo.service';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product-details',
  standalone : true,
  imports : [CarouselModule,MagnificPopup,RouterModule,FormsModule,BreadcrumbComponent],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  customOptions: any = {
    loop: true,
    margin: 30,
    autoplay: false,
    autoHeight: false,
    autoplayTimeout: 5000,
    center: true,
    dots: true,
    nav: true,
    navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>'],
    responsiveClass: true,
    responsive: {
        0: {
            dots: true,
            items: 1,
        },
        600: {
            dots: true,
            items: 2,
        },
        1366: {
            dots: true,
            items: 2,
        }
    }
};
  product: Product | undefined;
  results : any;
  relatedProducts : any;
  search : any = [];  metadataA : any ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService, private seoService: SeoService
  ) { 

    this.search = {
        brand_id : '',
        carcategoryid : '',
        registration_year : '',
        kms_driven : '',
        budget : '', orderby : 'DESC', all : false
      };
  }

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('carname'));
    //this.product = this.productService.getProductById(id);
  
    this.productService.getProductById(id).subscribe((results)=>{
      
      this.results = results;
      if (results.success === '0') {
        this.router.navigate(['/']);
      }
      this.seoService.updateTitle( results.meta_title );

      this.seoService.updateMetaTags({
        description:results.meta_description,
        keywords: results.focus_tag,
        author: results.meta_title,
        canonical_tag: results.canoncial_tag,
        ogurl: 'https://goexotic.co/pre-owned-used-luxury-car/'+results.brand.brand_name.toLowerCase()+'/'+results.slug,
        ogimage: 'https://goexotic.co/admin/assets/images/'+results.primary_image,
        ogimagealt: results.car_name 
      });

      this.getRelatedProduct(results.brand_id);

    });
   
//

  }

  // Navigate to booking page with car ID and price as parameters
  bookNow(carId: string, carPrice: number) {
    const carPrice_10 = (carPrice) * 0.10 ;
    //console.log(carPrice_10);
    this.router.navigate(['/book-car', carId, carPrice_10]);
  }
  
  enquire(carId: number) {
    this.router.navigate(['/enquiry', carId]);
  }

  formatCarName(carName: string): string {
   //return carName.replace(/\s+/g, '-');
   return carName.replace(/-/g, '--').replace(/\s+/g, '-');
   //return carName.replace(/-/g, '--').replace(/\s+/g, '-');
  }

  getRelatedProduct( brand_id : number){
    this.search.page  = 1;
    this.search.pageSize  = 6;
    this.search.brand_id  = brand_id;
    this.productService.getAllproduct(this.search).subscribe((results)=>{
      this.relatedProducts = results.result;

    });
  }
  

}
