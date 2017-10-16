import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';

@Injectable()
export class UserService{
    private usersUrl :string = 'https://reqres.in/api/users';
   
    // observable source
    private userCreatedSource = new Subject<User>();
    private userDeletedSource = new Subject();

    // observable stream
    userCreated$ = this.userCreatedSource.asObservable();
    userDeleted$ = this.userDeletedSource.asObservable();

    constructor(private http : Http){}
    
    // grab all users

    getUsers():Observable<User[]>{
        return this.http.get(this.usersUrl)
        .map(res => res.json().data)
        .map(users => users.map(this.toUser))
        .catch(this.handleError);
        // reformat to match our user class(이름을 변경해서) 47번 이랑 같은 것
        //    {return users.map(user => {
        //         return{
        //             id:user.id,
        //             name : `${user.first_name} ${user.last_name}`,
        //             username : user.first_name,
        //             avatar : user.avatar 
        //         };
        //     });
        // })     
    }
    
    // get a single user
    getUser(id:number):Observable<User> {
        return this.http.get(`${this.usersUrl}/${id}`)
        .map(res => res.json().data)
        .map(this.toUser)
        .catch(this.handleError);
    }

    // create a user
    createUser(user: User): Observable<User>{
        return this.http.post(`${this.usersUrl}`, user)
            .map(res => res.json())
            .do(user => this.userCreated(user))
            .catch(this.handleError);
    }

    // update a user
    updateUser(user: User): Observable<User>{
        return this.http.put(`${this.usersUrl}/${user.id}`, user)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // delete a user
    deleteUser(id:number): Observable<any> {
        return this.http.delete(`${this.usersUrl}/${id}`)
        .do(res => this.userDeleted())
        .catch(this.handleError);
    }

    /**
     * the user was created. Add this info to our stream
     */
    userCreated(user: User){
        console.log('user has been created');
        this.userCreatedSource.next(user);
    }

    /**
     * the user was deleted. Add this info to our stream
     */
    userDeleted(){
        console.log('user has been deleted');
        this.userDeletedSource.next();
    }

    /*
    * convert user info from the API to our standard/format
    */
    private toUser(user): User {
        return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            username: user.first_name,
            avatar: user.avatar
        };
    }

    /*Handle any errors from the API*/
    private handleError(err){
         let errMessage : string;

            if (err instanceof Response){
                let body = err.json() || '';
                let error = body.error || JSON.stringify(body);
                errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
            } else{
                errMessage = err.message ? err.message : err.toString();
            }

            return Observable.throw(errMessage);

    }
}