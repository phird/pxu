<template>
  <div class="whole-site">
<!--         <form-wizard  class="wp"  id="ph">
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
        </form-wizard> -->
        

        <!-- here come vue tab -->
        <p style="font-size:26px">  <b-icon icon="gear"></b-icon> Setting</p>
        <vue-tabs class="wp" 
                direction="vertical"
                type="pills"
                :start-index="1"
                @tab-change="handleTabChange"
                >
          <v-tab title="ตั้งค่าเว็บไซต์" :selected="false">
            <websetting />
          </v-tab>

          <v-tab title="ข้อมูลพนักงาน" :selected="true">
            <employee/>
          </v-tab>

          <v-tab title="ข้อมูลธนาคาร" :selected="false">
            <bank-dash/>
          </v-tab>
      </vue-tabs>


        
  </div>
  
</template>

<script>
import Employee from './Employee.vue';
import Websetting from './Websetting.vue';
import BankDash from './BankDash.vue';
import {VueTabs, VTab} from 'vue-nav-tabs';
import "vue-step-wizard/dist/vue-step-wizard.css";

export default {
  //component code
  name: "Setting",
  components: {
    VueTabs,
    VTab,
    Websetting,
    Employee,
    BankDash,
  },
  data() {
    return{
      
    }
  },
  methods: {

    handleTabChange(tabIndex, newTab, oldTab){
        //your code here
        console.log(tabIndex, newTab.$props, oldTab)
    }

  },
};
</script>

<style scoped>

.whole-site{
  font-family: 'Mitr', sans-serif;
  width: 100%;
  display: flex;
  padding: 2em;
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
  border: none;
  margin-bottom: 1rem;
  background-color: white;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
    border-color 0s;
  transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
}

/* specific module change  */
.wp{
  background-color: transparent;
  display: flex;
  width: 100%;
}
.wp >>> .nav-pills {
  display: flex;
  flex-direction: column;
}


.wp >>> .left-vertical-tabs{ 
  text-decoration: none;
  width: 20%;
  padding: 2em;
  border-right: 1px solid rgba(0, 0, 0, 0.288);
}
.wp >>> .nav-tabs li{
        text-decoration: none;
        font-weight:400;
        line-height:1;
        text-transform:uppercase;
        position:relative;
        max-width:30rem;
        text-align:center;
        margin: 2rem;
}

.wp >>> .tab-content{
  width: 100%;
  padding: 2em;
}


.wp >>> .nav.nav-pills{
  text-align: center;
  margin: 1rem;
}


.wp >>> .nav.nav-pills li{
  padding: 1em;
}

.wp >>> .nav.nav-pills a{
  
  text-decoration: none;
  color: black;
}

.wp >>> .nav.nav-pills .tab.active a{
  text-align: center;
  color: white;
}

.wp >>> .nav.nav-pills .tab.active{
  text-align: center;
  background-color: #7367F0 !important;
  padding: 1em;
  color: white !important;
  border-radius: 14px;
  -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
}
.wp >>> .nav-tabs-navigation{
  width: 30%;
}

/* mobile screen */
  @media only screen and (max-width: 991px) { 
    .wp{
      display: flex;
      flex-direction: column;
    }
    .wp >>> .nav.nav-pills .tab.active{
      text-align: center;
      background-color: #7367F0 !important;
      color: white !important;
      border-radius: 14px;
      -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
      box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
    }
    .wp >>> .left-vertical-tabs{ 
      text-decoration: none;
      width: 100%;
      flex-direction: row;
      padding: 0;
      border-right: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.288);
    }
    .wp >>> .tab-content{
    width: 100%;
    padding: .5em;
}
  }


 




















/* #ph >>> .step-pills .step-item.active .step-link .tabStatus{
  background-color:#7367F0 !important;
} */
#ph >>> .step-pills .step-item.active .step-link{
    color: black;
    font-weight: 500;
    width: 40px;
    height: 40px;
    text-align: center;
}
#ph >>> .step-pills .step-item.active .step-link .tabStatus {
    background-color: #7367F0 !important;
    padding: auto;
    text-align: center;
    width: 28px;
    height: 28px;
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