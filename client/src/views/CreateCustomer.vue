
// import { required } from "vuelidate/lib/validators";
// export default {
//     name: "Createcustomer",
//   data() {
//     return {
//             status:'',
//             contactName: "",
//             contactNumber: '',
//             companyName: '',
//             companyNumber: '',
//             taxNumber: null,
//             contactEmail: null,
//             Address: null,
//             subdis: null,
//             dis: null,
//             province: null,
//             postcode: null,
//     };
//   },
//   validations: {
//     contactName: {
//       required,
//       minLength: minLength(4)
//     },
//   }
// }

<template>
  <form @submit.prevent="someAction()">
    <div class="field">
      <label for="companyNumber"> เบอร์บริษัท</label>
      <input id="companyNumber" type="text" v-model="companyNumber" />
      <div class="error" v-if="$v.companyNumber.$invalid">
        เบอร์บริษัทต้องอยู่ในรูปแบบ 081-xxx-xxxx
      </div>
    </div>

    <!-- <div class="field">
      <label for="passport_date"> วันที่ออกหนังสือเดินทาง </label>
      <input
        id="passport_date"
        type="text"
        v-model="passportDate"
        @blur="$v.passportDate.$touch()"
      />
      <div class="error" v-if="$v.passportDate.$error">
        วันที่ออกหนังสือเดินทางจะต้องอยู่ในรูปแบบ DD.MM.YYYY
      </div>
    </div> -->

    <div class="field">
      <label for="companyName"> ชื่อบริษัท</label>
      <input id="companyName" type="text" v-model="companyName" @blur="$v.companyName.$touch()" />
      <div class="error" v-if="$v.companyName.$error">
        <template v-if="!$v.companyName.$invalid">
        </template>
        <template v-else> ต้องระบุชื่อ </template>
      </div>
    </div>
    <div class="field">
      <label for="contactNumber"> เบอร์ผู้ติดต่อ</label>
      <input id="contactNumber" type="text" v-model="contactNumber" @blur="$v.contactNumber.$touch()" />
      <div class="error" v-if="$v.contactNumber.$error">
        <template v-if="!$v.contactNumber.$invalid">
        </template>
        <template v-else> เบอร์บริษัทต้องอยู่ในรูปแบบ 081-xxx-xxxx </template>
      </div>
    </div>
    <div class="field">
      <label for="contactName"> ชื่อผู้ติดต่อ</label>
      <input id="contactName" type="text" v-model="contactName" @blur="$v.contactName.$touch()" />
      <div class="error" v-if="$v.contactName.$error">
        <template v-if="!$v.contactName.$invalid">
        </template>
        <template v-else> ต้องระบุชื่อ </template>
      </div>
    </div>
    <div class="field">
      <label for="taxNumber">เลขกำกับภาษี</label>
      <input id="taxNumber" type="text" v-model="taxNumber" @blur="$v.taxNumber.$touch()" />
      <div class="error" v-if="$v.taxNumber.$error">
        <template v-if="!$v.taxNumber.$invalid">
        </template>
        <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
      </div>
    </div>

    <button type="submit" :disabled="$v.$invalid">ส่งแบบฟอร์ม</button>
  </form>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import moment from "moment";

export default {
  data() {
    return {
      status:'',
            contactName: "",
            contactNumber: '',
            companyName: '',
            companyNumber: '',
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
      validFormat: (val) => /^\d{3}-\d{3}-\d{4}$/.test(val),
    },
    contactNumber: {
      required,
      validFormat: (val) => /^\d{3}-\d{3}-\d{4}$/.test(val),
    },
    taxNumber: {
      required,
      validFormat: (val) => /^\d{13}$/.test(val),
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
    contactName: {
      required,
    },
    companyName: {
      required,
    },
  },

  methods: {
    someAction() {
      alert("Форма отправлена");
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