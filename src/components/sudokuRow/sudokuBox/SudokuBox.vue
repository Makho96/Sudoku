<template>
  <div class="box" :class="{'generated': boxObject.isGenerated, 'highLighted' : boxObject.isHigtLighted}">
    <input type="text"
    v-model="inputNumber"
    :disabled="boxObject.isGenerated"
    @click="setHigtLighted(rowNumber, colNumber, +inputNumber)
    ">
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputNumber: 0
    }
  },
  props: {
    boxObject: Object,
    rowNumber: Number,
    colNumber: Number,
    setHigtLighted: Function
  },
  watch: {
    inputNumber (newVal, oldVal) {
      // console.log(oldVal, newVal)
      if (isNaN(this.inputNumber)) {
        this.inputNumber = ''
        return
      }
      if (newVal < 0 || newVal > 9) {
        this.inputNumber = oldVal
      }
    }
  },
  mounted () {
    this.inputNumber = this.boxObject.value || ''
  }
}
</script>

<style lang="scss" scoped>
.box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  font-size: 1em;
  border: 1px solid #0f264a;
  border-radius: 0.2em;
  margin: 0.1em;
  input{
    display: flex;
    font-size: inherit;
    width: 100%;
    height: 100%;
    border:none;
    background: transparent;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  &:nth-child(3n + 1):not(:last-child){
    margin-left: 0.5em;
  }
  &.generated {
    input{
      cursor: pointer;
    }
  }
  &.highLighted{
    background: #e2e7ed;
  }
  &:hover{
    background: #bbdefb;
  }

}
</style>
