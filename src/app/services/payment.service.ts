import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private urlBase = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}





}
