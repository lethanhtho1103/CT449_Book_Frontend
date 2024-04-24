<template>
  <div class="containPage" v-if="isLogin">
    <div class="titlePage d-flex">
      <h2>Danh sách nhà xuất bản</h2>
      <div class="ml-auto">
        <button v-if="isLogin" @click="showModal" class="btnAdd">
          <i class="fa-solid fa-shop"></i> Thêm Nhà xuất bản
        </button>
        <router-link to="/admin/login" v-else>
          <button @click="showModal" class="btnAdd">
            <i class="fa-solid fa-mug-hot"></i> Thêm Nhà xuất bản
          </button>
        </router-link>
      </div>
    </div>
    <div class="contentPage">
      <div class="ordersCustomer mt-1">
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên nhà xuất bản</th>
              <th scope="col">Địa chỉ</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            <td colspan="10" v-if="listPublished.length === 0">
              <p class="pt-2">Danh sách nhà xuất bản trống</p>
            </td>
            <tr v-for="(published, index) in listPublished" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ published.TenNxb }}</td>
              <td>{{ published.DiaChi }}</td>
              <td class="d-flex justify-content-center">
                <button @click="showModalEdit(published)" class="accept">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button class="reject" @click="showModalDeny(published, index)">
                  <i class="fa-solid fa-x"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Modal add -->
      <a-modal
        style="top: 40px"
        v-model:open="isModal"
        width="800px"
        title="Thêm nhà xuất bản"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="Thêm"
        cancelText="Đóng"
      >
        <form action="" enctype="multipart/form-data">
          <div class="contentModal row">
            <div class="rightModal col">
              <div class="groupForm">
                <span>Tên nhà xuất bản:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="tenNxb"
                  name="tenNxb"
                  id="tenNxb"
                  placeholder="Tên nhà xuất bản"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.tenNxb">{{ errors.tenNxb }}</p>
              <div class="groupForm">
                <span>Địa chỉ:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="diaChi"
                  name="diaChi"
                  id="diaChi"
                  placeholder="Địa Chỉ"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.diaChi">{{ errors.diaChi }}</p>
            </div>
          </div>
        </form>
      </a-modal>

      <!-- Modal edit -->
      <a-modal
        style="top: 40px"
        v-model:open="isModalEdit"
        width="800px"
        title="Chỉnh sửa nhà xuất bản"
        @ok="handleOkEdit"
        @cancel="handleCancelEdit"
        okText="Cập nhật"
        cancelText="Đóng"
      >
        <form action="" enctype="multipart/form-data">
          <div class="contentModal row">
            <div class="rightModal col">
              <div class="groupForm">
                <span>Tên nhà xuất bản:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="selectedItem.TenNxb"
                  name="tenNxb"
                  id="tenNxb"
                  placeholder="Tên nhà xuất bản"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.tenNxb">{{ errors.tenNxb }}</p>
              <div class="groupForm">
                <span>Địa chỉ:</span>
                <input
                  type="text"
                  class="inputGroup"
                  v-model="selectedItem.DiaChi"
                  name="diaChi"
                  id="diaChi"
                  placeholder="Địa Chỉ"
                  autocomplete="off"
                />
              </div>
              <p class="errorText" v-if="errors.diaChi">{{ errors.diaChi }}</p>
            </div>
          </div>
        </form>
      </a-modal>

      <!-- Modal delete -->
      <a-modal
        style="top: 40px"
        v-model:open="isModalDeny"
        title="Xác nhận hủy đơn mượn"
        @ok="handleOkDeny()"
        :ok-button-props="okButtonDeny"
        @cancel="handleCancelDeny"
        cancelText="Đóng"
        okText="Xác nhận"
      >
        <p>Bạn có chắc muốn xóa: {{ nameSelected }}</p>
      </a-modal>
    </div>
  </div>
  <div v-else class="denied">
    <h3 class="text-center mt-5">Vui lòng đăng nhập để xử dụng dịch vụ</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

const listPublished = ref([]);
const isModalEdit = ref(false);
const isModalDeny = ref(false);
const isLogin = localStorage.getItem("isLogin");
const publishedChoice = ref(null);

const tenNxb = ref("");
const diaChi = ref("");
const nameSelected = ref("");
const selectedItem = ref(null);

const showModalEdit = (item) => {
  isModalEdit.value = true;
  selectedItem.value = item;
};

const showModalDeny = (published, index) => {
  isModalDeny.value = true;
  publishedChoice.value = published;
  nameSelected.value = published.TenNxb;
};

const handleCancelDeny = () => {
  isModalDeny.value = false;
};

const fetchData = () => {
  axios
    .get("http://localhost:8082/published")
    .then((res) => {
      listPublished.value = res.data;
    })
    .catch((err) => console.log(err));
};
fetchData();

const isModal = ref(false);
const showModal = () => {
  isModal.value = true;
};

const handleCancel = () => {
  tenNxb.value = "";
  diaChi.value = "";
  isModal.value = false;
};

const errors = ref({
  tenNxb: "",
  diaChi: "",
});

const handleValidate = () => {
  errors.value.tenNxb = tenNxb.value.trim()
    ? ""
    : "Vui lòng nhập tên nhà xuất bản";
  errors.value.diaChi = diaChi.value.trim() ? "" : "Vui lòng nhập địa chỉ";
};

const handleOk = () => {
  handleValidate();
  const isValid = Object.values(errors.value).every((error) => !error);
  console.log(tenNxb.value, diaChi.value);
  if (isValid) {
    const data = {
      tenNxb: tenNxb.value,
      diaChi: diaChi.value,
    };
    axios
      .post("http://localhost:8082/published", data)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else if (res.data.update) {
          handleCancel();
          toast.info(res.data.update);
          fetchData();
        } else {
          handleCancel();
          toast.success(res.data.message);
          fetchData();
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log("Form is invalid. Please check your inputs.");
  }
};

const handleOkEdit = () => {
  // handleValidate();
  isModalEdit.value = false;
  const data = {
    tenNxb: selectedItem.value.TenNxb,
    diaChi: selectedItem.value.DiaChi,
  };
  axios
    .put("http://localhost:8082/published/" + selectedItem.value._id, data)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.data.message) {
        handleCancel();
        toast.success(res.data.message);
        fetchData();
      }
    })
    .catch((err) => console.log(err));
};

const handleCancelEdit = () => {
  isModalEdit.value = false;
};

const handleOkDeny = () => {
  axios
    .delete("http://localhost:8082/published/" + publishedChoice.value._id)
    .then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        handleCancelDeny();
        toast.success(res.data.message);
        fetchData();
      }
    })
    .catch((err) => console.log(err));
};

const okButtonDeny = {
  style: {
    background: "red",
  },
};
</script>
<style lang="scss" scoped>
@import "./Published.scss";
</style>
