<template>
  <div>
    <template>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0" style="font-family: 'Mitr', sans-serif">
            จัดการธนาคาร
          </h5>
        </a-col>
        <a-col
          :span="24"
          :md="12"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <div class="table-upload-btn">
            <a-button type="primary" @click="showModal" style="color: white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
                  fill="#111827"
                />
              </svg>
              เพิ่มธนาคาร
            </a-button>
          </div>
        </a-col>
      </a-row>
    </template>

    <!-- galleryBlock -->
    <div class="block galleryBlock">
      <v-container>
        <div class="card-body">
          <v-row>
            <v-col
              v-for="item in pageOfItems"
              :key="item.id"
              class="d-flex child-flex"
              cols="6"
              sm="4"
            >
              <!--  content -->

              <figure class="snip1577" >
                <img
                  class="imgforbank"
                  :src="`http://localhost:5000/bank/${item.img}`"
                  alt="bank"
                />
                <figcaption style="width: 100%">
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                    "
                  >
                    <div>
                      <h3>
                        {{ item.bankName }}
                      </h3>
                    </div>
                    <router-link
                      :to="`/setting/EditBank/${item.bankID}`"
                      style="text-decoration: none"
                    >
                      <a  style="text-decoration: none"> แก้ไข </a>
                    </router-link>
                  </div>
                  <h4>{{ item.accountName }}</h4>
                  <h4>{{ item.bankAccount }}</h4>
                </figcaption>
              </figure>

              <!-- /content -->
            </v-col>
          </v-row>
        </div>
        <div class="card-footer pb-0 pt-3">
          <jw-pagination
            :pageSize="6"
            :items="bank"
            @changePage="onChangePage"
            :labels="customLabels"
          ></jw-pagination>
        </div>
      </v-container>
    </div>

    <!--================================================================
                          HERE COME MIDAL 
  =============================================================== -->
    <!-- Modal Start Here -->
    <a-modal
      class="whole-modal-body"
      v-model="visible"
      title="เพิ่มธนาคาร"
      @ok="handleOk"
    >
      <div>
        <form @submit.prevent="submitForm()">
          <div class="wrapper">
            <div class="left-wrapper">
              <div class="bank-box">
                <div class="form-group">
                  <div class="upload-here">
                    <img
                      :src="`http://localhost:5000/bank/${imageName}`"
                      class="img-fluid"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      @change="previewImage"
                      class="form-control-file"
                      id="my-file"
                      style="display: none"
                    />
                  </div>
                </div>
              </div>

              <!--               <div>
                <input type="file" @change="uploadFile" />
              </div> -->
            </div>

            <div class="right-wrapper">
              <div class="info-box">
                <div class="field">
                  <label for="bankName"> ชื่อธนาคาร</label>
                  <select
                    id="bankName"
                    type="text"
                    v-model="bankNameau"
                    @change="checkname()"
                    style="text-indent: 3%"
                  >
                    <option value="" style="text-indent: 3%" disabled>
                      โปรดเลือกธนาคาร
                    </option>
                    <option value="ธนาคารกรุงเทพ" style="text-indent: 3%">
                      ธนาคารกรุงเทพ
                    </option>
                    <option value="ธนาคารกสิกรไทย" style="text-indent: 3%">
                      ธนาคารกสิกรไทย
                    </option>
                    <option value="ธนาคารกรุงไทย" style="text-indent: 3%">
                      ธนาคารกรุงไทย
                    </option>
                    <option value="ธนาคารไทยพาณิชย์" style="text-indent: 3%">
                      ธนาคารไทยพาณิชย์
                    </option>
                    <option value="ธนาคารทหารไทยธนชาต" style="text-indent: 3%">
                      ธนาคารทหารไทยธนชาต
                    </option>
                    <option value="ธนาคารกรุงศรีอยุธยา" style="text-indent: 3%">
                      ธนาคารกรุงศรีอยุธยา
                    </option>
                    <option value="ธนาคารออมสิน" style="text-indent: 3%">
                      ธนาคารออมสิน
                    </option>
                    <option value="ธนาคารยูโอบี" style="text-indent: 3%">
                      ธนาคารยูโอบี
                    </option>
                    <option value="อื่นๆ" style="text-indent: 3%">อื่นๆ</option>
                  </select>

                  <div v-if="bankNameau == 'อื่นๆ'">
                    <input
                      id="bankName"
                      type="text"
                      v-model="bankName"
                      style="text-indent: 3%"
                    />
                  </div>
                  <div class="error" v-if="$v.bankName.$error">
                    <template v-if="!$v.bankName.$invalid"> </template>
                    <template v-else> ต้องระบุธนาคาร </template>
                  </div>
                </div>

                <div class="field">
                  <label for="accountName"> accountName</label>
                  <input
                    id="accountName"
                    type="text"
                    v-model="accountName"
                    style="text-indent: 3%"
                  />
                  <div class="error" v-if="$v.accountName.$error">
                    <template v-if="!$v.accountName.$invalid"> </template>
                    <template v-else> email error </template>
                  </div>
                </div>

                <div class="field">
                  <label for="bankAccount"> เลขธนาคาร</label>
                  <input
                    id="bankAccount"
                    type="text"
                    v-model="bankAccount"
                    style="text-indent: 3%"
                  />
                  <div class="error" v-if="$v.bankAccount.$error">
                    <template v-if="!$v.bankAccount.$invalid"> </template>
                    <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
                  </div>
                </div>

                <div>
                  <a-checkbox @change="changestatus()">
                    Set Default
                  </a-checkbox>
                </div>
              </div>
            </div>
          </div>

          <div class="submit-but-section">
            <button class="submit-button" type="submit">บันทึกข้อมูล</button>
          </div>
        </form>
      </div>
    </a-modal>
    <!--================================================================
                          /HERE COME MIDAL 
  =============================================================== -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  integer,
} from "vuelidate/lib/validators";
import axios from "axios";
const customLabels = {
  first: "<<",
  last: ">>",
  previous: "<",
  next: ">",
};
export default {
  props: ["tabToChange"],
  data() {
    return {
      tabToChange: 'ข้อมูลธนาคาร',
      bankNameau: "",
      bankName: "",
      bankAccount: "",
      accountName: null,
      status: "-",
      bank: [],
      visible: false,
      customLabels,
      pageOfItems: [],
      imageName: "default.png",
      preview: null,
      image: null,
      preview_list: [],
      image_list: [],
    };
  },
  created() {
    this.getbank();
  },
  validations: {
    bankAccount: {
      required,
      integer,
      minLength: minLength(10),
      maxLength: maxLength(12),
    },
    accountName: {
      required,
    },
    bankName: {
      required,
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },
  methods: {
    changeTab(){
      
    },
    checkname() {
      if (this.bankNameau !== "อื่นๆ") {
        this.bankName = this.bankNameau;
      }
      switch (this.bankName) {
        case "ธนาคารกรุงเทพ":
          this.imageName = "กรุงเทพ.jpg";
          break;
        case "ธนาคารกสิกรไทย":
          this.imageName = "กสิกรไทย.jpg";
          break;
        case "ธนาคารกรุงไทย":
          this.imageName = "กรุงไทย.png";
          break;
        case "ธนาคารไทยพาณิชย์":
          this.imageName = "ไทยพาณิชย์.jpg";
          break;
        case "ธนาคารทหารไทยธนชาต":
          this.imageName = "ทหารไทยธนชาต.jpg";
          break;
        case "ธนาคารกรุงศรีอยุธยา":
          this.imageName = "กรุงศรี.png";
          break;
        case "ธนาคารออมสิน":
          this.imageName = "ออมสิน.jpg";
          break;
        case "ธนาคารยูโอบี":
          this.imageName = "UOB.png";
          break;
        default:
          this.imageName = "default.png";
        /*  */
      }
    },
    async submitForm() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post("http://localhost:5000/bank", {
            bankName: this.bankName,
            bankAccount: this.bankAccount,
            accountName: this.accountName,
            status: this.status,
            img: this.imageName,
          })
          .then(() => {
            alert("ok");
            
            window.location.reload(false); 
            
          });
      }
    },
    async getbank() {
      console.log("get-bank");
      try {
        const response = await axios.get("http://localhost:5000/bank");
        this.bank = response.data;
        console.log(this.bank);
      } catch (err) {
        console.log(err);
      }
    },
    changestatus() {
      this.status = "default";
    },
    uploadFile(event) {
      this.file = event.target.files[0];
      console.log(this.file.name);
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
            deletebank(id){
      console.log(id);
        if(window.confirm("Are you sure to delete?")){
            axios.delete(`http://localhost:5000/bank/${id}`) 
                window.location.reload(false);    
        }
    },
    previewImage: function (event) {
      this.file = event.target.files[0];
      console.log(this.file.name);
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>


<style scoped>
@media (min-width: 576px) {
  .col-sm-4 {
    flex: 0 0 auto;
    width: 25%;
  }

  @media (max-width: 576px) {
    .d-flex .child-flex .col-sm-4 .col-6 {
      flex: 0 0 auto;
      width: 100% !important;
    }
  }
}

.error {
  color: red;
}
.action-icon {
  position: relative;
  z-index: 3;
  color: white;
  opacity: 0;
  /* transform: translateY(30px); */
  /* transition: 0.5s; */
  width: 100%;
  height: 100%;
}

.galleryBlock {
  cursor: pointer;
}
.pagination {
  justify-content: center;
  flex-wrap: wrap;
}

/* modal css is here  */
.whole-modal-body {
  font-family: "Mitr", sans-serif;
  width: 100vw;
}
.whole-modal-body >>> .ant-modal {
  width: 70% !important;
}
.whole-modal-body >>> .ant-modal-content {
  width: 50vw default 0;
  margin-left: auto;
  margin-left: auto;
}
.whole-modal-body >>> .ant-modal-header {
  border-bottom: 0;
  align-content: center;
}

.whole-modal-body >>> .ant-modal-footer {
  display: none;
}

.whole-modal-body >>> .ant-modal-title {
  display: none;
}

.wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1em;
}

.left-wrapper {
  width: 40%;
}
.right-wrapper {
  width: 60%;
  display: flex;
  flex-direction: column;
}
.field {
  display: flex;
  flex-direction: column;
  margin: 1em;
}

.field input,
select {
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.089);
  border-radius: 14px;
}
.bank-box {
  padding: 1em;
}
.info-box {
  padding: 1em;
}
.upload-here {
  position: relative;
  background-color: #eeeeee;
  height: 290px;
  width: 290px;
  text-align: center;
}
.text-upload {
  position: relative;
  display: flex;
  flex-direction: column;
}

.img-fluid {
  position: relative;
  object-fit: cover;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.submit-but-section {
  display: flex;
  width: 100%;
  margin-top: 3em;
}

.submit-button {
  background-color: #1890ff;
  height: 36px;
  width: 164px;
  color: white;
  border-radius: 8px;
  border: 0;

  margin-left: auto;
  margin-right: auto;
}

/* /modal css  */

/* card css start here  */
.snip1577 {
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 10px;
  min-width: 233px;
  max-width: 233px;
  width: 100%;
  color: #fff;
  text-align: left;
  font-size: 16px;
  background: #000;
}
.image-box-size {
  width: 290px;
  height: 290px;
}
.snip1577 img {
  position: relative;
  object-fit: cover;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.snip1577 *,
.snip1577:before,
.snip1577:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.snip1577 img {
  max-width: 100%;
  backface-visibility: hidden;
  vertical-align: top;
}

.snip1577:before,
.snip1577:after {
  position: absolute;
  top: 20px;
  right: 20px;
  content: "";
  color: white;
  background-color: #fff;
  z-index: 1;
  opacity: 0;
}

.snip1577:before {
  width: 0;
  height: 1px;
}

.snip1577:after {
  height: 0;
  width: 1px;
}

.snip1577 figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 15px 20px;
}

.snip1577 #icon-thing {
  text-align: end;
}

.snip1577 h3,
.snip1577 h4 {
  margin: 0;
  font-size: 1.1em;
  font-weight: normal;
  opacity: 0;
}

.snip1577 b-icon {
  margin: 0;
  opacity: 0;
}

.snip1577 h4 {
  font-size: 0.8em;
  text-transform: uppercase;
}

.snip1577 a {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.snip1577:hover img,
.snip1577.hover img {
  zoom: 1;
  filter: alpha(opacity=20);
  -webkit-opacity: 0.2;
  opacity: 0.2;
}

.snip1577:hover:before,
.snip1577.hover:before,
.snip1577:hover:after,
.snip1577.hover:after {
  opacity: 1;
  -webkit-transition-delay: 0.25s;
  transition-delay: 0.25s;
  color: white;
}

.snip1577:hover:before,
.snip1577.hover:before {
  width: 40px;
}

.snip1577:hover:after,
.snip1577.hover:after {
  height: 40px;
}

.snip1577:hover h3,
.snip1577.hover h3,
.snip1577:hover h4,
.snip1577.hover h4 {
  color: white;
  opacity: 1;
}

.snip1577:hover b-icon {
  color: white;
  opacity: 1;
}

.snip1577:hover b-icon,
.snip1577.hover b-icon {
  color: white;
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.snip1577:hover h3,
.snip1577.hover h3 {
  color: white;
  -webkit-transition-delay: 0.3s;
  transition-delay: 0.3s;
}

.snip1577:hover h4,
.snip1577.hover h4 {
  color: white;
  -webkit-transition-delay: 0.35s;
  transition-delay: 0.35s;
}

/* end here */
</style>




