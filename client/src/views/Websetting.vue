
<template>
  <div>
    <form @submit.prevent="submitForm()">
      <div class="field">
        <h1>
        logo:{{this.filelogo.name}}
        </h1>
        <input id="websiteName" type="text" v-model="websiteName" />
        <div class="error" v-if="$v.websiteName.$error">
          <template v-if="!$v.websiteName.$invalid"> </template>
          <template v-else> ต้องระบุชื่อ </template>
        </div>
      </div>
      <div class="field">
        <label for="websiteName">logo</label>
        <input type="file" @change="uploadFilelogo" label="logo" />
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
        <label for="companyNumber"> เบอร์บริษัท</label>
        <input id="companyNumber" type="text" v-model="companyNumber" />
        <div class="error" v-if="$v.companyNumber.$error">
          <template v-if="!$v.companyNumber.$invalid"> </template>
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

      <!-- ตำบล -->
      <div class="field" id="addr-box">
        <label for="subdis">ตำบล</label>
        <ThailandAutoComplete
          v-model="subdis"
          id="subdis"
          type="district"
          @select="select"
          placeholder="ตำบล..."
        />
      </div>
      <!-- อำเภอ -->
      <div class="field" id="addr-box">
        <label for="dis">อำเภอ</label>
        <ThailandAutoComplete
          v-model="dis"
          type="amphoe"
          @select="select"
          placeholder="อำเภอ..."
        />
      </div>
      <!-- จังหวัด -->
      <div class="field" id="addr-box">
        <label for="provice">จังหวัด</label>
        <ThailandAutoComplete
          v-model="province"
          type="province"
          @select="select"
          color="#35495e"
          placeholder="จังหวัด..."
        />
      </div>
      <!-- zip code -->
      <div class="field" id="addr-box">
        <label for="postcode">รหัสไปรษณีย์</label>
        <ThailandAutoComplete
          v-model="postcode"
          type="zipcode"
          @select="select"
          color="#00a4e4"
          placeholder="รหัสไปรษณีย์..."
        />
      </div>

      <div>
        <h1>
        stamp:{{filestamp.name}}
        </h1>
        <input type="file" @change="uploadFilestamp" label="logo" />
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
import ThailandAutoComplete from "vue-thailand-address-autocomplete";
export default {
  components: {
    ThailandAutoComplete,
  },
  data() {
    return {
      filelogo: [],
      filestamp: [],
      websiteName: "",
      companyName: "",
      companyNumber: "",
      taxNumber: null,
      Address: null,
      subdis: "",
      dis: "",
      province: "",
      postcode: "",
      setstate: "",
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
    websiteName: {
      required,
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
  created() {
    this.getweb();
  },
  methods: {
    select(address) {
      this.subdis = address.district;
      this.dis = address.amphoe;
      this.province = address.province;
      this.postcode = address.zipcode;
    },
    uploadFilelogo(event) {
      this.filelogo = event.target.files[0];
      console.log(this.filelogo.name);
    },
    uploadFilestamp(event) {
      this.filestamp = event.target.files[0];
      console.log(this.filestamp.name);
    },
    async submitForm() {
      this.$v.$touch();
      const formData = new FormData();
      formData.append("files", this.filelogo);
      formData.append("files", this.filestamp);
      if (this.$v.$invalid) {
        alert("can't submit");
      } else if (this.setstate == "false") {
        await axios
          .post("http://localhost:5000/upload", formData, {})
          .then((res) => {
            axios
              .post("http://localhost:5000/website", {
                websiteName: this.websiteName,
                companyName: this.companyName,
                companyNumber: this.companyNumber,
                taxNumber: this.taxNumber,
                Address: this.Address,
                subdis: this.subdis,
                dis: this.dis,
                province: this.province,
                postcode: this.postcode,
                logo: this.filelogo.name,
                stamp: this.filestamp.name,
              })
              .then(function () {
                alert("push");
              });
          });
        window.location.href = "/";
      } else {
        await axios
          .post("http://localhost:5000/upload", formData, {})
          .then((res) => {
            axios
              .put("http://localhost:5000/website", {
                websiteName: this.websiteName,
                companyName: this.companyName,
                companyNumber: this.companyNumber,
                taxNumber: this.taxNumber,
                Address: this.Address,
                subdis: this.subdis,
                dis: this.dis,
                province: this.province,
                postcode: this.postcode,
                logo: this.filelogo.name,
                stamp: this.filestamp.name,
              })
              .then(function () {
                alert("update");
              });
          });
      }
    },
    async getweb() {
      console.log("get-web");
      try {
        const response = await axios.get("http://localhost:5000/website");
        this.websiteName = response.data[0].websiteName;
        this.companyName = response.data[0].companyName;
        this.companyNumber = response.data[0].companyNumber;
        this.taxNumber = response.data[0].taxNumber;
        this.Address = response.data[0].address;
        this.subdis = response.data[0].subdistrict;
        this.dis = response.data[0].district;
        this.province = response.data[0].province;
        this.postcode = response.data[0].postcode;
        this.filelogo.name = response.data[0].logo;
        this.filestamp.name = response.data[0].stamp;
        console.log(response.data[0]);
      } catch (err) {
        this.setstate = "false";
        console.log(err);
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