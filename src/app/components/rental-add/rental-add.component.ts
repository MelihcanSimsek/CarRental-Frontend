import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  addFormGroup: FormGroup;
  currentCarId: number;
  rentDate: Date;
  returnDate: Date;
  minDate:Date;
  userModel:UserModel;

  constructor(private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private authService:AuthService) { }


  ngOnInit(): void {
    this.createAddFormGroup();
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.currentCarId = Number(params['carId']);
      }
      this.minDate = new Date();
    })
  }


  createAddFormGroup() {
    this.addFormGroup = this.formBuilder.group({
      rentDate: ["", Validators.required],
      returnDate: [null],
    })
  }

  calculateDiff(rentDate: Date, returnDate: Date) {
    return Math.floor((Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) - Date.UTC(rentDate.getFullYear(), rentDate.getMonth(), rentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  checkAndAdd() {
    if (this.addFormGroup.valid) {
      let rental: Rental = Object.assign({}, this.addFormGroup.value);
      this.userModel = this.authService.getUserInfo();
      rental.carId = this.currentCarId;
      rental.userId = this.userModel.id;
      this.rentalService.rulesForAdding(rental).subscribe(response => {
        this.toastrService.success(response.message, "Ödeme İşlemine Yönlendiriliyor");
        this.router.navigate(['/payment/' + this.currentCarId + '/' + this.calculateDiff(rental.rentDate, rental.returnDate) + '/' + rental.rentDate + '/' + rental.returnDate]);

      }, responseError => {
        this.toastrService.error(responseError.error.message, "Tarih Hatası");
      })

    }
    else {
      this.toastrService.error("Please enter your rent date", "Rent Date Error");
    }
  }

}
