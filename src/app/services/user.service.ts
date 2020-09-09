import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlbase: string = 'http://localhost:3001/users';
  loggedObservable: BehaviorSubject<boolean>;
  adminObservable: BehaviorSubject<boolean>;
  logged: boolean = false;
  admin: boolean = false;
  private userLogged: User;

  constructor(private http: HttpClient) {
    this.loggedObservable = new BehaviorSubject<boolean>(this.logged);
    this.adminObservable = new BehaviorSubject<boolean>(this.admin);
    this.verifyLogged();
  }

  get user() {
    return this.userLogged;
  }

  cleanUser(user) {
    this.userLogged = user;
  }

  async login(user: { email: string; password: string }) {
    const body = user;
    const resp: any = await this.http
      .post(`${this.urlbase}/login`, body)
      .toPromise();

    if (resp.ok) this.setToken(resp.token);
    this.verifyLogged();
    this.verifyRole();
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
      this.userLogged = resp.user;
      this.verifyRole();

      return { ok: resp.ok, user: resp.user };
    } catch (error) {
      this.loggedObservable.next(false);
      return { ok: false };
    }
  }

  async verifyRole() {
    if (this.userLogged === undefined) this.adminObservable.next(false);
    if (this.userLogged.role === 'ADMIN_ROLE') this.adminObservable.next(true);
    else this.adminObservable.next(false);
  }

  async registerUser(user: {
    name: string;
    address: string;
    email: string;
    password: string;
  }) {
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
}

interface User {
  id: number;
  name: string;
  addr: string;
  role: string;
}
