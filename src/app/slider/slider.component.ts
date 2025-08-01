import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrandServiceService } from '../brand-service.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule,SlickCarouselModule,CarouselModule,RouterModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {
  config = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  customOptions: any = {
    loop: true,
    autoplay: true,
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



  results : any = [];
  constructor(private productService : BrandServiceService){}

  ngOnInit(): void {
    this.getProductSlider();
  }

  formatCarName(carName: string): string {
    //return carName.replace(/\s+/g, '-');
    return carName.replace(/-/g, '--').replace(/\s+/g, '-');
    //return carName.replace(/-/g, '--').replace(/\s+/g, '-');
   }
  
  getProductSlider(){
    this.productService.fetchHomeProducts().subscribe((results)=>{
      this.results = results;

    })
  }
}
