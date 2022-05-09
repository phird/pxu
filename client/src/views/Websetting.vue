
<template>
  <div class="setting-page">
    <form @submit.prevent="submitForm()">
      <div class="field">
        <p style="font-size: 18px">
          <b-icon icon="globe"> </b-icon> ข้อมูลเว็บไซต์
        </p>
        <div class="website-data">
          <!-- website name  -->
          <div class="website-name">
            <label for="website-name-box">ชื่อเว็บไซต์</label>
            <div class="website-name-box">
              <b-icon
                icon="person-circle"
                style="
                  display: flex;
                  position: absolute;
                  z-index: 10;
                  margin: auto;
                "
              ></b-icon>
              <input
                style="position: relative; text-indent: 5%"
                id="websiteName"
                type="text"
                v-model="websiteName"
                placeholder="website name"
              />
            </div>
            <div class="error" v-if="$v.websiteName.$error">
              <template v-if="!$v.websiteName.$invalid"> </template>
              <template v-else> ต้องระบุชื่อ </template>
            </div>
          </div>
          <!-- /website name  -->

          <!-- website logo -->
          <div class="website-logo">
            <label for="uploadlogo">โลโก้เว็บไซต์</label>
            <div class="website-logo-box" for="uploadlogo">
              <div class="logobox">
                <b-icon icon="paperclip"></b-icon>
              </div>
              <div class="file-name">
                <label for="uploadlogo">{{ this.filelogo.name }}</label>
              </div>
              <div class="upload-butt">
                <label for="uploadlogo"
                  ><b-icon icon="folder"> </b-icon>
                </label>
                <input
                  id="uploadlogo"
                  type="file"
                  @change="uploadFilelogo"
                  label="logo"
                  style="display: none"
                />
              </div>
            </div>
          </div>
          <!-- /website logo -->
        </div>
        <!-- websitedata -->
      </div>

      <div class="field">
        <p style="font-size: 18px">
          <b-icon icon="house"></b-icon> ข้อมูลบริษัท
        </p>
        <div class="company-data">
          <div class="company-name addr-content-box">
            <label for="companyName"> ชื่อบริษัท</label>
            <input
              id="companyName inputbox"
              type="text"
              v-model="companyName"
            />
            <div class="error" v-if="$v.companyName.$error">
              <template v-if="!$v.companyName.$invalid"> </template>
              <template v-else> ต้องระบุชื่อ </template>
            </div>
          </div>

          <div class="company-number addr-content-box">
            <label for="companyNumber"> เบอร์บริษัท</label>
            <input
              id="companyNumber inputbox"
              type="text"
              v-model="companyNumber"
            />
            <div class="error" v-if="$v.companyNumber.$error">
              <template v-if="!$v.companyNumber.$invalid"> </template>
              <template v-else> ต้องระบุชื่อ </template>
            </div>
          </div>

          <div class="company-tax addr-content-box">
            <label for="taxNumber">เลขกำกับภาษี</label>
            <input id="taxNumber inputbox" type="text" v-model="taxNumber" />
            <div class="error" v-if="$v.taxNumber.$error">
              <template v-if="!$v.taxNumber.$invalid"> </template>
              <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
            </div>
          </div>

          <div>
            <p>ตราปั้มบริษัท:{{ filestamp.name }}</p>
            <input type="file" @change="uploadFilestamp" label="logo" />
          </div>


        </div>
      </div>

      <div class="field">
        <p style="font-size: 18px">
          <b-icon icon="house"></b-icon> ที่อยู่บริษัท
        </p>
        <div class="addr-detail-content">
          <div class="addr-detail maxsize-input">
            <label for="Address">ที่อยู่</label>
            <input
              id="Address"
              class="inputbox"
              type="text"
              v-model="Address"
            />
            <div class="error" v-if="$v.Address.$error">
              <template v-if="!$v.Address.$invalid"> </template>
              <template v-else> ต้องใส่ที่อยู่ </template>
            </div>
          </div>

          <!-- ตำบล -->
          <div class="addr-detail" id="addr-box">
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
          <div class="addr-detail" id="addr-box">
            <label for="dis">อำเภอ</label>
            <ThailandAutoComplete
              v-model="dis"
              type="amphoe"
              
              @select="select"
              placeholder="อำเภอ..."
            />
          </div>
          <!-- จังหวัด -->
          <div class="addr-detail" id="addr-box">
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
          <div class="addr-detail" id="addr-box">
            <label for="postcode">รหัสไปรษณีย์</label>
            <ThailandAutoComplete
              v-model="postcode"
              type="zipcode"
              
              @select="select"
              color="#00a4e4"
              placeholder="รหัสไปรษณีย์..."
            />
          </div>
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
.setting-page {
  padding: 2em;
}
.website-data {
  display: flex;
  width: 100%;
  flex-direction: row;
  gap: 5em;
  justify-content: space-around;
  padding: 1em;
}

.website-logo {
  width: 50%;
}
.website-name {
  width: 50%;
}

.website-logo-box {
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(0, 0, 0, 0.123);
  width: 100%;
  justify-content: space-between;
  background-color: white;
  border-radius: 14px;
  height: 45px;
}
.website-name-box {
  position: relative;
  display: flex;
  width: 100%;
}
#websiteName {
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(0, 0, 0, 0.123);
  width: 100%;
  justify-content: space-between;
  background-color: white;
  border-radius: 14px;
  height: 45px;
}

.logobox {
  opacity: 0.5;
  padding: 0.3em;
}
.filename,
.upload-butt {
  padding: 0.3em;
}

.website-logo .file-name p {
  margin: none;
  margin-bottom: none;
}

.field {
  margin-bottom: 24px;
}
.field >>> label {
  margin-right: 8px;
}
.error {
  color: red;
}

.company-data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.addr-content-box {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 1em;
}

.addr-content-box input, .inputbox {
  text-indent: 5%;
  border-radius: 14px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.123);
}

  .addr-detail-content{
    display: flex;
    flex-direction: row;
    
    flex-wrap: wrap;
  }

  .addr-detail{
    display: flex;
    padding: 1em;
    flex-direction: column;
    width: 50%;
  }

  .maxsize-input{
    display: flex;
    padding: 1em;
    flex-direction: column;
    width: 100% !important;
  }
</style>