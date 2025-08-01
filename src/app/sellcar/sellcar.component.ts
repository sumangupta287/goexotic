import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { SitesettingsService } from '../sitesettings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { fileValidator } from './filevalidator';

@Component({
  selector: 'app-sellcar',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './sellcar.component.html',
  styleUrl: './sellcar.component.css'
})
export class SellcarComponent {
   
  private sitesettings = inject(SitesettingsService);
  settings: any[] = []; 
  isSubmit : any = 'true';
  sellcarContactForm: FormGroup;
  errors: string[] = [];
  fileErrors: { [key: string]: string } = {};
  filePreviews: { [key: string]: string | ArrayBuffer | null } = {};

  @ViewChild('errorContainer') errorContainer!: ElementRef;
  constructor(
              private http: HttpClient,
              private fb: FormBuilder
            )
  {
    this.sellcarContactForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      variant: ['', Validators.required],
      message: ['', ''],
      brandCopy: [null, [ fileValidator()]],
      ModelCopy: [null, [ fileValidator()]],
      variantCopy: [null, [ fileValidator()]],
    });
  }
  ngOnInit(): void {
    this.fetchSiteSettings();
   }
 
   fetchSiteSettings(){
     this.sitesettings.fetchSiteSettings().
     subscribe((settings:any) => { this.settings = settings;   });
    }

  submit(){
    

    if (this.sellcarContactForm.invalid) {
      this.markFormGroupTouched(this.sellcarContactForm);
    
      Object.keys(this.sellcarContactForm.controls).forEach(key => {
        if (this.sellcarContactForm.controls[key].invalid) {
          const controlErrors = this.sellcarContactForm.controls[key].errors;
          if (controlErrors) {
            Object.keys(controlErrors).forEach(errorKey => {
              this.errors.push(`${key} is invalid: ${controlErrors[errorKey]}`);
            });
          } else {
            this.errors.push(`${key} is required`);
          }
        }
      });
      
      // Use setTimeout to ensure the form controls are updated before scrolling
      setTimeout(() => {
        this.scrollToFirstError();
      }, 0);
      return;
    }


    const formData = new FormData();
    Object.keys(this.sellcarContactForm.controls).forEach(key => {
      formData.append(key, this.sellcarContactForm.get(key)?.value);
    });
    this.sitesettings.submitSellcarForm(formData).subscribe({
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
  validateFile(file: File): string {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only JPEG and PNG are allowed.';
    }

    if (file.size > maxSize) {
      return 'File size exceeds the maximum limit of 5 MB.';
    }

    return '';
  }
  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileErrors[field] = this.validateFile(file);
      this.sellcarContactForm.patchValue({
        [field]: file
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreviews[field] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as FormGroup).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  private scrollToFirstError() {
    const firstErrorElement = this.errorContainer.nativeElement.querySelector('.error');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}
