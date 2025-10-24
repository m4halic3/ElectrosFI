<template>
  <button
    :class="btnStyleClass"
    @click="sendClickEvent"
  >
    <slot>Button</slot>
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    large: {
      type: Boolean,
      default: false
    },
    waves:{
      type: Boolean,
      default:true
    }
  },
  data() {
    return {
      btnStyleClass: "btn"
    };
  },
  mounted() {
    if (this.large) this.btnStyleClass += "btn-large ";
    if (this.waves) this.btnStyleClass += "waves-effect waves-light ";
  },
  methods: {
    sendClickEvent: function() {
      this.$emit("click");
    }
  }
};
</script>