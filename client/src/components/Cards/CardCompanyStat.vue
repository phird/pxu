<template>
    <div :bordered="false" class="dashboard-bar-chart card-stat">
        <!---  Card Title -->
        <div class="card-title">
            <h6>COMPANY STATS</h6>
        </div> 
        <!---  /Card Title -->

        <!---  Card content -->
        <div class="div-table-content">
            <div class="card-content">
                    <div class="stat">
                        <div class="icon-stat">
                            <div>
                                <a-icon type="smile" theme="outlined" />
                            </div>
                            
                        </div>
                        <div class="detail-stat">
                            <h4>200</h4>
                            <span>Customers</span>
                        </div>
                    </div>

                    <div class="stat">
                        <div class="icon-stat">
                            <div>
                                <a-icon type="smile" theme="outlined" />
                            </div>
                        </div>
                        <div class="detail-stat">
                            <h4>5</h4>
                            <span>Projects</span>
                        </div>
                    </div>

                    <div class="stat">
                        <div class="icon-stat">
                            <a-icon type="smile" theme="outlined" />
                        </div>
                        <div class="detail-stat">
                            <h4>1,000,000</h4>
                            <span>Revenue</span>
                        </div>
                        
                    </div>
            </div>
        </div>
        <!---/Card content -->
    </div>

</template>

<script>
export default {};
</script>

<style scoped>

    .card-stat{
        display: flex;
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 5px 5px 5px 5px;
        
    }

    .card-title{
        margin: 15px;
    }
    .div-table-content{
        display: flex;
        justify-content: center;
        margin: auto;
    }
    .card-content{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
    }

    .stat{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 50px;
    }
    .icon-stat{
        display: flex;
        background-color: burlywood;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        justify-content: center;
        padding: 20px;
        margin-right: 5px ;
    }

    .detail-stat{
        display: block;
        flex-direction: column;
    }
    
    .icon-stat{
        display: flex;
        justify-content: center;
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
        justify-content: start;
        align-content: center;
        margin-right: auto;
    }
    }
</style>