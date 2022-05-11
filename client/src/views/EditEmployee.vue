<template>
  <div class="whole-site">
    
    <form @submit.prevent="submitForm(empid)" class="form-for-employee">
      <button @click="history.back()">Go Back</button>
      <div class="main-form">
        <div><p>แก้ไขพนักงาน</p></div>
        <div class="form-component max-len">
          <label for="employeeName"> ชื่อพนักงาน </label>
          <input
            id="employeeName"
            type="text"
            v-model="employeeName"
            placeholder="ชื่อ-สกุล พนักงาน"
          />
          <div class="error" v-if="$v.employeeName.$error">
            <template v-if="!$v.employeeName.$invalid"> </template>
            <template v-else> ต้องระบุชื่อ </template>
          </div>
        </div>

        <div class="form-component">
          <label for="employeeNumber"> เบอร์ผู้ติดต่อ</label>
          <input
            id="employeeNumber"
            type="text"
            v-model="employeeNumber"
            placeholder="เบอร์โทรของผู้ติดต่อ"
          />
          <div class="error" v-if="$v.employeeNumber.$error">
            <template v-if="!$v.employeeNumber.$invalid"> </template>
            <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
          </div>
        </div>

        <div class="form-component">
          <label for="employeeEmail"> อีเมลพนักงาน</label>
          <input
            id="employeeEmail"
            type="text"
            v-model="employeeEmail"
            placeholder="อีเมลของพนักงาน"
          />
          <div class="error" v-if="$v.employeeEmail.$error">
            <template v-if="!$v.employeeEmail.$invalid"> </template>
            <template v-else> email error </template>
          </div>
        </div>

        <div class="form-component">
          <label for="role"> หน้าที่ </label>
          <select v-model="role">
            <option value="ผู้ดูแล">ผู้ดูแล</option>
            <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
          </select>
        </div>
      </div>

      <div class="set-Default">
        <a-checkbox v-if="status == 'default'" checked>
          Set Default
        </a-checkbox>
        <a-checkbox v-else @change="changestatus()"> Set Default </a-checkbox>
      </div>

      <div class="submitbutt">
        <button type="submit">บันทึกข้อมูล</button>
      </div>
      <div>
  </div>
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
      empid: "",
      employee: [],
      status: "",
      role: "",
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
  created() {
    this.empid = this.$route.params.id;
    this.getemployee(this.empid);
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    changestatus() {
      this.status = "default";
    },
    async submitForm(id) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post(`http://localhost:5000/employee/${id}`, {
            role: this.role,
            employeeName: this.employeeName,
            employeeNumber: this.employeeNumber,
            employeeEmail: this.employeeEmail,
            status: this.status,
          })
          .then(function () {
            alert("บันทึกข้อมูลสำเร็จ");
            window.location.replace("http://localhost:8080/#/setting/employee");
          });
      }
    },
    async getemployee(empid) {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${empid}`
        );
        this.employee = response.data[0];
        // console.log(this.customer);
        this.role = this.employee.role;
        this.status = this.employee.status;
        this.employeeName = this.employee.employeeName;
        this.employeeNumber = this.employee.employeeNumber;
        this.employeeEmail = this.employee.employeeEmail;
      } catch (err) {
        console.log(err);
        window.location.reload(false);
      }
    },
  },
};
</script>

<style scoped>
.whole-site {
  background-color: white;
  border-radius: 14px;
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
.layout-dashboard .ant-card {
  font-family: "Mitr", sans-serif;
  border-radius: 12px;
  box-shadow: none !important;
}

.main-form {
  font-family: "Mitr", sans-serif;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}

.form-component {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1em;
}

.form-component input {
  height: 45px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.123);
  text-indent: 3%;
}

.form-component select {
  height: 45px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.123);
  text-indent: 3%;
}

.max-len {
  display: flex;
  flex-direction: column;
  width: 100% !important;
  padding: 1em;
}

.max-len input {
  text-indent: 1.5% !important;
}

/* modal start here */

.whole-modal-body {
  font-family: "Mitr", sans-serif;
  width: 100vw;
}
.whole-modal-body >>> .ant-modal {
  width: 70% !important;
}
.whole-modal-body >>> .ant-modal-footer {
  display: none;
}
.submitbutt {
  display: flex;
  justify-content: flex-end;
}
.submitbutt button {
  color: white;
  background-color: #7367f0;
  border-radius: 14px;
  border: 0;
  margin: auto;
  padding: 1em;
}
.set-Default {
  padding: 1em;
}
.error {
  color: red;
}
</style>