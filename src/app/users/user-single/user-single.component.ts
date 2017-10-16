import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.css']
})
export class UserSingleComponent implements OnInit {
  user: User;
  constructor(private route : ActivatedRoute, private service : UserService, private router : Router ) { }
  
  // grab the id from the url
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    
  // use the userservice to getUser()
     this.service.getUser(id)
     .subscribe(user => this.user = user);
  }

  deleteUser(){
    this.service.deleteUser(this.user.id)
      .subscribe(data => {
        console.log('user was deleted');
        //route back to the users page
        this.router.navigate(['/users']);
      });
  }


}
