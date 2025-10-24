<template>
  <div class="box-input-type mt-5">
    <label :for="'input-' + name">
      <slot />
    </label>
    <input
      :id="'input-' + name"
      v-model="contentVar"
      :type="type"
      :name="name"
      @input="handleInput"
    >
  </div>
</template>
<script>
export default {
  name: "InputField",
  props: {
    type: String,
    name: String
  },
  data:()=>({
      contentVar:''
  }),
  methods: {
    handleInput: function() {
      this.$emit("input", this.contentVar);
    }
  }
};
</script>
<style lang="scss">
.box-input-type {
  width: 100%;
  input {
    background: white;
    padding: 1rem;
    width: 100%;
    display: block;
    border-radius: 0.5rem;
    border-width: 1px;
    &:focus {
      border: 1px solid var(--primary-color);
      outline: none;
    }
  }
  label {
    display: block;
    text-align: left;
    color: var(--dark-text-color);
  }
}
</style>