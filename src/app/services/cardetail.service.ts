import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CardetailService {

  apiUrl='https://localhost:7103/api/'
  constructor(private httpClient:HttpClient) { }
  
  getCar(carId:number):Observable<ListResponseModel<Car>>
  {
      let newPath = this.apiUrl+ 'Cars/getcardetailsbyid?id='+carId;
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
