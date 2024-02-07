<template >
  <svg :class="{ [`dmsm-icon-${name}`]:true, 'dmsm-icon-flip': flip}" class="dmsm-icon" >
    <use  v-bind="{ 'xlink:href': `#dmsm-icon-${name}` }"></use>
  </svg>
</template>
<script>
export default {
  name : 'Icon',
  props : { 
    name : { type: String, required: true },
    flip : { type: Boolean, default: false },
  }
}
</script>
<style>
.dmsm-icon {
  display     : inline-block;
  width       : 1em;
  height      : 1em;
  stroke-width: 0;
  stroke      : currentColor;

  /* fill        : currentColor; */
}
.dmsm-icon-flip{
  transform: scaleX(-1);
}
</style>