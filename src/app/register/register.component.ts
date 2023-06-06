import { Component } from '@angular/core';
import { RegUser } from './RegUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  hide1 = true;
  data: any;
  uObj:RegUser;
  regForm:FormGroup;
  isUsernameExists: boolean = false;
  isSubmitClicked: boolean = false;
  isPassword: boolean = false;
  RegList:RegUser[];
  constructor(private fb:FormBuilder, private router:Router,private userService: UserService)
  {
    this.uObj = new RegUser();
    this.RegList =[];
    this.regForm =  fb.group({

      uname:['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.minLength(5)])],
      upass:['',Validators.compose([Validators.required,Validators.maxLength(300),Validators.minLength(5)])],
      confirmPassword:['',Validators.compose([Validators.required,Validators.maxLength(300),Validators.minLength(5)])]

    })
}


userRegister(regForm:FormGroup)
  {
    this.uObj = new RegUser();
    this.uObj = regForm.value;
    console.log("Rewritten password: ",this.uObj.confirmPassword);
    console.log("uObj: ",this.uObj.upass);
    if(this.uObj.upass == this.uObj.confirmPassword){
      this.isPassword =false;
      this.userService.addUser(this.uObj.uname, this.uObj.upass).subscribe(
        response => {
          console.log('User added successfully:', response);
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
      this.router.navigate(["login"])
    }else{
      this.isPassword =true;
    }
  }
  

  get uname(){
    return this.regForm.get('uname')
  }
  get upass(){
    return this.regForm.get('upass')
  }
}
