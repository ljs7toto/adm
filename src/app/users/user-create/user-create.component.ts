import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User = {name:'', username:'', avatar:''};
  successMessage : string ='';
  errorMessage : string ='';

  constructor(private service:UserService, private router:Router) { }

  ngOnInit() {
    
  }

  /** create a user */

  // update 
  createUser(){
    this.successMessage ='';
    this.errorMessage = '';

    this.service.createUser(this.user)
    .subscribe(
      user =>{
      this.successMessage = 'User was created';
       
      // navigate back to the users page
        this.router.navigate(['/users']);
    })
  }
}
