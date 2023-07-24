import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { KartikShopFormService } from 'src/app/services/kartik-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
   checkoutFormGroup:FormGroup;
   totalPrice:number = 0;
   totalQuantity:number = 0;
   creditCardYears:number[]=[];
   creditCardMonths:number[]=[];

   countries:Country[]=[];
   shippingAddressStates:State[]=[];
   billingAddressStates:State[]=[];   
  constructor(private formBuilder:FormBuilder,private kartikShopForm:KartikShopFormService) { }

  ngOnInit() {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName1:new FormControl('',[Validators.required,Validators.minLength(2)]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
        email:new FormControl('',
                              [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        ),
      }),
      shippingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2)]),
        city:new FormControl('',[Validators.required,Validators.minLength(2)]),
        state:[''],
        country:[''],
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2)]),

      }),
      billingAddress:this.formBuilder.group({
        street:new FormControl('',[Validators.required,Validators.minLength(2)]),
        city:new FormControl('',[Validators.required,Validators.minLength(2)]),
        state:[''],
        country:[''],
        zipCode:new FormControl('',[Validators.required,Validators.minLength(2)]),

      }),
      creditCardInformation:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });
    //populate credit card months
    const startMonth:number=new Date().getMonth();
    console.log("startMonth:"+startMonth);
    this.kartikShopForm.getCreditCardMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months:"+JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    //populate credit card years
    this.kartikShopForm.getCreditCardYear().subscribe(
      data=>{
        console.log("Retrieved credit card years:"+JSON.stringify(data));
        this.creditCardYears=data;
      }
    );
    //populate countries
    this.kartikShopForm.getCountires().subscribe(
      data=>{
        console.log("Retrieved countires:"+JSON.stringify(data));
        this.countries=data;
      }
    );

  }
  get firstName1(){return this.checkoutFormGroup.get('customer.firstName1');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get street(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get city(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get zipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get street1(){return this.checkoutFormGroup.get('billingAddress.street');}
  get city1(){return this.checkoutFormGroup.get('billingAddress.city');}
  get zipCode1(){return this.checkoutFormGroup.get('billingAddress.zipCode');}


  

 onSubmit(){
  console.log("Handling the submit button");
  if(this.checkoutFormGroup.invalid){
    this.checkoutFormGroup.markAllAsTouched();
  }
  console.log(this.checkoutFormGroup.get('customer').value,(this.checkoutFormGroup.get('shippingAddress').value)
  ,(this.checkoutFormGroup.get('shippingAddress').value));
  console.log(this.checkoutFormGroup.get('billingAddress').value);

  console.log("the email address is"+this.checkoutFormGroup.get('customer').value.email);
  console.log("the shipping address country is"+this.checkoutFormGroup.get('shippingAddress').value.country.name);
  console.log("the shipping address state is"+this.checkoutFormGroup.get('shippingAddress').value.state.name);



 }
 copyShippingAddressToBillingAddress(event){
  if(event.target.checked){
    this.checkoutFormGroup.controls.billingAddress
    .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

  }
 }
 handleMonthsAndYears(){
  const creditCardFormGroup=this.checkoutFormGroup.get('creditCard');
  const currentYear:number=new Date().getFullYear();
  const selectedYear:number=Number(creditCardFormGroup.value.expirationYear);
  //if the current year equals the selected year, then start with the current month
  let startMonth:number;
  if(currentYear === selectedYear){
    startMonth = new Date().getMonth()+1;
 } 
  else{
    startMonth = 1;
  }
  this.kartikShopForm.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: "+JSON.stringify(data));
      this.creditCardMonths=data;
    }
  );

}
getStates(formGroupName:string){
    const formGroup=this.checkoutFormGroup.get(formGroupName);
    const countryCode=formGroup.value.country.code;
    const countryName=formGroup.value.country.name;
    console.log(`${formGroupName} country Code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);
    this.kartikShopForm.getState(countryCode).subscribe(
      data=>{
        if(formGroupName==='shippingAddress'){
          this.shippingAddressStates=data;
        }
        else //if(formGroupName==='billingAddress'){
          {
          this.billingAddressStates=data;
        }
        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
     
}
}
