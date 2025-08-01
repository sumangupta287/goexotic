import { Component, OnInit } from '@angular/core';
import { BrandServiceService } from '../brand-service.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit{

  faqlist : any = [];
  constructor(private service : BrandServiceService){

  }
 ngOnInit(): void {
   this.getFaqList();
 }

getFaqList(){
  this.service.fetchfaq().subscribe((faqlist:any)=>{
    this.faqlist = faqlist;
    console.log(faqlist[1]);
  });
}

}
