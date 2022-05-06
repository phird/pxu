<template>
    <div class="whole-card">
    <div class="card-title">
        <p>ลูกค้าใหม่เดือนนี้</p>
    </div>
        <div class="card-content">      
            <div class="card-content-left" >
               {{this.customer}}
            </div>       
        <div class="card-content-right">
            <div class="content-box">
                <div>
                    <b-icon icon="heart-fill"></b-icon>
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
      customer:'',
      timestamp: ""

    }
  },
  created(){
    this.getcus();
    setInterval(this.getNow, 1000);
  },
  methods:{
    // getNow: function() {
    //                 const today = new Date();
    //                 const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //                 const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //                 const dateTime = date +' '+ time;
    //                 this.timestamp = dateTime;
    //             },
    getcus(){
      const today = new Date();
      const monthnow = (today.getMonth()+1);
      console.log(monthnow);
      axios.post("http://localhost:5000/cardcustomer",{
        month:monthnow
      }).then((res)=>{
        console.log(res);
        this.customer=res.data[0].c;
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