<template>
  <div class="about">

    <div>
        <div class="mx-5 px-5 bg-secondary text-light">
          <h2>LOGIN</h2>
        </div>
    </div>

    <form @submit.prevent="formSubmitted">
      <div class="row px-5 m-5">
        <div class="col">
          <label for="email">Email</label>
          <input type="text" class="form-control" v-model="credentials.email">
        </div>
        <div class="col">
          <label for="passwor">Password</label>
          <input type="password" class="form-control" v-model="credentials.password">
        </div>
    </div>
    <div class="row mx-5 pull-right">
      <div class="col-md-2">
          <button type="submit" class="btn btn-md btn-success">Login</button>
        </div>
    </div>
    </form>
  </div>
</template>


<script>
  import swal from 'sweetalert';
  import {mapActions} from 'vuex'
  export default {
    data(){
      return {
        credentials:{
          email:'',
          password:''
        }
      }
    }, //data
    computed:{
      // user() {
      //   console.log('hello computed');
      //       return this.$store.getters.user;
      //   },
    },
    methods:{
      ...mapActions({
        signIn:'auth/signIn'
      }),
      formSubmitted(){
        console.log('Form Submitted');

         this.signIn(this.credentials).then(()=>{
           this.$router.replace({
             name:'Dashboard'
           }).catch(()=>{
             console.log('Attempt Failed');
             swal("Login Failed", "Kindly insert valid data in form.", "error");
           })
         })
      }
    }
  }
</script>