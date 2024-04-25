<template>
  <div class="containPage">
    <div class="titlePage">
      <h2>
        Chào mừng bạn đến với
        <span class="titleWeb">TT<span class="text-dark">Store</span></span>
      </h2>
    </div>
    <div class="contentPage">
      <!-- Section: Design Block -->
      <section class="">
        <!-- Jumbotron -->
        <div class="text-center text-lg-start">
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h1 class="my-5 fw-bold ls-tight titleIntro">
                  Không có người bạn nào chung thành như
                  <span class="titleWeb"
                    >Sách.<span class="text-dark"></span
                  ></span>
                  <br />
                  <span class="text-primary">(Ernest Hemingway)</span>
                </h1>
                <p style="color: hsl(217, 10%, 50.8%)">
                  Sách không chỉ là những trang kiến ​​thức mà còn là cánh cửa
                  mở ra những thế giới mới, nguồn cảm hứng vô tận và người bạn
                  đồng hành trung thành trong những giây phút cô đơn nhất của
                  cuộc đời. Trong từng trang, chúng tôi khám phá không chỉ văn
                  hóa, lịch sử và triết lý nhân văn mà còn gặp phải những điều
                  kỳ diệu, những cuộc phiêu lưu, và những bài học quý giá cho
                  chính chúng ta.
                </p>

                <router-link to="/about" class="text-decoration-none">
                  <button class="btnReadMore">Mượn sách</button>
                </router-link>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="imageCup">
                    <img src="../../../assets/bg-home.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Jumbotron -->
      </section>
      <!-- Section: Design Block -->
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "./Home.scss";
</style>
