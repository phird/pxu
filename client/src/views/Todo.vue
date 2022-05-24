<template>
  <div class="container rounded-3">
    <div class="container-header">
      <span class="page-title"> สร้างใบเสนอราคา </span>
    </div>

    <!-- 
    ==================================================================
    header 
    ================================================================== -->
    <div class="header">
      <div class="header-left-section">
        <div class="project-name">
          <span for="customer-select"> ชื่อโปรเจก: </span>
          <input
            v-model="sumtodo.quoname"
            class="project-name-input"
            type="text"
            @change="auth()"
          />
        </div>

        <div v-if="!sumtodo.checkedit" class="select-left-section">
          <span for="customer-select"> ลูกค้า: </span>
          <a-select
            id="customer-select"
            v-model="sumtodo.customerID"
            style="width: 120px"
            @change="auth(), calc(sumtodo.statusvat)"
          >
            <a-select-option value="" disable> เลือกลูกค้า </a-select-option>
            <a-select-option
              v-for="cus in customer"
              :key="cus.customerID"
              :value="cus.customerID"
              @click="sumtodo.cusstatus = cus.customerstatus"
            >
              {{ cus.companyName }}
            </a-select-option>
          </a-select>
        </div>
        <div v-if="sumtodo.checkedit" class="select-left-section">
          <span for="customer-select"> ลูกค้า: </span>
          <a-select
            id="customer-select"
            v-model="sumtodo.customerID"
            style="width: 120px"
            @change="auth(), calc(statusvat)"
            disabled
          >
            <a-select-option value="" disable> เลือกลูกค้า </a-select-option>
            <a-select-option
              v-for="cus in customer"
              :key="cus.customerID"
              :value="cus.customerID"
              @click="sumtodo.cusstatus = cus.customerstatus"
            >
              {{ cus.companyName }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <!-- end of left section -->
      <div class="header-right-section">
        <div class="right-section-container">
          <div class="container-box">
            <div class="idQuotation hbox">
              <span>เลขที่ </span> <span> QA{{ qID }} </span>
            </div>
            <div class="date-section hbox">
              <span>วันที่ </span>
              <span
                >
                <date-picker
                  v-model="sumtodo.dateq"
                  valueType="format"
                  :format = "thFormat"
  
                ></date-picker>
              </span>
            </div>
            <div class="seller-name hbox">
              <span>ผู้ขาย </span>
              <span>
                <a-select
                  id="customer-select"
                  v-model="sumtodo.employeeID"
                  @change="auth()"
                  style="width: 120px"
                  default-value="5"
                >
                  <a-select-option value="" disable>
                    เลือกพนักงานขาย
                  </a-select-option>
                  <a-select-option
                    v-for="cus in employee"
                    :key="cus.employeeID"
                    :value="cus.employeeID"
                  >
                    {{ cus.employeeName }}
                  </a-select-option>
                </a-select>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- end of right section -->
    </div>
    <!-- 
    ==================================================================
    end of header 
    ================================================================== -->

    <!-- 
    ==================================================================
    add detail
    ================================================================== -->

    <div class="add-detail">
      <!-- <form> -->
      <!-- need validation -->
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
                  @click="addTodo(), calc(sumtodo.statusvat)"
                >
                  + Add
                </button>
              </a-tooltip>
            </td>
          </tr>
          <tr
            class="container-todo-list"
            v-for="(todo, index) in todos"
            :key="index"
          >
            <!-- /card-todo-container -->
            <div class="card-todo-container">
              <td class="text-start cbox" style="width: 20%">
                <span>
                  {{ todo.name }}
                </span>
              </td>

              <td class="cbox">
                <div class="d-flex justify-content-start align-items-center">
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
                <div class="d-flex justify-content-start align-items-center">
                  <div>
                    {{ todo.price  }}
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
                  <div class="" @click="deleteTodo(index), calc(sumtodo.statusvat)">
                    <i class="fa fa-close"></i>
                  </div>
                </div>
              </td>
            </div>
            <!-- /card-todo-container -->
          </tr>
        </table>
      </div>

      <!-- </form> -->
      <!--  
      ====================
      each card
      ==================== -->

      <!--  
      ====================
      each card
      ==================== -->
    </div>

    <!-- 
    ==================================================================
    /add detail
    ================================================================== -->

    <!-- 
    ==================================================================
   sum payment
    ================================================================== -->
    <div class="sum-payment">
      <div class="sum-payment-left-section">
        <div class="installment-box">
          <span> รูปแบบการชำระเงิน </span>
          <div class="installment-box-sl">
            <a-tabs v-model="sumtodo.qIN" @change="auth(),changeofin();">
              <a-tab-pane key="1" value="1" tab="ชำระเต็มจำนวน"> </a-tab-pane>
              <a-tab-pane key="2" value="2" tab="ผ่อนจ่าย 2 งวด" force-render>
                <div>
                  <div class="two-installment">
                    <div>
                      <label for="installment1"> งวดที่ 1</label>
                      <input
                        class="intstallment_input"
                        id="installment1"
                        type="text"
                        v-model="inv.IN1"
                        @change="auth()"
                      />
                    </div>
                    <div>
                      <label for="installment2"> งวดที่ 2</label>
                      <input
                        class="intstallment_input"
                        id="installment2"
                        type="text"
                        v-model="inv.IN2"
                        @change="auth()"
                      />
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane key="3" value="3" tab="ผ่อนจ่าย 3 งวด">
                <div class="three-installment">
                  <div>
                    <label for="installment1"> งวดที่ 1</label>
                    <input
                      class="intstallment_input"
                      id="installment1"
                      type="text"
                      v-model="inv.IN1"
                      @change="auth()"
                    />
                  </div>
                  <div>
                    <label for="installment2"> งวดที่ 2</label>
                    <input
                      class="intstallment_input"
                      id="installment2"
                      type="text"
                      v-model="inv.IN2"
                      @change="auth()"
                    />
                  </div>
                  <div>
                    <label for="installment3"> งวดที่ 3</label>
                    <input
                      class="intstallment_input"
                      id="installment3"
                      type="text"
                      v-model="inv.IN3"
                      @change="auth()"
                    />
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
      <div class="sum-payment-right-section">
        <div>
          รวมเป็นเงิน (ก่อนคิดภาษี)
          <select class="vatalbe" v-model="sumtodo.statusvat" @change="calc(sumtodo.statusvat)">
            <option value="vatใน">vatใน</option>
            <option value="vatนอก">vatนอก</option>
          </select>
          : {{ this.sumtodo.totalnow.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }} บาท
        </div>
        <div step="0.01">vat 7% : {{ this.sumtodo.vat7.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }} บาท</div>
        <div v-if="sumtodo.cusstatus == 'นิติบุคคล'" step="0.01">
          ภาษี ณ ที่จ่าย 3% : {{ this.sumtodo.tax3.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }} บาท
        </div>
        <div step="0.01">รวมเป็นเงิน : {{ this.sumtodo.payment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  }} บาท</div>
      </div>
    </div>

    <!-- 
    ==================================================================
    /sum payment
    ================================================================== -->

    <!-- 
    ==================================================================
    note-section
    ================================================================== -->
    <div class="note-section">
      <div class="note-container">
        <span>หมายเหตุ </span>
        <input v-model="sumtodo.noteq" @change="auth()" class="note-box" type="text" />
      </div>
    </div>

    <!-- 
    ==================================================================
    / note-section
    ================================================================== -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "ToDo",
  props: ["todos", "sumtodo", "qID", "inv","changein"],
  data() {
    return {
      thFormat: {
        stringify: (date) => {
          return date ? moment(date).add(543, 'year').format('YYYY-MM-DD') : null
        },
        parse: (dateqq) => {

          return dateqq ? moment(dateqq, 'YYYY-MM-DD').subtract(543, 'year').toDate() : null
        }
      }, 
      //   statusvat:'1',
      //   totalnow: 0,
      //   total: 0,
      //   vat7: 0,
      //   payment: 0,
      dateqq: '',
      newprice: 0,
      newquantity: 1,
      newTodo: "",
      indexEditTodo: null,
      tempNameTodo: "",
      tempquantityTodo: "",
      temppriceTodo: "",
      //   todos: [],
      customer: [],
      //
      employee: [],
      //
  IN1:100,
  IN2:0,
  IN3:0,
      //
    };
  },
  created() {
    this.getcus();
    this.getem();
    // this.dateqq = this.sumtodo.dateq;
  },
  methods: {
    keepdate(){
      // this.sumtodo.dateq = this.dateqq
    },
    invpush(e) {
      console.log(e.data.value);
    },
    auth() {
      if(this.sumtodo.qIN=='1'){
        this.inv.IN1=100
        this.inv.IN2=0;
        this.inv.IN3=0;
      }else if(this.sumtodo.qIN=='2' && this.inv.IN1!=this.IN1){
        this.inv.IN2=100-this.inv.IN1;
        this.inv.IN3=0;
      }else if(this.sumtodo.qIN=='2' && this.inv.IN2!=this.IN2){
        this.inv.IN1=100-this.inv.IN2;
        this.inv.IN3=0;
      }else if(this.sumtodo.qIN=='3' && this.inv.IN2!=this.IN2 || this.inv.IN1!=this.IN1){
        this.inv.IN3=100-this.inv.IN2-this.inv.IN1;
      }else if(this.sumtodo.qIN=='3' && this.inv.IN3!=this.IN3 || this.inv.IN1!=this.IN1){
        this.inv.IN2=100-this.inv.IN1-this.inv.IN3;
      }else if(this.sumtodo.qIN=='3' && this.inv.IN3!=this.IN3 || this.inv.IN2!=this.IN2){
        this.inv.IN1=100-this.inv.IN2-this.inv.IN3;
      }
      this.IN1=this.inv.IN1;
      this.IN2=this.inv.IN2;
      this.IN3=this.inv.IN3;
    },
    totalprice() {
      this.sumtodo.total = 0;
      for (let i = 0; i < this.todos.length; i++) {
        this.sumtodo.total = this.sumtodo.total + this.todos[i].quantity * this.todos[i].price;
      }
    },
    calc(statusvat) {
      if (this.sumtodo.cusstatus == "นิติบุคคล") {
        if (statusvat == "vatนอก") {
          this.sumtodo.totalnow = this.sumtodo.total;
          this.sumtodo.vat7 = this.sumtodo.total * 0.07;
          this.sumtodo.tax3 = this.sumtodo.total * 0.03;
          this.sumtodo.payment = this.sumtodo.total + this.sumtodo.vat7 - this.sumtodo.tax3;
        } else if (statusvat == "vatใน") {
          this.sumtodo.totalnow = (this.sumtodo.total * 100)/107;
          this.sumtodo.tax3 = this.sumtodo.totalnow * 0.03;
          this.sumtodo.vat7 = this.sumtodo.total - this.sumtodo.totalnow;
          this.sumtodo.payment = this.sumtodo.total-this.sumtodo.tax3;
        }
      } else {
        if (statusvat == "vatนอก") {
          this.sumtodo.totalnow = this.sumtodo.total;
          this.sumtodo.vat7 = this.sumtodo.total * 0.07;
          this.sumtodo.payment = this.sumtodo.total + this.sumtodo.vat7;
          this.sumtodo.tax3 = 0;
        } else if (statusvat == "vatใน") {
          this.sumtodo.totalnow = (this.sumtodo.total * 100)/107;
          this.sumtodo.vat7 = this.sumtodo.total - this.sumtodo.totalnow;
          this.sumtodo.payment = this.sumtodo.total;
          this.sumtodo.tax3 = 0;
        }
      }
      this.auth();
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
      this.totalprice();
      this.changeofin();
    },
    editTodo(index) {
      this.sumtodo.total = 0;
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.indexEditTodo = index;
      this.changeofin();
    },
    deleteTodo(index) {
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.sumtodo.total = this.sumtodo.total - this.newquantity * this.newprice;
      this.todos.splice(index, 1);
      this.newTodo = "";
      this.newquantity = 1;
      this.newprice = 0;
      this.totalprice();
      this.changeofin();
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
      this.changeofin();
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
      this.changeofin();
    },
    changeofin(){
      this.changein=true;
      this.$emit("updatechan",this.changein);
    },
    async getcus() {
      console.log("get-cus");
      try {
        const response = await axios.get("http://localhost:5000/customer/name");
        this.customer = response.data;
        console.log(this.customer);
      } catch (err) {
        console.log(err);
      }
    },
    async getem() {
      console.log("get-em");
      try {
        const response = await axios.get("http://localhost:5000/employee/name");
        this.employee = response.data;
        if(!this.sumtodo.checkedit){
             this.sumtodo.employeeID=this.employee[0].employeeID;
        }
        console.log(this.employee);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.vatable{
  border: 1px solid black;
  padding: .2em;
}
/* header  */
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.page-title {
  font-size: 22px;
}
.container-header {
  display: flex;
  flex-direction: row;
  gap: 1em;
  vertical-align: middle;
}
.container-header svg {
  margin: 0.5em;
}

.header-left-section {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2em;
}

.project-name-input {
  height: 35px;
  border: 1px solid rgba(151, 148, 148, 0.459);
  border-radius: 14px;
}

#customer-select >>> .ant-select-selection--single {
  height: 40px;
  border-radius: 14px;
}

.header-right-section {
  width: 50%;
  display: flex;
}
.right-section-container {
  padding-right: 4em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 0;
}
.hbox {
  padding: 0.25em;
}
.container-box {
  padding: 1em;
  border-bottom: 1px solid black;
}
/* #header */

.add-detail {
  display: flex;
  width: 100%;
  flex-direction: column;
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

.todo-finished {
  font-style: italic;
  text-decoration: line-through;
}
.quantity-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.quantity-indicator-todo {
  background: red;
}
.quantity-indicator-ongoing {
  background: yellow;
}
.quantity-indicator-finished {
  background: green;
}
.quantity-text {
  font-weight: bold;
  cursor: pointer;
}
.quantity-text-todo {
  color: red;
}
.quantity-text-ongoing {
  color: yellow;
}
.quantity-text-finished {
  color: green;
}
.action-btn i {
  font-size: 25px;
  cursor: pointer;
  padding: 0 0.2em 0 0.2em;
}
/* style to do by up */

/* ==========================================
sum payment
========================================== */
.sum-payment {
  width: 100%;
  padding: 2em;
  display: flex;
  flex-direction: row;
}

.sum-payment-left-section {
  display: flex;
  width: 50%;
}
.installment-box {
  width: 100%;
}
.installment-box-sl {
  width: 100%;
}

.two-installment {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.two-installment input {
  margin-left: 1em;
}

.three-installment {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.three-installment input {
  margin-left: 1em;
}

.intstallment_input {
  height: 30px;
  border: 1px solid rgba(97, 95, 95, 0.377);
  border-radius: 14px;
}

.sum-payment-right-section {
  display: flex;
  width: 50%;
  flex-direction: column;
  text-align: end;
}
/* ==========================================
/sum payment
========================================== */

/* ==========================================
note section
========================================== */
.note-section {
  padding: 2em;
}

.note-box {
  width: 100%;
  height: 100px;
  border: 1px solid rgba(129, 128, 128, 0.486);
  text-indent: 3%;
}

/* ==========================================
end note section
========================================== */

/* ===============================================
footer
================================================ */
</style>