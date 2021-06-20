<template>
  <div class="about">
    <div class="row mx-5 px-5 bg-secondary text-light">
      <div class="col-md-10"><h1>TODO</h1></div>
    </div>
      <div class="row m-5 px-5">
        <div class="col-md-6">
          <input type="text" class="form-control" v-model="taskName">
        </div>
        <div class="col-md-2">
          <button class="btn btn-md btn-primary" @click.prevent="addNewTask">SAVE</button>
        </div>
      </div> 
  </div>
</template>

<script>
 import axios from 'axios'
  export default {
    data() {
      return {
        taskName: '',
        taskId:'',
      }
    },//data

    methods:{

      async addNewTask(){
        await axios.post('todos',{
          task : this.taskName,
        }).then(res=>{
          console.log('Response:',res.data);
          this.$router.replace({
             name:'Dashboard'
          })
        }).catch(err=>{
          console.log('Error:',err);
        })
        
      },//addNewTask

    },//methods
  }
</script>
