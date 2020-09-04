import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlbase: string = 'http://localhost:3001/users';
  loggedObservable: BehaviorSubject<boolean>;
  logged: boolean = false;
  userLogged;

  constructor(private http: HttpClient) {
    this.loggedObservable = new BehaviorSubject<boolean>(this.logged);
    this.verifyLogged();
  }

  async login(user: { email: string; password: string }) {
    const body = user;
    const resp: any = await this.http
      .post(`${this.urlbase}/login`, body)
      .toPromise();

    if (resp.ok) this.setToken(resp.token);
    this.verifyLogged();
    return resp;
  }

  async verifyLogged() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token);
    try {
      const resp: any = await this.http
        .get(`${this.urlbase}/logged`, {
          headers,
        })
        .toPromise();
      this.loggedObservable.next(resp.ok);
      this.setUser(resp.user);
      return { ok: resp.ok, user: resp.user };
    } catch (error) {
      this.loggedObservable.next(false);
      return { ok: false };
    }
  }

  async registerUser(user: { email: string; password: string }) {
    try {
      const resp: any = await this.http
        .post(`${this.urlbase}/register`, user)
        .toPromise();
      return resp;
    } catch (error) {
      return { ok: false, error };
    }
  }

  async checkRegister(registerToken) {
    const headers = new HttpHeaders().set('token', registerToken);
    try {
      const resp: any = await this.http
        .get(`${this.urlbase}/checkregister`, {
          headers,
        })
        .toPromise();

      return resp;
    } catch (error) {
      return { ok: false };
    }
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  private setUser(user) {
    const userAux = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    this.userLogged = userAux;
  }
}
