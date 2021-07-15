import AddressModel from "./AddressModel";
import { ref } from "vue";
import { required } from "@vuelidate/validators"
export default class ShippingAddressModel extends AddressModel {
  fullName = ref("");
  company = ref("");

  get rules() {
    return Object.assign({
      fullName: { required },
      company: {}
    }, super.rules);
  }
}