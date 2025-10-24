<template>
  <div class="grey lighten-5 col m2 DrawingLeftSideNav">
    <div class="collection">
      <br>
      <small>Ferramentas</small>
      <a
        :class="'collection-item ' + ModeActive.create"
        @click="DefineMode('create')"
      >
        <i class="material-icons left">create</i> Criar
      </a>
      <!-- <a v-bind:class="'collection-item ' + ModeActive.move" @click="DefineMode('move')">
        <i class="material-icons left">zoom_out_map</i> Mover
      </a>
      <a v-bind:class="'collection-item ' + ModeActive.rotate" @click="DefineMode('rotate')">
        <i class="material-icons left">crop_rotate</i> Rotacionar
      </a> -->
      <a
        :class="'collection-item ' + ModeActive.transform"
        @click="DefineMode('transform')"
      >
        <i class="material-icons left">transform</i> Transformar
      </a>
    </div>
    <div>
      <div class="divider" />
      <small>Info</small>
      <div v-if="this.mode == 'create'">
        <Create
          :current-geometry="currentGeometry"
          @AlteraForma="AlteraForma"
          @updateColor="updateColor"
        />
      </div>
      <div v-if="this.mode == 'move'">
        <p>mover</p>
      </div>
      <div v-if="this.mode == 'rotate'">
        <p>rotacionar</p>
      </div>
      <div v-if="this.mode == 'transform'">
        <p>Selecione a figura e as alças de modificação surgirão</p>
        <img
          src="/img/transform_info2.gif"
          class="responsive-img"
          alt=""
        >
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "CollapsibleSidenav",
  props: {
    currentGeometry: {
      type: Object,
      default: function() {
        return {
          Geometry: {
            hight: 0,
            width: 0
          }
        };
      }
    }
  },
  data() {
    return {
      mode: "create",
      ModeActive: {
        create: this.mode == "create" ? "active" : "",
        rotate: this.mode == "rotate" ? "active" : "",
        transform: this.mode == "transform" ? "active" : "",
        move: this.mode == "move" ? "active" : ""
      }
    };
  },
  mounted() {
    this.DefineMode("create");
  },
  methods: {
    DefineMode: function(string) {
      this.mode = string;
      this.$emit("DefineMode", this.mode);
      this.ModeActive = {
        create: this.mode == "create" ? "active" : "",
        rotate: this.mode == "rotate" ? "active" : "",
        transform: this.mode == "transform" ? "active" : "",
        move: this.mode == "move" ? "active" : ""
      };
    },
    AlteraForma: function(data) {
      this.$emit("AlteraForma", data);
    },
    updateColor:function(data){
      this.$emit('updateColor', data);
    }
  }
};
</script>