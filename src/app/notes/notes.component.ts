import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from './notes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  username: string="";
  entries: Note[];
  data:any;
  id:number=1;
  json:any;
  noteForm:FormGroup;
  constructor(private router:Router, private notesService: NotesService,private route: ActivatedRoute,private fb:FormBuilder,private userService:UserService) {
    this.entries = [];
    this.data= [];
    this.noteForm =  fb.group({
      title:['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.minLength(5)])],
      text:['',Validators.compose([Validators.required,Validators.maxLength(300),Validators.minLength(5)])]

    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['note'];
      // Use the 'noteValue' in your component logic
    });// Replace with the desired username
    this.fetchEntriesByUsername();
  }

  fetchEntriesByUsername(): void {
    this.notesService.getEntriesByUsername(this.username)
      .subscribe(
        response => {
          console.log("username "+this.username)
          this.entries = response;
          console.log(this.entries[0].entries);
          this.data = this.entries[0].entries;
          for(let dt of this.data){
            console.log(dt.text);
            console.log(dt.title);
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  addNote(noteForm:FormGroup): void {
    console.log("title: "+this.noteForm.value.title);
    console.log("text: "+this.noteForm.value.text);
    this.data.push(this.noteForm.value);
    this.userService.getUserByUsername(this.username).subscribe(
      (response:any) => {
        this.json = response;
        if (response && response.length > 0) {
          this.id = response[0].id;
          this.json[0].entries.push({title: this.noteForm.value.title, text: this.noteForm.value.text })
          let datajson = {
            "id":this.id,
            "username": this.json[0].username,
            "password": this.json[0].password,
            "entries": this.json[0].entries
          }

          this.userService.addNoteToUser(this.id, datajson).subscribe(
              response1 => {
                console.log('Note added successfully:', response1);
              },
              error => {
                console.error('Error adding note:', error);
              }
            );
        
        
        } else {
          console.log('Username available.');
        }
      },
      error => {
        console.error('Error checking username:', error);
      }
    );



    // this.userService.addNoteToUser(this.id, note).subscribe(
    //   response => {
    //     console.log('Note added successfully:', response);
    //   },
    //   error => {
    //     console.error('Error adding note:', error);
    //   }
    // );
  }

  get title(){
    return this.noteForm.get('title')
  }
  get text(){
    return this.noteForm.get('text')
  }
  routetologin(){
    this.router.navigate(["login"]);
  }
}
