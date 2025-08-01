import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandServiceService } from '../brand-service.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

  results : any = [];
  htmlstringdata : string ='';
    constructor(private router : Router, private  cmsservice : BrandServiceService, private activatedRoute : ActivatedRoute){
     console.log(this.activatedRoute.snapshot.url[0].path );
    }
   ngOnInit(): void {
     this.cmsservice.fetchcmspages(this.activatedRoute.snapshot.url[0].path).subscribe((results:any)=>{
       console.log(results);
       
       if(results.success==1){
         this.results = results.res;
         this.htmlstringdata = results?.content
       }
       else{
         this.router.navigateByUrl('/404');
       }
     });
   }
 

}
