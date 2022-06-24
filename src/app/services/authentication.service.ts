import { CatalogueService } from './../catalogue.service';
import { CaddyService } from './caddy.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService  {
  private users;
  // = [
  //   { username: 'admin', password: '1234', roles: ['USER', 'ADMIN'] },
  //   { username: 'user1', password: '1234', roles: ['USER'] },
  //   { username: 'user2', password: '1234', roles: ['USER'] },
  // ];
  public users2;
  public host: string = 'https://localhost:8443';
  public authenticated: boolean;
  public authenticatedUser;
  public token;
  constructor(private http: HttpClient, private catService:CatalogueService) {
    this.users=this.getUsers();
  }
 

  login(username: string, password: string) {
    let user;
    this.users.forEach((u) => {
      if (u.username === username && u.password === password) {
        user = u;
        this.token = { username: u.username, roles: u.roles };
      }
    });
    if (user) {
      this.authenticated = true;
      this.authenticatedUser = user;
      localStorage.setItem(
        'authenticatedUser',
        JSON.stringify(this.authenticatedUser)
      );
    } else {
      this.authenticated = false;
      this.authenticatedUser = undefined;
    }
  }

  loadUser() {
    let user = localStorage.getItem('authenticatedUser');
    if (user) {
      this.authenticatedUser = JSON.parse(user);
      this.authenticated = true;
    }
  }

  isAdmin() {
    if (this.authenticatedUser) {
      return this.authenticatedUser.roles.indexOf('ADMIN') > -1;
    } else return false;
  }

  logout() {
    this.authenticated = false;
    this.authenticatedUser = undefined;
    localStorage.removeItem('authenticatedUser');
  }

  public saveAuthenticatedUser() {
    if (this.authenticatedUser) {
      localStorage.setItem('authToken', JSON.stringify(this.token)); //u can add btao to encode  the string
    }
  }

  public getUsers(){
    this.catService.getResource('/users').subscribe(
      (data) => {
        this.users2 = data;
        this.users = this.users2._embedded.users;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
