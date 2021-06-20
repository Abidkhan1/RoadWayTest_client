<template>
  <div class="about">
    <div class="row mx-5 px-5 bg-secondary text-light">
      <div class="col-md-10"><h1>TODO</h1></div>
    </div>
      <div class="row m-5 px-5">
        <div class="col-md-6">
            <label for="task">Title</label>
          <input type="text" class="form-control" v-model="title">
          <span v-if="errors.title" style="color:red;">{{errors.title[0]}}</span>
        </div>
        <div class="col-md-6">
            <label for="description">Description</label>
          <input type="text" class="form-control" v-model="description">
          <span v-if="errors.description" style="color:red;">{{errors.description[0]}}</span>
        </div>
      </div> 
      <div class="row m-5 px-5">
          <button class="btn btn-md btn-warning" @click.prevent="updateTask">UPDATE</button>
      </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import swal from 'sweetalert';
  export default {
      props:['id'],
    data() {
      return {
        title: '',
        description:'',
        taskId:this.id,
        errors:[],
      }
    },//data

    mounted(){
        console.log('Hello Edit Mounted',this.taskId);
        axios.get(`todos/${this.taskId}`)
        .then(response => {
            console.log('Response:',response);
            this.taskId = response.data.todo.id;
            this.title = response.data.todo.title;
            this.description = response.data.todo.description;
        }).catch(error => {
            console.log('Error:',error);
        })
    },//mounted

    methods:{

      async updateTask(){
        await axios.put(`todos/${this.taskId}`,{
          title : this.title,
          description:this.description
        }).then(res=>{
          console.log('Response:',res.data);
          swal("Well Done!!", "Task updated successfully.", "success").then(() => {
            this.$router.replace({
             name:'Dashboard'
            })
          });
           
        }).catch(error=>{
          console.log('Error:',error);
          this.errors = error.response.data.errors;
          swal("Error", "Kindly insert valid data in form.", "error");
        })
        
      },//addNewTask

    },//methods
  }
</script>
