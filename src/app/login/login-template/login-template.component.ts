import { Router, Routes } from '@angular/router';
import { ACCESSTOKEN } from './../../core/utils/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DOMAIN } from 'src/app/core/utils/AppConfig';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent implements OnInit {

  username: string = ''
  password: string = ''
  token: string = ''

  constructor(
    private httpclient: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    var formData = new FormData()
    formData.append('username', this.username)
    formData.append('password', this.password)
    this.httpclient.post(DOMAIN + 'auth/user/login', formData).subscribe((result: any) => {
      if (result.accessToken) {
        if (result.isAdmin == false) {
          this.token = `Bearer ${result.accessToken}`
          localStorage.setItem(ACCESSTOKEN, this.token)
          if (localStorage.getItem(ACCESSTOKEN)) {
            this.route.navigate(['home'])
          }
        }
      }
    })
  }

}
