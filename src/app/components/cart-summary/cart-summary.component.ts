import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems:CartItem[]=[];

  constructor(private cartService:CartService,private toastService:ToastrService){}

  ngOnInit(): void {
    this.list();
  }

  list()
  {
    this.cartItems = this.cartService.list();
  }

  removeFromCart(car:CarDetail){
    this.cartService.removeFromCart(car);
    this.toastService.info("Sepetten Kaldırıldı",car.brandName+" "+car.carName);
  }
}
