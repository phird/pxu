<template>
  <div>
        <form @submit.prevent="submitForm(empid)" class="form-for-employee">
          <div class="main-form">
              <div> <button onclick="router.back()">Go Back</button> <p> แก้ไขพนักงาน </p> </div>
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
            <a-checkbox @change="changestatus()"> Set Default </a-checkbox>
          </div>

          <div class="submitbutt">
            <button type="submit">บันทึกข้อมูล</button>
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
  created() {
    this.empid = this.$route.params.id;
    this.getemployee(this.empid);
  },
  methods: {
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
            window.location.reload(false);  
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