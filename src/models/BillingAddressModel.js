import AddressModel from "./AddressModel";
import { ref } from "vue";
export default class BillingAddressModel extends AddressModel {
  sameAsShipping = ref(false);
  get rules() {
    return Object.assign({ sameAsShipping: {} }, super.rules);
  }
}