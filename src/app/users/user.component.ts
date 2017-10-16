import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  successMessage: string = '';
  errorMessage : string = '';

  constructor(private service: UserService) { }

  ngOnInit() {
    // user has been created
    this.service.userCreated$.subscribe(user => {
      this.successMessage = `${user.name} has been created!`;
      this.clearMessges();
    });

    // user has been deleted
    this.service.userDeleted$.subscribe(() => {
      this.successMessage = `The user has been deleted!`;
      this.clearMessges();
    });
  }

   // clear all message after 5 seconds
  clearMessges(){
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
