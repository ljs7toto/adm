import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import{ User } from './models/user';
import{ UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users : User[];

  constructor(private service : UserService ){}

  // constructor(private http : Http){}

  ngOnInit() {
    this.service.getUsers()
    .subscribe(users => this.users = users
      //  err => {

      //  }
      
      );

    // //grab users
    // this.http.get('https://reqres.in/api/users')
    // .map(res => res.json().data)
    // .subscribe(users => this.users = users);

    // this.http.get('https://reqres.in/api/users')
    // .toPromise()
    // .then(data => {
    //     console.log(data);
        
    // });
  }

}
