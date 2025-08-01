import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   BASE_URL : string = 'http://localhost/goexoctic/';
  //  BASE_URL : string = 'https://goexotic.co/admin/';
 products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', price: 30, description: 'Description for Product 3' }
  ];
parameter :any = '';
results : any ;resultsdata : any ;
  constructor(private router : Router, private http : HttpClient) { 
   // this.parameter = this.router.getCurrentNavigation()?.extras.state;
   // console.log(this.parameter);
    
  }

  getAllproduct(param: any): Observable<any> {
     return this.http.post(this.BASE_URL +'api/search',JSON.stringify(param));
  }


  getAllProducts(): Product[] {
    
    return this.products;
  }

  getProductById(id: any): Observable<any>{
 
    //const carName = id.replace(/-/g, ' ').replace(/  /g, '-');
     //const carName = id.replace(/--/g, '-').replace(/-/g, ' ');
     const slug = id;
    //const url = id;
    return this.http.post(this.BASE_URL +'api/findcar',JSON.stringify(slug));
  }
  getCarById(id: any): Observable<any>{
    return this.http.post(this.BASE_URL +'api/findcarid',JSON.stringify(id));
  }

  getBrandById(id: number): Observable<any>{    
    return this.http.post(this.BASE_URL +'api/findBrand',JSON.stringify(id));
  }

  getCarCategoryById(id: number): Observable<any>{    
    return this.http.post(this.BASE_URL +'api/findCarCategory',JSON.stringify(id));
  }
  
}
