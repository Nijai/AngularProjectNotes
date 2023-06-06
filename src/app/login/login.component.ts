import { Component } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data: any;
  uObj:User;
  user:User;
  isUsernameExists: boolean = false;
  isSubmitClicked: boolean = false;
  iswrongPassword: boolean = false;

  constructor(private router:Router, private userService:UserService)
  {
    this.uObj = new User();
    this.user = new User();
  }

  userLogin(loginForm:NgForm)
  {  
    this.uObj = loginForm.value;
    this.userService.getUsers().subscribe(
      (response:any) => {
        const users = response;
        const foundUser = users.find((user: any) => user.username === this.uObj.uname);
        if (foundUser) {
          if(this.uObj.uname=='admin'){
            const foundPass = users.find((user: any) => user.password === this.uObj.upass);
            if(foundPass){
              this.router.navigate(["admin"]);
            }
            
          }
          else{
          console.log('Username exists.');
          const foundPass = users.find((user: any) => user.password === this.uObj.upass);
          if(foundPass){
            console.log("Everything matched! Moving ahead");
            this.router.navigate(["note",this.uObj.uname]);
          }else{
            console.log("wrong Password.")
          }
        }
        
        } else {
          console.log('Username does not exist.');
          this.router.navigate(["register"]);
        }
      },
      err => {
        console.error('Error retrieving users:', err);
      }
    );


    
  }


}
