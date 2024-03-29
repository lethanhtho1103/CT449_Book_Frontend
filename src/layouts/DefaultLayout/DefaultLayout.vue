<template>
    <div class="app">

        <SideBar />

        <div class="d-block w-100">
            <AppHeader />
            <router-view />
        </div>

    </div>
</template>
<script setup>
import SideBar from '../../components/SideBar/SideBar.vue';
import AppHeader from '../../components/AppHeader/AppHeader.vue';
</script>
  