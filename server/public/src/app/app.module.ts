import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes,RouterModule} from '@angular/router';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/homecomponent/signup/signup.component';
import { SigninComponent } from './components/homecomponent/signin/signin.component';
import { HomeComponent } from './components/homecomponent/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/profile/header/header.component';
import { UserprofileComponent } from './components/profile/userprofile/userprofile.component';
import { SidebarComponent } from './components/profile/sidebar/sidebar.component';
import { PostsComponent } from './components/profile/posts/posts.component';
import { EditprofileComponent } from './components/profile/editprofile/editprofile.component';
import { NotfoundComponent } from './components/profile/notfound/notfound.component';
import { AppService } from './app.service';
import { searchService } from './app.search';
import { FriendProfileComponent } from './components/profile/friend-profile/friend-profile.component';
import { FriendslistComponent } from './components/profile/friendslist/friendslist.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ProfileComponent,
    HeaderComponent,
    UserprofileComponent,
    SidebarComponent,
    PostsComponent,
    EditprofileComponent,
    NotfoundComponent,
    FriendProfileComponent,
    FriendslistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AppService, searchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

