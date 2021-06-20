<template>
    <div id="nav">
      <template v-if="authenticated">
        <a>{{ user.name }}</a> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <a href="#" @click.prevent="signout">Logout</a>
      </template>
      <template v-else>
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Navigation',
  computed:{
    
    ...mapGetters({
      authenticated:'auth/authenticated',
      user: 'auth/user',
    })
  },//computed
  methods:{
    ...mapActions({
      signOutAction :'auth/signOut'
    }),

    signout(){
      this.signOutAction().then(()=>{
        this.$router.replace({
          name:'Home'
        })
      })
    }
  }, //methods
}
</script>
