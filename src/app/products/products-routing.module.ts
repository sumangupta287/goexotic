import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CommonModule } from '@angular/common';
import { ProductsRouterComponent } from './products-router/products-router.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'list', pathMatch: 'full' },
//   { path: 'list', component: ProductsListComponent },
//   { path: 'details/:carname', component: ProductDetailsComponent }
// ];

// const routes: Routes = [
  // { path: '', redirectTo: 'list', pathMatch: 'full' },
  // { path: 'list', component: ProductsListComponent },
  // { path: 'list/:brandname', component: ProductsListComponent },  // Accept brand name in the URL
  // { path: 'details/:carname', component: ProductDetailsComponent }

  // { path: '', component: ProductsListComponent }, // for: /:type/products
  // { path: ':param', component: ProductsRouterComponent } // handles both brand & detail
// ];

// const routes: Routes = [
//   { path: '', component: ProductsListComponent }, // for just /:type/products
//   { path: ':brandname', component: ProductsListComponent }, // for /:type/products/audi
//   { path: ':carname', component: ProductDetailsComponent }  // for /:type/products/2014-audi-a6-technology-1
// ];

const routes: Routes = [
  { path: 'products', component: ProductsListComponent }, // /:type/products
  { path: ':brand', component: ProductsListComponent }, // /:type/audi
  { path: ':brand/:carname', component: ProductDetailsComponent } // /:type/audi/2014-audi-a6
];



@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
