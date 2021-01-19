import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_interface/user';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form:FormGroup;
  user: User;

  constructor(private authService: AuthService, private fb:FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['',Validators.required]
  });}

  ngOnInit(): void {
  }

  register(){
    const val = this.form.value;
    if (val.username && val.password && val.passwordConfirm) {

      this.authService.register(val.username, val.password, val.passwordConfirm)
        .subscribe(
          (data: any) => {
            this.userService.setLocalUserData(this.user);
            this.router.navigateByUrl('/home');
          },
          (error:any) => {
            let element: HTMLElement = document.getElementById('wrong-text');
            element.textContent = 'Data isn\'t fitting requirements!';
            console.log(error);
          }
        );
    }
  }

  goToLogin(){
    this.router.navigateByUrl('/');
  }

}
