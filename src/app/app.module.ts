import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarBookingComponent } from './car-booking/car-booking.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { SitemapComponent } from './pages/sitemap.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    BrandComponent,
    ReactiveFormsModule,
    CarouselModule,
    NgxSliderModule,
    CarBookingComponent,
    EnquiryComponent,
    SitemapComponent
  ],
  providers: [ provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
