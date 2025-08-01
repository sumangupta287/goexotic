import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellcarComponent } from './sellcar.component';

describe('SellcarComponent', () => {
  let component: SellcarComponent;
  let fixture: ComponentFixture<SellcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellcarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
