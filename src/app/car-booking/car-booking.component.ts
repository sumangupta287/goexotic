import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var Razorpay: any; // Declare Razorpay as a global variable
@Component({
  selector: 'app-car-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-booking.component.html',
  styleUrl: './car-booking.component.css'
})
export class CarBookingComponent implements OnInit {


  bookingDetails = {
    name: '',
    email: '',
    phone: '',
    carId: this.route.snapshot.paramMap.get('id') || '',
    carPrice: (this.route.snapshot.paramMap.get('price') ) || '0', // This can be dynamically set based on selected car
    formattedCarPrice: (this.route.snapshot.paramMap.get('price') ) || '0' 
  };
  paymentSuccessful : any = 'false';
results : any;
  constructor(private paymentService: PaymentService,
    private productService: ProductService, private route : ActivatedRoute,private cdr: ChangeDetectorRef) {
      //this.bookingDetails.carId = (this.route.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {
    this.loadRazorpayScript();
    this.route.paramMap.subscribe(params => {
      this.bookingDetails.carId = params.get('id') || '';
      this.bookingDetails.carPrice = (params.get('price')) || '0';
    });

    
  
    const id = this.bookingDetails.carId;
    console.log( this.bookingDetails.carId);
    this.productService.getCarById(id).subscribe((results)=>{
      console.log(results);
      this.results = results;
      this.bookingDetails.carPrice = (parseFloat(results.price) * 0.10).toString();;
      this.bookingDetails.formattedCarPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
      }).format(parseFloat(results.price) * 0.10);
      
    });
   
//


  }

  loadRazorpayScript(): void {
    const scriptId = 'razorpay-checkout-js';

    // Avoid reloading if already present
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }
  // Step 1: Save booking details to DB
  submitBookingDetails() {
   this.paymentService.saveBookingDetails(this.bookingDetails).subscribe((orderdetails) => {
    console.log(orderdetails);
      this.initiatePayment(orderdetails.order_id);
   });
  }

  // Step 2: Calculate 10% of car price, get order ID from server, and call Razorpay
  initiatePayment( order_id : number) {
    const amount = parseFloat(this.bookingDetails.carPrice)* 100;;//parseFloat(this.bookingDetails.carPrice) * 0.10 * 100; // amount in paise (INR)
    const car_id = parseFloat(this.bookingDetails.carId);
    console.log(car_id);
    // Get Razorpay order ID from server
    // this.paymentService.createRazorpayOrder(amount).subscribe(order => {
    console.log(this.bookingDetails.name);
      const options = {
        key: 'rzp_test_UVBqSHRudOifDa', // Replace with your Razorpay key ID
        amount: amount,
        currency: 'INR',
        name: 'GoExotic',
        description: 'Car Booking',
       // order_id: '123',  // Order ID from backend
     //   handler: this.handlePaymentSuccess.bind(order_id, this), // Success callback
        handler: (paymentResponse: any) => this.handlePaymentSuccess(order_id, 'Success', paymentResponse.razorpay_payment_id,car_id),

        prefill: {
          name: this.bookingDetails.name,
          email: this.bookingDetails.email,
          contact: this.bookingDetails.phone
        },
        theme: {
          color: '#F37254'
        }
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    // });
  }

  // Step 3: Success callback - Save payment reference to DB
  handlePaymentSuccess(orderid: number, status: string, referenceId: any, car_id : number) {
   
    const paymentRef = {
      bookingId: this.bookingDetails.carId,
      orderid: orderid,
      razorpayPaymentId: referenceId,
      carid: car_id
    };
    this.paymentSuccessful = 'true';
    this.cdr.detectChanges();
   
   this.paymentService.savePaymentReference(paymentRef).subscribe((returndata) => {
     console.log(returndata);
      console.log('Payment was successful!');
   });
  }

  
}
