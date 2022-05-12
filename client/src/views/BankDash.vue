<template>
  <div class="whole-page">
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
              <div class="iteminPage">
                <router-link
                  :to="`/setting/EditBank/${item.bankID}`"
                  style="text-decoration: none"
                >
                  <figure class="snip1577">
                    <div
                      v-if="item.status == 'default'"
                      style="
                        z-index: 50;
                        position: absolute;
                        background-color: black;
                        color: white;
                        width: 30%;
                        margin-left: 68%;
                        text-align: center;
                        top: 2%;
                        opacity: 50%;
                        border-radius: 14px
                        padding: 6px
                        
                      "
                    >
                      <span style="font-size: 14px">DEFAULT</span>
                    </div>
                    <div v-else></div>
                    <img
                      :src="`http://localhost:5000/bank/${item.img}`"
                      alt="bank"
                    />
                    <figcaption>
                      <h3>
                        {{ item.bankName }}
                        <b-icon icon="pencil-fill" id="icon-thing"></b-icon>
                      </h3>
                      <h4 style="opacity: 50%">{{ item.accountName }}</h4>
                      <h4 style="opacity: 50%">{{ item.bankAccount }}</h4>
                    </figcaption>
                  </figure>
                </router-link>
              </div>
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
                    <template v-else> โปรดระบุธนาคาร </template>
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
                    <template v-else> โปรดใส่ชื่อบัญชีธนาคาร </template>
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
                    <template v-else-if="!$v.bankAccount.required">
                      โปรดใส่เลขบัญชีธนาคาร
                    </template>
                    <template v-else-if="!$v.bankAccount.minLength">
                      เลขบัญชีธนาคารต้องเป็นตัวเลข10-12หลัก
                    </template>
                  </div>
                </div>

                <div>
                  <a-checkbox
                    v-model="checked"
                    @change="checkstatus()"
                  >
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
  data() {
    return {
      bankNameau: "",
      bankName: "",
      bankAccount: "",
      accountName: null,
      checked:false,
      status: "-",
      bank: [],
      visible: false,
      customLabels,
      pageOfItems: [],
      imageName: "default.png",
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
    checkstatus() {
      if(this.checked){
        this.status='default';
      }else{
        this.status='-';
      }
    },
    checkname() {
      if (this.bankNameau !== "อื่นๆ") {
        this.bankName = this.bankNameau;
      } else {
        this.bankName = "";
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
            alert("บันทึกข้อมูลสำเร็จ");
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
  },
};
</script>


<style scoped>
.whole-page {
  font-family: "Mitr", sans-serif;
  background-color: white;
  border-radius: 14px;
  padding: 4em;
  background-color: white;
  border-radius: 14px;
  border: none;
  margin-bottom: 2rem;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
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

/* card css start here  */
.snip1577 {
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 10px;
  /* max-height: 175px !important; */
  width: 100% !important;
  color: #fff;
  text-align: left;
  font-size: 16px;
  background: #000;
}
.image-box-size {
  width: 400px;
  height: 400px;
}
.snip1577 img {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  font-size: 24px;
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
  zoom: 2;
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
  height: 400px;
  width: 400px;
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
  margin-bottom: 2em;
}
/* /modal css  */

@media only screen and (max-width: 991px) {
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
    flex-direction: column;
    padding: 1em;
  }

  .left-wrapper {
    width: 100%;
  }
  .right-wrapper {
    width: 100%;
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
    height: 150px;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
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
}
</style>




