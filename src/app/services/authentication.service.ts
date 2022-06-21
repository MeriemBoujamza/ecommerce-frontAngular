import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private users = [
    { username: 'admin', password: '1234', roles: ['USER', 'ADMIN'] },
    { username: 'user1', password: '1234', roles: ['USER'] },
    { username: 'user2', password: '1234', roles: ['USER'] },
  ];
  public host: string = 'https://localhost:8443';
  public authenticated: boolean;
  public authenticatedUser;
  constructor(private http: HttpClient) {}



  login(username: string, password: string) {
    let user;
    this.users.forEach((u) => {
      if (u.username === username && u.password === password) {
        user = u;
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
}
