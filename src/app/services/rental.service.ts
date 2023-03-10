import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';



@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:7103/api/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'Rentals/getrentaldetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  rulesForAdding(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Rentals/rulesforadding';
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  addRental(rental:Rental):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + 'Rentals/add';
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
