import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm()
  {
    this.loginForm =this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login()
  {
    if(this.loginForm.valid)
    {
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.router.navigate(["/cars"])
        this.localStorageService.setItem('token',response.data.token);
        this.toastrService.success("Anasayfaya yönlendiriliyorsunuz","Giriş Başarılı");
      },responseError=>{
        this.toastrService.error(responseError.error,"Parola veya mail hatalı");
      })
    }
    else{
      this.toastrService.info("Giriş bilgilerini giriniz");
    }
  }
}
