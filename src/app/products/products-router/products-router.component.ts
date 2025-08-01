import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service'; // Replace with actual path

@Component({
  selector: 'app-products-router',
  template: `<p>Loading...</p>`,
  standalone: false // Set true if you're using standalone
})
export class ProductsRouterComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('param');
    const type = this.route.parent?.snapshot.paramMap.get('type'); // e.g., pre-owned-used-luxury-car

    if (param && type) {
      // this.productService.checkSlugType(param).subscribe((res: any) => {
      //   if (res.type === 'car') {
      //     this.router.navigate([`/${type}/products/details/${param}`]);
      //   } else if (res.type === 'brand') {
      //     this.router.navigate([`/${type}/products/list/${param}`]);
      //   } else {
      //     // Optional: redirect to 404 or home
      //     this.router.navigate(['/']);
      //   }
      // });
    }
  }
}
