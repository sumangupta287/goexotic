import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'GoExotic' });
  }

  /** Update the title tag */
  updateTitle(title: string): void {
    console.log(title);
      if (title && title.trim() !== '') {
    this.titleService.setTitle(title.trim());
      }
    else{
            this.titleService.setTitle('Best Pre Owned Luxury Car Dealers- Go Exotic');

    }

  }

  /** Update meta and canonical tags */
  updateMetaTags(metaData: { description?: string; keywords?: string; author?: string; canonical_tag?: string; ogurl?: string; ogimage?: string; ogimagealt?: string }): void {
  
    if (metaData.description) {
      this.metaService.updateTag({ name: 'description', content: metaData.description });
      this.metaService.updateTag({ property: 'og:description', content: metaData.description });
    }
    else{
      this.metaService.updateTag({ name: 'description', content: 'Discover a premium selection of used luxury cars including Audi, BMW, Mercedes-Benz, Lamborghini, Rolls-Royce, Porsche, and Ford Mustang. Available across, Gurgaon, Mumbai, Chennai and Kochi' });
      this.metaService.updateTag({ property: 'og:description', content: 'Discover a premium selection of used luxury cars including Audi, BMW, Mercedes-Benz, Lamborghini, Rolls-Royce, Porsche, and Ford Mustang. Available across, Gurgaon, Mumbai, Chennai and Kochi'});
    }
    
    if (metaData.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: metaData.keywords });
    }
    else {
      this.metaService.updateTag({ name: 'keywords', content: 'Shop Best Used Luxury Cars' });
    }

    if (metaData.author) {
      this.metaService.updateTag({ name: 'author', content: metaData.author });                 
      this.metaService.updateTag({ name: 'title', content: metaData.author });                 
      this.metaService.updateTag({ name: 'og:title',property: 'og:title', content: metaData.author });
    }
    else{
      this.metaService.updateTag({ name: 'author', content: 'Best Pre Owned Luxury Car Dealers- Go Exotic' });                 
      this.metaService.updateTag({ name: 'title', content: 'Best Pre Owned Luxury Car Dealers- Go Exotic' });                 
      this.metaService.updateTag({ name: 'og:title',property: 'og:title', content: 'Best Pre Owned Luxury Car Dealers- Go Exotic' });
    }

    if (metaData.canonical_tag) {
      this.setCanonicalURL(metaData.canonical_tag);
    }
    else{
      this.setCanonicalURL('https://www.goexotic.co/');
    }

    if (metaData.ogurl) {                
      this.metaService.updateTag({ name: 'og:url',property: 'og:url', content: metaData.ogurl });
    }
    else{
      this.metaService.updateTag({ name: 'og:url',property: 'og:url', content: 'https://www.goexotic.co/' });
    }

    if (metaData.ogimage) {                
      this.metaService.updateTag({ name: 'og:image',property: 'og:image', content: metaData.ogimage });
    }
    else{
      this.metaService.updateTag({ name: 'og:image',property: 'og:image', content: 'https://www.goexotic.co/assets/img/logo-light.png' });
    }

    if (metaData.ogimagealt) {                
      this.metaService.updateTag({ name: 'og:imagealt',property: 'og:imagealt', content: metaData.ogimagealt });
    }
    else{
      this.metaService.updateTag({ name: 'og:imagealt', property: 'og:imagealt',content: 'GoExotic' });
    }
  }

  /** Set or update canonical tag */
  private setCanonicalURL(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector(`link[rel='canonical']`);
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
