import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserModel } from '../models/userModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7103/api/';
  user:UserModel;
  constructor(
    private httpClient:HttpClient,
    private localStorageSevice:LocalStorageService,
    private jwtHelperService:JwtHelperService) { }
    
  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>
  {
    let newPath = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>
  {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  isAuthenticated(){
    if(this.localStorageSevice.getItem('token'))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  decodeToken(token:any)
  {
    return this.jwtHelperService.decodeToken(token);
  }

  signedIn()
  {
    if(this.localStorageSevice.getItem('token'))
    {
      return this.jwtHelperService.isTokenExpired(this.localStorageSevice.getItem('token'));
    }
    else
    {
      return false;
    }
  }


  loggedIn(){
    
    return this.jwtHelperService.isTokenExpired(this.localStorageSevice.getItem('token'));
}

  getUserInfo(){
    let decodedToken = this.decodeToken(this.localStorageSevice.getItem('token'));
    if(decodedToken)
    {
      if(!this.loggedIn())
      {
        let tokenInfoName = Object.keys(decodedToken).filter(x=>x.endsWith("/name"))[0];
        var splitted = String(decodedToken[tokenInfoName]).split(" ");
        let firstName = splitted[0];
        let lastName = splitted[1];

        let tokenInfoId = Object.keys(decodedToken).filter(x=>x.endsWith("/nameidentifier"))[0];
        let userId =Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(x=>x.endsWith("/role"))[0];
        let roles = decodedToken[claimInfo];
        
        let emailInfo = decodedToken.email;

        this.user = {
          id:userId,
          firstName:firstName,
          lastName:lastName,
          email:emailInfo,
          roles:roles
        }

       
        
      }
    }
    return this.user;



  }

  update(userModel:User):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + 'auth/userupdate';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,userModel);
  }
  
}
