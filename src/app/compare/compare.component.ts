import { Component, OnInit } from '@angular/core';
import { BrandServiceService } from '../brand-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [FormsModule, CarouselModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent implements OnInit{
  customOptions: any = {
    loop: true,
    margin: 30,
    autoHeight: false,
    autoplayTimeout: 5000,
    dots: false,
    nav: true,
    navText: ['<i class="ti-arrow-left" aria-hidden="true"></i>', '<i class="ti-arrow-right" aria-hidden="true"></i>'],
    responsiveClass: true,
    responsive: {
        0: {
            dots: false,
            items: 1,
        },
        600: {
            dots: false,
            items: 2,
        },
        1366: {
            dots: false,
            items: 3,
        }
    }
  };
  allbrand: any[] = [];
  comapreResult: any[] = [];
  productResult : any[] = [];
  results1:any[] = []; results2:any[] = []; results3:any[] = []; results4:any[] = []; 
  seletedvalue:number = 0;
  seletedProductvalue:string ='';

  firstbrandID : any ='0'; 
  secondbrandID : any ='0';
  thirdbrandID : any ='0'; 
  fourthbrandID : any ='0';
  fourthbrandid:any ='0';
  firstCarOption:any ='0';
  secondCarOption : any ='0';
  thirdCarOption : any ='0'; 
  fourthCarOption : any ='0';
  constructor(private service : BrandServiceService){

    this.service.fetchBrands().subscribe((allbrand:any) => {
      this.allbrand = allbrand ;
    }); 
    this.firstbrandID = '';
  }
  ngOnInit(): void {
    
  }

  getFirstValue(e:any, param:any){
    console.log(e.target.value + param);
    const id = Number( e.target.value);;
    this.service.getCarNameWithBrandID(id).subscribe((results)=>{
      console.log('hi'+results);
      if(param == 'first'){
        this.results1 = results;
      }
      if(param == 'second'){
        this.results2 = results;
      }
      
      if(param == 'third'){
        this.results3 = results;
      }
      
      if(param == 'fourth'){
        this.results4 = results;
      }

    });

  }

  setProductValue(e:any, param:any){
    console.log(e.target.value + param);
    const id = Number( e.target.value);;
    this.productResult = Array(id);
      // if(param == 'first'){
      //   this.results1 = results;
      // }
      // if(param == 'second'){
      //   this.results2 = results;
      // }
      
      // if(param == 'third'){
      //   this.results3 = results;
      // }
      
      // if(param == 'fourth'){
      //   this.results4 = results;
      // }

    

  }

  CompareCar(formvalue:NgForm){
    console.log(formvalue);
  
    if(formvalue.valid){
    this.service.getComapreCarDetails(formvalue.value).subscribe((response)=>{
       console.log(response);
       this.comapreResult = response;
 
     });
    }
    
  }

}
