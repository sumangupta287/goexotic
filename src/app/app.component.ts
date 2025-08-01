import { Component, OnInit, AfterViewInit, Inject, Pipe, Renderer2, inject } from '@angular/core';
import { SitesettingsService } from './sitesettings.service';
import { BrandServiceService } from './brand-service.service';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = '';
  homeSection3: any;

  constructor(private cmsService: BrandServiceService,private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document, private seoService: SeoService) {}
      private sitesettings = inject(SitesettingsService);
      settings: any[] = []; 

  ngOnInit() {
    this.cmsService.getHomeSection3Content().subscribe(data => {
      this.homeSection3 = data;
    });
 
  }

  ngAfterViewInit(): void {
    this.sitesettings.fetchSiteSettings().
    subscribe((settings:any) => {
   
   // console.log('this', this.constructor.name);

   this.settings = settings;
 
   if(settings[2].value != ''){
       const gaCode = settings[2].value; // Assuming response contains GA code
      
       // Delay Google Analytics loading to improve performance
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => this.injectGAScript(gaCode));
    } else {
      setTimeout(() =>  this.injectGAScript(gaCode), 2000); // fallback
    }
   }
  
  });
    
  }
  injectGAScript(scriptCode: string): void {
    // Create a temporary DOM element to parse the scriptCode
    const tempDiv = this.renderer.createElement('div');
    tempDiv.innerHTML = scriptCode;

    // Find all <script> tags in the returned scriptCode
    const scriptElements = tempDiv.getElementsByTagName('script');

    for (let i = 0; i < scriptElements.length; i++) {
      const scriptElement = scriptElements[i];

      if (scriptElement.src) {
        // If the script tag has a src attribute (external script)
        const externalScript = this.renderer.createElement('script');
        this.renderer.setAttribute(externalScript, 'src', scriptElement.src);
        this.renderer.setAttribute(externalScript, 'async', 'true');
        this.renderer.appendChild(this.document.head, externalScript);
      } else {
        // If the script is an inline script
        const inlineScript = this.renderer.createElement('script');
        inlineScript.type = 'text/javascript';
        inlineScript.text = scriptElement.text;
        this.renderer.appendChild(this.document.head, inlineScript);
      }
    }
  }
  loadGtag() {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0K5FGDY6000'; // Replace with your GA4 ID
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-0K5FGDY66Y'); // Replace with your GA4 ID
    };
  }
}
