<template>
  <div class="about">
    <div class="row mx-5 px-5 bg-secondary text-light">
      <div class="col-md-10"><h1>TODO</h1></div>
      <div class="col-md-2">
        <router-link  class="btn btn-md btn-success pull-right mt-2" to="/addTodo">+ ADD Todo</router-link>
      </div>
    </div>

      <div class="row mx-5 px-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <th scope="row">{{++index}}</th>
            <td>{{item.task}}</td>
            <td>
              <router-link class="btn btn-sm btn-success mx-2" :to="{ name: 'showUpdateTodo', params: { id:item.id } }">
                Edit
              </router-link>
              
              <button class="btn btn-sm btn-danger" @click.prevent="deleteTodo(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
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
        list:true,
        addForm:false,
        updateView:false,
        items: []
      }
    },//data

    mounted(){
      axios.get('todos')
      .then(response => {
        console.log('Response:',response);
        this.items = response.data.todos;
      }).catch(error=>{
        console.log('Error:',error);
      })
    },//mounted

    methods:{

    deleteTodo(id){
      axios.delete(`todos/${id}`).then(response=>{
        console.log('Response',response);
        if(response.data.status){
          this.items = this.items.filter((item) => {
            return item.id != id
          })
        }
      }).catch(err=>{
        console.log('Error:',err);
      })
      }, //deleteTodo

    },//methods
  }
</script>
