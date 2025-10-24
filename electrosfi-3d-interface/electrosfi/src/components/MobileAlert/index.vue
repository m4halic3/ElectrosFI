<template>
  <div class="alertaMobile show hide-on-med-and-up row">
    <div class="center">
      <md-empty-state
        class="md-primary"
        md-icon="warning"
        md-label="Ainda não estamos preparados para esta resolução de tela"
        md-description="Estamos trabalhando para disponibilizar uma experiência melhor para você."
      />
      <md-button to="/dashboard">
        Voltar à administração
      </md-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertMobile"
};
</script>
<style scoped>
.alertaMobile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 999999999;
}
</style>