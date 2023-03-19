import { Injectable } from '@angular/core';
import { CarDetail } from '../models/carDetail';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCar(car:CarDetail)
  {
    let item:CartItem=CartItems.find(c=>c.car.carId === car.carId);
    if(item)
    {
     item.quantity+=1; 
    }
    else{
      let cartItem = new CartItem();
      cartItem.car=car;
      cartItem.quantity=1;
      CartItems.push(cartItem);
    }
  }

  list():CartItem[]{
    return CartItems;
  }

  removeFromCart(car:CarDetail){
    let item:CartItem=CartItems.find(c=>c.car.carId === car.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }
}

