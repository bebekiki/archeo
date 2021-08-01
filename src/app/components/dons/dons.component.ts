import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DonsService } from '../../services/dons/dons.service';

declare var Stripe: any; // : stripe.StripeStatic;


@Component({
  selector: 'app-dons',
  templateUrl: './dons.component.html',
  styleUrls: ['./dons.component.css']
})
export class DonsComponent implements OnInit {
  msgSuccess;
  msgError;

  constructor(
    private activatedRoute:ActivatedRoute,
    private donsService: DonsService
  ) { }

  ngOnInit(): void {
    const resultPaiement = this.activatedRoute.snapshot.queryParamMap.get('action');
    
    if(resultPaiement && resultPaiement=='success'){
      const donsForm = JSON.parse(localStorage.getItem('donsForm'));
      this.donsService.userPaiement(donsForm).subscribe(
        res=>{
          this.msgSuccess ='Votre paiement a bien été éffectué, Merci';
          this.msgError ='';
          localStorage.setItem('donsForm', '');
        },
        err=>{
          this.msgError = 'Une erreure est survenue, données non enregistrées';
          this.msgSuccess ='';
        }
      )
    }else if(resultPaiement && resultPaiement=='error'){
      this.msgError = 'Une erreure est survenue, paiement non éffectué';
      this.msgSuccess ='';
    }
  }


  async payer(form:NgForm){
    form.controls['price'].setValue(5);
    
    localStorage.setItem('donsForm', JSON.stringify(form.value));

    var stripe = Stripe(environment.stripe_key);

    if(form.value.email == '' || form.value.name =='' || form.value.adress =='' || form.value.number ==''){
      this.msgError = 'Remplissez tous les champs !!!';
    }else{
      stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1InpwADRRZ3qGhMt3iI05j7e',
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.href}?action=success`,
        cancelUrl: `${window.location.href}?action=error`,
      })
      .then(function (result) {
        if (result.error) {
          this.msgError = result.error.message;
        }
      });
    }
  }
}
