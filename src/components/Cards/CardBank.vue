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
                    <p> KASIKORNTHAI BANK</p>
                </div>
            </div>

            <!----><!---->
    </div>
</template>


<script>
export default {};
</script>

<style>

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    font-size: 24px;
    font-weight: bolder;
}
.profile-banner img {
    /* max-height: 100%; */
    width: 100vw;
    object-fit: cover;
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
    font-size: 16px;
    font-weight: bolder;
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

</style>