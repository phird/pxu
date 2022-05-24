<template>
  <div class="whole-site">
     <a-alert v-if="success" message="บันทึกข้อมูลสำเร็จ" type="success" show-icon />
    <form @submit.prevent="submitForm(empid)" class="form-for-employee">
      <div class="main-form">
        <div
          class="header-site"
          style="display: flex; flex-direction: row; gap: 1em"
        >
          <button @click="history.back()">
            <b-icon icon="chevron-left"></b-icon>
          </button>
          <span>แก้ไขพนักงาน</span>
        </div>
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
            <template v-else> โปรดระบุชื่อ </template>
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
            <template v-else-if="!$v.employeeNumber.required">
              โปรดใส่เบอร์ผู้ติดต่อ
            </template>
            <template v-else-if="!$v.employeeNumber.validFormat">
              เบอร์ผู้ติดต่อต้องเป็นตัวเลข10หลัก
            </template>
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
            <template v-else-if="!$v.employeeEmail.required">
              โปรดใส่อีเมล
            </template>
            <template v-else-if="!$v.employeeEmail.email">
              ใส่อีเมลให้ถูกต้อง
            </template>
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
        <a-checkbox v-if="statustest == 'default'" checked>
          Set Default
        </a-checkbox>
        <a-checkbox v-else v-model="checked" @change="checkstatus()">
          Set Default
        </a-checkbox>
      </div>

      <div class="submitbutt">
        <button type="submit">บันทึกข้อมูล</button>
      </div>
      <div></div>
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
      success:false,
      empid: "",
      employee: [],
      status: "-",
      statustest:'',
      role: "",
      checked:false,
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
    checkstatus() {
      if(this.checked){
        this.status='default';
      }else{
        this.status='-';
      }
    },
    handleClose() {
      this.visible = false;
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
          .then(()=> {
             this.success = true;
            setTimeout(() => {
              this.$router.back();
            }, 500);
          });
      }
    },
    async getemployee(empid) {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${empid}`
        );
        this.employee = response.data[0];
        this.role = this.employee.role;
        this.statustest = this.employee.employeestatus;
        this.employeeName = this.employee.employeeName;
        this.employeeNumber = this.employee.employeeNumber;
        this.employeeEmail = this.employee.employeeEmail;
        if(this.statustest=='default'){
          this.status=this.statustest;
        }
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
@media only screen and (max-width: 991px) {
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
  .main-form {
    font-family: "Mitr", sans-serif;
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
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
  .form-component {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
  }
}
</style>