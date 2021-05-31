<template>
  <div class="notFound">
    <h1>404</h1>
    <p>Page not found</p>
    <b-button variant="secondary" @click="goToHome()">Home page</b-button>
  </div>
</template>
<script>
  export default {
    methods: {
      goToHome() {
        this.$router.push({
          name: "home"
        })
      }
    } 
  }
</script>
<style scoped>
.notFound{
  width: 95% !important;
  padding-top: 100px;
  padding-bottom: 30px !important;
  text-align: center;
  color: #233245;
}
.notFound h1{
  font-size: 120px;
  font-weight: bold;
}
.notFound p{
  font-size: 25px;
  font-weight: bold;
}
@media (max-width: 950px) {
  .notFound{  
    margin-top: 80px !important;
    width: 92% !important;
    padding-bottom: 30px !important;
  }
  .notFound h1{
    font-size: 70px;
  }
  .notFound p{
    font-size: 20px;
  }
  .notFound button{
    font-size: 14px;
    margin-bottom: 30px;
  }
}
</style>
