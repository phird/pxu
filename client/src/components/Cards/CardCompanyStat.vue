<template>
    <div :bordered="false" class="dashboard-bar-chart card-stat" style="font-family: 'Mitr', sans-serif;">
        <!---  Card Title -->
        
        <div class="card-title">
            <p>สถิติของบริษัท</p>
        </div> 
        <!---  /Card Title -->
        <!---  Card content -->
        <div class="div-table-content">
            <div class="card-content">
                    <div class="stat">
                        <div class="icon-stat icon-blue">  <!--  icon-item-box -->
                            <b-icon icon="people-fill " style="color: #2F8CE8; font-size:24px;"></b-icon>
                        </div>
                        <div class="detail-stat">
                            <span class="counter-stat" id="statistic-text" style="font-size:24px;" data-target="200">0</span>
                            <br/>
                            <span id="text-stat" >ลูกค้า</span>
                        </div>
                    </div>
                    <div class="stat">     
                        <div class="icon-stat icon-yellow">  <!--  icon-item-box -->
                            <b-icon icon="file-earmark-code-fill" style="color: #F55D5D; font-size:24px;"></b-icon>
                        </div>
                        <div class="detail-stat">
                            <span class="counter-stat" id="statistic-text" style="font-size:24px;" data-target="5" >0</span>
                            <br/>
                            <span id="text-stat" >โปรเจค </span>
                        </div>
                    </div>

                    <div class="stat">
                        <div class="icon-stat icon-green">  <!--  icon-item-box -->
                            <b-icon icon="wallet-fill" style="color: #376303;"></b-icon>
                        </div>
                        <div class="detail-stat">
                            <span class="counter-stat" id="statistic-text" style="font-size:24px;" data-target="1000000" >0</span>
                            <br/>
                            <span id="text-stat">รายได้</span>
                        </div>
                    </div>
            </div>
        </div>
        <!---/Card content -->
    </div>

</template>

<script>
    export default {
        mounted(){
            const counters = document.querySelectorAll('.counter-stat');
            const speed = 250; // The lower the slower

            counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                // Lower inc to slow and higher to slow
                const inc =  parseInt(target / speed)<1?1:parseInt(target / speed);

                // console.log(inc);
                // console.log(count);

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = count + inc;
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
});

        }
    }
</script>

<style scoped>

    .card-stat{   /* whole card element  */
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 12px;
    }

    .card-title{
        margin: 20px;
        margin-bottom: 0px;
    }
    .card-title p{
        font-size: 20px;
    }

    .div-table-content{    /* div that sep the title and body od card  */
        display: flex;
        justify-content: center;
        margin: auto;
        
    }
    .card-content{  /* div in div-table-content */
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
    }

    .stat{  /* each statistic div   - consist ->  2 part |||  1. icon-stat div 2. detail-stat */   
        display: flex;
        margin: 50px;
        align-items: center;  
    }
    .icon-stat{   /* icon section */
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        margin-right: 10px ;
        height: 45px;
        width: 45px;
    }
    
    #text-stat{
        font-weight:600;
    }

    .icon-stat b-icon{ /* icon-tag */
        justify-content: center;
        align-content: center;
        margin: 0;
        margin-left: auto;
        margin-right: auto;
    }

    .detail-stat{
        display: block;
        flex-direction: column;
    }

    .icon-blue{
        background-color: #C3E0F9;     
    }

    .icon-yellow{
        background-color: #F3CE95;
    }

    .icon-green{
        background-color: #C8F395;
    }
    .card-stat {
        border: none;
        margin-bottom: 2rem;
        -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    }
    .card-stat {
        -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
        border-color 0s;
        transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
    }
    .card-stat {
        background-color: white;
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


    /* mobile screen */
    @media only screen and (max-width: 991px) { 
        .card-content{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-right: auto;
    }
        .icon-stat{   /* div that contain icon  */
        display: flex;
        height: 45px;
        width: 45px;
        margin-right: 10px ;
    }
    }
</style>