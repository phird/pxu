<template>
  <div>
    <div>
      <div class="title-modal">
        <p>CUSTOMER</p>
      </div>
      <form @submit.prevent="submitForm(cusid)" class="form-for-customer">
        <div class="toggle-type-customer">
          <div class="radio-selected">
            <input
              v-model="status"
              id="individual"
              type="radio"
              value="บุคคลธรรมดา"
              @change="checkcompany(status)"
            />
            <!-- บุคคลธรรมดา -->
            <label for="individual">บุคคลธรรมดา</label>
          </div>
          <div class="radio-selected">
            <input
              v-model="status"
              id="juristic"
              type="radio"
              value="นิติบุคคล"
              @change="checkcompany(status)"
            />
            <!-- นิติบุคคล -->
            <label for="juristic">นิติบุคคล</label>
          </div>
          <div class="error" v-if="$v.status.$error">
                  <template v-if="!$v.status.$invalid"> </template>
                  <template v-else style="color: red"> * </template>
          </div>
        </div>
        <!-- /toggle-type-customer -->
        <!-- ==================================================================== -->
        <div v-if="status == 'นิติบุคคล'">
          <div class="contact-person-section">
            <p class="icon" style="font-size: 18px; font-weight: 500">
              <b-icon icon="person" style="color: #376303"></b-icon>
              ข้อมูลผู้ติดต่อ
            </p>
            <!-- Name of company -->
            <div class="field">
              <input
                id="companyName"
                type="text"
                v-model="companyName"
                placeholder="ชื่อบริษัท/ลูกค้า"
                style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
              />

              <div class="error" v-if="$v.companyName.$error">
                <template v-if="!$v.companyName.$invalid"> </template>
                <template v-else style="color: red"> ต้องระบุชื่อ </template>
              </div>
            </div>
            <!-- /Name of company -->
            <div class="contact-person-section-buttom">
              <!-- COMPANY TEL. -->
              <div class="field contact-person-section-buttom-part">
                <input
                  id="companyNumber"
                  type="tel"
                  v-model="companyNumber"
                  placeholder="เบอร์สำนักงาน"
                  style="text-indent: 8%; border: 1px solid rgb(211, 211, 211)"
                />
                <div class="error" v-if="$v.companyNumber.$error">
                  <template v-if="!$v.companyNumber.$invalid"> </template>
                  <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
                </div>
              </div>
              <!-- /COMPANY TEL. -->

              <!-- TAX NUM -->
              <div class="field contact-person-section-buttom-part">
                <input
                  id="taxNumber"
                  type="text"
                  v-model="taxNumber"
                  placeholder="เลขทะเบียนนิติบุคคล"
                  style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
                />
                <div class="error" v-if="$v.taxNumber.$error">
                  <template v-if="!$v.taxNumber.$invalid"> </template>
                  <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
                </div>
              </div>
              <!-- TAX NUM -->
            </div>
          </div>
          <!-- /contact-person-section -->
        </div>
        <!-- ==================================================================== -->
        <!-- บุคคลธรรมดา -->
        <div v-else>
          <p class="icon" style="font-size: 18px; font-weight: 500">
            <b-icon icon="person" style="color: #376303"></b-icon>
            ข้อมูลผู้ติดต่อ
          </p>
          <div class="field">
            <!-- ชื่อผู้ติดต่อ -->
            <div class="field">
              <input
                id="contactName"
                type="text"
                v-model="contactName"
                placeholder="ชื่อบริษัท/ลูกค้า"
                style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
              />
              <div class="error" v-if="$v.contactName.$error">
                <template v-if="!$v.contactName.$invalid"> </template>
                <template v-else> ต้องระบุชื่อ </template>
              </div>
            </div>

            <div class="contact-person-section-buttom">
              <div class="field contact-person-section-buttom-part">
                <!-- เบอร์ผู้ติดต่อ -->

                <input
                  id="contactNumber"
                  type="tel"
                  v-model="contactNumber"
                  style="text-indent: 8%; border: 1px solid rgb(211, 211, 211)"
                  placeholder="เบอร์โทร"
                />
                <div class="error" v-if="$v.contactNumber.$error">
                  <template v-if="!$v.contactNumber.$invalid"> </template>
                  <template v-else> เบอร์ผู้ติดต่อต้องมี10หลัก </template>
                </div>
              </div>
              <!-- เลขกำกับภาษี -->
              <div class="field contact-person-section-buttom-part">
                <input
                  id="taxNumber"
                  type="text"
                  v-model="taxNumber"
                  placeholder="เลขผู้เสียภาษี"
                  style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
                />
                <div class="error" v-if="$v.taxNumber.$error">
                  <template v-if="!$v.taxNumber.$invalid"> </template>
                  <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
                </div>
              </div>
            </div>
            <!-- email -->
            <div class="field">
              <input
                id="contactEmail"
                type="text"
                v-model="contactEmail"
                placeholder="อีเมล"
                style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
              />
              <div class="error" v-if="$v.contactEmail.$error">
                <template v-if="!$v.contactEmail.$invalid"> </template>
                <template v-else> email error </template>
              </div>
            </div>
          </div>
        </div>
        <br />
        <!-- / บุคคลธรรมดา -->
        <div class="address-info">
            <p style="font-size: 18px; font-weight: 500">
              <b-icon icon="house-door" style="color: #376303"></b-icon>
              ที่อยู่ผู้ติดต่อ
            </p>
            <!-- ที่อยู่ -->
            <div class="field" id="addr-detail">
              <label for="Address">บ้านเลขที่/ที่อยู่</label>
              <input
                id="Address"
                type="text"
                v-model="Address"
                style="
                  border: 1px solid rgb(211, 211, 211);
                  opacity: 0.5;
                  text-indent: 4%;
                "
                placeholder="บ้านเลขที่/ที่อยู่"
              />
              <div class="error" v-if="$v.Address.$error">
                <template v-if="!$v.Address.$invalid"> </template>
                <template v-else> ต้องใส่ที่อยู่ </template>
              </div>
            </div>
            <div class="addr-info-section">
              <!-- ตำบล -->
              <div class="field" id="addr-box">
                <label for="subdis">ตำบล</label>
                <ThailandAutoComplete
                  class="autocom-add"
                  v-model="subdis"
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
              <div class="field" id="addr-box">
                <label for="dis">อำเภอ</label>
                <ThailandAutoComplete
                  class="autocom-add"
                  v-model="dis"
                  type="amphoe"
                  @select="select"
                  placeholder="อำเภอ..."
                />
                 <div class="error" v-if="$v.dis.$error">
                    <template v-if="!$v.dis.$invalid"> </template>
                    <template v-else> ต้องใส่อำเภอ</template>
                  </div>
              </div>
              <!-- จังหวัด -->
              <div class="field" id="addr-box">
                <label for="provice">จังหวัด</label>
                <ThailandAutoComplete
                  class="autocom-add"
                  v-model="province"
                  type="province"
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
              <div class="field" id="addr-box">
                <label for="postcode">รหัสไปรษณีย์</label>
                <ThailandAutoComplete
                  class="autocom-add"
                  v-model="postcode"
                  type="zipcode"
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
        <br />
        <!-- รายละเอียดผู้ติดต่อ -->
        <div v-if="status == 'นิติบุคคล'">
          <p style="font-size: 18px; font-weight: 500">
            <b-icon icon="person" style="color: #376303"></b-icon>
            รายละเอียดผู้ติดต่อ
          </p>

          <div class="field">
            <label for="contactName"> ชื่อผู้ติดต่อ</label>
            <input
              id="contactName"
              type="text"
              v-model="contactName"
              placeholder="ชื่อผู้ติดต่อ"
              style="
                text-indent: 4%;
                border: 1px solid rgb(211, 211, 211);
                opacity: 0.5;
              "
            />
            <div class="error" v-if="$v.contactName.$error">
              <template v-if="!$v.contactName.$invalid"> </template>
              <template v-else> ต้องระบุชื่อ </template>
            </div>
          </div>

          <div class="field">
            <label for="contactNumber"> เบอร์โทร </label>
            <input
              id="contactNumber"
              type="text"
              v-model="contactNumber"
              placeholder="เบอร์โทร"
              style="
                text-indent: 4%;
                border: 1px solid rgb(211, 211, 211);
                opacity: 0.5;
              "
            />
            <div class="error" v-if="$v.contactNumber.$error">
              <template v-if="!$v.contactNumber.$invalid"> </template>
              <template v-else> เบอร์ผู้ติดต่อต้องมี10หลัก </template>
            </div>
          </div>

          <div class="field">
            <label for="contactEmail"> อีเมล </label>
            <input
              id="contactEmail"
              type="text"
              v-model="contactEmail"
              placeholder="อีเมล"
              style="
                text-indent: 4%;
                border: 1px solid rgb(211, 211, 211);
                opacity: 0.5;
              "
            />
            <div class="error" v-if="$v.contactEmail.$error">
              <template v-if="!$v.contactEmail.$invalid"> </template>
              <template v-else> email error </template>
            </div>
          </div>
        </div>
        <div v-else></div>
        <div class="submit-but-section">
          <button class="submit-button" type="submit">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>
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
      cusid: "",
      customer: [],
      status: "บุคคลธรรมดา",
      contactName: "",
      contactNumber: "",
      companyName: "",
      companyNumber: "",
      taxNumber: null,
      contactEmail: null,
      Address: null,
      subdis: "",
      dis: "",
      province: "",
      postcode: "",
      // status: this.customer.status,
      // contactName: this.customer.contactName,
      // contactNumber: this.customer.contactNumber,
      // companyName: this.customer.companyName,
      // companyNumber: this.customer.companyNumber,
      // taxNumber: this.customer.taxNumber,
      // contactEmail: this.customer.contactEmail,
      // Address: this.customer.address,
      // subdis: this.customer.subdistrict,
      // dis: this.customer.district,
      // province: this.customer.province,
      // postcode: this.customer.postcode,
    };
  },

  validations: {
    companyNumber: {
      required,
      validFormat: (val) => /^\d{10}$/.test(val),
    },
    contactNumber: {
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
    contactEmail: {
      required,
      email,
    },
    contactName: {
      required,
    },
    companyName: {
      required,
    },
    Address: {
      required,
    },
    status: {
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
    postcode: {
      required,
    },
    // passportDate: {
    //   required,
    //   validDate: (val) => moment(val, "DD.MM.YYYY", true).isValid(),
    // },
  },
  created() {
    this.cusid = this.$route.params.id;
    this.getcustomer(this.cusid);
  },
  methods: {
    select(address) {
      this.subdis = address.district;
      this.dis = address.amphoe;
      this.province = address.province;
      this.postcode = address.zipcode;
    },
    async submitForm(id) {
      this.$v.$touch();
      if (this.status == "บุคคลธรรมดา") {
        this.companyName = this.contactName;
        this.conpanyNumber = this.contactNumber;
        // console.log(this.companyName);
        // console.log(this.conpanyNumber);
      }
      if (this.$v.$invalid) {
        alert("can't submit");
      } else {
        await axios
          .post(`http://localhost:5000/customer/${id}`, {
            companyName: this.companyName,
            companyNumber: this.companyNumber,
            status: this.status,
            address: this.Address,
            subdis: this.subdis,
            dis: this.dis,
            province: this.province,
            postcode: this.postcode,
            contactName: this.contactName,
            contactNumber: this.contactNumber,
            contactEmail: this.contactEmail,
            taxNumber: this.taxNumber,
          })
          .then(function () {
            alert("บันทึกข้อมูลสำเร็จ");
            window.location.reload(false);  
          });
      }
    },
    checkcompany(status) {
      if (status == "บุคคลธรรมดา") {
        this.companyName = this.contactName;
        this.companyNumber = this.contactNumber;
      }
    },
    async getcustomer(cusid) {
      try {
        const response = await axios.get(
          `http://localhost:5000/customer/${cusid}`
        );
        this.customer = response.data[0];
        // console.log(this.customer);
        this.status= this.customer.status;
        this.contactName = this.customer.contactName;
        this.contactNumber = this.customer.contactNumber;
        this.companyName = this.customer.companyName;
        this.companyNumber = this.customer.companyNumber;
        this.taxNumber = this.customer.taxNumber;
        this.contactEmail = this.customer.contactEmail;
        this.Address = this.customer.address;
        this.subdis = this.customer.subdistrict;
        this.dis = this.customer.district;
        this.province = this.customer.province;
        this.postcode = this.customer.postcode;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.pagebody {
  display: flex;
  flex-direction: column;
}
.pagebody-upper {
  height: 5%;
}

.header-solid {
  font-family: "Mitr", sans-serif;
}
.form-for-customer {
  font-family: "Mitr", sans-serif;
  align-content: center;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
.contact-person-section-buttom {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 2em;
}
.contact-person-section-buttom-part {
  width: 100%;
}

#companyName,
#contactName {
  background-image: url("../assets/images/icons/file-icons/person-circle.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#companyNumber,
#contactNumber {
  background-image: url("../assets/images/icons/file-icons/telephone-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}
#taxNumber {
  opacity: 0.5;
  width: 100%;
}
#contactEmail {
  background-image: url("../assets/images/icons/file-icons/envelope-fill.svg");
  opacity: 0.5;
  background-repeat: no-repeat;
  background-position: 8px 50%;
  width: 100%;
}

#addr-detail input {
  width: 100%;
}
#addr-box {
  display: flex;
  flex-direction: column;
}

.addr-info-section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.addr-info-section div {
  width: 45%;
}
.form-for-customer .field input {
  border-radius: 12px;
  height: 45px;
}

.field input {
  border: 1 solid rgba(190, 187, 187, 0.801);
}

.contact-person-section {
  display: flex;
  flex-direction: column;
}
/* modal style start here  */
.title-modal {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.title-modal p {
  font-size: 26px;
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  align-content: center;
}
.whole-modal-body {
  width: 100vw;
}
.whole-modal-body >>> .ant-modal {
  width: 70% !important;
}
.whole-modal-body >>> .ant-modal-content {
  width: 50vw default 0;
  margin-left: auto;
  margin-left: auto;
}
.whole-modal-body >>> .ant-modal-header {
  border-bottom: 0;
  align-content: center;
}

.whole-modal-body >>> .ant-modal-footer {
  display: none;
}

.whole-modal-body >>> .ant-modal-title {
  display: none;
}

.toggle-type-customer {
  display: flex;
  flex-direction: row;
  padding: 1em 1em 1em 0;
}
.toggle-type-customer div {
  padding: 1em;
}
.radio-selected {
  justify-content: center;
}

.radio-selected input {
  margin-right: 1em;
  height: 21px;
  width: 21px;
}
.error {
  color: red;
}
.field {
  margin-bottom: 1em;
}

.submit-but-section {
  display: flex;
  width: 100%;
  margin-top: 3em;
}

.submit-button {
  background-color: #1890ff;
  height: 36px;
  width: 164px;
  color: white;
  border-radius: 8px;
  border: 0;

  margin-left: auto;
  margin-right: auto;
}

.autocom-add >>> .vth-addr-input-size-default {
  font-size: 14px;
  font-family: "Mitr", sans-serif;
  border-radius: 12px;
  width: 200%;
  opacity: 0.5;
  text-indent: 4%;
}

@media only screen and (max-width: 991px) {
  .contact-person-section-buttom {
    flex-direction: column;
    gap: 0;
  }
  #companyName,
  #contactName {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }

  #companyNumber,
  #contactNumber {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }
  #contactEmail {
    background-image: none;
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: 8px 50%;
    width: 100%;
    text-indent: 4% !important;
  }
  .addr-info-section {
    flex-direction: column;
  }
  .autocom-add >>> .vth-addr-input-size-default {
    border-radius: 12px;
    width: 500%;
  }
}
</style>