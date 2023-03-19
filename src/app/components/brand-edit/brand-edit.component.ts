import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  
  brandUpdateForm = new FormGroup({
    brandName:new FormControl("",Validators.required)
  })
  brand:Brand;

  constructor(private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrand(Number(params['brandId']));
    })
  }


  getBrand(brandId:number)
  {
    this.brandService.getBrand(brandId).subscribe(response=>{
      this.brand = response.data;
      this.createBrandUpdateForm(response.data);

    })
  }

  createBrandUpdateForm(item:Brand)
  {
    this.brandUpdateForm.setValue({
      brandName:item.brandName
    })
  }

  update(){
    if(this.brandUpdateForm.valid)
    {
      let brandItem:Brand = Object.assign({brandId:this.brand.brandId,brandName:this.brandUpdateForm.value.brandName});
      this.brandService.update(brandItem).subscribe(response=>{
        this.toastrService.success(response.message,"Brand Updated");
        this.router.navigate(["/cars"]);
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName);  
          }
        }
      })

    }
    else
    {
      this.toastrService.info("Lütfen Formu Doldurun","Form Boş");
    }
  }
  
  delete()
  {
    this.brandService.delete(this.brand).subscribe(response=>{
      this.toastrService.success(response.message,"Brand Deleted");
      this.router.navigate(["/cars"]);
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
