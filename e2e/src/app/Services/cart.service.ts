import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }
  addToCart(theCartItem: CartItem) {

//check if we already have to item in our cart 
let alreadyExistsInCart: boolean=false;
let existingCartItem: CartItem=undefined;
if(this.cartItems.length > 0){
//find the item in the cart based on item id

 for(let tempCartItem of this.cartItems){
    if(tempCartItem.id==theCartItem.id){
      existingCartItem=tempCartItem;
      break;
    }

}
//existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id=theCartItem.id); 
//check if we foun it
alreadyExistsInCart=(existingCartItem != undefined);
}

if(alreadyExistsInCart){
  existingCartItem.quantity++;
}
else{
  this.cartItems.push(theCartItem);
}
//compute cart total price and total quantity
this.computerCartTotals();

  }
  computerCartTotals() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue +=currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue +=currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
       console.log('contents of the cart');
       for(let tempCartItem of this.cartItems){
        const subTotalPrice=tempCartItem.quantity * tempCartItem.unitPrice;
        console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
       }
       console.log(`tottalPrice:${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`);
       console.log('-----------------------');
  }
  decrementQuantity(theCartItem:CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
     this.remove(theCartItem);
    }
    else{
      this.computerCartTotals();
    }
  }
  remove(theCartItem:CartItem){
    //get index of item in the array
    const itemIndex=this.cartItems.findIndex(tempCartItem=>tempCartItem.id==theCartItem.id);
    //if foun,remove the item from the array
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computerCartTotals();
    }
  }
}
