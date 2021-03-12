import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helloapp';  
  response = null

  constructor(private http: HttpClient){
    this.http.get('http://3.142.125.49/api/classname',{responseType:'text'}).subscribe((res:any)=>{
      this.response = res;
    })
  }
}

