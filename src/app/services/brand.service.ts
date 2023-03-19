import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrL='https://localhost:7103/api/';
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrL + 'Brands/getall';
     return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }


  add(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrL +'Brands/add';
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  getBrand(brandId:number):Observable<SingleResponseModel<Brand>>
  {
    let newPath = this.apiUrL + 'Brands/getbyid?id='+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  update(brand:Brand):Observable<ResponseModel>
  {
    let newPath= this.apiUrL + 'Brands/update';
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  delete(brand:Brand):Observable<ResponseModel>
  {
    let newPath= this.apiUrL + 'Brands/delete';
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
