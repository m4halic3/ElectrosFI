<template>
  <router-link
    v-if="!btn"
    :to="to"
    class="btn ma-md-2"
    @click="click"
  > 
    <img
      :src="src"
      :alt="alt"
    >
    <strong>
      <slot />
    </strong> 
  </router-link>
  <button
    v-else
    class="btn ma-md-2"
    @click="click"
  >
    <img
      :src="src"
      :alt="alt"
    >
    <strong>
      <slot />
    </strong>
  </button>
</template>
<script>
export default {
  name: "PhButton",
  props: {
    src: String,
    to: {
      type: String,
      required: false,
      default: () => {
        return "/";
      }
    },
    alt: String,
    btn: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  methods:{
    click:function(e){
      this.$emit('click', e);
    }
  }
};
</script>
<style lang="scss">
a.btn, button.btn, .btn {
  background: var(--secundary-color);
  color: white;
  padding: 1rem;
  border-radius: 0.7rem;
  width: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-weight: bold;
  transition: background-color 0.25s;
  img {
    color: white;
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: var(--accent-color);
  }
  &.btn-google {
    background: white;
    color: var(--primary-color);
  }
}
</style>