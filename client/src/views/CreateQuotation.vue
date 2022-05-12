<template>
  <div class="whole-site">
    <!-- Left layput for website  -->
      <div class="left-layout">
        <form-wizard  id="ph">
          <tab-content title="ข้อมูลทั่วไป" :selected="true">
            <div class="form-group">
              <todo 
              :todos="todos" 
              :sumtodo="sumtodo" />
            </div>
            </tab-content>


            <tab-content title="ข้อมูลเพิ่มเติม*">
              <div class="form-group">
                <div class="set-Default">
            <a-checkbox v-model="status"
  true-value="default"
  false-value="-"> Set Default </a-checkbox>
          </div>
              </div>
            </tab-content>


            <tab-content title="เพิ่มขอบเขตงาน">
              <div class="form-group">
               <summernote 
                :sumnote="sumnote" @update-text="update"/>
              </div>
            </tab-content>
        </form-wizard>
      </div>
      <!-- /Left layput for website  -->
      
      <!-- Right layput for website  -->
      <div class="right-layout">
          <div class="right-layout-panel">
            <div class="container-panel">
              <button type="button" class="btn btn-outline-primary " disabled>
                <!-- <b-icon icon="file-earmark-pdf" style="color: blue; font-size:24px;"></b-icon> -->
                ดาวน์โหลดเป็น PDF
              </button>
              <button type="button" class="btn btn-outline-success" disabled>
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
      status: '',
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

.whole-site{
  font-family: 'Mitr', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.left-layout{
  width: 70%;
}
.right-layout{
  width: 30%;
}
.right-layout-panel{
  padding: 40px;
  margin: auto;
  width: 70%;
  border-radius: 14px;
  align-content: center;
  background-color: white;
  -webkit-box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important;box-shadow:0 .5rem 1rem rgba(0,0,0,.15) !important;
}
.container-panel{
  display: flex;
  flex-direction: column;
}
.container-panel button{
  margin: 10px;
}





/* specific module change  */

#ph >>> .progressbar{
    -webkit-transition:width 1s ease;
    transition:width 1s ease;
    }
#ph >>> .vue-step-wizard{
    background-color:transparent !important;
    width:100% !important;
}

#ph >>> .step-progress{
    display: none !important;
} 
#ph >>> .bar{
    content:"";
    height:1rem;
    border-radius:1rem;
    background-color:#4b8aeb
    }
#ph >>> .step-pills{
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    background-color:transparent !important; 
    -webkit-box-pack:justify;
    -ms-flex-pack:justify;
    justify-content:flex-start !important; 
    padding:1rem;
    border-radius:1rem;
    -webkit-box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important;box-shadow:0 .5rem 1rem transparent!important ;
}
#ph >>> .step-pills .step-item{
    background-color:transparent !important;
    border-radius:10px;
    padding:5px 20px;
    list-style-type:none;
    padding:.5rem 1.5rem;
    }
#ph >>> .step-pills .step-item a{
    text-decoration:none;
    color:#7b7b7b;
    }
#ph >>> .step-pills .step-item.active {
    border: 0px solid transparent !important;
}
#ph >>> .step-pills .step-item.active a{
    color: black;
    font-weight: bolder;
}
#ph >>> .step-pills .step-item.validated{
    border:1px solid #008011;
}
#ph >>> .step-body{
    background-color:transparent !important; 
    margin-left:auto;
    -webkit-box-shadow: none !important;
    box-shadow:0 .5rem 1rem transparent!important;
}
#ph >>> .step-body,.step-footer{
    padding:1rem;
    border-radius:1rem;
}
#ph >>> .step-footer{
    margin-left:auto;
    margin:1rem 0;
    text-align:center;
    justify-content: space-between !important;
}
#ph >>> .step-button{
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
        box-shadow:none!important;
        }
#ph >>> .step-button-next{
    background-color:#126fde
}
#ph >>> .step-button-previous{
    background-color:#3deaba
}
#ph >>> .step-button-submit{
    background-color:#4fa203
}
#ph >>> .step-button-reset{
    background-color:#037da2
}
#ph >>> .tabStatus{
    display:inline-block;
    width:1.5rem;
    height:1.5rem;
    margin-right:.5rem;
    line-height:1.5rem;
    color:#fff !important;
    text-align:center !important;
    background:rgba(0,0,0,.38) !important;
    border-radius: 10px !important;
    }
</style>