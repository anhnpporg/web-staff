import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './../../../core/services/user/user.service';
import { PROFILE } from './../../../core/utils/AppConfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.css']
})
export class ProfileTemplateComponent implements OnInit {

  profile: any
  tempProfile: any = localStorage.getItem(PROFILE)
  emailAddressRecovery: string = ''
  phoneNumber: string = ''

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.profile = JSON.parse(this.tempProfile)
    this.userService.getProfile().subscribe((result) => {
      console.log(result);
      this.profile = result
      this.phoneNumber = this.profile.phoneNumber
      this.emailAddressRecovery = this.profile.email
    })
  }


  updateProfile() {

    var formData = new FormData()

    if (this.phoneNumber != this.profile.phoneNumber || this.emailAddressRecovery != this.profile.email) {
      if (this.phoneNumber == null) {
        this.phoneNumber = ''
      } else if (this.emailAddressRecovery == null) {
        this.emailAddressRecovery = ''
      }
      formData.append('emailAddressRecovery', this.emailAddressRecovery)
      formData.append('phoneNumber', this.phoneNumber)

      this.userService.updateProfile(formData).subscribe((result) => {
        console.log(result);
        this.notification.create(
          'success',
          'Thành công',
          'Cập nhật nhân viên thành công'
        );
      })


    } else {
      this.notification.create(
        'error',
        'Lỗi',
        'Vui lòng nhập thông tin cần thay đổi'
      );

    }

  }


}
