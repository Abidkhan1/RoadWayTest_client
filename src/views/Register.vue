<template>
  <div class="about">

    <div>
        <div class="mx-5 px-5 bg-secondary text-light">
          <h2>REGISTER</h2>
        </div>
    </div>

    <form @submit.prevent="formSubmitted">
      <div class="row px-5 m-5">
        <div class="col">
          <label for="email">Email</label>
          <input type="text" class="form-control" v-model="credentials.email">
          <span v-if="errors.email" style="color:red;">{{errors.email[0]}}</span>
        </div>
        <div class="col">
          <label for="passwor">Password</label>
          <input type="password" class="form-control" v-model="credentials.password">
          <span v-if="errors.password" style="color:red;">{{errors.password[0]}}</span>
        </div>
    </div>
    <div class="row mx-5 pull-right">
      <div class="col-md-2">
          <button type="submit" class="btn btn-md btn-success">Register</button>
        </div>
    </div>
    </form>
  </div>
</template>


<script>
  import axios from 'axios'
  import swal from 'sweetalert';
  export default {
    data(){
      return {
        errors:[],
        credentials:{
          email:'',
          password:''
        }
      }
    }, //data
    methods:{
      formSubmitted(){
        console.log('Form Submitted');

        axios.post('auth/register',{
          email: this.credentials.email,
          password: this.credentials.password
        })
        .then(response => {
          console.log('Response:',response);
          swal("Registration Done", "Kindly check your mail box for confirmation.", "success").then(() => {
            this.$router.replace({
             name:'Login'
          })
          });
        }).catch(error => {
          console.log('Error:',error);
          this.errors = error.response.data.errors;
          swal("Registration Failed", "Kindly insert valid data in form.", "error");
        })
         
      }
    }
  }
</script>