import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRouterComponent } from './products-router.component';

describe('ProductsRouterComponent', () => {
  let component: ProductsRouterComponent;
  let fixture: ComponentFixture<ProductsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRouterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
