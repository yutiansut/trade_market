<template>
  <div
    :style="{width:myWidth}"
    class="form-input p-rel"
    :class="inputClass"
  >
    <span
      class="label"
      :class="labelClass"
    >
      <em>{{label}}&nbsp;</em>
      <i
        v-if="isRequired"
        class="font-18 fr color-primary"
      >*</i></span>
    <el-input
      v-model="value"
      :disabled='disabled'
      :placeholder="placeholder"
      :type='type'
    ></el-input>
  </div>
</template>
<script>
export default {
  name: "form-input",
  props: {
    width: String,
    label: String,
    inputClass: String,
    placeholder: String,
    value: String,
    labelClass: String,
    isRequired: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    myWidth() {
      return this.width + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
.form-input {
  box-sizing: border-box;
  background: #fff;
  .label {
    height: 16px;
    line-height: 16px;
    display: inline-block;
    padding: 0 5px;
    background-color: inherit;
    position: absolute;
    left: 18px;
    top: -8px;
    z-index: 99;
    i {
      line-height: normal;
    }
  }
}
.el-input {
  display: block;
  width: 100%;
}
</style>
