import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit, inject } from '@angular/core';
import { BrandServiceService } from '../brand-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, HttpClientModule,NgFor,FormsModule,CarouselModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit{
  customOptions: any = {
    loop: true,
    autoplay: true,
    margin: 30,
    autoHeight: false,
    autoplayTimeout: 3000,
    dots: true,
    nav: false,
    navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>'],
    responsiveClass: true,
    lazyLoad: true,  
    responsive: {
        0: {
            dots: true,
            items: 4,
        },
        600: {
            dots: true,
            items: 6,
        },
        1366: {
            dots: true,
            items: 6,
        }
    }
  };
  httpClient = inject(HttpClient);
  data: any[] = [];  
  searchObj : serach;
  private brandService = inject(BrandServiceService);
  constructor(  private router : Router ) {
    this.searchObj = new serach();
     }
 

  ngOnInit(): void {
   this.fetchBrands();
  }

  fetchBrands(){
    this.brandService.fetchBrands().subscribe((data:any) => {
   this.data = data;
  });
}
sercahcar( brand_id:any , brand_name: string){
  const formattedBrandName = brand_name.trim().replace(/\s+/g, '-').toLowerCase();
  const  searchItem = {
    brandID : brand_id,
    carcategoryid : this.searchObj.carcategoryid,
    registration_year : this.searchObj.registration_year,
    kms_driven : this.searchObj.kms_driven,
    budget : this.searchObj.budget, orderby : this.searchObj.orderby, all : false
  };;
  sessionStorage.setItem('searchFilters', JSON.stringify(searchItem));

  this.router.navigate(['/pre-owned-used-luxury-car', formattedBrandName],{
    state : {
              brand_id : brand_id,
            carcategoryid : this.searchObj.carcategoryid,
            registration_year : this.searchObj.registration_year,
            kms_driven : this.searchObj.kms_driven,
            budget : this.searchObj.budget, orderby : this.searchObj.orderby, all : false}

})

}

}

export class serach{
  brandID:any            = '';
  carcategoryid:any      = '';
  registration_year:any   = '';
  kms_driven:any         = '';
  budget:any             = '';
  orderby:any             = '';

    constructor(){
    this.brandID          = '';
    this.budget           = '';
    this.carcategoryid    = '';
    this.kms_driven       = '';
    this.registration_year = '';
    this.orderby = 'ASC';
    }
}
