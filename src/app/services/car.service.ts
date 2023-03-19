import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:7103/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+'Cars/getcardetails';
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl +'Cars/getcardetailsbycolor?colorId='+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
 }

 getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath = this.apiUrl +'Cars/getcardetailsbybrand?brandId='+brandId;
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}
getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>
{
  let newPath=this.apiUrl+'Cars/getcardetailsbybrandandcolor?brandId='+brandId+'&colorId='+colorId;
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}

add(car:Car):Observable<ResponseModel>
{
  let newPath = this.apiUrl +'Cars/add';
 return this.httpClient.post<ResponseModel>(newPath,car);
}

update(car:Car):Observable<ResponseModel>
{
  let newPath = this.apiUrl +'Cars/update';
  return this.httpClient.post<ResponseModel>(newPath,car);
}

delete(car:Car):Observable<ResponseModel>
{
  let newPath = this.apiUrl +'Cars/delete';
  return this.httpClient.post<ResponseModel>(newPath,car);
}
}
 