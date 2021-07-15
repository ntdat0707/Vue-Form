<template>
<div class="border rounded p-2">
  <slot/>
  <div class="form-group">
    <label for="address1">Address</label>
    <input id="address1" type="text" class="form-control" placeholder="Your Address" v-model= "address.address1.$model" :disabled="isDisabled"/>  
  </div>
  <ValidationMessage :model="address.address1" />
  <div class="form-group">
    <label for="address2">Apartment</label>
    <input id="address2" type="text" class="form-control" placeholder="" v-model= "address.address2.$model" :disabled="isDisabled"/>  
  </div>
   <ValidationMessage :model="address.address2" />
  <div class="form-row">          
    <div class="form-group">
    <label for="cityTown">City</label>
    <input id="cityTown" type="text" class="form-control" placeholder="e.g Ho Chi Minh" v-model= "address.cityTown.$model" :disabled="isDisabled"/>  
    </div>
    <ValidationMessage :model="address.cityTown" />
    <div class="form-group col-md-3">
    <label for="stateProvince">State</label>
    <select id="stateProvince"  class="form-control" v-model= "address.stateProvince.$model" :disabled="isDisabled">
      <option v-for="state in states" :key="state.abbreviation" :value = "state.abbreviation">{{stateFormat(state)}}</option>
    </select>  
    </div>
    <ValidationMessage :model="address.stateProvince" />
    <div class="form-group col-md-3">
    <label for="postalCode">Zipcode</label>
    <input id="postalCode" type="text" class="form-control" placeholder="e.g. 7000" v-model= "address.postalCode.$model" :disabled="isDisabled"/>  
    </div>
    <ValidationMessage :model="address.postalCode" />
  </div>
</div>
</template>

<script>
import states from "@/lookup/states";
import formatters from "@/formatters/index"
import ValidationMessage from "@/components/ValidationMessage"
export default {
  components:{ValidationMessage},
  props:{
    address:{
      type: Object,
    },
    isDisabled:{
      type: Boolean,
    }
  },
  setup(props){
    return {
      states,
       ...formatters,
    }
  }
}
</script>