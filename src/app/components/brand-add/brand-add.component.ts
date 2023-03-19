import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService) {
    
  }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm()
  {
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  add()
  {
    if(this.brandAddForm.valid)
    {
      let brand:Brand = Object.assign({},this.brandAddForm.value);
      this.brandService.add(brand).subscribe(response=>{
        this.toastrService.success(response.message,"Ekleme Başarılı")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName);
          }
        }
      })
      
    }
    else{
      this.toastrService.error("Lütfen Formu Doldurun","Form Boş");
    }
  }
}
