<template>
 <div class="text-danger" v-if= "model.$invalid">
    <ul  class = "list-unstyled">
      <li v-for= "e in model.$errors" :key="e">{{`${e.$property}:${e.$message}`}}</li>
    </ul>
  </div>
</template>

<script>
export default{
  props:{
    model:{type:Object,required:true}
  }
}
</script>