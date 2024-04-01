<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div class="infoUser">
        <div v-if="isUserLoggedIn()" class="contentInfo">
          <router-link to="/profile" style="color: #000">
            <img
              :src="imageUser"
              class="imageUser"
              style="margin-right: 4px"
              alt="noImage"
            />
            <span class="nameUser">
              {{ username }}
            </span>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login" class="text-decoration-none">
            <button class="btnLogin">Đăng nhập</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isUserLoggedIn = () => {
  return localStorage.getItem("isLoginDG") === "true";
};

const username = localStorage.getItem("TenDG");
const avatar = localStorage.getItem("AvatarDG");
const imageUser = `http://localhost:8082/${avatar}`;
</script>

<style lang="scss" scoped>
@import "AppHeader.scss";
</style>
