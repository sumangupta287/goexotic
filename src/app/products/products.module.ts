import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ProductsRoutingModule,FormsModule,CarouselModule  
    ]
})
export class ProductsModule { }
