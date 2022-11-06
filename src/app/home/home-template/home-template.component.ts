import { PROFILE } from './../../core/utils/AppConfig';
import { UserService } from './../../core/services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.css']
})
export class HomeTemplateComponent implements OnInit {

  avatar: string = ''
  fullname: string = ''

  constructor(
    private route: Router,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.user.getProfile().subscribe((result) => {
      // console.log(result);
      localStorage.setItem(PROFILE, JSON.stringify(result))
      this.avatar = result.avatar
      this.fullname = result.fullname
    })
  }

  logout() {
    localStorage.clear()
    this.route.navigate([''])
  }

}
