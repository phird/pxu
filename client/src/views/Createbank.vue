
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
  integer,
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      bankName: "",
      bankAccount: "",
      accountName: null,
      status:"-",
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

  methods: {
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

          })
          .then(function () {
            alert("ok");
          });
      }
    },
    changestatus(){
      this.status='default';
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