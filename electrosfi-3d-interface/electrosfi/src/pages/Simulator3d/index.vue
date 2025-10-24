<template>
  <span class="fill-height">
    <Loading :image="1" :loading="loading" />
    <div
      id="Drawing"
      class="Drawing"
      :class="loading ? 'fill-height' : 'simulator-container'"
    >
      <MobileAlert v-if="1 < 1"/>
      <NavbarDrawing v-if="!loading" :is3d="true"/>
      <multipane layout="vertical" class="resizer-content" v-if="!loading">
        <div class="multipane-content left">
          <SideNavSimulator :is3d="true"/>
        </div >

        <multipane-resizer>
          <div class="multipane-content center">
            <ThreeDrawing/>
          </div>
        </multipane-resizer>

        <div class="multipane-content right">
          <RightNavSimulator :is3d="true"/>
        </div>

      </multipane>
      <LoadingModal/>
      <PreviewSimulationModal :is3d="true"/>
    </div>
  </span>
</template>

<script>

import { mapActions } from "vuex";
import { Multipane, MultipaneResizer } from "vue-multipane" 
import simulator3d from "@/services/simulator3d";
import Swal from "sweetalert2";

export default {
  name: "Simulator3d",
  components: {
    Loading: () => import("@/components/Loading"),
    NavbarDrawing: () => import("@/components/Navbar"),
    SideNavSimulator: () => import("@/components/SideNavSimulator"),
    RightNavSimulator: () => import("@/components/RightNavSimulator"),
    ThreeDrawing: () => import("@/components/ThreeDrawing"),
    LoadingModal: () => import("@/components/LoadingModal"),
    PreviewSimulationModal: () => import("@/components/PreviewSimulationModal"),
    multipane: Multipane,
    "multipane-resizer": MultipaneResizer,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: async function() {
      await simulator3d
        .get(this.$route.params.key)
        .then(response => {
          try {
            this.set3dState(response);
          } catch (err) {
            Swal.fire({
              title: "An error appears in your simulation!",
              text: err.message
            });
          }
        })
        .then(() => {
          setInterval(() => {
            this.loading = false;
          }, 500);
        });

      document.addEventListener("keydown", this.keyPressAction);
      document.addEventListener("keyup", this.keySolveAction);
    

      this.setPageInfo();
    },
    setPageInfo: function() {
      document.title = "Simulator - ElectrosFI";
      document
        .querySelector('meta[name="description"')
        ?.setAttribute(
          "content",
          "Simulate and edit photonic tools online - ElectrosFI"
        );
    },
    ...mapActions("simulator", ["set3dState"])
  }
};
</script>

<style lang="scss">
@import "./styles.scss";
</style>
