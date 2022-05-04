
<template>
  <div>
    <form @submit.prevent="submitForm()">
      <div class="field">
        <label for="companyNumber"> เบอร์บริษัท</label>
        <input id="companyNumber" type="text" v-model="companyNumber" />
        <div class="error" v-if="$v.companyNumber.$error">
          <template v-if="!$v.companyNumber.$invalid"> </template>
          <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
        </div>
      </div>
      <div class="field">
        <label for="companyName"> ชื่อบริษัท</label>
        <input id="companyName" type="text" v-model="companyName" />
        <div class="error" v-if="$v.companyName.$error">
          <template v-if="!$v.companyName.$invalid"> </template>
          <template v-else> ต้องระบุชื่อ </template>
        </div>
      </div>
      <div class="field">
        <label for="taxNumber">เลขกำกับภาษี</label>
        <input id="taxNumber" type="text" v-model="taxNumber" />
        <div class="error" v-if="$v.taxNumber.$error">
          <template v-if="!$v.taxNumber.$invalid"> </template>
          <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
        </div>
      </div>

      <div class="field">
        <label for="Address">ที่อยู่</label>
        <input id="Address" type="text" v-model="Address" />
        <div class="error" v-if="$v.Address.$error">
          <template v-if="!$v.Address.$invalid"> </template>
          <template v-else> ต้องใส่ที่อยู่ </template>
        </div>
      </div>
      <div class="field">
        <label for="subdis">ตำบล</label>
        <input id="subdis" type="text" v-model="subdis" />
        <div class="error" v-if="$v.subdis.$error">
          <template v-if="!$v.subdis.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="dis">อำเภอ</label>
        <input id="dis" type="text" v-model="dis" />
        <div class="error" v-if="$v.dis.$error">
          <template v-if="!$v.dis.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="province">จังหวัด</label>
        <input id="province" type="text" v-model="province" />
        <div class="error" v-if="$v.province.$error">
          <template v-if="!$v.province.$invalid"> </template>
          <template v-else> ****</template>
        </div>
      </div>
      <div class="field">
        <label for="postcode">รหัสไปรษณีย์</label>
        <input id="postcode" type="text" v-model="postcode" />
        <div class="error" v-if="$v.postcode.$error">
          <template v-if="!$v.postcode.$invalid"> </template>
          <template v-else> รหัสไปรษณีย์ต้องมี5ตัว</template>
        </div>
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
      status: "นิติบุคคล",
      companyName: "",
      companyNumber: "",
      taxNumber: null,
      contactEmail: null,
      Address: null,
      subdis: null,
      dis: null,
      province: null,
      postcode: null,
    };
  },

  validations: {
    companyNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    taxNumber: {
      required,
      validFormat: (val) => /^\d{13}$/.test(val),
    },
    postcode: {
      required,
      validFormat: (val) => /^\d{5}$/.test(val),
    },
    companyName: {
      required,
    },
    Address: {
      required,
    },
    subdis: {
      required,
    },
    dis: {
      required,
    },
    province: {
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
      console.log(this.companyName);
      console.log(this.companyNumber);
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
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
  color: red;}