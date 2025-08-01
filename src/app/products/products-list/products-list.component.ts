// products-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router,NavigationExtras, ActivatedRoute, NavigationEnd,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../../seo.service';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-products-list',
  standalone : true,
  imports: [PaginationComponent,CommonModule,RouterModule,BreadcrumbComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  results : any ;
  searchval : any = "";
  seed : any = "";
  search : any = [];
  orderbyval : any = '';
  totalItems: number = 0;
  pageSize = 21;
  metadataA : any ;
  constructor(private productService: ProductService, 
    private router: Router, 
    private http:HttpClient, 
    private activatedRoute : ActivatedRoute,
    private seoService: SeoService
  ) {
    
    if(this.router.getCurrentNavigation()?.extras.state){
      
      this.search = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.search);
      
      if(this.search.brand_id !=''){
        this.productService.getBrandById(this.search.brand_id).subscribe((metadataA)=>{
          this.seoService.updateTitle( metadataA.res.meta_title );

          this.seoService.updateMetaTags({
            description:metadataA.meta_description,
            keywords: metadataA.focus_tag,
            author: metadataA.meta_title,
          canonical_tag: metadataA.res.canoncial_tag 
          });
        });
      }
      else if(this.search.carcategoryid != ''){
        this.productService.getCarCategoryById(this.search.carcategoryid).subscribe((metadataA)=>{
          this.seoService.updateTitle( metadataA.res.meta_title );
          this.seoService.updateMetaTags({
            description:metadataA.meta_description,
            keywords: metadataA.focus_tag,
            author: metadataA.meta_title,
          canonical_tag: metadataA.res.canoncial_tag
          });
         });
      }
      else{
        this.seoService.updateMetaTags({
          description:'',
          keywords: '',
          author: '',
        });
         
      }
    }
    else{
    
      const storedFilters = sessionStorage.getItem('searchFilters');
        if (storedFilters) {
          const searchFilters = JSON.parse(storedFilters); // Parse the JSON string back into an object
          // console.log(searchFilters); // Now you can use the object
          //this.search = searchFilters;
         this.search = {
          brand_id : searchFilters.brandID,
          carcategoryid : searchFilters.carcategoryid,
          registration_year : searchFilters.registration_year,
          kms_driven : searchFilters.kms_driven,
          budget : searchFilters.budget, orderby :searchFilters.orderby, all : searchFilters.all
        };;
        } else {
          console.log('No search filters found in sessionStorage');
          this.search = {
            brand_id : '',
            carcategoryid : '',
            registration_year : '',
            kms_driven : '',
            budget : '', orderby : 'DESC', all : false
          };
        }
        
    }

   }
   ngOnInit(): void {
    console.log('jijij');
      if (!this.search.randomSeed) {
      this.search.randomSeed = Math.floor(Math.random() * 100000); // Set once
    }
      this.activatedRoute.queryParams.subscribe((params) => {
      const currentPage = params['page'] ? +params['page'] : 1; // Default to page 1
      const searchQuery = params['search'] || ''; // 👈 catch 'search=jeep'
      this.searchval = searchQuery;
      this.getProductdata(currentPage,searchQuery);
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

  onPageChange(page: number) {
  this.getProductdata(page,this.searchval);
    
  }

  getProductdata(page:number,searchQuery:any){
    this.search.page  = page;
    this.search.pageSize  = this.pageSize;
    if(searchQuery != ''){
      console.log('here');
    this.search.brand_id  = searchQuery;
    this.search.all  = true;

    if (!this.search.randomSeed) {
      this.search.randomSeed = Math.floor(Math.random() * 100000); // Set once
    }
    const se = {
                    brandID : searchQuery,
                    carcategoryid : this.search.carcategoryid,
                    registration_year : this.search.registration_year,
                    kms_driven : this.search.kms_driven,
                    budget : this.search.budget, orderby : this.orderbyval, all : this.search.all,
                    randomSeed: this.search.randomSeed

                } ;
      sessionStorage.setItem('searchFilters', JSON.stringify(se));
    }
    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
    console.log(this.search);
    this.productService.getAllproduct(this.search).subscribe((results)=>{
      //console.log(results);
      this.results = results.result;
      this.totalItems = results.total; 

    });
  }

  changeOrder(e:any){
    
     this.orderbyval = e.target.value;
     this.search = {
                    brandID : this.search.brand_id,
                    carcategoryid : this.search.carcategoryid,
                    registration_year : this.search.registration_year,
                    kms_driven : this.search.kms_driven,
                    budget : this.search.budget, orderby : this.orderbyval, all : this.search.all,
                    randomSeed: this.search.randomSeed
                    
                    } ;
    sessionStorage.setItem('searchFilters', JSON.stringify(this.search));
    this.router.navigate(['/pre-owned-used-luxury-car/products'],{
      queryParams: { search: this.search.brandID }, // 👈 appear in URL
      state : {
                brand_id : this.search.brand_id,
              carcategoryid : this.search.carcategoryid,
              registration_year : this.search.registration_year,
              kms_driven : this.search.kms_driven,
              budget : this.search.budget, orderby : this.orderbyval, all : this.search.all
            }

  })
  .then(() => {
    window.location.reload();
  })
  }

}


