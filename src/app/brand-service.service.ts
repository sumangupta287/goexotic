import { Injectable ,OnInit, inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {
//  BASE_URL : string = 'http://localhost/goexoctic/';
 BASE_URL : string = 'https://goexotic.co/admin/';
  constructor() { }
  httpClient = inject(HttpClient);
  private homeSection3Data: any = null;

  getHomeSection3Content(): Observable<any> {
    if (this.homeSection3Data) {
      return of(this.homeSection3Data); // return cached value
    }
    return this.fetchcmspages('wheredreamsaccelerate').pipe(
      tap((results: any) => this.homeSection3Data = results.res)
    );
  }
  

  fetchBrands(){
    return this.httpClient.get(this.BASE_URL +'api/brandslist');
    
  }

  fetchcarcategory(){
    return this.httpClient.get(this.BASE_URL +'api/carcategorylist');
  }

  fetchcmspages(slug : String): Observable<any> {
    return this.httpClient.post(this.BASE_URL +'api/getcms',slug);

  }

  
  fetchfaq() : Observable<any>{
    return this.httpClient.get(this.BASE_URL +'api/faqslist');

  }

  
  fetchHomeProducts() : Observable<any>{
    return this.httpClient.get(this.BASE_URL +'api/homecarlist');

  }

  getCarNameWithBrandID(id: number): Observable<any>{
    //return this.products.find(product => product.id === id);
    return this.httpClient.post(this.BASE_URL +'api/getcarnamewithbrandid',JSON.stringify(id));
  }

  getComapreCarDetails(parameters : any): Observable<any> {
    console.log(JSON.stringify(parameters));
    return this.httpClient.post(this.BASE_URL +'api/getcomaprecardetails',JSON.stringify(parameters));

  }

  getProductById(id: number): Observable<any>{
    //return this.products.find(product => product.id === id);
    return this.httpClient.post(this.BASE_URL +'api/findcar',JSON.stringify(id));
  }

  getAllBlog(param: any): Observable<any> {
     return this.httpClient.post(this.BASE_URL +'api/allbloglist',JSON.stringify(param));
  }

  getBrandPage(param: any): Observable<any> {
     return this.httpClient.post(this.BASE_URL +'api/getbrandpage',JSON.stringify(param));
  }

}
