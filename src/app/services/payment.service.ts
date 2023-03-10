import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl ='https://localhost:7103/api/';
  constructor(private httpClient:HttpClient) { }

  pay(payment:Payment):Observable<ResponseModel>
  {
    let newPath = this.apiUrl +'Payments/pay';
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }

}
