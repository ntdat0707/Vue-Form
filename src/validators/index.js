import cardValidator from "card-validator";
export const validatorCreditCard = {
  $validators: value => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return true
    }
    return cardValidator.number(value).isValid;
  },
  $message: 'Not a valid credit card number'
}