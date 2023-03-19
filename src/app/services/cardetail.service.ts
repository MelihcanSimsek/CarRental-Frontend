import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {

  apiUrl='https://localhost:7103/api/'
  constructor(private httpClient:HttpClient) { }
  
  getCar(carId:number):Observable<ListResponseModel<CarDetail>>
  {
      let newPath = this.apiUrl+ 'Cars/getcardetailsbyid?id='+carId;
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
