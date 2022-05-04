
<template>
  <div>

    <form @submit.prevent="submitForm()">
    
        <div class="field">
          <label for="bankAccount"> เลขธนาคาร</label>
          <input id="bankAccount" type="text" v-model="bankAccount" />
          <div class="error" v-if="$v.bankAccount.$error">
            <template v-if="!$v.bankAccount.$invalid"> </template>
            <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
          </div>
        </div>
        <div class="field">
          <label for="bankName"> ชื่อธนาคาร</label>
          <input id="bankName" type="text" v-model="bankName" />
          <div class="error" v-if="$v.bankName.$error">
            <template v-if="!$v.bankName.$invalid"> </template>
            <template v-else> ต้องระบุชื่อ </template>
          </div>
        </div>
        <div class="field">
          <label for="accountName"> accountName</label>
          <input id="accountName" type="text" v-model="accountName" />
          <div class="error" v-if="$v.accountName.$error">
            <template v-if="!$v.accountName.$invalid"> </template>
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
      bankName: "",
      bankAccount: "",
      accountName: null,
    };
  },

  validations: {

    bankAccount: {
      required,
      minLength:minLength(10),
      maxLength:maxLength(12),
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
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      }else{
         await axios.post("http://localhost:5000/bank", {
              bankName:this.bankName,
              bankAccount:this.bankAccount,
              accountName:this.accountName,

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