import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  
 private baseUrl='http://localhost:8080/product/getAll/products/list';
 private categoryUrl='http://localhost:8080/category/api/category';
 private serachsUrl='http://localhost:8080/product/api1';
  constructor(private httpClient:HttpClient) { }
getProductList(theCategoryId:number): Observable<Product[]>{
 
  const searchUrl=`${this.baseUrl}/search/{id}?id=${theCategoryId}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  
  map(response =>response.productModels1.product));
 }
 getProductCategories():Observable<ProductCategory[]>{
  return this.httpClient.get<GetResponseCateogry>(this.categoryUrl).pipe(
  
    map(response =>response._embedded.productCategoryList));
    
}
searchProducts(theKeyword:string):Observable<Product[]> {
  const searchUrl=`${this.serachsUrl}/search/{name}?name=${theKeyword}`;
  return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
    map(response=>response._embedded.productList));
  
 }
 getProduct(theProductId: number):Observable<Product> {
  const productUrl=`${this.baseUrl}/{id}?id=${theProductId}`;
  return this.httpClient.get<Product>(productUrl);
 }
 }




interface GetResponseProducts{
  productModels1:{
   product:Product[];
  }
  
}


interface GetResponseCateogry{
  _embedded:{
    productCategoryList:ProductCategory[];
  }
  
}


interface GetResponseProduct{
  _embedded:{
   productList:Product[];
  }
  
}