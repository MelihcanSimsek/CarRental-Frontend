import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CardetailService } from 'src/app/services/cardetail.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cars: CarDetail[]=[];
  imageUrl = 'https://localhost:7103/uploads/images/';
  carImages:CarImage[]=[];
  constructor(
    private carDetailService: CardetailService,
    private carimageService: CarimageService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCar(params['carId']);
      this.getImagesByCarId(params['carId'])
    });
  }

  getCar(carId: number) {
    this.carDetailService.getCar(carId).subscribe((response) => {
      this.cars = response.data;
    },responseError=>{

      console.log(responseError.error)

    });
  }

  getImagesByCarId(carId:number)
  {
    this.carimageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data
    })
  }

  getImagePath(carImage:CarImage)
  {
    let newPath = this.imageUrl+carImage.imagePath;
    return newPath;
  }

  addToCart(car:CarDetail)
  {
    this.cartService.addToCar(car);
    this.toastrService.success("Sepete Eklendi",car.brandName+" "+car.carName);
  }
}
