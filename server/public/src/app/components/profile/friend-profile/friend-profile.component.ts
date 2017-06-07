import { Component, OnInit } from '@angular/core';
import { searchService } from '../../../app.search';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.css']
})
export class FriendProfileComponent implements OnInit {
  searchedfriend : any;
  constructor(private search : searchService, private appservice : AppService) { }

  ngOnInit() {
    console.log(this.search.data);
    this.appservice.url = 'http://localhost:3030/search';
    console.log(this.search.friend);
    this.searchedfriend = this.search.friend[0];
    // this.appservice.getService().subscribe(response, {
    //   console.log(response);
    // })
  }

}
