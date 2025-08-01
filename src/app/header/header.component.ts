import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Pipe, Renderer2, inject } from '@angular/core';
import { SitesettingsService } from '../sitesettings.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document, private seoService: SeoService
  ) {}
  private sitesettings = inject(SitesettingsService);
  settings: any[] = []; 
  metadataA : any ;
  ngOnInit(): void {
    this.fetchSiteSettings();
   }
 
   fetchSiteSettings(){
     this.sitesettings.fetchSiteSettings().
     subscribe((settings:any) => {
    
    // console.log('this', this.constructor.name);

    this.settings = settings;
            this.seoService.updateTitle( settings[14].value );

    this.seoService.updateMetaTags({
      description:settings[16].value,
      keywords: settings[15].value,
      author: settings[14].value 
    });
    if(settings[2].value != ''){
        const gaCode = settings[2].value; // Assuming response contains GA code
       // this.injectGAScript(gaCode);
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
}
