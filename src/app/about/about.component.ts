import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BrandServiceService } from '../brand-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { SitesettingsService } from '../sitesettings.service';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,   FormsModule,HttpClientModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnChanges {

 results : any = [];
 htmlstringdata : string ='';
 isSubmit = 'true';
  registrationForm: FormGroup;
  errors: string[] = [];metadataA : any ;
  filePreviews: { [key: string]: string | ArrayBuffer | null } = {};
   constructor(private router : Router, 
               private  cmsservice : BrandServiceService, 
               private activatedRoute : ActivatedRoute , 
               private http: HttpClient,
              private sitesettings : SitesettingsService,
              private fb: FormBuilder, private seoService: SeoService
            )
    { 
      this.registrationForm = this.fb.group({
        registrationNumber: ['', Validators.required],
        make: ['', Validators.required],
        model: ['', Validators.required],
        insuranceCopy: [null, Validators.required],
        rcFront: [null, Validators.required],
        rcBack: [null, Validators.required],
      });
    }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => {
        //console.log(param);
        }
      
    );
this.activatedRoute.url.subscribe(url =>{
  // Code to get the new notification data 
  // and display it

  this.fectcmscontent();
});
  }

  ngOnChanges() : void{
   
  }

  fectcmscontent(){
    console.log(this.activatedRoute.snapshot.url[0].path);
      this.cmsservice.fetchcmspages(this.activatedRoute.snapshot.url[0].path).subscribe((results:any)=>{
            
      if(results.success==1){
        this.results = results.res;
        // console.log(results.res);

        this.seoService.updateTitle( results.res.meta_title );

        this.seoService.updateMetaTags({
          description:results.res.meta_description,
          keywords: results.res.focus_tag,
          author: results.res.meta_title,
          canonical_tag: results.res.canoncial_tag ,
          ogimagealt: results.res.meta_title          ,
        });
      }
      else{
        this.router.navigateByUrl('/404');
      }
    });
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registrationForm.patchValue({
        [field]: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreviews[field] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


//   onSubmit() {
// console.log(this.car.registrationNumber);
//    const formData = new FormData();
//     formData.append('registrationNumber', this.car.registrationNumber);
//     formData.append('make', this.car.make);
//     formData.append('model', this.car.model);
//     formData.append('insuranceCopy', this.files['insuranceCopy']);
//     formData.append('rcFront', this.files['rcFront']);
//     formData.append('rcBack', this.files['rcBack']);

//     console.log(formData);

//      // Log the formData object
//     this.logFormData(formData);

//     // if(formData1.valid){
     
//       this.sitesettings.submitInsuranceForm(formData).subscribe((response : any)=>{
//         console.log(response);
//         if(response.status == "success"){
//           this.isSubmit = 'false';
//         }
//         else{
//           this.isSubmit = 'true';
//         }
          
//         });
//    // }
//   }
  submit() {
    if (this.registrationForm.invalid) {
      this.errors = [];
      Object.keys(this.registrationForm.controls).forEach(key => {
        if (this.registrationForm.controls[key].invalid) {
          this.errors.push(`${key} is required`);
        }
      });
      window.scrollTo(0, 0);
      return;
    }

    const formData = new FormData();
    Object.keys(this.registrationForm.controls).forEach(key => {
      formData.append(key, this.registrationForm.get(key)?.value);
    });
    this.sitesettings.submitInsuranceForm(formData).subscribe({
      next: response => {
            console.log(response);
          if(response.status == "success"){
            this.isSubmit = 'false';
          }
          else{
            this.isSubmit = 'true';
          }
        this.errors = [];
        window.scrollTo(0, 0);
      },
      error: error => {
        console.error(error);
        this.errors = ['Failed to submit form'];
      }
    });

  }
  logFormData(formData: FormData) {
    const entries = (formData as any).entries();
    for (const pair of entries) {
      console.log(pair[0], pair[1]);
    }
  }
}
