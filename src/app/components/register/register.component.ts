import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.createRegisterFrom();
  }

  createRegisterFrom()
  {
    this.registerForm = this.formBuilder.group({
      name:["",Validators.required],
      surname:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      repeatPassword:["",Validators.required]
    })
  }


  register()
  {
    if(this.registerForm.valid)
    {
      if(this.registerForm.value.password == this.registerForm.value.repeatPassword)
      {
        let registerModel:RegisterModel = Object.assign({
          email:this.registerForm.value.email,
        password:this.registerForm.value.password,
        firstName:this.registerForm.value.name,
        lastName:this.registerForm.value.surname});
       
        this.authService.register(registerModel).subscribe(response=>{
          this.router.navigate(["/cars"])
          this.localStorageService.setItem('token',response.data.token);
          this.toastrService.success("","Kayıt Başarılı");

        },responseError=>{
          this.toastrService.error(responseError.error);
        })
      }
      else{
        this.toastrService.info("Girilen parolalar aynı değil","Parola Hatası");
      }
      
    }else{
      this.toastrService.info("Lütfen bilgileri giriniz");
    }
  }
}
