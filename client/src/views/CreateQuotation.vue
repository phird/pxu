<template>
  <form-wizard>
    <tab-content title="ข้อมูลทั่วไป" :selected="true">
      <div class="form-group">
        <todo 
        :todos="todos" 
        :sumtodo="sumtodo" />
      </div>
    </tab-content>


    <tab-content title="ข้อมูลเพิ่มเติม*">
      <div class="form-group">
        <summernote 
        :sumnote="sumnote" @update-text="update"/>
      </div>
    </tab-content>


    <tab-content title="เพิ่มขอบเขตงาน">
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
      sumnote: '',
      fullName: "",
      companyName: "",
      referral: "",
    };
  },
  methods: {
    update(sumnote) {
      this.sumnote = sumnote;
    },
  },
};
</script>

<style scoped>

.progressbar{
    -webkit-transition:width 1s ease;
    transition:width 1s ease}
.vue-step-wizard{
    
    /* background-color:#f7f8fc; */
    background-color:transparent!important;
    width:100%!important;
    margin:auto;
    padding:40px;
    padding-top: 0px;
}

.step-header{
    justify-content: space-between;
}
.step-progress{
    display: none!important;
    height:1rem;
    /* background:#fff; */
    border-radius:1rem;
    margin:1rem 0
} 
.bar{
    content:"";
    height:1rem;
    border-radius:1rem;
    background-color:#4b8aeb}
.step-pills{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    /* background-color:#fff; */
    -webkit-box-pack:justify;
    -ms-flex-pack:justify;
    /* justify-content:space-between; */
    padding:1rem;
    border-radius:1rem;
    /* -webkit-box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important;box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important */
}
.step-pills .step-item{
    background-color:transparent!important;
    border-radius:10px;
    padding:5px 20px;
    list-style-type:none;
    padding:.5rem 1.5rem
    }
.step-pills .step-item a{
    text-decoration:none;
    color:#7b7b7b
    }
.step-pills .step-item.active{
    /* border:1px solid #4b8aeb */
}
.step-pills .step-item.active a{
    color: black;
    font-weight: bolder;
}
.step-pills .step-item.validated{
    border:1px solid #008011
}
.step-body{
    /* background-color:#fff; */
    margin-left:auto;
    -webkit-box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important;
    box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important
}
.step-body,.step-footer{
    padding:1rem;
    border-radius:1rem
}
.step-footer{
    margin-left:auto;
    margin:1rem 0;
    text-align:center
}
.step-button{
        font-weight:700;
        line-height:1;
        text-transform:uppercase;
        position:relative;
        max-width:30rem;
        text-align:center;
        border:1px solid;
        border-radius:12px !important;
        color:#22292f;
        color:rgba(34,41,47,var(--text-opacity));
        padding:.5rem 1.25rem;
        font-size:.875rem;
        margin:.5rem;
        color:#fff;
        outline:none!important;
        -webkit-box-shadow:none!important;
        box-shadow:none!important}
.step-button-next{
    background-color:#126fde
}
.step-button-previous{
    background-color:#3deaba
}
.step-button-submit{
    background-color:#4fa203
}
.step-button-reset{
    background-color:#037da2
}
.tabStatus{
    display:inline-block;
    width:1.5rem;
    height:1.5rem;
    margin-right:.5rem;
    line-height:1.5rem;
    color:#fff;
    text-align:center;
    background:rgba(0,0,0,.38);
    border-radius: 10px;
    }
</style>