import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
 // BASE_URL : string = 'http://localhost/goexoctic/';
  BASE_URL : string = 'https://goexotic.co/admin/';
  constructor(private http: HttpClient) {}

  // Save booking details to the database
  saveBookingDetails(details: any): Observable<any> {
    return this.http.post(this.BASE_URL +'api/bookings', JSON.stringify(details));
  }

  // Get the payment order ID from backend with calculated amount
  createRazorpayOrder(amount: number): Observable<any> {
    return this.http.post(this.BASE_URL +'api/create-order', { amount });
  }

  // Save Razorpay payment reference number to the database
  savePaymentReference(reference: any): Observable<any> {
    return this.http.post(this.BASE_URL +'api/payment-reference',  JSON.stringify(reference));
  }
}
