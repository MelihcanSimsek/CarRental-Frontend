import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  colorUpdateForm=new FormGroup({
    colorName:new FormControl("",Validators.required)
  });
  
  color:Color;

  constructor(private fromBuilder:FormBuilder,
    private toastrService:ToastrService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private router:Router) {
    
  }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getColor(Number(params['colorId']));
      
    })
  }

  createColorUpdateForm(item:Color)
  {
    this.colorUpdateForm.setValue({
      colorName:item.colorName
    })
  }

  getColor(colorId:number){
    this.colorService.getColor(colorId).subscribe(response=>{
      this.color = response.data;
      this.createColorUpdateForm(response.data);
    })
  }
  
  update(){
    if(this.colorUpdateForm.valid){
      let color:Color= Object.assign({colorId:this.color.colorId,colorName:this.colorUpdateForm.value.colorName});
      this.colorService.update(color).subscribe(response=>{
        this.toastrService.success("Ürün güncellendi","Ürün Güncelleme");
        this.router.navigate(["/"]);

      },responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName);
          }
        }
      })
      
    }else{
      this.toastrService.info("Lütfen Formu Doldurun","Form Boş");
    }
  }

  delete(){
    this.colorService.delete(this.color).subscribe(response=>{
      this.toastrService.success(response.message,"Ürün Silindi");
      this.router.navigate(["/"]);
    },responseError=>{
      if(responseError.error.ValidationErrors.length>0)
      {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName); 
        }
      }
    })
  }

}
