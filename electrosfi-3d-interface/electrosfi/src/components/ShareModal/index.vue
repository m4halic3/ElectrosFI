<template>
  <v-dialog max-width="500" v-model="shareModal" @click:outside="closeModal">
    <v-card>
      <v-card-title>
        <p class="text-h5">
          Share your Simulation <br />
          in Social Networks
        </p>
      </v-card-title>
      <v-card-text>
        <SocialBox :url="url" />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              readonly
              v-on="on"
              id="copyBox"
              v-bind="attrs"
              @click="copyToClipboard"
              class="mt-4"
              label="Or copy the link"
              append-icon="mdi-content-copy"
              v-model="url"
            ></v-text-field>
          </template>
          <span>Click to copy</span>
        </v-tooltip>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal" elevation="0">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import SocialBox from "@/components/SocialBox";

export default {
  name: "ShareModal",
  props: {
    show: { type: Boolean, default: false },
    url: { type: String, default: "" }
  },
  components: {
    SocialBox
  },
  methods: {
    closeModal: function() {
      this.$emit("close");
    },
    copyToClipboard: function() {
      var copyText = document.getElementById("copyBox");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
  },
  computed: {
    shareModal: {
      get() {
        return this.show;
      },
      set() {
        this.closeModal();
      }
    }
  }
};
</script>
