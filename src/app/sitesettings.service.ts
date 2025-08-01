import { Injectable ,OnInit, inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SitesettingsService {
  private settingsCache: any = null; // To store API response

  //BASE_URL : string = 'http://localhost/goexoctic/';
 BASE_URL : string = 'https://goexotic.co/admin/';
  constructor() { }
  httpClient = inject(HttpClient);
    data: any[] = [];  
  
    fetchSiteSettings(): Observable<any> {
      // Check if cache exists in memory
      if (this.settingsCache) {
        return of(this.settingsCache);
      }
  
      // Check if cache exists in sessionStorage
      const cachedData = sessionStorage.getItem('siteSettings');
      if (cachedData) {
        this.settingsCache = JSON.parse(cachedData);
        return of(this.settingsCache);
      }
  
      return this.httpClient.get<any>(this.BASE_URL + 'api/getallsetting').pipe(
        tap(settings => {
          this.settingsCache = settings; // Store in memory
          sessionStorage.setItem('siteSettings', JSON.stringify(settings)); // Store in sessionStorage
        }),
        shareReplay(1) // Ensures the response is shared across multiple subscribers
      );
    }
  fetchSiteSettings1(){
    return this.httpClient.get(this.BASE_URL +'api/getallsetting');
    
  }

  submitConatctUsForm(parameters : any): Observable<any>{
    return this.httpClient.post(this.BASE_URL +'api/submitconatctusform',JSON.stringify(parameters));
  }
  submitInsuranceForm(parameters : FormData): Observable<any>{
   return this.httpClient.post(this.BASE_URL +'api/submitinsuranceform',parameters);
  }

  submitSellcarForm(parameters : FormData): Observable<any>{
    return this.httpClient.post(this.BASE_URL +'api/submitsellcarform',parameters);
  }
  submitNewsletterForm(parameters : FormData): Observable<any>{
     
    return this.httpClient.post(this.BASE_URL +'api/submitnewsletterform',parameters);
  }
  submitEnquiry(parameters: FormData): Observable<any> {
    return this.httpClient.post(this.BASE_URL +'api/submitenquiryform',parameters);
  }

  logFormData(formData: FormData) {
    const entries = (formData as any).entries();
    for (const pair of entries) {
      console.log(pair[0], pair[1]);
    }
  }

    // Inject the fetched GA code into the head
    injectGAScript(gaCode: string): void {
      if (!document.querySelector(`script[data-ga]`)) {
        const script = document.createElement('script');
        script.setAttribute('data-ga', 'true');
        script.type = 'text/javascript';
        script.innerHTML = gaCode;
        document.head.appendChild(script);
  
        console.log('Google Analytics script injected from DB');
      }
    }

}
