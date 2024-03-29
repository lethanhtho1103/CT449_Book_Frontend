<template>
  <div class="app">
    <SideBarAdmin />
    <div class="d-block w-100">
      <AppHeaderAdmin />
      <div class="scrollable"><router-view /></div>
    </div>
  </div>
</template>
<script setup>
import SideBarAdmin from "../../components/SideBarAdmin/SideBarAdmin.vue";
import AppHeaderAdmin from "../../components/AppHeaderAdmin/AppHeaderAdmin.vue";
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  min-height: calc(100vh - 72px);
}
</style>
