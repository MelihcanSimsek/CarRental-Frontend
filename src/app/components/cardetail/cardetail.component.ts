import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CardetailService } from 'src/app/services/cardetail.service';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cars: Car[];
  imageUrl = 'https://localhost:7103/uploads/images/';
  carImages:CarImage[];
  constructor(
    private carDetailService: CardetailService,
    private carimageService: CarimageService,
    private activatedRoute: ActivatedRoute
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
}
