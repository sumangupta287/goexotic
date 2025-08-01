import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitesettingsService } from '../sitesettings.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent implements OnInit {
  enquiryData = {
    carId: '',
    carname: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  results :any;
  isSubmit : any = 'false';

  constructor(private route: ActivatedRoute, private enquiryService: SitesettingsService, private productService: ProductService) {}

  ngOnInit() {
    this.enquiryData.carId = this.route.snapshot.paramMap.get('carId') || '';
    this.productService.getCarById(this.enquiryData.carId).subscribe((results)=>{
      console.log(results);
      this.results = results;
      this.enquiryData.carname = results?.car_name;
    
      
    });
  }
  onSubmit() {
    const formData = new FormData();
    
    formData.append('carId', this.enquiryData.carId);
    formData.append('name', this.enquiryData.name);
    formData.append('email', this.enquiryData.email);
    formData.append('phone', this.enquiryData.phone);
    formData.append('message', this.enquiryData.message);
    formData.append('carname', this.enquiryData.carname);
    this.enquiryService.submitEnquiry(formData).subscribe((orderdetails) => {
      if(orderdetails.status == "success"){
        this.isSubmit  = 'true';
      }

      console.log(orderdetails);
     });
    // this.enquiryService.submitEnquiry().subscribe(
    //   response => {
    //     console.log('Enquiry submitted successfully', response);
    //     // Optional: Navigate to a success page or show a success message
    //   },
    //   error => {
    //     console.error('Error submitting enquiry', error);
    //   }
    // );
  }
  

  // onSubmit() {
  //   this.enquiryService.submitEnquiry(this.enquiryData).subscribe(
  //     response => {
  //       this.isSubmit  = 'true';
  //       console.log('Enquiry submitted successfully', response);
  //       // Optional: Navigate to a success page or show a success message
  //     },
  //     error => {
  //       console.error('Error submitting enquiry', error);
  //     }
  //   );
  // }
}
