
import { ref } from "vue";
import { validatorCreditCard } from "@/validators/index"
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators"
export default class CreditCardModel {
  number = ref("");
  nameOnCard = ref("");
  expirationMonth = ref(1);
  expirationYear = ref(2020);
  cvv = ref("");

  get rules() {
    return {
      number: { required, validatorCreditCard },
      nameOnCard: { required },
      expirationMonth: { required },
      expirationYear: { required },
      cvv: { required },
    };
  }

  toModel() {
    return useVuelidate(this.rules, this);
  }
}