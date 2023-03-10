import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCar: Car;
  carFilterText: string = "";
  brandFilter:number=0;
  colorFilter:number=0;
  imageUrl='https://localhost:7103/uploads/images/';


  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
    private brandService: BrandService, private colorService: ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      }
      else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      }
      else {
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }
  
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getCarsByBrandAndColor(brandId:number,colorId:number)
  {
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response=>{
      this.cars = response.data;
      this.toastrService.info("","Filtre Uygulandı");
    })
  }

  getCarImage(car:Car):string
  {
    if(car.imagePath == null)
    {
      let newPath = this.imageUrl+'DefaultImage.jpg';
      return newPath;
    }
    else{
      let newPath = this.imageUrl + car.imagePath;
      return newPath;
    }

  }
  
}
