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
          <button class="btn btn-md btn-warning" @click.prevent="updateTask">UPDATE</button>
        </div>
      </div> 
  </div>
</template>

<script>
 import axios from 'axios'
  export default {
      props:['id'],
    data() {
      return {
        taskName: '',
        taskId:this.id,
      }
    },//data

    mounted(){
        console.log('Hello Edit Mounted',this.taskId);
        axios.get(`todos/${this.taskId}`)
        .then(response => {
            console.log('Response:',response);
            this.taskId = response.data.todo.id;
            this.taskName = response.data.todo.task;
        }).catch(error => {
            console.log('Error:',error);
        })
    },//mounted

    methods:{

      async updateTask(){
        await axios.put(`todos/${this.taskId}`,{
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
