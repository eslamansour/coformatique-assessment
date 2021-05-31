<template>
  <div>
    <b-form @submit.stop.prevent="onSubmit">
      <b-container class="bv-example-row">
        <div class="text-center text-danger my-2" :class="{'alert-div-padding': isLoading}" v-show="isLoading">
          <b-spinner class="align-middle"></b-spinner>
        </div>  
        <b-row v-show="!isLoading">
          <b-col lg="12" md="12" class="alert-div">
            <b-alert :show="alertCountdown" dismissible fade :variant="alertType" @dismiss-count-down="countDownChanged" >
              {{alertText}}
            </b-alert>
            <br><br>
          </b-col>
          <br><br>
          <b-col lg="12" md="12">
            <b-form-group id="group-user-email" label="Email" label-for="user-email">
              <b-form-input
                id="user-email"
                name="user-email"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
                aria-describedby="input-email"
              ></b-form-input>
              <b-form-invalid-feedback id="input-email" v-if='!$v.form.email.required'>
                Email is required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback id="input-email" v-if='!$v.form.email.email'>
                Please, enter a valid email.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-form-group id="group-user-password" label="Password" label-for="user-password">
              <b-form-input
                id="user-password"
                name="user-password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                aria-describedby="input-password"
                type="password"
              ></b-form-input>
              <b-form-invalid-feedback id="input-password" v-if='!$v.form.password.required'>
                Password is required.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <div class="form-footer">
              <b-button class="login-btn" type="submit" variant="primary">Login</b-button>
              <br>
              <b-button class="login-btn" @click="copyDataToTextboxes('user@asd.com', '123456')" variant="info">Use user@asd.com and 123456</b-button>
            </div>
            <br>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
  import store from "../store/index.js"
  import { validationMixin } from "vuelidate";
  import { required, email} from "vuelidate/lib/validators";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        isLoading: false,
        alertCountdown: 0,
        alertType: '',
        alertText: '',
        form: {
          email: null,
          password: null,
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
        },
      }
    },
    methods: {
      copyDataToTextboxes(email, password){
        this.form.email = email;
        this.form.password = password;
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      countDownChanged(alertCountdown) {
        this.alertCountdown = alertCountdown
      },
      onSubmit() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.login();
      },
      login() {
        if(this.form.email === "user@asd.com" && this.form.password === "123456") {
          this.isLoading = true;
          store.commit("SET_USERNAME", this.form.email);
          this.$router.push({
            name: "home"
          })
        }
        else{
          this.alertType = "danger"
          this.alertText = "Email or password may be incorrect."
          this.alertCountdown = process.env.VUE_APP_ALERT_COUNTDOWN;
        }
      },
    },
    created() {
      if(store.getters.username) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
</script>

<style>
  .login-page{
    width: 100% !important;
  }
  .login-panel{
    width: 35%;
    margin: auto;
  }
  .panel-heading{
    text-align: center;
  }
  .alert-div{
    margin-top: -130px;
  }
  .alert-div-padding{
    padding: 130px 0px;
  }
  .form-footer{
    padding-top: 10px;
  }
  .login-btn, .createAccount-link{
    display: block;
    text-align: center;
  }
</style>
