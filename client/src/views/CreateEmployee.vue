<template>
  <div>
    <form @submit.prevent="submitForm()">
      <div class="field">
        <label for="employeeNumber"> เบอร์ผู้ติดต่อ</label>
        <input id="employeeNumber" type="text" v-model="employeeNumber" />
        <div class="error" v-if="$v.employeeNumber.$error">
          <template v-if="!$v.employeeNumber.$invalid"> </template>
          <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
        </div>
      </div>
      <div class="field">
        <label for="employeeName"> ชื่อผู้ติดต่อ</label>
        <input id="employeeName" type="text" v-model="employeeName" />
        <div class="error" v-if="$v.employeeName.$error">
          <template v-if="!$v.employeeName.$invalid"> </template>
          <template v-else> ต้องระบุชื่อ </template>
        </div>
      </div>
      <div class="field">
        <label for="employeeEmail"> emailผู้ติดต่อ</label>
        <input id="employeeEmail" type="text" v-model="employeeEmail" />
        <div class="error" v-if="$v.employeeEmail.$error">
          <template v-if="!$v.employeeEmail.$invalid"> </template>
          <template v-else> email error </template>
        </div>
      </div>
      <div class="field">
        <select v-model="role">
          <option value="ผู้ดูแล">ผู้ดูแล</option>
          <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
        </select>
      </div>
      <div>
        <a-checkbox @change="changestatus()"> Set Default </a-checkbox>
      </div>

      <button type="submit">ส่งแบบฟอร์ม</button>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      status: "-",
      role: "ผู้ดูแล",
      employeeName: "",
      employeeNumber: "",
      employeeEmail: null,
    };
  },

  validations: {
    employeeNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    employeeEmail: {
      required,
      email,
    },
    employeeName: {
      required,
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },

  methods: {
    changestatus(){
      this.status='default';
    },
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post("http://localhost:5000/employee", {
            role: this.role,
            employeeName: this.employeeName,
            employeeNumber: this.employeeNumber,
            employeeEmail: this.employeeEmail,
            status: this.status,
          })
          .then(function () {
            alert("ok");
          });
      }
    },
  },
};
</script>

<style scoped>
.pagebody{
  display: flex;
  flex-direction: column;
}
.pagebody-upper{
  background-color: red;
  height: 200px;
}

.header-solid {
  font-family: "Mitr", sans-serif;
}
.form-for-customer {
  font-family: "Mitr", sans-serif;
  align-content: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.contact-person-section-buttom {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 2em;
}
.contact-person-section-buttom-part {
  width: 100%;
}

#employeeName {
  background-image: url("../assets/images/icons/file-icons/person-circle.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#employeeNumber {
  background-image: url("../assets/images/icons/file-icons/telephone-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}
#employeeEmail {
  background-image: url("../assets/images/icons/file-icons/envelope-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#addr-detail input {
  width: 100%;
}
#addr-box {
  display: flex;
  flex-direction: column;
}

.addr-info-section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.addr-info-section div {
  width: 45%;
}
.form-for-customer .field input {
  border-radius: 12px;
  height: 45px;
}

.field input {
  border: 1 solid rgba(190, 187, 187, 0.801);
}

.contact-person-section {
  display: flex;
  flex-direction: column;
}
/* modal style start here  */
.title-modal {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.title-modal p {
  font-size: 26px;
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  align-content: center;
}
.whole-modal-body {
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

.toggle-type-customer {
  display: flex;
  flex-direction: row;
  padding: 1em 1em 1em 0;
}
.toggle-type-customer div {
  padding: 1em;
}
.radio-selected {
  justify-content: center;
}

.radio-selected input {
  margin-right: 1em;
  height: 21px;
  width: 21px;
}
.error {
  color: red;
}
.field {
  margin-bottom: 1em;
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

.autocom-add >>> .vth-addr-input-size-default {
  font-size: 14px;
  font-family: "Mitr", sans-serif;
  border-radius: 12px;
  width: 200%;
  opacity: 0.5;
  text-indent: 4%;
}

@media only screen and (max-width: 991px) {
  .contact-person-section-buttom {
    flex-direction: column;
    gap: 0;
  }
  #employeeName {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }

  #employeeNumber {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }
  #employeeEmail {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }
  .addr-info-section {
    flex-direction: column;
  }
  .autocom-add >>> .vth-addr-input-size-default {
    border-radius: 12px;
    width: 500%;
  }
}
/* / modal style end here  */
</style>