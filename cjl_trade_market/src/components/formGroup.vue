<template>
    <div class="input-group">
        <label v-text="label"></label>
        <input 
          :type="inputType"
          :name="inputName"
          :placeholder="placeHolder"
          :value='inputVal'
          v-model="currentVal"/>
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: "form-group",
  props: {
    label: String,
    placeHolder: String,
    inputVal: String,
    inputName: String,
    inputType: String
  },
  data() {
    return {
      currentVal: ""
    };
  },
  watch: {
    currentVal: function() {
      let val = this.currentVal;
      let name = this.inputName;
      this.$emit("valChange", { val, name });
    }
  }
};
</script>

<style lang="scss" scoped>
.input-group {
  overflow: hidden;
  margin-top: 22px;
  input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    padding: 0 10px;
    margin-top: 12px;
    border-color: $bd-color;
    @include textVcenter;
    transition: all 0.3s;
    &:hover,
    &:focus {
      border-color: $color-danger;
    }
  }
}
</style>

