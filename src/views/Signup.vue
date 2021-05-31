<template>
  <div class="signup-page">
    <div class="container">
      <div class="panel panel-default signup-panel">
        <div>
          <b-row>
            <b-col lg="12" md="12">
              <div class="panel-heading">
                <h3><strong>GuestBook</strong></h3>
                <h5>Create an account and join our amazing world</h5>
              </div>
            </b-col>
          </b-row>
          <signup></signup>
          <div class="loginLink">
            <span>Have account? <b-link @click="goToLoginRouter()">Login.</b-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import signup from "../components/Signup"

  export default {
    components: {
      signup,
    },
    methods: {
      goToLoginRouter() {
        this.$router.push({	
          name: "login"	
        })
      }
    }
  }
</script>

<style>
  .signup-page{
    width: 95% !important;
    padding-top: 50px !important;
  }
  .signup-panel{
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
  .loginLink{
    text-align: center;
    margin-bottom: 30px;
  }
  .loginLink a{
    color: #17a2b8;
    text-decoration: underline
  }
  @media (max-width: 950px) {
    .signup-page{
      width: 93% !important;
    }
    .signup-panel{
      width: 70%;
      margin: auto;
    }
  }
  @media (max-width: 650px) {
    .signup-page{
      width: 90% !important;
    }
    .signup-panel{
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
