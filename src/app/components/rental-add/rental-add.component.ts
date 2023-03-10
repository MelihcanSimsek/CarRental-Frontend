import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
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


  constructor(private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }


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
      rental.carId = this.currentCarId;
      rental.customerId = 1;
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
