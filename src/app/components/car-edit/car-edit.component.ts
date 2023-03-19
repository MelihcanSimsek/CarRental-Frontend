import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CardetailService } from 'src/app/services/cardetail.service';

import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit {
  cars: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCarId:number;
  carUpdateForm = new FormGroup({
    brandId: new FormControl("", Validators.required),
    colorId: new FormControl("", Validators.required),
    dailyPrice: new FormControl("", Validators.required),
    carName: new FormControl("", Validators.required),
    carDescription: new FormControl("", Validators.required),
    modelYear: new FormControl("", Validators.required)
  })

  constructor(
    private carService:CarService,
    private carDetailService: CardetailService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router
  ) { }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColors();
      this.getBrands();
      this.getCar(Number(params["carId"]));
      this.currentCarId = Number(params["carId"]);
    })
  }

  createCarUpdateForm(car:CarDetail) {

    this.carUpdateForm.setValue({
      brandId: car.brandId.toString(),
      colorId: car.colorId.toString(),
      dailyPrice: car.dailyPrice.toString(),
      carName: car.carName,
      carDescription: car.carDescription,
      modelYear: car.modelYear
    })
  }


  getCar(carId: number) {
    this.carDetailService.getCar(carId).subscribe(response => {
      this.cars = response.data;
      this.createCarUpdateForm(response.data[0])
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  update()
  {
    if(this.carUpdateForm.valid){
      let car:Car;
       car = Object.assign({carId:this.currentCarId,brandId:Number(this.carUpdateForm.value.brandId),
      colorId:Number(this.carUpdateForm.value.colorId),carName:this.carUpdateForm.value.carName,
      carDescription:this.carUpdateForm.value.carDescription,dailyPrice:Number(this.carUpdateForm.value.dailyPrice),
      modelYear:this.carUpdateForm.value.modelYear});
        
      this.carService.update(car).subscribe(response=>{
        this.toastrService.success("Araba başarıyla güncellendi","Araba Güncelleme");
        this.router.navigate(["/cars"]);
        
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            
            this.toastrService.info(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName);
            
          }
        }
      })

    }
    else{
      this.toastrService.warning("Lütfen Formu Doldurunuz","Form Boş");
    }
   
  }

  delete()
  {
    let car:Car={
      carId:this.currentCarId,
      brandId:this.cars[0].brandId,
      colorId:this.cars[0].colorId,
      carName:this.cars[0].carName,
      carDescription:this.cars[0].carDescription,
      dailyPrice:this.cars[0].dailyPrice,
      modelYear:this.cars[0].modelYear
    }
   
    this.carService.delete(car).subscribe(reponse=>{
      this.toastrService.success(reponse.message,"Car Deleted");
      this.router.navigate(["/cars"]);
    },responseError=>{
      if(responseError.error.ValidationErrors.length>0){

        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.info(responseError.error.ValidationErrors[i].ErrorMessage,responseError.error.ValidationErrors[i].PropertyName);
        }
      }
    })
  }
}
