import { Component, inject } from '@angular/core';
import { SitesettingsService } from '../sitesettings.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  
  private sitesettings = inject(SitesettingsService);
  settings: any[] = []; 
  isSubmit : any = 'true';
  ngOnInit(): void {
    this.fetchSiteSettings();
   }
 
   fetchSiteSettings(){
     this.sitesettings.fetchSiteSettings().
     subscribe((settings:any) => {

    this.settings = settings;
    
    console.log(settings);
   });
  }

  submitDeatils(formvalue:NgForm){
    console.log(formvalue.value);
  
    if(formvalue.valid){
      this.isSubmit = 'false';
    this.sitesettings.submitConatctUsForm(formvalue.value).subscribe((response)=>{
       console.log(response);
      
 
     });
    }
    
  }

}
