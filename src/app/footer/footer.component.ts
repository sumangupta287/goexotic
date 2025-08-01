import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { BrandServiceService } from '../brand-service.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SitesettingsService } from '../sitesettings.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,BrandComponent,FormsModule,HttpClientModule, RouterModule,ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  allbrand: any[] = [];  
  searchObj : serach;
  private sitesettings = inject(SitesettingsService);
  settings: any[] = []; 

  carcategory : any[] = [];
  newsletterForm: FormGroup;
  errors: string[] = [];
  isSubmit:string = '';

  flashMessage: string = '';
  constructor( private service : BrandServiceService , private http : HttpClient, private router : Router,
    private fb: FormBuilder) {
     

      this.service.fetchBrands().subscribe((allbrand:any) => {
        this.allbrand = allbrand ;
      }); 
      this.searchObj = new serach();
      this.service.fetchcarcategory().subscribe((carcategory:any)=>{
        this.carcategory = carcategory;  
      });
      this.newsletterForm  = this.fb.group({
        email_newsletter: ['', [Validators.required, Validators.email]]
      });
    }

    sercahcar(formvalue:NgForm ){
      sessionStorage.setItem('searchFilters', JSON.stringify(this.searchObj));

      this.router.navigate(['/pre-owned-used-luxury-car/products'],{
        state : {
                  brand_id : this.searchObj.brandID,
                carcategoryid : this.searchObj.carcategoryid,
                registration_year : this.searchObj.registration_year,
                kms_driven : this.searchObj.kms_driven,
                budget : this.searchObj.budget, orderby : this.searchObj.orderby, all : false}

    })
    .then(() => {
      window.location.reload();
    })
       /* this.http.post('http://localhost/goexoctic/api/search',JSON.stringify(this.searchObj),{responseType: 'text'}).subscribe((res:any)=>{
          this.router.navigate(['products'],{
              state : {carid : '1'}

          })
          console.log(res);
        }) */
    }

    searchByCarType(cartypeID : Number, cartype_name: string){
      
      const formattedName = cartype_name.trim().replace(/\s+/g, '-').toLowerCase();
      const  searchItem = {
        brandID : '',
        carcategoryid : cartypeID,
        registration_year : '',
        kms_driven : '',
        budget : '',orderby : '', all : false
      };;
      sessionStorage.setItem('searchFilters', JSON.stringify(searchItem));
      
        this.router.navigate(['/pre-owned-used-luxury-car', formattedName],{
        state : {
                brand_id : '',
                carcategoryid : cartypeID,
                registration_year : '',
                kms_driven : '',
                budget : '', orderby : 'DESC', all : false
              }

    })
    .then(() => {
      window.location.reload();
    })
    }

    
    searchByBrandId(brandID : Number, brand_name: string){
      
  const formattedBrandName = brand_name.trim().replace(/\s+/g, '-').toLowerCase();
  const  searchItem = {
    brandID : brandID,
    carcategoryid : '',
    registration_year : '',
    kms_driven : '',
    budget : '',orderby : '', all : false
  };;
  sessionStorage.setItem('searchFilters', JSON.stringify(searchItem));
      this.router.navigate(['/pre-owned-used-luxury-car', formattedBrandName],{
        state : {
                  brand_id : brandID,
                carcategoryid : '',
                registration_year : '',
                kms_driven : '',
                budget : '', orderby : 'DESC', all : false
              }

    })
    .then(() => {
      window.location.reload();
    })
    }

    ngOnInit(): void {
      this.fetchSiteSettings();
     }
   
     fetchSiteSettings(){
       this.sitesettings.fetchSiteSettings().
       subscribe((settings:any) => {
      
      this.settings = settings;
   
     });
    }

    removeSpaces(value: string): string {
      return value ? value.replace(/\s+/g, '') : '';
    }
    

    submit(){

      if (this.newsletterForm.invalid) {
        Object.keys(this.newsletterForm.controls).forEach(key => {
          if (this.newsletterForm.controls[key].invalid) {
              this.errors.push(`${key} is required`); 
          }
        });
        return;
      }
  
  
      const formData = new FormData();
      Object.keys(this.newsletterForm.controls).forEach(key => {
        formData.append(key, this.newsletterForm.get(key)?.value);
      });
      this.sitesettings.submitNewsletterForm(formData).subscribe({
        next: response => {
              console.log(response);
            if(response.status == "success"){
             
              this.isSubmit = '';
              this.flashMessage = response.message;
              this.newsletterForm.reset();this.errors = [];
            }
            else{
              this.flashMessage = response.message;
              //this.errors = response.errors.email_newsletter;
              this.isSubmit = 'You are already registered with us!';
            }
            
          setTimeout(() => {
            this.flashMessage = '';
          }, 5000); // Hide the flash message after 3 seconds
          
        },
        error: error => {
          console.error(error.errors);
          if (error.error && error.errors.email_newsletter) {
            this.errors = Object.values(error.errors.email_newsletter);
            
          } else {
            this.errors = ['Failed to submit form'];
          }
        }
      });
  
  
    }

}

export class serach{
  brandID:any            = '';
  carcategoryid:any      = '';
  registration_year:any   = '';
  kms_driven:any         = '';
  budget:any             = '';
  orderby:any             = '';
  all:any             = '';

    constructor(){
    this.brandID          = '';
    this.budget           = '';
    this.carcategoryid    = '';
    this.kms_driven       = '';
    this.registration_year = '';
    this.orderby            = 'DESC';
    this.all            = false;
    }
}
