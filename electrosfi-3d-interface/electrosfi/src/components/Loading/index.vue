<template>
  <!-- <transition name="fade"> -->
    <v-row
      justify="center"
      align-content="center"
      class="fill-height"
      v-if="loading"
    >
    <v-container class="fill-height" style="height: 300px">
      <v-row class="text-center" align-content="center" justify="center">
        <v-col lg="3" md="4" sm="6" cols="8">
          <v-img :src="imageSrc"></v-img>
          <h1 class="mt-5">Wait a moment</h1>
          <p>Getting your files</p>
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    </v-row>
  <!-- </transition> -->
</template>
<script>
export default {
  props: {
    loading: Boolean,
    image: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    imageSrc: function () {
      let src = "/img/illustrations/loading2.svg";
      if (this.image == 2) {
        src = "/img/illustrations/loading3.svg";
      }
      return src;
    },
  },
};
</script>
<style>

</style>
