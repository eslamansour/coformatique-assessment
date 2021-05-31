<template>
  <div class="login-page">
    <div class="container">
      <div class="panel panel-default login-panel">
        <div>
          <b-row>
            <b-col lg="12" md="12">
              <div class="panel-heading">
                <h3><strong>GuestBook</strong></h3>
                <h5>Login using your email and password</h5>
              </div>
            </b-col>
          </b-row>
          <login></login>
          <div class="createAccount">
            <span>Don't have account? <b-link @click="goToCreateAccountRouter()">Create Account.</b-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import login from "../components/Login.vue"

  export default {
    components: {
      login,
    },
    methods: {
      goToCreateAccountRouter() {
        this.$router.push({	
          name: "signup"	
        })
      }
    }
  }
</script>

<style>
  .login-page{
    width: 95% !important;
    padding-top: 50px !important;
  }
  .login-panel{
    width: 40%;
    margin: auto;
  }
  .panel-heading{
    text-align: center;
  }
  .form-footer{
    padding-top: 20px;
  }
  .login-btn{
    display: block !important;
    margin: auto !important;
  }
  .createAccount{
    text-align: center;
    margin-bottom: 30px;
  }
  .createAccount a{
    color: #17a2b8;
    text-decoration: underline
  }
  @media (max-width: 950px) {
    .login-page{
      width: 93% !important;
    }
    .login-panel{
      width: 70%;
      margin: auto;
    }
  }
  @media (max-width: 650px) {
    .login-page{
      width: 90% !important;
    }
    .login-panel{
      width: 100%;
      margin: auto;
    }
    .panel-heading h4{
      font-size: 20px;
    }
    .pageContent{
      padding: 30px 30px !important;
    }
  }
</style>
