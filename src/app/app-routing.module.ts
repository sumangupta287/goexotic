import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FaqComponent } from './faq/faq.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CompareComponent } from './compare/compare.component';
import { SellcarComponent } from './sellcar/sellcar.component';
import { CarBookingComponent } from './car-booking/car-booking.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { SitemapComponent } from './pages/sitemap.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'whyus', component: AboutComponent },
  { path: 'terms', component: AboutComponent },
  { path: 'privacypolicy', component: AboutComponent },
  { path: 'career', component: AboutComponent },
  { path: 'usedcar', component: AboutComponent },
  // { path: 'sellcar', component: AboutComponent },
  { path: 'vintagecar', component: AboutComponent },
  { path: 'financeinsurance', component: AboutComponent },
  { path: 'newcar', component: AboutComponent },
  { path: 'ourshowroom', component: AboutComponent },
  { path: 'goexoticsquard', component: AboutComponent },
  { path: 'customersupport', component: AboutComponent },
  { path: 'deliverydetails', component: AboutComponent },
  // { path: 'blog', component: AboutComponent },
  { path: 'autoguide', component: AboutComponent },
  { path: 'cancellationrefund', component: AboutComponent },
  { path: 'insurance', component: AboutComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'emicalculator', component: CalculatorComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'sellcar', component: SellcarComponent },
  { path: 'comparecar', component: CompareComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'book-car/:id/:price', component: CarBookingComponent},
  { path: 'enquiry/:carId', component: EnquiryComponent},
  

  {
    path: 'sitemap',
  loadComponent: () => import('./pages/sitemap.component').then(m => m.SitemapComponent)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
  // {
  //   path: 'pre-owned-used-luxury-car/:brand-brand',
  //   loadComponent: () => import('./brand-page/brand-page.component').then(m => m.BrandPageComponent)
  // },
  // { path: ':type', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
// Specific brand matcher
{ matcher: brandPageMatcher, loadComponent: () => import('./brand-page/brand-page.component').then(m => m.BrandPageComponent) },

// Lazy load product routes under ":type"
{ path: ':type', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },

  { path: '', component: HomeComponent },
  { path: '**', component: AboutComponent } // Handle other routes or 404
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export function brandPageMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (
    segments.length === 2 &&
    segments[0].path === 'pre-owned-used-luxury-car' &&
    segments[1].path.endsWith('-brand')
  ) {
    const brand = segments[1].path.replace('-brand', '');
    return {
      consumed: segments,
      posParams: {
        brand: new UrlSegment(brand, {})
      }
    };
  }
  return null;
}

