
<template>
  <div class="setting-page">
    <form @submit.prevent="submitForm(), uploadsubmit()">
      <div class="field">
        <p style="font-size: 18px">
          <b-icon icon="globe"> </b-icon> ข้อมูลเว็บไซต์
        </p>
        <div class="website-data">
          <!-- website name  -->
          <div class="website-name">
            <label for="website-name-box">ชื่อเว็บไซต์</label>
            <div class="website-name-box">
              <!-- <b-icon
                icon="person-circle"
                style="
                  display: flex;
                  position: absolute;
                  z-index: 10;
                  margin: auto;
                "
              ></b-icon> -->
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
              <div class="box">
                <div class="logobox" style="margin-top: 1%">
                  <b-icon icon="paperclip"></b-icon>
                </div>
                <div class="file-name">
                  <label for="uploadlogo" style="margin-top: 14%">{{
                    this.filelogo.name
                  }}</label>
                </div>
                <div class="upload-butt" style="margin-top: 1%">
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
          <div class="company-name addr-content-box maxsize-input">
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
              <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
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

          <!-- website logo -->
          <div class="website-logo">
            <label for="uploadstamp">ตราปั้มบริษัท</label>
            <div class="website-logo-box" for="uploadstamp">
              <div class="box">
                <div class="logobox" style="margin-top: 1%">
                  <b-icon icon="paperclip"></b-icon>
                </div>
                <div class="file-name">
                  <label for="uploadstamp" style="margin-top: 14%">{{
                    this.filestamp.name
                  }}</label>
                </div>
                <div class="upload-butt" style="margin-top: 1%">
                  <label for="uploadstamp"
                    ><b-icon icon="folder"> </b-icon>
                  </label>
                  <input
                    id="uploadstamp"
                    type="file"
                    @change="uploadFilestamp"
                    label="stamp"
                    style="display: none"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /website logo -->
          <!--           <div style="display: flex; padding: 1em; flex-direction: column">
            <label>ตราปั้มบริษัท:{{ filestamp.name }}</label>
            <input type="file" @change="uploadFilestamp" label="logo" />
          </div> -->
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
              class="autofilladdr"
              id="subdis"
              type="district"
              @select="select"
              placeholder="ตำบล..."
            />
            <div class="error" v-if="$v.subdis.$error">
              <template v-if="!$v.subdis.$invalid"> </template>
              <template v-else> ต้องใส่ตำบล</template>
            </div>
          </div>
          <!-- อำเภอ -->
          <div class="addr-detail" id="addr-box">
            <label for="dis">อำเภอ</label>
            <ThailandAutoComplete
              v-model="dis"
              type="amphoe"
              class="autofilladdr"
              id="subdis"
              @select="select"
              placeholder="อำเภอ..."
            />
            <div class="error" v-if="$v.dis.$error">
              <template v-if="!$v.dis.$invalid"> </template>
              <template v-else> ต้องใส่อำเภอ</template>
            </div>
          </div>
          <!-- จังหวัด -->
          <div class="addr-detail" id="addr-box">
            <label for="provice">จังหวัด</label>
            <ThailandAutoComplete
              v-model="province"
              class="autofilladdr"
              type="province"
              id="subdis"
              @select="select"
              color="#35495e"
              placeholder="จังหวัด..."
            />
            <div class="error" v-if="$v.province.$error">
              <template v-if="!$v.province.$invalid"> </template>
              <template v-else> ต้องใส่จังหวัด</template>
            </div>
          </div>
          <!-- zip code -->
          <div class="addr-detail" id="addr-box">
            <label for="postcode">รหัสไปรษณีย์</label>
            <ThailandAutoComplete
              v-model="postcode"
              type="zipcode"
              id="subddis"
              class="autofilladdr"
              @select="select"
              color="#00a4e4"
              placeholder="รหัสไปรษณีย์..."
            />
            <div class="error" v-if="$v.postcode.$error">
              <template v-if="!$v.postcode.$invalid"> </template>
              <template v-else> ต้องใส่รหัสไปรษณีย์</template>
            </div>
          </div>
        </div>
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
      console.log(this.filelogo);
    },
    uploadFilestamp(event) {
      this.filestamp = event.target.files[0];
      console.log(this.filestamp);
    },
    uploadsubmit() {
      let formDatalogo = new FormData();
      formDatalogo.append("files", this.filelogo);
      axios.post("http://localhost:5000/uploadlogo", formDatalogo, {});
      let formDatastamp = new FormData();
      formDatastamp.append("files", this.filestamp);
      axios.post("http://localhost:5000/uploadstamp", formDatastamp, {});
    },
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        alert("can't submit");
      } else if (this.setstate == "false") {
        await axios
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
            window.location.reload(false);
          });
      } else {
        await axios
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
            window.location.reload(false);
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
  font-family: "Mitr", sans-serif;
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
.website-data {
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}

.website-logo {
  width: 50%;
  padding: 1em;
}
.website-name {
  width: 50%;
  padding: 1em;
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
  padding: 0.5em;
}
.box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.file-name {
  height: 100%;
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

.addr-content-box input,
.inputbox {
  text-indent: 5%;
  border-radius: 14px;
  height: 45px;
  border: 1px solid rgba(0, 0, 0, 0.123);
}

.addr-detail-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.addr-detail {
  display: flex;
  padding: 1em;
  flex-direction: column;
  width: 50%;
}

.maxsize-input {
  display: flex;
  padding: 1em;
  flex-direction: column;
  width: 100% !important;
}

.maxsize-input input {
  text-indent: 3%;
}

.autofilladdr >>> .vth-addr-input-size-default[data-v-1f53c317] {
  border-radius: 14px;
  height: 45px;
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
  padding: 0.5em;
}

@media only screen and (max-width: 991px) {
  .website-logo {
    width: 100%;
    padding: 1em;
  }
  .website-name {
    width: 100%;
    padding: 1em;
  }
  .addr-detail {
    display: flex;
    padding: 1em;
    flex-direction: column;
    width: 100%;
  }
  .addr-content-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
  }
}
</style>