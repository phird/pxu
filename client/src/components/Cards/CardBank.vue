<template>
  <div class="card">
          <!---- Query default banner of bank account here ---->
            <div class="profile-banner">
                <img
                    src="../../assets/images/banner/K_Banner570.jpg"
                    alt="Bank Cover Photo"
                />
            </div>
            
            <div class="card-body">
                <!----Query default bank account here --->
                <div class="content-card-body">
                  <div class="bank-name m-0 center font-semibold">
                      <h4> KASIKORNTHAI</h4>
                  </div>
                  </div>
                      <p class="default-bank-text"> [default]</p>
                  </div>
            <!----><!---->
    </div>
</template>


<script>
export default {};
</script>

<style scoped>
  .card{
      font-family: 'Mitr', sans-serif;
      position: relative;
      border-radius: 5px 5px 5px 5px;
      width: 100%;
      height: 100%;
  }
  .card .profile-banner { /*  whole banner div*/
      position: relative;
      display: flex;
      height: 50%;
      width: 100%;
  }
  .profile-banner img{
      /* max-height: 100%; */
      width: 100%;
      height: 100%;
      object-fit: cover;
  }

  .card-body{ /*  whole text-section   */
      display: flex;
      flex-direction: column;
      font-weight: bolder;
      width: 100%;
      height: 50%;
      justify-content: center;
      align-content: center;
      margin-left: auto;
      margin-right: auto;
  }

  .default-bank-text{
    font-size: 6px;
    justify-content: end;
    align-items: center;
    margin-left: auto;
  }

  .content-card-body{
    font-size: 32px;
  }
  .center{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-weight: bolder;
  }


@media only screen and (max-width: 991px) {
  .card{
    display: flex;
    position: relative;
    flex-direction: row;
    width: 100%;
    height: 100%;   
  }
  .profile-banner {
    display: flex;
    height: 100%;
  }
  
  .card-body{
    display: flex;
  }
  
  .content-card-body{
    align-content: center;
    font-size: 16px;
    
    margin-right: auto;
    margin-left: auto;
  }
}

  .card {
    border: none;
    margin-bottom: 2rem;
    -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  }
  .card {
    -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
      border-color 0s;
    transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
  }
  .card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
  }
</style>>
