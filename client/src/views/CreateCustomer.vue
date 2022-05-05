<template>
  <div>
    <form @submit.prevent="submitForm()" class="form-for-customer">
      <div class="toggle-type-customer">
        <div>
          <input v-model="status" id="individual" type="radio" value="บุคคลธรรมดา" @change="checkcompany(status)"/> <!-- บุคคลธรรมดา -->
          <label for="individual">บุคคลธรรมดา</label>
        </div>
        <div>
          <input v-model="status" id="juristic" type="radio" value="นิติบุคคล" @change="checkcompany(status)" /> <!-- นิติบุคคล -->
          <label for="juristic">นิติบุคคล</label>
        </div>
      </div> <!-- /toggle-type-customer -->
      <!-- ==================================================================== -->
      <div v-if="status == 'นิติบุคคล'">
        <div class="contact-person-section">
          <h6 class="icon">  <b-icon icon="person" style="color: #376303;"></b-icon > ข้อมูลผู้ติดต่อ</h6>
          <!-- Name of company -->
          <div class="field">
            <input id="companyName" type="text" v-model="companyName" placeholder="ชื่อบริษัท/ลูกค้า" style="text-indent:4%"/>
            <div class="error" v-if="$v.companyName.$error">
              <template v-if="!$v.companyName.$invalid"> </template>
              <template v-else style="color:red"> ต้องระบุชื่อ </template>
            </div>
          </div>
          <!-- /Name of company -->
          <div class="contact-person-section-buttom">
            <!-- COMPANY TEL. -->
            <div class="field contact-person-section-buttom-part ">
              <input id="companyNumber" type="tel" v-model="companyNumber" placeholder="เบอร์สำนักงาน" style="text-indent:8%"/>
              <div class="error" v-if="$v.companyNumber.$error">
                <template v-if="!$v.companyNumber.$invalid"> </template>
                <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
              </div>
            </div>
            <!-- /COMPANY TEL. -->

            <!-- TAX NUM -->
            <div class="field contact-person-section-buttom-part">
              <input id="taxNumber" type="text" v-model="taxNumber" placeholder="เลขทะเบียนนิติบุคคล" style="text-indent:4%"/>
              <div class="error" v-if="$v.taxNumber.$error">
                <template v-if="!$v.taxNumber.$invalid"> </template>
                <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
              </div>
            </div>
            <!-- TAX NUM -->
          </div>
          
        </div>   <!-- /contact-person-section -->
      </div>
      <!-- ==================================================================== -->
      <!-- บุคคลธรรมดา -->
      <div v-else>
        <h6 class="icon">  <b-icon icon="person" style="color: #376303;"></b-icon > ข้อมูลผู้ติดต่อ</h6>
        <div class="field">
          <!-- ชื่อผู้ติดต่อ -->
          <div class="field">
            <input id="contactName" type="text" v-model="contactName" placeholder="ชื่อบริษัท/ลูกค้า" style="text-indent:4%"/>
            <div class="error" v-if="$v.contactName.$error">
              <template v-if="!$v.contactName.$invalid"> </template>
              <template v-else> ต้องระบุชื่อ </template>
            </div>
          </div>

          <div class="contact-person-section-buttom">
            <div class="field contact-person-section-buttom-part">
            <!-- เบอร์ผู้ติดต่อ -->
            
            <input id="contactNumber" type="tel" v-model="contactNumber" style="text-indent:8%" placeholder="เบอร์โทร" />
              <div class="error" v-if="$v.contactNumber.$error">
                <template v-if="!$v.contactNumber.$invalid"> </template>
                <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
              </div>
            
            </div>
            <!-- เลขกำกับภาษี -->
            <div class="field contact-person-section-buttom-part">
              
                <input id="taxNumber" type="text" v-model="taxNumber" placeholder="เลขผู้เสียภาษี" style="text-indent:4%"/>
                <div class="error" v-if="$v.taxNumber.$error">
                  <template v-if="!$v.taxNumber.$invalid"> </template>
                  <template v-else> หมายเลขกำกับภาษีต้องมี13ตัว</template>
                </div>
              
            </div>
          </div>
          <!-- email -->
          <div class="field">
            <input id="contactEmail" type="text" v-model="contactEmail" placeholder="อีเมล" style="text-indent:4%"/>
            <div class="error" v-if="$v.contactEmail.$error">
              <template v-if="!$v.contactEmail.$invalid"> </template>
              <template v-else> email error </template>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <!-- / บุคคลธรรมดา -->
      <div class="address-info ">
        <h6> <b-icon icon="house-door" style="color: #376303;"></b-icon > ที่อยู่ผู้ติดต่อ</h6>
        <!-- ที่อยู่ -->
        <div class="field" id="addr-detail">
          <label for="Address">บ้านเลขที่/ที่อยู่</label>
          <input id="Address" type="text" v-model="Address" />
          <div class="error" v-if="$v.Address.$error">
            <template v-if="!$v.Address.$invalid"> </template>
            <template v-else> ต้องใส่ที่อยู่ </template>
          </div>
        </div>
        <div class="addr-info-section">
             <!-- ตำบล -->
              <div class="field" id="addr-box">
                <label for="subdis">ตำบล</label>
                <input id="subdis" type="text" v-model="subdis" />
                <div class="error" v-if="$v.subdis.$error">
                  <template v-if="!$v.subdis.$invalid"> </template>
                  <template v-else> ****</template>
                </div>
              </div>
              <!-- อำเภอ -->
              <div class="field" id="addr-box">
                <label for="dis">อำเภอ</label>
                <input id="dis" type="text" v-model="dis" />
                <div class="error" v-if="$v.dis.$error">
                  <template v-if="!$v.dis.$invalid"> </template>
                  <template v-else> ****</template>
                </div>
              </div>
              <!-- จังหวัด -->
              <div class="field" id="addr-box">
                <label for="province">จังหวัด</label>
                <input id="province" type="text" v-model="province" />
                <div class="error" v-if="$v.province.$error">
                  <template v-if="!$v.province.$invalid"> </template>
                  <template v-else> ****</template>
                </div>
              </div>
              <!-- zip code -->
              <div class="field" id="addr-box">
                <label for="postcode">รหัสไปรษณีย์</label>
                <input id="postcode" type="text" v-model="postcode" />
                <div class="error" v-if="$v.postcode.$error">
                  <template v-if="!$v.postcode.$invalid"> </template>
                  <template v-else> รหัสไปรษณีย์ต้องมี5ตัว</template>
                </div>
              </div>

        </div>

      </div>
      <br/>
      <!-- รายละเอียดผู้ติดต่อ -->
      <div v-if="status == 'นิติบุคคล'">
        <h6> <b-icon icon="person" style="color: #376303;"></b-icon >  รายละเอียดผู้ติดต่อ </h6>

        <div class="field">
          <label for="contactName"> ชื่อผู้ติดต่อ</label>
          <input id="contactName" type="text" v-model="contactName" />
          <div class="error" v-if="$v.contactName.$error">
            <template v-if="!$v.contactName.$invalid"> </template>
            <template v-else> ต้องระบุชื่อ </template>
          </div>
        </div>

        <div class="field">
          <label for="contactNumber"> เบอร์โทร </label>
          <input id="contactNumber" type="text" v-model="contactNumber" />
          <div class="error" v-if="$v.contactNumber.$error">
            <template v-if="!$v.contactNumber.$invalid"> </template>
            <template v-else> เบอร์บริษัทต้องมี10หลัก </template>
          </div>
        </div>
        
        <div class="field">
          <label for="contactEmail"> อีเมล </label>
          <input id="contactEmail" type="text" v-model="contactEmail" />
          <div class="error" v-if="$v.contactEmail.$error">
            <template v-if="!$v.contactEmail.$invalid"> </template>
            <template v-else> email error </template>
          </div>
        </div>

      </div>
      <div v-else></div>
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
      contactName: "",
      contactNumber: "",
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
      }else{
         await axios.post("http://localhost:5000/customer", {
              companyName : this.companyName,
              companyNumber:this.companyNumber,
              status:this.status,
              address:this.Address,
              subdis:this.subdis,
              dis:this.dis,
              province:this.province,
              postcode:this.postcode,
              contactName:this.contactName,
              contactNumber:this.contactNumber,
              contactEmail:this.contactEmail,
              taxNumber:this.taxNumber,
        }).then(function(){
          alert('ok');
        });
      }
    },
    checkcompany(status){
      if(status=='บุคคลธรรมดา'){
        this.companyName="test";
        this.companyNumber="0000000000";
      }else{
        this.companyName=null;
        this.companyNumber=null;
      }
    },
  },
};
</script>

<style scoped>
  .form-for-customer{
    font-family: "Mitr", sans-serif;
    align-content: center;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  .contact-person-section-buttom{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 2em;
  }
  .contact-person-section-buttom-part{
    width: 100%;
  }
  #companyName , #contactName{
    background-image: url("../assets/images/icons/file-icons/person-circle.svg") ;
    opacity: 0.5;
    background-repeat: no-repeat ;
    background-position: 5px 50%;
    width: 100%;
  }
  #companyNumber, #contactNumber{
    background-image: url("../assets/images/icons/file-icons/telephone-fill.svg");
    opacity: 0.5;
    background-repeat: no-repeat ;
    background-position: 5px 50%;
    width: 100%;
  }
  #taxNumber{
    opacity: 0.5;
    width: 100%;
  }
  #contactEmail{
    background-image: url("../assets/images/icons/file-icons/envelope-fill.svg") ;
    opacity: 0.5;
    background-repeat: no-repeat ;
    background-position: 5px 50%;
    width: 100%;
  }

 #addr-detail input{
   width: 100%;
 }
 #addr-box{
   display: flex;
   flex-direction: column;
 }

 .addr-info-section{
   display: flex;
   flex-wrap: wrap;
   flex-direction: row;
   width: 100%;
   justify-content: space-between;
   
 }
 .addr-info-section div{
   width: 45%;
 }
  .form-for-customer input{
    border-radius: 10px;
    border: 0.5 solid rgba(0, 0, 0, 0.473) ;
    opacity: 0.5;
  } 

  .contact-person-section{
    display: flex;
    flex-direction: column;
  }


  .toggle-type-customer{
    display: flex;
    flex-direction: row;
    padding: 0 1em 1em 0;
  }
  .toggle-type-customer div{
    padding: 1em 1em 1em 0 ;
  }

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