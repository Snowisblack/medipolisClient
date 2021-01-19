import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_interface/user';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  user: User;

  constructor(private authService: AuthService, private fb:FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });}

  ngOnInit(): void {
  }

  login(){
    const val = this.form.value;
    if (val.username && val.password) {

      this.authService.login(val.username, val.password)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.user = data;
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

  goToRegister(){
    this.router.navigateByUrl('/registration');
  }

}
