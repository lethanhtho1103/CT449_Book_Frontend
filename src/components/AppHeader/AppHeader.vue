<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <!-- <form class="groupSearch" role="search">
                <input class="inputSearch" type="search" placeholder="Search" aria-label="Search">
                <span class="iconSearch"><i class="fa-solid fa-magnifying-glass"></i></span>
            </form> -->
      <div class="infoUser">
        <!-- <div class="btnLogin">Login</div> -->
        <div v-if="isUserLoggedIn()" class="contentInfo">
          <img
            :src="imageUser"
            class="imageUser"
            style="margin-right: 4px"
            alt="noImage"
          />
          <span class="nameUser">
            {{ username }}
          </span>
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
