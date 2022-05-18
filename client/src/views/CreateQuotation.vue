<template>
  <div class="whole-site">
    <!-- Left layput for website  -->
    <div class="left-layout">
      <!-- step pills -->
      <div class="step-pills">
        <div class="step-item" :class="{ active: isOne }" @click="goa(0)">
          <div class="num-pill"><span>1</span></div>
          <span class="text-pill"> ข้อมูลทั่วไป </span>
          <span>  <b-icon icon="chevron-right"> </b-icon> </span>
        </div>
         
        <div class="step-item" :class="{ active: isTwo }" @click="goa(1)">  
          <div class="num-pill"><span>2</span></div>
          <span class="text-pill"> ข้อมูลเพิ่มเติม </span>
          <span>  <b-icon icon="chevron-right"> </b-icon> </span>
        </div>


        <div class="step-item" :class="{ active: isThree }" @click="goa(2)"> 
          <div class="num-pill"><span>3</span></div>
          <span class="text-pill"> เพิ่มขอบเขตงาน </span>
        </div>
      </div>
      <!-- step pills -->
      <!-- add detail section -->
      <div v-if="check == '0'" class="form-group detail-section">
        <todo
          :todos="todos"
          :sumtodo="sumtodo"
          :qID="qID"
          :inv="inv"
        />
        <div class="nav-section">
          <button @click="goa(1)" class="nav-but">
            ต่อไป <b-icon icon="chevron-right"></b-icon>
          </button>
        </div>
      </div>
      <!-- add detail section -->

      <!-- sign - section  -->
      <div v-if="check == '1'" class="form-group detail-section">
        <div class="set-Default">
          <quotatuin-page-2 
          :dateq="sumtodo.dateq"
          :estatus="estatus" @update-status="updateestatus"
          />
          <div class="nav-section">
            <button @click="goa(0)" class="nav-but nav-but-back">
              ก่อนหน้า
            </button>
            <button @click="goa(2)" class="nav-but">ต้อไป</button>
          </div>
        </div>
      </div>
      <!-- sign - section  -->

      <!-- add scope of work  - section  -->
      <div v-if="check == '2'" class="form-group detail-section">
        <summernote :sumnote="sumnote" @update-text="updatesum" />
        <div class="nav-section">
          <button @click="goa(1)" class="nav-but nav-but-back">ก่อนหน้า</button>
        </div>
      </div>

      <!-- add scope of work  - section  -->
    </div>
    <!-- /Left layput for website  -->

    <!-- Right layput for website  -->
    <div class="right-layout">
      <div class="right-layout-panel">
        <div class="container-panel">
          <button type="button" class="btn btn-outline-primary" disabled>
            <!-- <b-icon icon="file-earmark-pdf" style="color: blue; font-size:24px;"></b-icon> -->
            ดาวน์โหลดเป็น PDF
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            @click="submitff"
          >
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
          </button>
          <button type="button" class="btn btn-outline-danger">
            <!-- <b-icon icon="x-square" style="color: red; font-size:24px;"></b-icon> -->
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
    <!--/Right layput for website  -->
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import Summernote from "./Summernote.vue";
import QuotatuinPage2 from "./CreateQuoP2.vue";
import moment from "moment";
import axios from "axios";
const today = new Date();
const tous = moment(today).format("YY-MM-");
export default {
  //component code
  name: "Quotation",
  components: {
    Todo,
    Summernote,
    QuotatuinPage2,
  },
  created() {
    this.getid();
    this.getwebsite();
  },
  data() {
    return {
      todos: [],
      sumtodo: {
        statusvat: "vatใน",
        totalnow: 0,
        total: 0,
        vat7: 0,
        payment: 0,
        tax3: 0,
        cusstatus:'',
        customerID: "",
        employeeID: "",
        quoname: "",
        dateq: "",
        noteq:'',
        qIN:'',
      },
      sumnote: "",  
      isOne: true,
      isTwo: false,
      isThree: false,
      qID: "",  
      estatus: false,
      check: "0",
      inv: {
        IN1: 100,
        IN2: 0,
        IN3: 0,
      },
      web:[],
    };
  },
  methods: {
    goa(numf) {
      if (numf == "0") {
        this.isOne = true;
        this.isTwo = false;
        this.isThree = false;
      } else if (numf == "1") {
        this.isTwo = true;
        this.isOne = false;
        this.isThree = false;
      } else {
        this.isThree = true;
        this.isOne = false;
        this.isTwo = false;
      } 
      console.log(this.isOne);
      console.log(this.isTwo);
      console.log(this.isThree);
      this.check = numf;
      console.log(this.check);
    },
    updatesum(sumnote) {
      this.sumnote = sumnote;
    },
    updateestatus(estatus) {
      this.estatus = estatus;
    },
    submitff() {
      axios
        .post("http://localhost:5000/quotation", {
          qID: this.qID,
          cID: this.sumtodo.customerID,
          eID: this.sumtodo.employeeID,
          date: this.sumtodo.dateq,
          noteq: this.sumtodo.noteq,
          qName: this.sumtodo.quoname,
          qIN: this.sumtodo.qIN,
          vatstatus: this.sumtodo.statusvat,
          customerstatus:this.sumtodo.cusstatus, 
          payment: this.sumtodo.payment,
          address: this.web.address,
          subd: this.web.subdistrict,
          d: this.web.district,
          prov: this.web.province,
          postcode: this.web.postcode,
          taxNumber: this.web.taxNumber,
          companyName: this.web.companyName,
          estatus: this.estatus,
          summernote: this.sumnote,
        });
    },
    async getid(){
      try {
        const response = await axios.put("http://localhost:5000/quotation/qid",{to:tous});
        if(response.data[0].num=='0'){
          this.qID = "QA" + tous + '001';
        }else{
          this.qID = "QA"+ tous + '00'+(response.data[0].num+1);
      } }catch (err) {
        console.log(err);
      }
    },
    async getwebsite(){
      try {
        const response = await axios.get("http://localhost:5000/website");
        this.web=response.data[0];
        console.log(this.web);
       }catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style scoped>
.whole-site {
  font-family: "Mitr", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.left-layout {
  width: 70%;
}
.right-layout {
  width: 30%;
}
.right-layout-panel {
  padding: 40px;
  margin: auto;
  width: 70%;
  border-radius: 14px;
  align-content: center;
  background-color: white;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.container-panel {
  display: flex;
  flex-direction: column;
}
.container-panel button {
  margin: 10px;
}
.nav-section {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.nav-but {
  width: 164px;
  height: 36px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  position: relative;
  text-align: center;
  border-radius: 10px !important;
  color: white;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  margin: 0.5rem;
  outline: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  background-color: #7367f0;
}
.nav-but-back {
  border: 1px solid #7367f0 !important;
  color: #7367f0 !important;
  background-color: white !important;
}
.nav-but-suc {
  color: white !important;
  background-color: rgb(74, 204, 74) !important;
}
/* specific module change  */

.step-pills {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: transparent !important;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: flex-start !important;
  padding: 1rem;
  border-radius: 1rem;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem transparent !important ;
}
.step-item {
  cursor: pointer;
  display: flex;
  height: 100%;
  flex-direction: row;
  background-color: transparent !important;
  border-radius: 10px;
  padding: 5px 5px;
  list-style-type: none;
  gap: 10px;
}

.step-item.active .num-pill {
  background-color: #7367f0;
  border-radius: 10px;
  color: white;
  justify-content: center;
  text-align: center;
}
.step-item.active .text-pill{
  font-weight: 600;
}
.num-pill {
  background-color: #7b7b7b;
  border-radius: 10px;
  width: 50px;
  height: 100%;
  color: white;
  justify-content: center;
  text-align: center;
}
.text-pill {
  height: 100%;
  width: 100%;
  font-weight: 200;
}

.step-pills .step-item a {
  text-decoration: none;
  color: #7b7b7b;
}
.step-pills .step-item.active {
  border: 0px solid transparent !important;
}
.detail-section {
  background-color: white !important;
  margin-left: auto;
  -webkit-box-shadow: none !important;
  padding: 2em;
  box-shadow: 0 !important;
  border-radius: 14px;
  margin-bottom: 2em;
  align-content: center;
  background-color: white;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>