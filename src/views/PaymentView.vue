<template>
  <div>
    <h3>Payment</h3>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping Information:</strong></div>
          <div class="form-group">
            <label for="name">Name</label>
            <input id="name" type="text" class="form-control" placeholder="Your Name" v-model="model.shipping.fullName.$model"/>  
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input id="company" type="text" class="form-control" placeholder="Your Company" v-model="model.shipping.company.$model"/>  
          </div>
          <AddressView :address="model.shipping"/>
          <div class="form-group">
            <input  type="submit" value="Next" class="btn btn-success" :disabled="model.creditcard.$invalid" />  
          </div>
        </div>
          <div class="col-md-6">
          <div><strong>Billing Information:</strong></div>
          <div class = "form-check">
            <input type="checkbox" id="sameAsShipping" class="form-check-input" v-model="model.billing.sameAsShipping.$model"/>
            <label for="sameAsShipping" class="form-check-label">Same As Shipping</label>
          </div>
          <AddressView :address="model.billing" :isDisabled= "model.billing.sameAsShipping"/>
          <div><strong>Credit Card</strong></div>
          <div class="form-group">
            <label for="ccNumber">Credit Card Number</label>
            <input class="form-control" type="text" v-model= "model.creditcard.number.$model" id="ccNumber"/>
          </div>
          <ValidationMessage :model="model.creditcard.number"/>
          <div class="form-group">
            <label for="nameOnCard">Name on Card</label>
            <input class="form-control" type="text" v-model= "model.creditcard.nameOnCard.$model" id="nameOnCard"/>
          </div>
          <ValidationMessage :model="model.creditcard.nameOnCard"/>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="expirationMonth">Expiration Month</label>
              <select v-model= "model.creditcard.expirationMonth.$model" class= "form-control">
                <option v-for="month in months" :key="month.number" :value="month.number">{{month.name}}</option>
              </select>
            </div>
             <ValidationMessage :model="model.creditcard.expirationMonth"/>
            <div class="form-group col-md-4">
              <label for="expirationYear">Expiration Year</label>
              <select v-model= "model.creditcard.expirationYear.$model" class= "form-control">
                <option v-for="y in years" :key="y" :value="y">{{y}}</option>
              </select>
            </div>
             <ValidationMessage :model="model.creditcard.expirationYear"/>
            <div class="form-group col-md-4">
              <label for="cvv">CVV Code</label>
              <input v-model= "model.creditcard.cvv.$model" class= "form-control" />
            </div>
            <ValidationMessage :model="model.creditcard.cvv"/>
          </div>
          
        </div>
      </div> 
    </form>
    <pre>{{payment}}</pre>
     <pre>{{model.creditcard}}</pre>
  </div>
</template>

<script>

import {ref,computed, watch, reactive } from "vue"
import states from "@/lookup/states"
import formatters from "@/formatters/index"
import months from "@/lookup/months"
import AddressView from "@/views/AddressView"
import state from "@/state/index"
import {required} from "@vuelidate/validators"

import ValidationMessage from "@/components/ValidationMessage"
import {validatorCreditCard} from "@/validators/index"
export default {
  components:{
    AddressView,
    ValidationMessage
    },
  emits:["onError"],
  setup(props,{emit}){
    const payment = reactive(state);
    const years = Array.from({length:10},(_,i)=>i+2020);
    const model = state.toModel();
    async function onSave(){
     if(await model.creditcard.value.$validate){
     state.errorMessage.value= "We can't save yet, we don't have an API";
    }
    }
    const zipcode = computed({
    get:() => payment.postalCode,
    set:(val) => {
      if(val && typeof val === "string"){
        if(val.length <=5 || val.indexOf("-")>-1){
          payment.postalCode = val;
        }else{
          payment.postalCode = `${val.substring(0,5)}-${val.substring(5)}`;
        }
      }
    }});
    watch(
      ()=>payment.billing.sameAsShipping,
      ()=>{
      if(payment.billing.sameAsShipping.value){
      payment.clear();
      }
    });
    return {
      payment,
      model, 
      states,
      onSave,
      ...formatters,
      zipcode,
      months,
      years,
      };
  }
}
</script>