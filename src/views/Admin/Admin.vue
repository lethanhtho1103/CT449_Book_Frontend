<template>
  <div class="containPage" v-if="isLogin">
    <h2>Dashboard</h2>
    <div class="contentPage">
      <div class="listCard">
        <div class="row pl-3">
          <div class="col">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard">
                  <i class="fa-solid fa-cart-shopping"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalOrder }}
                </div>
                <div class="nameCard">Đơn mượn</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #e9a4a4">
                  <i class="fa-solid fa-ban" style="color: #d50d0d"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalDenied }}
                </div>
                <div class="nameCard">Đơn mượn đã hủy</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #cbe2ff">
                  <i
                    class="fa-solid fa-hourglass-half"
                    style="color: #007bff"
                  ></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalPending }}
                </div>
                <div class="nameCard">Đơn mượn chờ</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #cdf1ef">
                  <!-- <i class="fa-solid fa-money-bill-wave" style="color: #05B9AA;"></i> -->
                  <i class="fa-solid fa-user-tie" style="color: #05b9aa"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalStaff }}
                </div>
                <div class="nameCard">Tổng nhân viên</div>
              </div>
            </div>
          </div>
          <div class="col d-flex">
            <div class="cardInfo">
              <div class="leftCard">
                <div class="iconCard" style="background-color: #e5cff7">
                  <i class="fa-solid fa-user" style="color: #bc7af9"></i>
                </div>
              </div>
              <div class="rightCard">
                <div class="numberCard">
                  {{ totalCustomer }}
                </div>
                <div class="nameCard">Tổng độc giả</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="px-4 mt-2 mb-0">Đơn mượn sách</h3>
      <div class="ordersCustomer mt-1">
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên độc giả</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Ngày mượn</th>
              <th scope="col">Ngày trả</th>
              <th scope="col">Số quyển</th>
              <th scope="col">Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <td colspan="10" v-if="listRents.length === 0">
              <p class="pt-2">Danh sách order trống</p>
            </td>
            <tr v-for="(rent, index) in listRents" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ rent.MaDocGia.Ten }}</td>
              <td>{{ rent.MaSach.TenSach }}</td>
              <td>{{ formatDateTime(rent.NgayMuon) }}</td>
              <td>{{ formatDateTime(rent.NgayTra) }}</td>
              <td>{{ rent.SoLuong }}</td>
              <td>
                {{
                  tinhTien(
                    rent.NgayTra,
                    rent.NgayMuon,
                    rent.SoLuong,
                    rent.MaSach.DonGia
                  )
                }}
              </td>
              <!-- <td>
                <input
                  class="inputDate"
                  type="datetime-local"
                  v-model="rent.NgayGH"
                />
              </td> -->
              <td class="d-flex justify-content-center">
                <button @click="handleAccess(rent)" class="accept">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button class="reject" @click="handleDenied(rent)">
                  <i class="fa-solid fa-x"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="denied">
    <img
      class="d-flex mt-5 ml-auto mr-auto mb-5"
      src="../../../public/imageIcon.jpg"
      alt=""
    />
    <h3 class="text-center">Vui lòng đăng nhập để xử dụng dịch vụ</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import moment from "moment";

const listRents = ref([]);

const totalCustomer = ref("");
const totalOrder = ref("");
const totalDenied = ref("");
const totalPending = ref("");
const totalStaff = ref("");

const isLogin = localStorage.getItem("isLogin");

const fetchData = () => {
  axios
    .get("http://localhost:8082/rent?trangThai=W")
    .then((res) => {
      listRents.value = res.data;
      console.log(listRents.value);
    })
    .catch((err) => console.log(err));
};

fetchData();

function tinhTien(ngayBatDau, ngayKetThuc, soQuyen, giaPerQuyen) {
  // Tạo đối tượng Date từ chuỗi ngày bắt đầu và kết thúc
  var startDate = new Date(ngayBatDau);
  var endDate = new Date(ngayKetThuc);

  // Chuyển ngày thành milliseconds
  var oneDay = 24 * 60 * 60 * 1000; // Số milliseconds trong 1 ngày

  // Tính số ngày giữa hai ngày
  var soNgay = Math.round(Math.abs((startDate - endDate) / oneDay));

  // Tính tổng tiền
  var tongTien = soQuyen * giaPerQuyen * soNgay;

  return tongTien;
}

const dashBoard = () => {
  axios
    .get("http://localhost:8082/customer/dashboard")
    .then((res) => {
      totalCustomer.value = res.data.user;
      totalStaff.value = res.data.staff;
      totalOrder.value = res.data.rent.length;
      totalDenied.value = res.data.rentDenied.length;
      totalPending.value = res.data.rentWaiting.length;
    })
    .catch((err) => console.log(err));
};

dashBoard();

const formatDateTime = (dateTime) => {
  return moment(dateTime).format("DD-MM-YYYY HH:mm:ss");
};

const handleAccess = (rent) => {
  axios
    .put("http://localhost:8082/rent/" + rent._id, {
      trangThai: "A",
      thanhTien: tinhTien(
        rent.NgayTra,
        rent.NgayMuon,
        rent.SoLuong,
        rent.MaSach.DonGia
      ),
      traSach: "N",
    })
    .then((res) => {
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        fetchData();
        dashBoard();
        toast.success("Đã duyệt đơn mượn thành công.");
      }
    })
    .catch((err) => console.log(err));
};
const handleDenied = (rent) => {
  axios
    .put("http://localhost:8082/rent/" + rent._id, {
      trangThai: "D",
      thanhTien: tinhTien(
        rent.NgayTra,
        rent.NgayMuon,
        rent.SoLuong,
        rent.MaSach.DonGia
      ),
    })
    .then((res) => {
      console.log(res);
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        fetchData();
        dashBoard();
        toast.success("Đã từ chối đơn mượn thành công.");
      }
    })
    .catch((err) => console.log(err));
};
</script>
<style lang="scss" scoped>
@import "./Admin.scss";
</style>
