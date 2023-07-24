import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class KartikShopFormService {
  private countriesUrl='http://localhost:8080/api/countries';
  private stateUrl='http://localhost:8080/api/state';
  constructor(private httpClient:HttpClient){}
  getCountires():Observable<Country[]>{
   // return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      //map(response=>response._embedded.countries)
     //);
     return this.httpClient.get<Country[]>(this.countriesUrl);
  }
  getState(theCountryCode:string):Observable<State[]>{
    //searchUrl
    const searchStateUrl=`${this.stateUrl}/code/${theCountryCode}`;
    return this.httpClient.get<State[]>(searchStateUrl);//.pipe(
    //  map(response=>response._embedded.states)
    //);
  
  }
  getCreditCardMonths(startMonth:number):Observable<number[]> {
    let data:number[]=[];
    //build an array for "Month" dropdown list
    //start at current month and loop until
    for(let theMonth=startMonth;theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);
   }
   
   getCreditCardYear():Observable<number[]>{
    let data:number[]=[];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    //build an array for "Year" dropdown list
    for(let theYear=startYear;theYear<=endYear;theYear++){
      data.push(theYear);
    }
    return of(data);
   }
}
//interface GetResponseCountries{
 // _embedded:{
   // countries:Country[];
  //}
//}
//interface GetResponseState{
  //_embedded:{
   // states:State[];
 // }
//}