import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  successMessage : string ='';
  errorMessage : string ='';

  constructor(private service:UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    // grab the user
    let id = this.route.snapshot.params['id'];
    this.service.getUser(id).subscribe(user => this.user = user);
  }

  // update 
  updateUser(){
    this.successMessage ='';
    this.errorMessage = '';

    this.service.updateUser(this.user)
    .subscribe(
      user =>{
      this.successMessage = 'User was updated'
       console.log('user was updated');
    },
      err =>{
        this.errorMessage = 'User could not be updated'
        console.log('err');
      }
    );
  }
}
