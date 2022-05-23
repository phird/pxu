<template>
  <div class="whole-site">
    <!-- left layout start here -->
    <div class="left-layout">
      <div class="l-container">
        <b-icon icon="chevron-left" @click="backward"> </b-icon>
        <div class="header">
          <div class="header-top">
            <div class="ht-left">
              <img
                src="http://localhost:5000/stamp/stamp.png"
                alt=""
                style="width: 140px"
              />
            </div>
            <div class="ht-right">
              <p style="font-size: 20px">ใบวางบิล</p>
            </div>
          </div>
          <div class="header-mid">
            <div class="company-detail">
              <span>{{ invoice.wcompanyName }}</span>
              <span
                >ที่อยู่ {{ invoice.address }} ต.{{ invoice.subdistrict }}
              </span>
              <span
                >อ.{{ invoice.district }} จ.{{ invoice.province }}
                {{ invoice.postcode }} , เบอร์มือถือ
                {{ invoice.wcompanyNumber }}</span
              >
              <span>เลขผู้เสียภาษี : {{ invoice.taxNumber }} </span>
              <span>อีเมล์ : {{ invoice.employeeEmail }}</span>
            </div>
            <div class="invoice-detail">
              <div class="id-box">
                <span>เลขที่ INV{{ invoice.invoiceID }}</span>
                <div class="date-section hbox">
                  <span>วันที่ </span>
                  <span
                    ><date-picker
                      v-model="dateinv"
                      valueType="format"
                    ></date-picker>
                  </span>
                </div>
                <span>ผู้ขาย {{ invoice.employeeName }}</span>
                <span>เบอร์ {{ invoice.employeeNumber }}</span>
              </div>
            </div>
          </div>
          <div class="header-bott">
            <div class="customer-section">
              <div v-if="invoice.customerstatus == 'นิติบุคคล'" class="cs-box">
                <span>ลูกค้า {{ invoice.companyName }}</span
                ><span
                  >ที่อยู่ {{ invoice.caddress }} ต.{{ invoice.csubdistrict }}
                </span>
                <span
                  >อ.{{ invoice.cdistrict }} จ.{{ invoice.cprovince }}
                  {{ invoice.cpostcode }} , เบอร์มือถือ
                  {{ invoice.companyNumber }}</span
                >
                <span>({{ invoice.contactName }})</span>
              </div>
              <div
                v-if="invoice.customerstatus == 'บุคคลธรรมดา'"
                class="cs-box"
              >
                <span
                  >ลูกค้า {{ invoice.companyName }}, เบอร์มือถือ
                  {{ invoice.companyNumber }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="add-detail">
            <div class="todo-form">
              <table class="table-detail">
                <tr class="container-todo-header">
                  <th class="cbox">
                    <span>รายละเอียด</span>
                  </th>
                  <th class="cbox">
                    <span>จำนวน</span>
                  </th>
                  <th class="cbox">
                    <span>ราคาต่อหน่วย</span>
                  </th>
                  <th class="cbox"></th>
                </tr>
                <tr class="container-todo borderbox">
                  <td class="cbox">
                    <input
                      v-model="newTodo"
                      type="text"
                      placeholder="กรอกรายละเอียด"
                      class="form-control form-input me-3"
                    />
                  </td>
                  <td class="cbox">
                    <input
                      v-model="newquantity"
                      type="number"
                      min="1"
                      class="form-control form-input me-3"
                      style="width: 133px"
                    />
                  </td>
                  <td class="cbox">
                    <input
                      v-model="newprice"
                      type="number"
                      min="0"
                      class="form-control form-input me-3"
                      style="width: 133px"
                    />
                  </td>
                  <td class="cbox">
                    <a-tooltip>
                      <template slot="title"> เพิ่มรายละเอียด </template>
                      <button
                        type="submit"
                        class="submit-btn"
                        @click="addTodo()"
                      >
                        + Add
                      </button>
                    </a-tooltip>
                  </td>
                </tr>
                <div class="div-of-todocontainer">
                  <tr
                    class="container-todo-list"
                    v-for="(todo, index) in todos"
                    :key="index"
                    style="width: 100%"
                  >
                    <!-- /card-todo-container -->
                    <div class="card-todo-container">
                      <td class="text-start cbox">
                        <span>
                          {{ todo.name }}
                        </span>
                      </td>

                      <td class="cbox">
                        <div
                          class="
                            d-flex
                            justify-content-start
                            align-items-center
                          "
                        >
                          <div>
                            {{ todo.quantity }}
                          </div>
                        </div>
                        <link
                          rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                        />
                      </td>

                      <td class="cbox">
                        <div
                          class="
                            d-flex
                            justify-content-start
                            align-items-center
                          "
                        >
                          <div>
                            {{ todo.price }}
                          </div>
                        </div>
                      </td>

                      <td class="cbox text-end action-btn">
                        <div class="d-flex justify-content-end">
                          <div class="" @click="upTodo(index)">
                            <i class="fa fa-angle-up"></i>
                          </div>
                          <div class="" @click="downTodo(index)">
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                          </div>
                          <div class="" @click="editTodo(index)">
                            <i class="fa fa-edit"></i>
                          </div>
                          <div class="" @click="deleteTodo(index)">
                            <i class="fa fa-close"></i>
                          </div>
                        </div>
                      </td>
                    </div>
                    <!-- /card-todo-container -->
                  </tr>
                </div>
              </table>
            </div>
          </div>

          <div class="payment-section">
            <div class="ps-left">
              <span></span>
            </div>
            <div class="ps-right">
              <div
                v-if="invoice.customerstatus == 'นิติบุคคล'"
                class="ps-right-box"
              >
                <span>รวมเป็นเงิน {{ total.toFixed(2) }} บาท</span>
                <span>ภาษี 7% {{ vat7.toFixed(2) }} บาท</span>
                <span>หัก ณ ที่จ่าย 3% {{ tax3.toFixed(2) }} บาท</span>
                <span
                  >จำนวนเงินรวมทั้งสิ้น
                  {{ invoice.priceINV.toFixed(2) }} บาท</span
                >
              </div>
              <div
                v-if="invoice.customerstatus == 'บุคคลธรรมดา'"
                class="ps-right-box"
              >
                <span>รวมเป็นเงิน {{ total.toFixed(2) }} บาท</span>
                <span>ภาษี 7% {{ vat7.toFixed(2) }} บาท</span>
                <span
                  >จำนวนเงินรวมทั้งสิ้น
                  {{ invoice.priceINV.toFixed(2) }} บาท</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="sign-section">
          <div class="sign-left">
            <span>
              <b-icon icon="square"></b-icon> โอนผ่าน{{ bankch.bname }}
            </span>
            <span> เลขบัญชี {{ bankch.accnum }} </span>
            <span> ชื่อบัญชี {{ bankch.accname }}</span>
          </div>
          <div class="sign-right">
            <div class="s-container">
              <!-- flex-d => column -->
              <div class="c-stamp">
                <span>
                  <img
                    src="../assets/images/stamp-com.png"
                    alt="company-stamp"
                    style="width: 120px"
                  />
                </span>
                <span> ในนาม {{ invoice.wcompanyName }}</span>
              </div>
              <div class="sign">
                <div class="sign-l">
                  <span style="display: flex"
                    >ลงชื่อ
                    <div id="signbox"></div
                  ></span>
                  <span> ({{ invoice.employeeName }}) </span>
                  <span> ผู้รับเงิน </span>
                </div>
                <div class="sign-r">
                  <span>{{ dateinv }}</span>
                  <span> วันที่ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- left layout end here -->

    <!-- ================================================================= -->
    <!--  right layout start here -->
    <div class="right-layout">
      <div class="right-layout-panel">
        <div class="container-panel">
          <div>
            งวดที่{{ invoice.numberinstallment }} : {{ invoice.priceINV }} บาท
          </div>
          <button type="button" class="btn btn-outline-success" @click="submit">
            <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
            บันทึก
          </button>

          <button type="button" class="btn btn-outline-danger" @click="cancle">
            <!-- <b-icon icon="x-square" style="color: red; font-size:24px;"></b-icon> -->
            ยกเลิก
          </button>

          <button
            v-if="
              this.invoice.dateinvoice != '0000-00-00' &&
              this.invoice.bankID != '0'
            "
            type="button"
            class="btn btn-outline-secondary"
          >
            <router-link
              :to="`/createInvoice/${invoice.invoiceID}`"
              target="_blank"
              style="text-decoration: none"
            >
              <!-- <b-icon icon="save" style="color: green; font-size:24px;"></b-icon> -->
              PDF
            </router-link>
          </button>
        </div>
      </div>

      <div class="right-layout-panel">
        <div class="container-panel">
          <span style="margin-bottom: 1em">ธนาคาร</span>
          <span class="bank-selected">
            <a-select id="customer-select" v-model="bankID" default-value="5">
              <a-select-option value="" disable> เลือกธนาคาร </a-select-option>
              <a-select-option
                v-for="ba in bank"
                :key="ba.bankID"
                :value="ba.bankID"
                @click="choosebank(ba.bankName, ba.bankAccount, ba.accountName)"
              >
                {{ ba.accountName }}
              </a-select-option>
            </a-select>
          </span>
        </div>
      </div>
    </div>
    <!-- RIGHT LAYOUT END HERE -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      inID: "",
      invoice: [],
      //
      todos: [],
      newprice: 0,
      newquantity: 1,
      newTodo: "",
      indexEditTodo: null,
      tempNameTodo: "",
      tempquantityTodo: "",
      temppriceTodo: "",
      //
      bank: [],
      dateinv: null,
      vat7: 0,
      tax3: 0,
      total: 0,
      bankID: "",
      changein: false,
      bankch: {
        bname: "",
        accname: "",
        accnum: "",
      },
    };
  },
  created() {
    this.inID = this.$route.params.id;
    this.getinv(this.inID);
    this.getbank();
    this.getscope(this.inID);
  },
  methods: {
    backward() {
      history.back();
    },
    choosebank(bn, ac, an) {
      this.bankch.bname = bn;
      this.bankch.accname = ac;
      this.bankch.accnum = an;
    },
    addTodo() {
      if (this.newTodo.length === 0) return;
      if (this.indexEditTodo === null) {
        this.todos.push({
          name: this.newTodo,
          quantity: this.newquantity,
          price: this.newprice,
        });
      } else {
        this.todos[this.indexEditTodo].name = this.newTodo;
        this.todos[this.indexEditTodo].quantity = this.newquantity;
        this.todos[this.indexEditTodo].price = this.newprice;
        this.indexEditTodo = null;
      }
      this.newTodo = "";
      this.newquantity = 1;
      this.newprice = 0;
      this.changein = true;
    },
    editTodo(index) {
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.indexEditTodo = index;
      this.changein = true;
    },
    deleteTodo(index) {
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.todos.splice(index, 1);
      this.newTodo = "";
      this.newquantity = 1;
      this.newprice = 0;
      this.changein = true;
    },
    upTodo(index) {
      if (index === 0) return;
      this.tempNameTodo = this.todos[index].name;
      this.tempquantityTodo = this.todos[index].quantity;
      this.temppriceTodo = this.todos[index].price;
      this.todos[index].name = this.todos[index - 1].name;
      this.todos[index].quantity = this.todos[index - 1].quantity;
      this.todos[index].price = this.todos[index - 1].price;
      this.todos[index - 1].name = this.tempNameTodo;
      this.todos[index - 1].quantity = this.tempquantityTodo;
      this.todos[index - 1].price = this.temppriceTodo;
      this.changein = true;
    },
    downTodo(index) {
      if (index === this.todos.length - 1) return;
      this.tempNameTodo = this.todos[index].name;
      this.tempquantityTodo = this.todos[index].quantity;
      this.temppriceTodo = this.todos[index].price;
      this.todos[index].name = this.todos[index + 1].name;
      this.todos[index].quantity = this.todos[index + 1].quantity;
      this.todos[index].price = this.todos[index + 1].price;
      this.todos[index + 1].name = this.tempNameTodo;
      this.todos[index + 1].quantity = this.tempquantityTodo;
      this.todos[index + 1].price = this.temppriceTodo;
      this.changein = true;
    },
    cancle() {
      history.back();
    },
    subinv() {
      axios
        .post(`http://localhost:5000/invoice/${this.inID}`, {
          bankID: this.bankID,
          dateinv: this.dateinv,
        })
        .then(() => {
          alert("บันทึกข้อมูลสำเร็จ");
          /* history.back(); */
          this.$router.go(0);
        });
    },
    async submit() {
      if (this.changein) {
        await axios.delete(`http://localhost:5000/scope/${this.inID}`);
        const requestone = [];
        for (let i = 0; i < this.todos.length; i++) {
          requestone[i] = axios.post("http://localhost:5000/scope", {
            qID: this.inID,
            name: this.todos[i].name,
            price: this.todos[i].price,
            quantity: this.todos[i].quantity,
          });
        }
        axios.all([requestone]).then(this.subinv());
      } else {
        this.subinv();
      }
    },
    async getinv(id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/invoice/in/${id}`
        );
        this.invoice = response.data[0];
        if (this.invoice.customerstatus == "นิติบุคคล") {
          if (this.invoice.vatstatus == "vatนอก") {
            this.total = this.invoice.totalpriceinv;
            this.vat7 = this.total * 0.07;
            this.tax3 = this.total * 0.03;
          } else if (this.invoice.vatstatus == "vatใน") {
            this.total = (this.invoice.totalpriceinv * 100) / 107;
            this.vat7 = this.invoice.totalpriceinv - this.total;
            this.tax3 = this.total * 0.03;
          }
        } else {
          if (this.invoice.vatstatus == "vatนอก") {
            this.total = this.invoice.totalpriceinv;
            this.vat7 = this.total * 0.07;
            this.tax3 = 0;
          } else if (this.invoice.vatstatus == "vatใน") {
            this.total = (this.invoice.totalpriceinv * 100) / 107;
            this.vat7 = this.invoice.totalpriceinv - this.total;
            this.tax3 = 0;
          }
        }

        this.dateinv = moment(String(this.invoice.dateinvoice)).format(
          "YYYY-MM-DD"
        );
        if (this.invoice.bankID != "0") {
          this.bankID = this.invoice.bankID;
          this.getbankid(this.bankID);
        }

        console.log(this.invoice);
      } catch (err) {
        console.log(err);
      }
    },
    async getbank() {
      try {
        const response = await axios.get(`http://localhost:5000/bank`);
        this.bank = response.data;
        console.log(this.bank);
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
    async getbankid(id) {
      try {
        const response = await axios.get(`http://localhost:5000/bank/${id}`);
        this.bankch.bname = response.data[0].bankName;
        this.bankch.accname = response.data[0].accountName;
        this.bankch.accnum = response.data[0].bankAccount;
        console.log("ddsfsdf");
        console.log(this.bankch);
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
  display: flex;
  width: 70%;
  /* background-color: red; */
}
.right-layout {
  width: 30%;
  /* background-color: tan; */
}
/* right layout */
.right-layout-panel {
  margin-top: 0;
  margin-bottom: auto;
  padding: 40px;
  margin: auto;
  width: 70%;
  border-radius: 14px;
  margin-bottom: 2em;
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

.container-panel router-link {
  margin: 10px;
}

.bank-selected a-select {
  display: flex;
  width: 100%;
}

.ant-select {
  font-weight: 600;
  color: #575454;
  width: 100% !important;
}

/* =================
right layout
================= */

/* left layout */

.l-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  align-content: center;
  background-color: white;
  -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  padding: 4em;
  margin-bottom: 2em;
}

.header {
  display: flex;
  flex-direction: column;
}

.header-top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.ht-left {
  width: 50%;
  display: flex;
}
.ht-right {
  width: 50%;
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 0;
}

.header-mid {
  display: flex;
  flex-direction: row;
}
.company-detail {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.invoice-detail {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
}
.id-box {
  display: flex;
  flex-direction: column;
}

.header-bott {
  display: flex;
  flex-direction: row;
}
.customer-section {
  display: flex;
  width: 100%;
  margin-top: 2em;
}
.cs-box {
  display: flex;
  flex-direction: column;
}

.body {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.payment-section {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.ps-left {
  display: flex;
  width: 50%;
}

.ps-right {
  display: flex;
  flex-direction: column;
  width: 50%;
  /* align-items: center; */
}

.ps-right-box {
  display: flex;
  flex-direction: column;
  text-align: end;
}

.sign-section {
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.sign-left {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.sign-right {
  display: flex;
  width: 50%;
  align-items: center;
}
.s-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.c-stamp {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.sign {
  display: flex;
  flex-direction: row;
  padding: 2em;
  width: 100%;
}
.sign-l {
  width: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.sign-r {
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
}

#signbox {
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
}

/* =================
left layout
================= */

/* to do layout*/
.submit-btn {
  width: 134px;
  height: 26px;
  background-color: #1890ff;
  border-radius: 14px;
  border: none;
  font-size: 10px;
  font-weight: 500;
  color: white;
}

.add-detail {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 1em;
}

.todo-form {
  width: 100%;
  padding: 1em 1em 2em 1em;
  border-bottom: 1px solid rgba(141, 141, 141, 0.527);
}
.borderbox {
  border-bottom: 1px solid rgba(141, 141, 141, 0.527);
}
.table-detail {
  width: 100%;
}
.container-todo-header {
  background-color: black;
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-around;
  vertical-align: middle;
}
.box-inside {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  vertical-align: middle;
}
.cbox {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.container-todo {
  padding: 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

/* card */
.container-todo-list {
  padding: 0.6em 1em 0em 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
/* card */
.card-todo-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(59, 59, 59, 0.562);
  padding: 0.4em;
  border-radius: 14px;
  justify-content: center;
}

.form-input {
  border: 1px solid rgb(168, 167, 167);
  border-radius: 14px;
  height: 30px;
}
.form-control:focus {
  box-shadow: none;
  /* border: none; */
}
.submit-btn {
  width: 134px;
  height: 26px;
  background-color: #1890ff;
  border-radius: 14px;
  border: none;
  font-size: 10px;
  font-weight: 500;
  color: white;
}
.todo-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.action-btn i {
  font-size: 25px;
  cursor: pointer;
  padding: 0 0.2em 0 0.2em;
}

/* to-do layout end  */
</style>