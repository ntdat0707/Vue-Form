import BillingAddressModel from "../models/BillingAddressModel";
import ShippingAddressModel from "../models/ShippingAddressModel";
import CreditCardModel from "../models/CreditCardModel";
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core"
export default {
  billing: reactive(new BillingAddressModel()),
  shipping: reactive(new ShippingAddressModel()),
  creditcard: reactive(new CreditCardModel()),
  errorMessage: ref(""),

  toModel() {
    const rules = {
      billing: this.billing.rules,
      shipping: this.shipping.rules,
      creditcard: this.creditcard.rules,
    };
    return useVuelidate(rules, this)
  }
}