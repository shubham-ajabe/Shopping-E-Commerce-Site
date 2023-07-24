import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //  templateUrl: './product-table-list.component.html',
  templateUrl: './product-grid-list.component.html',

  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: Product[];
  currentCategoryId: number;
  searchMode:boolean;
  constructor(private productService: ProductService,
               private cartService:CartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
   this.handleListProducts();
    }
  }
  handleSearchProducts(){
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword');
    //now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.product=data;
  }
    )
  }
handleListProducts(){
  const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
  if (hasCategoryId) {
    //get the "id" param string convert into integer
    this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
  }
  else {
    this.currentCategoryId = 1;
  }
  this.productService.getProductList(this.currentCategoryId).subscribe(
    data => {
      this.product = data;
    }
  )
}
addToCart(theProduct:Product){
  console.log(`Adding to cart: ${theProduct.name},${theProduct.unitPrice}`);
  //do add in cart
  const theCartItem=new CartItem(theProduct);
  this.cartService.addToCart(theCartItem);
}
}
