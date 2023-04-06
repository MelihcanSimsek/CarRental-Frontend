import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userInfo:UserModel|null;
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) {
    
  }
  
  ngOnInit(): void {
   
  }

  

  logout()
  {
    this.localStorageService.remove('token');
    this.toastrService.info("Anasayfaya yönlendiriliyorsunuz","Çıkış başarılı");
    this.router.navigate(["/login"]);
  }

  isAuthenticated(){
    this.userInfo = this.authService.getUserInfo();
    return this.authService.loggedIn();
    
  }
}
