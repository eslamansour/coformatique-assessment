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
            <b-form-group id="group-user-name" label="Name" label-for="user-name">
              <b-form-input
                id="user-name"
                name="user-name"
                v-model="$v.form.name.$model"
                :state="validateState('name')"
                aria-describedby="input-name"
              ></b-form-input>
              <b-form-invalid-feedback id="input-name" v-if='!$v.form.name.required'>
                Name is required.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
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
              <b-button class="signup-btn" type="submit" variant="primary">Signup</b-button>
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
          name: null,
          email: null,
          password: null,
        }
      }
    },
    validations: {
      form: {
        name: {
          required
        },
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
        this.signup();
      },
      signup() {
        this.isLoading = true;
        store.commit("SET_USERNAME", this.form.email);
        this.$router.push({
          name: "home"
        })
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
  .signup-page{
    width: 100% !important;
  }
  .signup-panel{
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
    text-align: center;
  }
  .signup-btn, .createAccount-link{
    display: block;
    text-align: center;
  }
</style>
