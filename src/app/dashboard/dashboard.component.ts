import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

interface FileUpload{
  file: File | null;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  
  username: string = '';
  cid:number=0;
  sid:number=0;
  file: File | null = null;


  constructor(private authService: AuthService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
    this.authService.getCustomerId().subscribe(customerId => {
      this.cid = customerId;
    });
  }

  logout() {
    let bodyData = {
      customerUsername: this.username,
      customerId:this.cid
  
    };

    this.http.post("http://localhost:8080/api/v1/users/logout",bodyData).subscribe((resultData: any)=>
    {      
      if(resultData.message == "Logout Successfully")
      {
        alert("Logout is  successful");
         this.router.navigateByUrl('/logout');
         
      }
      else{
        alert("Logout is  failed..!");
      }
      
    });
   }


fileUploads: FileUpload[] = Array.from({ length: 5 }, () => ({
    file: null, type: ''
}));




onFileSelected(event: Event, index: number) {
  const element = event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  if (fileList) {
    const file: File = fileList[0];
    this.fileUploads[index].file = file;

  }
}

onTypeSelected(Type: string, index: number) {
 
  this.fileUploads[index].type = Type;
  
}

isTypeSelected(type: string): boolean {
  return this.fileUploads.some(fu => fu.type === type);
}
availableTypes = ['ID/DL',
'Photo',
'Signature',
'Rent Agreement',
'Wi-fi bill'];

getAvailableTypes(index: number): string[] {
  const selectedTypes = this.fileUploads.map(fu => fu.type);
  return this.availableTypes.filter(type => !selectedTypes.includes(type) || this.fileUploads[index].type === type);
}



uploadFiles(files: File, customerId: number,sid:number): Observable<any> {
  const formData: FormData = new FormData();
  
      formData.append('file', files);

      formData.append('customerId', customerId.toString());
      formData.append('sid', sid.toString());
      
  // Remove customerId if it's managed on the backend side
  return this.http.post("http://localhost:8080/api/v1/users/uploadFile", formData, {
    reportProgress: true,
    responseType: 'text'
  });
}
  

onSubmit() {

  
    const filesToUpload = this.fileUploads.map(fu => fu.file).filter(file => file !== null);
    
    filesToUpload.forEach(file => {
      if (file) { // This check is to satisfy TypeScript's type checking
        this.uploadFiles(file,this.cid,this.sid).subscribe(
          (response: any) => {
            console.log('Upload successful', response);
            this.sid++;
            // Handle successful upload here, e.g., update UI or show a success message
          },
          (error: any) => {
            console.error('Error during file upload:', error);
            // Handle upload error here, e.g., show an error message
          }
        );
      }
    });
  } 


  

}