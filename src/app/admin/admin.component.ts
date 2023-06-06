import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../notes/notes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatCardLgImage } from '@angular/material/card';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  username: string="";
  entries: Note[];
  data:any;
  id:number=1;
  json:any;
  users:any;
  adminForm:FormGroup;
  constructor(private router:Router, private notesService: NotesService,private route: ActivatedRoute,private fb:FormBuilder,private userService:UserService) {
    this.entries = [];
    this.data= [];
    this.users= [];
    this.adminForm =  fb.group({
      title:['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.minLength(5)])],
      text:['',Validators.compose([Validators.required,Validators.maxLength(300),Validators.minLength(5)])]

    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = 'Admin';
      // Use the 'noteValue' in your component logic
    });// Replace with the desired username
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes()
      .subscribe(
        (response:any) => {
          console.log("username "+this.username)
          this.entries = response;

         for(let note of response){
          if(note.entries){
            const json =[];
            for(let k=0; k< note.entries.length; k++){
              
              if(note.entries[k] == 0){
                continue;
              }
              else{ 
                console.log(note.entries[k]);
                json.push(note.entries[k]);
              }
            }
            
            console.log("json");
            console.log(json);
            this.users.push(note.username);
            this.data.push(json);
            console.log("user: ",note.username);
          
          }
         }
         console.log("x");
         for(let x of this.data){
          for(let item of x){
          console.log(item.title);
          console.log(item.text);
         }
         console.log("--------");
        }
        },
        error => {
          console.error(error);
        }
      );
  }
  routetologin(){
    this.router.navigate(["login"]);
  }
  routetonotes(){
    this.router.navigate(["note","admin"]);
  }
}
