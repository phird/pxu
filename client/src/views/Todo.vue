<template>
  <div class="container shadow-lg px-5 py-5 rounded-3">
    <h1 class="mb-5">ใบเสนอราคา</h1>

    <!-- <form> -->   <!-- need validation -->
    <div class="d-flex mb-5">
      <input
        v-model="newTodo"
        type="text"
        placeholder="กรอกรายละเอียด"
        class="form-control form-input me-3"
      />
      <input
        v-model="newquantity"
        type="number"
        min="1"
        class="form-control form-input me-3"
      />
      <input
        v-model="newprice"
        type="number"
        min="0"
        class="form-control form-input me-3"
      />
      <button
        type="submit"
        class="submit-btn px-3 py-2"
        @click="addTodo(), calc(statusvat)"
      >
        + 
      </button>
    </div>
    <!-- </form> -->

    <div
      class="row todo-list shadow px-3 pt-3 pb-2 align-items-center mb-4"
      v-for="(todo, index) in todos"
      :key="index"
    >
      <div class="col-7 text-start">
        <h5>
          {{ todo.name }}
        </h5>
      </div>
      <div class="col-1">
        <div class="d-flex justify-content-start align-items-center">
          <div>
            {{ todo.quantity }}
          </div>
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </div>
      <div class="col-1">
        <div class="d-flex justify-content-start align-items-center">
          <div>
            {{ todo.price }}
          </div>
        </div>
      </div>
      <div class="col-3 text-end action-btn">
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
          <div class="" @click="deleteTodo(index), calc(statusvat)">
            <i class="fa fa-close"></i>
          </div>
        </div>
      </div>
    </div>
    <div>
      รวมเป็นเงิน (ก่อนคิดภาษี)
      <select v-model="statusvat" @change="calc(statusvat)">
        <option value="1">vatใน</option>
        <option value="2">vatนอก</option>
      </select>
      : {{ this.totalnow.toFixed(2) }}
    </div>
    <div step="0.01">vat 7% : {{ this.vat7.toFixed(2) }}</div>
    <div step="0.01">รวมเป็นเงิน : {{ this.payment.toFixed(2) }}</div>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: ["todos", "sumtodo"],
  data() {
    return {
      //   statusvat:'1',
      //   totalnow: 0,
      //   total: 0,
      //   vat7: 0,
      //   payment: 0,
      newprice: 0,
      newquantity: 1,
      newTodo: "",
      indexEditTodo: null,
      tempNameTodo: "",
      tempquantityTodo: "",
      temppriceTodo: "",
      statusvat: this.sumtodo.statusvat,
      totalnow: this.sumtodo.totalnow,
      total: this.sumtodo.total,
      vat7: this.sumtodo.vat7,
      payment: this.sumtodo.payment,
      //   todos: [],
    };
  },
  methods: {
    auth() {
      this.sumtodo.statusvat = this.statusvat;
      this.sumtodo.totalnow = this.totalnow;
      this.sumtodo.total = this.total;
      this.sumtodo.vat7 = this.vat7;
      this.sumtodo.payment = this.payment;
    },
    totalprice() {
      this.total = 0;
      for (let i = 0; i < this.todos.length; i++) {
        this.total = this.total + this.todos[i].quantity * this.todos[i].price;
      }
    },
    calc(statusvat) {
      if (statusvat == "2") {
        this.totalnow = this.total;
        this.vat7 = this.total * 0.07;
        this.payment = this.total + this.vat7;
      } else if (statusvat == "1") {
        this.totalnow = this.total * 0.9346;
        this.vat7 = this.total - this.totalnow;
        this.payment = this.total;
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
    },
    editTodo(index) {
      this.total = 0;
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.indexEditTodo = index;
    },
    deleteTodo(index) {
      this.newTodo = this.todos[index].name;
      this.newquantity = this.todos[index].quantity;
      this.newprice = this.todos[index].price;
      this.total = this.total - this.newquantity * this.newprice;
      this.todos.splice(index, 1);
      this.newTodo = "";
      this.newquantity = 1;
      this.newprice = 0;
      this.totalprice();
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
    },
  },
};
</script>

<style scoped>
.form-input {
  border: 1px solid #333;
  border-radius: 50px;
}
.form-control:focus {
  box-shadow: none;
  /* border: none; */
}
.submit-btn {
  background-color: skyblue;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  font-weight: 800;
  color: #333;
}
.todo-list {
  border-radius: 50px;
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
}
</style>