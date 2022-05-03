
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
      <label for="passport_data"> ชุดหนังสือเดินทางและหมายเลข </label>
      <input id="passport_data" type="text" v-model="contactNumber" />
      <div class="error" v-if="$v.contactNumber.$invalid">
        ซีรี่ส์และหมายเลขหนังสือเดินทางต้องอยู่ในรูปแบบ 081-xxx-xxxx
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
      <label for="contactName"> ชื่อ</label>
      <input id="contactName" type="text" v-model="contactName" @blur="$v.contactName.$touch()" />
      <div class="error" v-if="$v.contactName.$error">
        <template v-if="!$v.contactName.$invalid">
        </template>
        <template v-else> ต้องระบุชื่อ </template>
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
    contactNumber: {
      required,
      validFormat: (val) => /^\d{3}-\d{3}-\d{4}$/.test(val),
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
    contactName: {
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