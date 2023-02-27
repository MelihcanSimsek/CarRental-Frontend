import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:7103/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+'Cars/getcardetails';
     return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +'Cars/getcardetailsbycolor?colorId='+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
 }

 getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl +'Cars/getcardetailsbybrand?brandId='+brandId;
  return this.httpClient.get<ListResponseModel<Car>>(newPath);
}

}
 