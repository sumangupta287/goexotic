import {  Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BrandComponent } from '../brand/brand.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrandServiceService } from '../brand-service.service';
import { SliderComponent } from '../slider/slider.component';
import { SitesettingsService } from '../sitesettings.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BrandComponent,CommonModule,FormsModule,SliderComponent,RouterModule],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  searchObj : serach;
  results : any = []; homesection2 : any = []; homesection3 : any = [];
 htmlstringdata : string ='';
 
 settings: any[] = []; 
 
  constructor(private router : Router, 
    private  cmsservice : BrandServiceService, 
    private activatedRoute : ActivatedRoute, private sitesettings: SitesettingsService){
    this.searchObj = new serach();

    this.cmsservice.fetchcmspages('wheredreamsaccelerate').subscribe((results:any)=>{

      this.homesection3 = results.res;
    
  });
    this.cmsservice.fetchcmspages('homesection1').subscribe((results:any)=>{

      this.results = results.res;
      this.htmlstringdata = results?.content
    
  });
  this.cmsservice.fetchcmspages('howitworks').subscribe((results:any)=>{

      this.homesection2 = results.res;
    
  });
  

  }
  @ViewChild('youtubeContainer', { static: true }) youtubeContainer!: ElementRef;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadYoutubeIframe();
          observer.unobserve(this.youtubeContainer.nativeElement);
        }
      });
    });

    observer.observe(this.youtubeContainer.nativeElement);
  }

  loadYoutubeIframe() {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '315';
    iframe.src = 'https://www.youtube.com/embed/ZwWuPKPOgtU?si=2Po01ExXX2rcZvva?playlist=tgbNymZ7vqY&autoplay=0&mute=1&loop=0&rel=0';
    iframe.title = 'YouTube video player';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    this.youtubeContainer.nativeElement.appendChild(iframe);
  }
  ngOnInit(): void {
    this.fetchSiteSettings();
   }
 
   fetchSiteSettings(){
     this.sitesettings.fetchSiteSettings().
     subscribe((settings:any) => { this.settings = settings;   });
    }
  
  sercahcar( ){    
    sessionStorage.setItem('searchFilters', JSON.stringify(this.searchObj));
    this.router.navigate(['/pre-owned-used-luxury-car/products'],{
      queryParams: { search: this.searchObj.brandID }, // 👈 appear in URL
      
      state : {brand_id : this.searchObj.brandID,
        carcategoryid : this.searchObj.carcategoryid,
        registration_year : this.searchObj.registration_year,
        kms_driven : this.searchObj.kms_driven,
        budget : this.searchObj.budget, orderby : this.searchObj.orderby, all : true}
  })
}
}
export class serach{
  brandID:any            = '';
  carcategoryid:any      = '';
  registration_year:any   = '';
  kms_driven:any         = '';
  budget:any             = '';
  orderby:any             = '';
  all:any             = '';

    constructor(){
    this.brandID          = '';
    this.budget           = '';
    this.carcategoryid    = '';
    this.kms_driven       = '';
    this.registration_year = '';
    this.orderby            = 'DESC';
    this.all            = true;
    }
}


