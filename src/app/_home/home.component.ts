import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Penalty } from '../_interface/penalty';
import { User } from '../_interface/user';
import { PenaltyService } from '../_service/penalty.service';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  allUser: User[];
  penalties: Penalty[];
  constructor(private userService: UserService,
              private penaltyService: PenaltyService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getLocalUserData();
    this.getAllUser();
    this.getAllPenalties();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe(
      (data:any) => {
        console.log(data);
        this.allUser = data;
        for(let u of this.allUser){
          if(this.user.username == u.username){
            this.user = u;
            this.userService.setLocalUserData(this.user);
            break;
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getAllPenalties(){
    this.penaltyService.getAllPenalties().subscribe(
      (data:any) => {
        console.log(data);
        this.penalties = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  submitPen(){
    let value = (<HTMLSelectElement>document.getElementById("penalties")).selectedIndex;
    let username = (<HTMLSelectElement>document.getElementById("allUser")).value;
    /*
    var sel = element.selectedIndex;
    var opt = element.options[sel];
    var value = (<HTMLOptionElement>opt).value;
    */
    console.log(username + ": " + this.penalties[value].value + "€");
    this.penaltyService.submitPen(username,value).subscribe(
      (data:any) => {
        this.getMyUser();
      }
    );
  }

  clearBalance(){
    this.penaltyService.clearPens(this.user.username).subscribe(
      (data:any) => {
        this.getMyUser();
      }
    );
  }

  getMyUser(){
    this.userService.getMyUser(this.user.username).subscribe(
      (data:any) => {
        this.user = data;
      }
    )
  }

  logout(){
    this.router.navigateByUrl("/")
  }

}
