import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:UserModel;
  profileForm = new FormGroup({
    firstName:new FormControl("",Validators.required),
    lastName:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    currentPassword:new FormControl("",Validators.required),
    newPassword:new FormControl(""),
    repeatPassword:new FormControl("")
  })
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router) {
    
  }


  ngOnInit(): void {
    this.createProfileForm();
  }

  createProfileForm()
  {
    this.user = this.authService.getUserInfo();
   this.profileForm.setValue({
     firstName: this.user.firstName,
     lastName: this.user.lastName,
     email: this.user.email,
     currentPassword: '',
     newPassword: '',
     repeatPassword: ''
   })
   
  }


   update(){
    if(this.profileForm.valid)
    {
      if(this.profileForm.value.newPassword == this.profileForm.value.repeatPassword)
      {
        let updatedUser:User = Object.assign({
          id:this.user.id,
          email:this.profileForm.value.email,
          firstName:this.profileForm.value.firstName,
          lastName:this.profileForm.value.lastName,
          currentPassword:this.profileForm.value.currentPassword,
          newPassword:this.profileForm.value.newPassword,
          status:true
        });
        this.authService.update(updatedUser).subscribe(response=>{
          this.toastrService.success("Profil Bilgileri Güncellendi");
          this.localStorageService.remove('token');
          this.localStorageService.setItem('token',response.data.token);
          this.router.navigate(["/cars"]);
          
        },responseError=>{
          this.toastrService.info("Lütfen Farklı Bir Maili Deneyiniz",responseError.error);
        })
      }
      else{
        this.toastrService.error("Yeni parolalar uyuşmamaktadır","Yeni parolalar aynı değil");
        this.router.navigate(["/profile"])
      }
      
    }

   } 
}
