import { Component, OnInit } from '@angular/core';
import { searchService } from '../../../app.search';
import {Router} from "@angular/router";
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  findfriend : string;

  constructor(private search : searchService, private router:Router, private findfrnd : AppService) {
    
   }

  ngOnInit() {
    // if(!this.search.data){
    //   console.log(this.search.data);
    // }
    // else{
    //   this.search.data = 'shaik';
    // }
    console.log(this.search.data);
  }
  findFriend(){
    console.log(this.findfriend);
    this.findfrnd.url = "http://localhost:3030/search/58ab220b4168f80c18835511";
    console.log(this.findfrnd.url)
    this.findfrnd.data = {username : this.findfriend};
    this.findfrnd.postService().subscribe(response => {
      console.log(response);
      this.search.friend = response.json().data;
      this.router.navigate(["profile/friendprofile"]);
    })
    
  }
}
