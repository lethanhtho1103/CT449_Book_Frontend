<template>
  <div class="containPage">
    <h2>Đơn mượn đã duyệt</h2>
    <div class="contentPage" :style="`${isLogin ? '' : 'display: none'}`">
      <div class="list-group">
        <div v-if="dataRented.length === 0" class="orderEmpty">
          <p>Đơn mượn trống</p>
        </div>
        <div
          v-for="(rented, index) in dataRented"
          :key="rented._id"
          class="list-group-item list-group-item-action mt-3 rounded"
        >
          <div class="infoUser mb-2">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="font-weight-bold">Thông tin độc giả:</h5>
              <p
                class="m-0 font-weight-bold"
                style="color: #40c1fa; font-size: 1.4rem"
              >
                <span class="mr-2">{{ index + 1 }}</span>
                <a-dropdown class="ml-auto">
                  <a class="ant-dropdown-link" @click.prevent>
                    <i class="fa-solid fa-ellipsis-vertical fa-primary"></i>
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <a @click="showModal(rented)"
                          ><i
                            class="fa-solid fa-circle-info"
                            style="color: blue"
                          ></i
                        ></a>
                      </a-menu-item>
                      <a-menu-item>
                        <a @click="showModalDelete(rented)"
                          ><i class="fa-solid fa-trash" style="color: red"></i
                        ></a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </p>
            </div>

            <p class="d-inline">
              Họ tên: {{ rented.MaDocGia.HoLot }} {{ rented.MaDocGia.Ten }}
            </p>
            <p class="ml-3 d-inline">
              Số điện thoại: {{ rented.MaDocGia.DienThoai }}
            </p>
            <p class="ml-3 d-inline">Địa chỉ: {{ rented.MaDocGia.DiaChi }}</p>
          </div>
          <div class="d-flex">
            <h5>Chi tiết đơn mượn:</h5>
            <a-modal
              style="top: 40px"
              v-model:open="isModalDelete"
              title="Xóa đơn mượn"
              @ok="handleOkDelete()"
              :ok-button-props="okButtonProps"
              @cancel="handleCancelDelete"
              cancelText="Đóng"
              okText="Xóa đơn mượn"
            >
              <p>Bạn có chắc muốn xóa đơn mượn.</p>
            </a-modal>
            <a-modal
              style="top: 40px"
              v-model:open="isModal"
              width="800px"
              title="Chi tiết đơn mượn"
              @ok="handleOk"
              @cancel="handleCancel"
              cancelText="Đóng"
              :ok-button-props="okButtonHidden"
            >
              <!-- <table class="table text-center">
                <thead>
                  <tr class="table-borderless">
                    <th scope="col">STT</th>
                    <th scope="col">Tên sách</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá mượn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(detail, index) in dataDetail." :key="detail._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ detail.MSHH[0].TenHH }}</td>
                    <td>
                      <div class="numberCup">
                        <p class="ml-1 mr-1 mb-0">{{ detail.SoLuong }}</p>
                      </div>
                    </td>
                    <td>
                      {{
                        (detail.MSHH[0].Gia * detail.SoLuong).toLocaleString(
                          "vi-VN"
                        )
                      }}VND
                    </td>
                  </tr>
                </tbody>
              </table> -->
            </a-modal>
          </div>
          <table class="table text-center">
            <thead>
              <tr class="table-borderless">
                <th scope="col">Tên sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá/ngày</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ rented.MaSach.TenSach }}</td>
                <td>{{ rented.SoLuong }}</td>
                <td>{{ rented.MaSach.DonGia }} VND</td>
                <td>
                  {{ rented.TraSach === "Y" ? "Đã trả sách" : "Đang mượn" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex">
            <div>
              <p>
                Thành tiền:
                <span style="color: #d50d0d">{{ rented.ThanhTien }} VND</span>
              </p>
              <p class="d-inline">
                Ngày mượn sách: {{ formatDateTime(rented.NgayMuon) }}
              </p>
              <p class="d-inline ml-3">
                Ngày trả sách: {{ formatDateTime(rented.NgayTra) }}
              </p>
            </div>
            <div
              v-if="rented.TrangThai === 'A'"
              class="statusOrderSuccess mr-0 mb-0"
            >
              Đã duyệt
            </div>
            <div v-else class="statusOrderWait mr-0 mb-0">Đã hủy</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import moment from "moment";

const dataRented = ref([]);

const isLogin = localStorage.getItem("isLogin");

const fetchData = () => {
  axios
    .get("http://localhost:8082/rent")
    .then((res) => {
      dataRented.value = res.data.filter((item) => item.TrangThai !== "W");
    })
    .catch((err) => console.log(err));
};

fetchData();

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("DD-MM-YYYY HH:mm:ss");
};

const dataDetail = ref([]);
const numberDetail = ref(0);

const isModal = ref(false);

const showModal = (order) => {
  isModal.value = true;
  dataDetail.value = order;
};

const handleCancel = () => {
  isModal.value = false;
};

const handleOk = () => {
  isModal.value = false;
};

const handleSelectDetail = (detail) => {
  console.log("Chi tiet detail", detail);
  numberDetail.value = detail.SoLuong;
  console.log("So Luong", numberDetail.value);
};

const isModalDelete = ref(false);

const idOrder = ref("");

const showModalDelete = (order) => {
  isModalDelete.value = true;
  idOrder.value = order._id;
};

const handleCancelDelete = () => {
  isModalDelete.value = false;
};

const handleOkDelete = () => {
  axios
    .delete("http://localhost:8082/rent/" + idOrder.value)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        handleCancelDelete();
        fetchData();
        toast.success(res.data.message);
      }
    })
    .catch((err) => console.log(err));
};

const okButtonProps = {
  style: {
    background: "red", // Đặt màu đỏ cho nút "OK"
  },
};

const okButtonHidden = {
  style: {
    display: "none",
  },
};
</script>

<style lang="scss" scoped>
@import "./HistoryAdmin.scss";
</style>
