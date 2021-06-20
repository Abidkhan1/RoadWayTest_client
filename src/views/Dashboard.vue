<template>
  <div class="about">
    <div class="row mx-5 px-5 bg-secondary text-light">
      <div class="col-md-10"><h1>TODO</h1></div>
      <div class="col-md-2">
        <router-link  class="btn btn-md btn-success pull-right mt-2" to="/addTodo">Create New Todo</router-link>
      </div>
    </div>
      <div class="row">
        <div class="m-5 px-5  search-wrapper panel-heading col-sm-6">
          <input class="form-control" type="text" v-model="searchQuery" placeholder="Search" />
        </div>                        
      </div>
      <div class="row mx-5 px-5" style="max-height: 400px;overflow-y: scroll;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="index">
            <th scope="row">{{++index}}</th>
            <td>{{item.title}}</td>
            <td>{{item.description}}</td>
            <td>
              <router-link class="btn btn-sm btn-success mx-2" :to="{ name: 'showUpdateTodo', params: { id:item.id } }">
                View / Update
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
 import swal from 'sweetalert';
  export default {
    data() {
      return {
        searchQuery:'',
        items: []
      }
    },//data

    computed: {
      filteredItems(){
        console.log('searching');
        if(this.searchQuery){
        return this.items.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
        }else{
          return this.items;
        }
      }
    },

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
        swal("Well Done!!", "Task deleted successfully.", "success");
      }).catch(err=>{
        console.log('Error:',err);
      })
      }, //deleteTodo

    },//methods
  }
</script>
