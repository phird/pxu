<template>
  <div class="whole-site">
    <div>
      <form @submit.prevent="submitForm(cusid)" style="width:100%">
        <button @click="this.$router.back()" style="font-size: 22px">
          <b-icon icon="chevron-left"></b-icon>
        </button>
        <div class="form-for-customer">
          <div class="title-modal">
            <p>CUSTOMER</p>
          </div>
          <a-alert
            v-if="success"
            message="บันทึกข้อมูลสำเร็จ"
            type="success"
            show-icon
          />

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
                  title="โปรดกรอกชื่อบริษัท/ลูกค้า"
                  style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
                  required
                />
              </div>
              <!-- /Name of company -->
              <div class="contact-person-section-buttom">
                <!-- COMPANY TEL. -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="companyNumber"
                    type="tel"
                pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                    v-model="companyNumber"
                    placeholder="เบอร์สำนักงาน"
                    title="โปรดกรอกเบอร์โทรศัพท์ให้ถูกต้อง"
                    style="
                      text-indent: 8%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                  />
                
                </div>
                <!-- /COMPANY TEL. -->

                <!-- TAX NUM -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="taxNumber"
                    type="text"
                    v-model="taxNumber"
                    maxlength="13"
                    minlength="13"
                    pattern="[0-9]{13}"
                    title="ควรเป็นตัวเลขจำนวน 13 หลักเท่านั้น"
                    placeholder="เลขทะเบียนนิติบุคคล"
                    style="
                      text-indent: 4%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                  />
              
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
                  title="โปรดกรอกชื่อบริษัท/ลูกค้า"
                  style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
                  required
                />
              </div>

              <div class="contact-person-section-buttom">
                <div class="field contact-person-section-buttom-part">
                  <!-- เบอร์ผู้ติดต่อ -->

                  <input
                    id="contactNumber"
                    type="tel"
                pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                    title="กรุณากรอกเบอร์โทรให้ถูกต้อง"
                    v-model="contactNumber"
                    style="
                      text-indent: 8%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                    placeholder="เบอร์โทร"
                  />
                
                </div>
                <!-- เลขกำกับภาษี -->
                <div class="field contact-person-section-buttom-part">
                  <input
                    id="taxNumber"
                    type="text"
                    v-model="taxNumber"
                    pattern="[0-9]{13}"
                    minlength="13"
                    maxlength="13"
                    placeholder="เลขผู้เสียภาษี"
                    title="ควรเป็นตัวเลขจำนวน 13 หลักเท่านั้น"
                    style="
                      text-indent: 4%;
                      border: 1px solid rgb(211, 211, 211);
                    "
                  />
               
                </div>
              </div>
              <!-- email -->
              <div class="field">
                <input
                  id="contactEmail"
                  type="text"
                  v-model="contactEmail"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="โปรดกรอกอีเมลให้ถูกต้อง"
                  placeholder="อีเมล"
                  style="text-indent: 4%; border: 1px solid rgb(211, 211, 211)"
                />
            
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
            <div class="addr-detail-content">
              <div class="addr-detail maxsize-input">
                <label for="Address">ที่อยู่</label>
                <input
                  id="Address"
                  class="inputbox"
                  type="text"
                  v-model="Address"
                />
               
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
            </div>

            <div class="field">
              <label for="contactNumber"> เบอร์โทร </label>
              <input
                id="contactNumber"
                type="text"
                v-model="contactNumber"
                pattern="[0-9]{10}"
                minlength="9"
                maxlength="10"
                placeholder="เบอร์โทร"
                title="โปรดกรอกเบอร์โทรให้ถูกต้อง"
                style="
                  text-indent: 4%;
                  border: 1px solid rgb(211, 211, 211);
                  opacity: 0.5;
                "
              />
             
            </div>

            <div class="field">
              <label for="contactEmail"> อีเมล </label>
              <input
                id="contactEmail"
                type="text"
                v-model="contactEmail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="โปรดกรอกอีเมลให้ถูกต้อง"
                placeholder="อีเมล"
                style="
                  text-indent: 4%;
                  border: 1px solid rgb(211, 211, 211);
                  opacity: 0.5;
                "
              />
           
            </div>
          </div>
          <div v-else></div>
          <div class="submit-but-section">
            <button class="submit-button" type="submit">บันทึกข้อมูล</button>
          </div>
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
  numeric,
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
      taxNumber: '',
      contactEmail: '',
      Address: '',
      subdis: "",
      dis: "",
      province: "",
      postcode: "",
      success: false,

    };
  },

  validations: {
    status: {
      required,
    },
 
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
          .post(`https://pxu-server.herokuapp.com/customer/${id}`, {
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
          .then(() => {
            this.success = true;
            setTimeout(() => {
              this.$router.back();
            }, 500);
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
          `https://pxu-server.herokuapp.com/customer/${cusid}`
        );
        this.customer = response.data[0];
        // console.log(this.customer);
        this.status = this.customer.customerstatus;
        this.contactName = this.customer.contactName;
        this.contactNumber = this.customer.contactNumber;
        this.companyName = this.customer.companyName;
        this.companyNumber = this.customer.companyNumber;
        this.taxNumber = this.customer.ctaxNumber;
        this.contactEmail = this.customer.contactEmail;
        this.Address = this.customer.caddress;
        this.subdis = this.customer.csubdistrict;
        this.dis = this.customer.cdistrict;
        this.province = this.customer.cprovince;
        this.postcode = this.customer.cpostcode;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.whole-site {
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