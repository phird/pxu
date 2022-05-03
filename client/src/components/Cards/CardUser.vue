<template>
  <div class="card-profile header-solid">
            <!---  Profile section -->
            <div class="profile-image-wrapper">
                <img :size="74"
                    src="../../../src/assets/images/avatars/10-small.png"
                    alt="avatar"
                    style="border-radius: 50%; border: 6px solid white"
                />
            </div>
            <!---/Profile section -->
            <div class="card-profile-section" :height="220">
                <!---  Profile-Banner section -->
                <div class="profile-banner">
                    <img 
                        src="../../assets/images/banner/banner-17.jpg"
                        alt="Profile Cover Photo"
                        style=""
                    />
                </div>
                <!--- /Profile-Banner section -->
                <!---  Profile-detail section -->
                <div class="card-body">
                    <div class="content-card-body">
                      <div class="m-0 center  font-semibold">
                        <h4 >Mr. Seller</h4>
                      </div>
                      <div>
                        <p class="email-text">Dangisdev@mail.com</p>
                      </div>
                        
                    </div>
                </div>
                <!---/Profile-detail section -->
            </div>
            
  </div> 
</template>

<script>
export default {};
</script>

<style scoped>
    .card-profile{
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 5px 5px 5px 5px;
    }

    .card-profile .card-profile-section{  /* div that contain banner and text-section */
      display: flex;
      position: relative;
      flex-direction: row;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }

    .card-profile-section .profile-banner{ /*  whole banner div*/
        position: relative;
        display: flex;
        height: 50%;
        width: 100%;
    }

    .profile-banner img{ /*  img tag in div  */
        /* max-height: 100%; */
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .card-body {  /*  whole text-section   */
        display: flex;
        flex-direction: column;
        font-weight: bolder;
        font-size: 24px;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;  
    }
    .content-card-body { /*  div in text-section   */
        display: flex;
        flex-direction: column;
        margin-top: 40px;
    }

    .profile-image-wrapper {  /*  floating profile-section  */
        position: absolute;
        z-index: 10;
        object-fit: cover;
        height: 100vh;
        width: 100vw;
        top: 30%;
        left: 32%;
    }
    .profile-image-wrapper img{  /*  floating profile-section  */
        height: 6.5vw;
        width: 6.5vw;
    }
    .center{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-weight: bolder;
  }
/* mobile screen */
  @media only screen and (max-width: 991px) { 
      .card-profile{ /* whole  card */
        position: relative;
        display: flex;
        flex-direction: column;
      }
      .card-profile .profile-image-wrapper{ /*  floating profile-section  */
        display: inline-block;
        height: 100vh;
        width: 100vw;
        position: absolute;
        border-radius: 50%;
        margin: 0 auto;
        z-index: 5;
        top: 45%;
        left: 5%;
      }
      .profile-image-wrapper img{  /*  floating profile-section  */
          height: 20vw;
          width: 20vw;
      }
      .profile-banner{
        display: flex;
      }
  
      .card-body{
        display: flex;
      }
      .content-card-body{
        display: flex;
  
      }
      .content-card-body .username{
        display: flex;
        font-size: 18px;
        font-weight: bolder;
      }
      .content-card-body .email-text{
        
        font-size: 14px;
        font-weight: 500;
        opacity: 60%;
      }
  }
      .card-profile {
        border: none;
        margin-bottom: 2rem;
        background-color: white;
        -webkit-box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
      }
      .card-profile {
        -webkit-transition: all 0.3s ease-in-out, background 0s, color 0s,
          border-color 0s;
        transition: all 0.3s ease-in-out, background 0s, color 0s, border-color 0s;
      }
      .card-profile {
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
</style>