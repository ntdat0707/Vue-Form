import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators"
export default class AddressModel {
  address1 = ref("");
  address2 = ref("");
  cityTown = ref("");
  stateProvince = ref("");
  postalCode = ref("");

  get rules() {
    return {
      address1: { required, minLength: minLength(5) },
      address2: {},
      cityTown: { required, minLength: minLength(2) },
      stateProvince: { required },
      postalCode: { required, minLength: minLength(5) },
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }
}