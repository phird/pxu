<template>
  <div class="whole-site">
        <form-wizard class="wp"  id="ph">
          <tab-content title="ข้อมูลทั่วไป" :selected="true">
            <div class="form-group">
              <websetting />
            </div>
          </tab-content>
          <tab-content title="ข้อมูลเพิ่มเติม*">
            <div class="form-group">
                <employee/>
            </div>
          </tab-content>
          <tab-content title="เพิ่มขอบเขตงาน">
            <banker/>
          </tab-content>
        </form-wizard>
  </div>
  
</template>

<script>
import Employee from './Employee.vue';
import Websetting from './Websetting.vue';
import Banker from './Banker.vue';
import { FormWizard, TabContent } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
export default {
  //component code
  name: "Setting",
  components: {
    FormWizard,
    TabContent,
    Websetting,
    Employee,
    Banker
  },
  data() {
    return{
      
    }
  },
  methods: {
 
  },
};
</script>

<style scoped>

.whole-site{
  font-family: 'Mitr', sans-serif;
  width: 80%;
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

#ph >>> .step-footer{
  
}
#ph >>> .progressbar{
    -webkit-transition:width 1s ease;
    transition:width 1s ease;
}

.wp {
    width:100% !important;
    display: flex !important;
}
.wp >>> .step-pills{
  width: 50%;
  display: flex !important;
  flex-direction: column !important;
}

.wp >>> .step-pills .step-item{
    background-color:transparent !important;
    border-radius:10px;
    padding:5px 20px;
    list-style-type:none;
    padding:.5rem 1.5rem;
    width: 100% !important;
}

#ph >>> .step-body{
  display: flex;
  margin-right: auto;
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


#ph >>> .step-pills .step-item a{
    text-decoration:none;
    color:#7b7b7b;
}

#ph >>> .step-pills .step-item.active {
    border: 0px solid transparent !important;
}

#ph >>> .step-body{
    background-color:transparent !important; 
    margin-left:auto;
    -webkit-box-shadow: none !important;
    box-shadow:0 .5rem 1rem transparent!important;
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