import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
getdetail;
  constructor(private profile:AppService) { }

  ngOnInit() {
    this.profile.url="http://localhost:3030/userprofile";
    this.profile.getService().subscribe(response => {
      console.log(response);
        this.getdetail = response.json();
        console.log(this.getdetail);
    });
    
  }

}
