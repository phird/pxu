<template>
  <div class="wholenewsite">
        <div class="alert">
      <div v-if="modalconfirm" class="modal-confirmation">
        <span style="margin-bottom: 2em">
          <b-icon icon="trash" font-scale="5" ></b-icon>
        </span>
        <p id="confirm-text">คุณแน่ใจว่าจะลบธนาคารนี้นี้ใช่หรือไม่</p>
        <div class="button-section">
          <div>
            <button @click="deletebank(bID)" class="confirm-butt-alert">
              ยืนยัน
            </button>
          </div>
          <div>
            <button @click="modalconfirm = false" class="cancle-butt-alert">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="whole-site" :class="{ isNotModalconfirm: modalconfirm }">
      <a-alert v-if="nerror" message="ลบพนักงานสำเร็จ" type="error" show-icon />
      <form @submit.prevent="submitForm(bID)">
        <div
          class="header-site"
          style="display: flex; flex-direction: row; gap: 1em"
        >
          <button @click="history.back()" style="font-size: 22px">
            <b-icon icon="chevron-left"></b-icon>
          </button>
          <span>แก้ไขธนาคาร</span>
        </div>
        <a-alert
          v-if="success"
          message="บันทึกข้อมูลสำเร็จ"
          type="success"
          show-icon
        />
        <div class="wrapper">
          <div class="left-wrapper">
            <div class="bank-box">
              <div class="form-group">
                <div class="upload-here">
                  <img
                    :src="`http://128.199.187.173:5000/bank/${imageName}`"
                    class="img-fluid"
                  />
                  <input
                    type="file"
                    accept="image/*"
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
                  <template v-else-if="!$v.bankAccount.validFormat">
                    เลขบัญชีธนาคารต้องเป็นตัวเลข10-12หลัก
                  </template>
                </div>
              </div>

              <div>
                <a-checkbox v-if="statustest == 'default'" checked>
                  Set Default
                </a-checkbox>
                <a-checkbox v-else v-model="checked" @change="checkstatus()">
                  Set Default
                </a-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="buttom-section">
          <div class="submit-but-section">
            <div>
              <button class="submit-button" type="submit">บันทึกข้อมูล</button>
            </div>
          </div>
        </div>
      </form>
      <div class="delete-section">
        <button
          class="delete-button"
          type="delete"
          @click="modalconfirm = true"
        >
          ลบ
        </button>
      </div>
    </div>
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
export default {
  data() {
    return {
      success: false,
      bID: "",
      bankNameau: "",
      bankName: "",
      bankAccount: "",
      accountName: null,
      status: "-",
      checked: false,
      statustest: "",
      bank: [],
      imageName: "default.png",
      nerror: false,
      modalconfirm: false,
    };
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
  created() {
    this.bID = this.$route.params.id;
    this.getbank(this.bID);
  },
  methods: {
    checkstatus() {
      if (this.checked) {
        this.status = "default";
      } else {
        this.status = "-";
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

    async submitForm(bID) {
      this.$v.$touch();

      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post(`http://128.199.187.173:5000/bank/${bID}`, {
            bankName: this.bankName,
            bankAccount: this.bankAccount,
            accountName: this.accountName,
            status: this.status,
            img: this.imageName,
          })
          .then(() => {
            this.success = true;
            setTimeout(() => {
              this.$router.back();
            }, 500);
          });
      }
    },
    async getbank(bID) {
      console.log("get-bank");
      try {
        const response = await axios.get(
          `http://128.199.187.173:5000/bank/${bID}`
        );
        this.bankName = response.data[0].bankName;
        this.bankNameau = this.bankName;
        this.bankAccount = response.data[0].bankAccount;
        this.accountName = response.data[0].accountName;
        this.statustest = response.data[0].bankstatus;
        this.imageName = response.data[0].img;
        if (this.statustest == "default") {
          this.status = this.statustest;
        }
      } catch (err) {
        console.log(err);
      }
    },
    deletebank(bID) {
      axios.delete(`http://128.199.187.173:5000/bank/${bID}`);
      this.modalconfirm = false;
      this.nerror = true;
      setTimeout(() => {
        history.back();
      }, 500);
    },
  },
};
</script>

<style scoped>
/* conformation start here  */

.alert {
  display: flex;
  position: absolute;
  z-index: 100;
  width: 100%;
}
.modal-confirmation {
  background-color: rgb(255, 255, 255);
  padding: 3em;
  width: 50%;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
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
}
.button-section {
  display: flex;
  flex-direction: row;
  gap: 2em;
  margin-left: auto;
  margin-right: 0;
  text-align: end;
}
.button-section div {
  display: flex;
}
#confirm-text {
  font-size: 24px;
}
.wholenewsite {
  position: relative;
}

.isNotModalconfirm {
  opacity: 0.4;
  pointer-events: none;
}
.confirm-butt-alert{
  display: inline-block;
  background-color: green;
  padding: .6em;
  width: 100px;
  color: white;
  border-radius: 14px;
}
.cancle-butt-alert{
  display: inline-block;
  background-color: rgb(212, 37, 110);
  padding: .6em;
  width: 100px;
  color: white;
  border-radius: 14px;
}

/* confirmation end here */
.whole-site {
  position: relative;
  font-family: "Mitr", sans-serif;
  padding: 2em;
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
  width: 100%;
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

.snip1577 h3,
.snip1577 h4 {
  margin: 0;
  font-size: 1.1em;
  font-weight: normal;
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
.whole-modal-body >>> .layout-dashboard .ant-layout-content {
  padding: 4em !important;
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
  padding: 2em;
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
  flex-direction: row;
  margin-left: 80%;
}
.submit-but-section div {
  display: flex;
}

.submit-button {
  background-color: #1890ff;
  height: 36px;
  width: 164px;
  color: white;
  border-radius: 8px;
  border: 0;
}
.buttom-section {
  display: flex;
  width: 100%;
}
.delete-section {
  display: flex;
  width: 100%;
  height: 80px;
}
.delete-button {
  background-color: #5f0724;
  position: absolute;
  height: 36px;
  width: 164px;
  color: white;
  border-radius: 8px;
  border: 0;
  margin-left: 0;
  margin-right: auto;
  bottom: 113px;
  left: 100px;
}
/* /modal css  */

@media only screen and (max-width: 991px) {
  .whole-modal-body {
    font-family: "Mitr", sans-serif;
    width: 100vw;
  }
  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .upload-here {
    padding: 1px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 200px;
  }
  .left-wrapper {
    width: 100%;
  }
  .right-wrapper {
    width: 100%;
  }
  .submit-but-section {
    display: flex;
    width: 100%;
    padding-top: 5px;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
  }
  .delete-section {
    width: 100%;
    text-align: center;
    align-content: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  .delete-button {
    background-color: #5f0724;
    position: relative;
    height: 36px;
    width: 164px;
    color: white;
    border-radius: 8px;
    border: 0;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    bottom: 0px;
    left: 0;
  }
}
</style>