<template>
  <div class="whole-site">
    
    <!-- Left layput for website  -->
    <div class="left-layout">
      <div style="color:red"> ***จำเป็นต้องกำหนดจำนวนใบวางบิลทุกครั้งที่ทำการแก้ไข</div>
      <!-- step pills -->
      <div class="step-pills">
        <div class="step-item" :class="{ active: isOne }" @click="goa(0)">
          <div class="num-pill"><span>1</span></div>
          <span class="text-pill"> ข้อมูลทั่วไป </span>
          <span> <b-icon icon="chevron-right"> </b-icon> </span>
        </div>

        <div class="step-item" :class="{ active: isTwo }" @click="goa(1)">
          <div class="num-pill"><span>2</span></div>
          <span class="text-pill"> ข้อมูลเพิ่มเติม </span>
          <span> <b-icon icon="chevron-right"> </b-icon> </span>
        </div>

        <div class="step-item" :class="{ active: isThree }" @click="goa(2)">
          <div class="num-pill"><span>3</span></div>
          <span class="text-pill"> เพิ่มขอบเขตงาน </span>
        </div>
      </div>
      <!-- step pills -->
      <!-- add detail section -->
      <div v-if="check == '0'" class="form-group detail-section">
        <todo :todos="todos" :sumtodo="sumtodo" :qID="qID" :inv="inv" />
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
            :estatus="estatus"
            @update-status="updateestatus"
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
           <button v-if="check=='2'" type="button" class="btn btn-outline-success" disabled>
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
          </button>
          <button v-if="check=='1'" type="button" class="btn btn-outline-success" disabled>
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
          </button>
          <button v-if="check=='0'" type="button" class="btn btn-outline-success" @click="submit">
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
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
import axios from "axios";
import moment from "moment";
export default {
  //component code
  name: "Quotation",
  components: {
    Todo,
    Summernote,
    QuotatuinPage2,
  },
  created() {
    this.qID = this.$route.params.id;
    this.getid(this.qID);
    this.getscope(this.qID);
    axios.delete(`http://localhost:5000/invoice/${this.qID}`);
    axios.delete(`http://localhost:5000/scope/${this.qID}`);
  },
  data() {
    return {
      quotation: [],
      todos: [],
      sumtodo: {
        statusvat: "vatใน",
        totalnow: 0,
        total: 0,
        vat7: 0,
        payment: 0,
        tax3: 0,
        cusstatus: "",
        customerID: "",
        employeeID: "",
        quoname: "",
        dateq: "",
        noteq: "",
        qIN: "1",
        checkedit: true,
      },
      sumnote: "",
      isOne: false,
      isTwo: false,
      isThree: true,
      qID: "",
      estatus: false,
      check: "2",
      inv: {
        IN1: 100,
        IN2: 0,
        IN3: 0,
      },
      inID: "",
      numindex: 0,
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
    submitquo() {
      axios
        .post(`http://localhost:5000/quotation/${this.qID}`, {
          eID: this.sumtodo.employeeID,
          date: this.sumtodo.dateq,
          noteq: this.sumtodo.noteq,
          qName: this.sumtodo.quoname,
          qIN: this.sumtodo.qIN,
          vatstatus: this.sumtodo.statusvat,
          payment: this.sumtodo.payment,
          estatus: this.estatus,
          summernote: this.sumnote,
        })
        .then(() => {
          alert("บันทึกข้อมูลสำเร็จ");
          history.back();
        });
    },
    submit() {
      const requestone = [];
      console.log(this.todos);
      let j = 0;
      for (let i = 1; i <= this.sumtodo.qIN; i++) {
        this.inID = this.qID + "-" + i;
        let test;
        if (this.sumtodo.qIN == 1 && i == 1) {
          test = this.inv.IN1 / 100;
        } else if (this.sumtodo.qIN == 2 && i == 1) {
          test = this.inv.IN1 / 100;
        } else if (this.sumtodo.qIN == 2 && i == 2) {
          test = this.inv.IN2 / 100;
        } else if (this.sumtodo.qIN == 3 && i == 1) {
          test = this.inv.IN1 / 100;
        } else if (this.sumtodo.qIN == 3 && i == 2) {
          test = this.inv.IN2 / 100;
        } else if (this.sumtodo.qIN == 3 && i == 3) {
          test = this.inv.IN3 / 100;
        }
        requestone[i - 1] = axios.post("http://localhost:5000/invoice", {
          inID: this.inID,
          qID: this.qID,
          cID: this.sumtodo.customerID,
          eID: this.sumtodo.employeeID,
          num: i,
          vatstatus: this.sumtodo.statusvat,
          customerstatus: this.sumtodo.cusstatus,
          payment: this.sumtodo.payment * test,
          address: this.quotation.address,
          subd: this.quotation.subdistrict,
          d: this.quotation.district,
          prov: this.quotation.province,
          postcode: this.quotation.postcode,
          taxNumber: this.quotation.taxNumber,
          companyName: this.quotation.wcompanyName,
          companyNumber: this.quotation.wcompanyNumber,
          estatus: this.estatus,
        });
        j = i;
        console.log(j);
      }
      for (let i = 0; i < this.todos.length; i++) {
        requestone[j + i] = axios.post("http://localhost:5000/scope", {
          qID: this.qID,
          name: this.todos[i].name,
          price: this.todos[i].price,
          quantity: this.todos[i].quantity,
        });
      }
      axios.all([requestone]).then(this.submitquo());
    },
    async getid(id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/quotation/${id}`
        );
        this.quotation = response.data[0];
        this.sumtodo.quoname = this.quotation.quotationName;
        this.sumtodo.customerID = this.quotation.customerID;
        this.sumtodo.employeeID = this.quotation.employeeID;
        this.sumtodo.dateq = moment(
          String(this.quotation.datequotation)
        ).format("YYYY-MM-DD");
        this.sumnote = this.quotation.summernote;
        this.sumtodo.payment = this.quotation.paymentPrice;
        this.sumtodo.cusstatus = this.quotation.customerstatus;
        this.sumtodo.statusvat = this.quotation.vatstatus;
        if (this.quotation.estatus == "0") {
          this.estatus = false;
        } else {
          this.estatus = true;
        }
        if (this.sumtodo.cusstatus == "นิติบุคคล") {
          if (this.sumtodo.statusvat == "vatนอก") {
            this.sumtodo.total = (this.sumtodo.payment * 100) / 110;
            this.sumtodo.totalnow = this.sumtodo.total;
            this.sumtodo.vat7 = this.sumtodo.total * 0.07;
            this.sumtodo.tax3 = this.sumtodo.total * 0.03;
          } else if (this.sumtodo.statusvat == "vatใน") {
            this.sumtodo.total = (this.sumtodo.payment * 100) / 103;
            this.sumtodo.vat7 = this.sumtodo.total * 0.07;
            this.sumtodo.tax3 = this.sumtodo.total * 0.03;
            this.sumtodo.totalnow = this.sumtodo.total - this.sumtodo.vat7;
          }
        } else {
          if (this.sumtodo.statusvat == "vatนอก") {
            this.sumtodo.total = (this.sumtodo.payment * 100) / 107;
            this.sumtodo.totalnow = this.sumtodo.total;
            this.sumtodo.vat7 = this.sumtodo.total * 0.07;
            this.sumtodo.tax3 = 0;
          } else if (this.sumtodo.statusvat == "vatใน") {
            this.sumtodo.total = this.sumtodo.payment;
            this.sumtodo.totalnow = this.sumtodo.total * 0.93;
            this.sumtodo.vat7 = this.sumtodo.total - this.sumtodo.totalnow;
            this.sumtodo.tax3 = 0;
          }
        }
        console.log(this.quotation);
        console.log(this.sumtodo);
      } catch (err) {
        console.log(err);
      }
    },
    async getscope(id) {
      try {
        const response = await axios.get(`http://localhost:5000/scope/${id}`);
        this.todos = response.data;
        console.log(this.todos);
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
.step-item.active .text-pill {
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