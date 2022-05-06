
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
            <select v-model='role'>
                <option value='dev'>dev</option>
                <option value='pm'>pm</option>
            </select>
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
      role: "dev",
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
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      }else{
         await axios.post("http://localhost:5000/employee", {
              role:this.role,
              employeeName:this.employeeName,
              employeeNumber:this.employeeNumber,
              employeeEmail:this.employeeEmail,

        }).then(function(){
          alert('ok');
        });
      }
    },
   
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}

.field > label {
  margin-right: 8px;
}

.error {
  color: red;
  }
</style>