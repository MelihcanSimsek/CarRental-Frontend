import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  brands:Brand[]=[];
  colors:Color[]=[];

  constructor(private formBuilder:FormBuilder,private colorService:ColorService,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private carService:CarService,
    private router:Router){}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarAddForm();
  }

  createCarAddForm()
  {
    this.carAddForm = this.formBuilder.group({
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      carDescription:["",Validators.required],
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      dailyPrice:["",Validators.required]
    })
  }


  add()
  {
    if(this.carAddForm.valid){

      let car:Car = Object.assign({},this.carAddForm.value)
     
      this.carService.add(car).subscribe(response=>{
        this.toastrService.success(response.message,"Ekleme Başarılı");
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
    else{
      this.toastrService.error("Lütfen Formu Doldurun","Form Boş");
    }
    
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
}
