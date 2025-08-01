import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { BrandServiceService } from '../brand-service.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgxSliderModule,FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  value: number = 10;
  coptions: any = {
    floor: 0.00,
    ceil: 1000000,
    step:100
  };

  annualinterest: number = 10;
  AIoptions: any = {
    floor: 1,
    ceil: 15,
    step : 0.1
  };

  term: number = 60;
  Toptions: any = {
    floor: 1,
    ceil: 84
  };
allbrand : any = [];
results : any = [];
cardetails:any =[];
  emivalue : any = 0;
  totalinterestvalue : any = 0;
  totalamountvalue : any = 0;
  car_id : number = 0;
constructor(private service:BrandServiceService){
  this.service.fetchBrands().subscribe((allbrand:any) => {
    this.allbrand = allbrand ;
  });
}

getProduct(e:any){

  const brand_id = Number( e.target.value);;
  this.service.getCarNameWithBrandID(brand_id).subscribe((results)=>{
      this.results = results;
    
  })

}
  calculateEMI1(params:any){
    console.log('Suman '+this.value+this.annualinterest+this.term);
    console.log('Car '+this.car_id);

    const price = this.cardetails.price; 
    console.log('cardetails '+this.cardetails.price);
    const principal = price - this.value;
    const monthlyInterestRate = this.annualinterest / (12 * 100);
    const numberOfMonths = this.term ;
    const emi = (principal*monthlyInterestRate*Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

    this.emivalue = Number(emi).toFixed(2);;       
    this.totalamountvalue = Number(emi * numberOfMonths).toFixed(2) ;
    this.totalinterestvalue = (this.totalamountvalue - principal).toFixed(2);;


  }
  setProductID(e:any){
    this.car_id = e.target.value;
    this.service.getProductById(this.car_id).subscribe((details)=>{
      this.cardetails = details;
      console.log(this.cardetails);
      
      const price = Number(this.cardetails.price); 
      this.value = (price * 20) / 100;
      console.log(price);
      const newOptions: any = Object.assign({}, this.coptions);
      newOptions.floor = 0;
      newOptions.ceil = price;
      this.coptions = newOptions;
    });
    
  }


}
