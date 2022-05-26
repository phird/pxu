<template>
  <div class="whole-card">
    <div class="card-title">
        <p>เพิ่มล่าสุด</p>
    </div>
        <div class="card-content">      
            <div class="card-content-left">
               {{this.customer}}
            </div>       
        <div class="card-content-right">
            <div class="content-box">
                <div>
                    <b-icon icon="person-plus"></b-icon>
                </div>
            </div> 
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      customer:''
    }
  },
  created(){
    this.getcus();
  },
  methods:{
    getcus(){
      console.log('get-ja');
      axios.get("http://128.199.187.173:5000/cardcustomer",{

      }).then((res)=>{
        console.log(res.data);
        this.customer=res.data[0].companyName;
      })
    }
  }
}

</script>

<style scoped>
.whole-card {
  font-family: 'Mitr', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 14px;
  padding: 1em;
}
.whole-card {
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
.card-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
}
.card-content-left{
    width: 80%;
    justify-content: center;
    font-size: 20px;
    padding: .5em;
}

.content-box{
    display: flex;
    background-color: #1890FF;
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 14px;
    -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
}
.content-box div{
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

</style>