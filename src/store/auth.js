import axios from 'axios'
import swal from 'sweetalert';
export default{
  namespaced:true,
  state: {
      token:null,
      user:null,
  },//state
  getters:{
      authenticated (state){
          return state.token && state.user
      },

      user (state){
          return state.user
      },
  },//getters
  mutations: {
      SET_TOKEN(state,token){
          state.token = token
      },

      SET_USER(state,data){
          state.user = data
      }
  },
  actions: {
      async signIn({ dispatch }, credentials){
        let response = await axios.post('/auth/signin',{
            email:credentials.email,
            password:credentials.password,
          }).catch(error=>{
              console.log('Error:',error);
              swal("Fail! Invalid Credentials", "Kindly insert valid data in form.", "error");
          })

          console.log('Response',response);
         return dispatch('attempt',response.data.token)
      },//signIn

      async attempt({commit, state}, token){
        console.log('token:',token);
        if(token){
            commit('SET_TOKEN',token)
        }

        if(!state.token){
            return
        }
        
        try {
            let response = await axios.get('auth/me')

            console.log('ME:',response);
            commit('SET_USER',response.data)
        } catch (error) {
            console.log('Error:',error);
            commit('SET_TOKEN',null)
            commit('SET_USER',null)
        }
      },//attempt

      signOut({commit}){
          axios.get('auth/logout').then(()=> {
            commit('SET_TOKEN',null)
            commit('SET_USER',null)
          })
      },//signOut
    
  }
}
