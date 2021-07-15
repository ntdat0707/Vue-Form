<template>
<div class="alert alert-danger" v-if="error">{{error}}</div>
</template>
<script>

export default{
  props:{
    error:{
      type:String,
      required:true,
    }
  }
}
</script>