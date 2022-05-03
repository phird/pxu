<template>
  <form-wizard>
    <tab-content title="About You" :selected="true">
      <div class="form-group">
        <todo 
        :todos="todos" 
        :sumtodo="sumtodo" />
      </div>
    </tab-content>
    <tab-content title="About your Company">
      <div class="form-group">
        <summernote 
        :text="text" />
      </div>
    </tab-content>
    <tab-content title="Finishing Up">
      <div class="form-group">
        <label for="referral">From Where did you hear about us</label>
        <select class="form-control" v-model="referral">
          <option>Newspaper</option>
          <option>Online Ad</option>
          <option>Friend</option>
          <option>Other</option>
        </select>
      </div>
    </tab-content>
  </form-wizard>
</template>

<script>
import Todo from "./Todo.vue";
import Summernote from "./Summernote.vue";
import { FormWizard, TabContent } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
export default {
  //component code
  name: "Quotation",
  components: {
    FormWizard,
    TabContent,
    Todo,
    Summernote,
  },
  data() {
    return {
      todos: [],
      sumtodo: {
        statusvat: "1",
        totalnow: 0,
        total: 0,
        vat7: 0,
        payment: 0,
      },
      text: '',
      fullName: "",
      companyName: "",
      referral: "",
    };
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