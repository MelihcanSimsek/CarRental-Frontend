import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { CardetailService } from 'src/app/services/cardetail.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cars:CarDetail[]=[];
  currentCarId:number;
  rentDate:Date;
  returnDate:Date;
  datesDiff:number;
  totalPrice:number;
  imageUrl = 'https://localhost:7103/uploads/images/';
  cardNumber:string="";
  cvvNumber:string="";
  fullName:string="";
  cardDate:string="";
  userModel:UserModel;

  constructor(private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private carDetailService:CardetailService,
    private rentalService:RentalService,
    private router:Router,
    private paymentSevice:PaymentService,
    private authService:AuthService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
        this.getCar(params['carId']);
        this.currentCarId = Number(params['carId']);
        this.rentDate = new Date(params['rentDate']);
        this.returnDate = new Date(params['returnDate']);
        this.datesDiff = Number(params['datesDiff']);
        
    })
    
  }

  getCar(carId:number)
  {
    this.carDetailService.getCar(carId).subscribe(response=>{
      this.cars = response.data
    })
  }

  addRental()
  {
    let rental:Rental = Object.assign({});
    rental.carId = this.currentCarId;
    rental.rentDate = this.rentDate;
    rental.returnDate = this.returnDate;
    rental.userId =this.userModel.id;

    this.rentalService.addRental(rental).subscribe(response=>{
      this.router.navigate(["/"]);
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Rental Add Error");
    })
  }

  pay()
  {
    if(this.cardNumber && this.cardDate && this.cvvNumber && this.fullName)
    {
      let payment:Payment = Object.assign({});
      let tempDate = this.cardDate.split("/");
      this.userModel = this.authService.getUserInfo();
    payment.cardNumber=this.cardNumber;
    payment.cvv=this.cvvNumber;
    payment.fullName = this.fullName;
    payment.customerId=this.userModel.id;
    payment.expiryMonth=Number(tempDate[0]);
    payment.expiryYear = Number(tempDate[1]);
    this.paymentSevice.pay(payment).subscribe(response=>{
      this.addRental();
      this.toastrService.success(response.message,"Payment Successfull");
     

    },responseError=>{
      this.toastrService.error(responseError.error.message,"Invalid Card Information");
    })
    }
    else{
      this.toastrService.error("Kart bilgilerini doldurunuz","Card Information Empty");
    }
    
    
    
  }

  getCarImage(car:CarDetail):string
  {
    if(car.imagePath == null)
    {
      let newPath = this.imageUrl + 'DefaultImage.jpg';
      return newPath;
    }
    else{
      let newPath = this.imageUrl + car.imagePath;
      return newPath;
    }
    
   
  }


  getTotalPrice(dailyPrice:number):number
  {
    return dailyPrice*this.datesDiff;
  }
}
