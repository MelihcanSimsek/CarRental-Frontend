import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  faedit = faEdit;
  cars: CarDetail[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  currentCar: CarDetail;
  carFilterText: string = "";
  brandFilter:number=0;
  colorFilter:number=0;
  imageUrl='https://localhost:7103/uploads/images/';


  constructor(private carService: CarService, private activatedRoute: ActivatedRoute,
    private brandService: BrandService, private colorService: ColorService,
    private toastrService:ToastrService,
    private router:Router) { }

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
      this.cars = response.data.sort((a,b) =>  (a.carName > b.carName ? 1 : -1));
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

  getCurrentCar(car: CarDetail) {
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

  getCarImage(car:CarDetail):string
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
