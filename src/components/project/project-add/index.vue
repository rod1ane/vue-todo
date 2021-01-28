<template>
    <div class="add-project">
        <h2>Add project </h2>
        <form @submit.prevent="submitFormProject">
          <input type="text" v-model="projectName" placeholder="project name">
          <input type="submit" value="Add project">
        </form>
    </div>
</template>

<script>
console.log(localStorage.getItem('token'))
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    name: 'addProject',
    data() {
      return{
        projectName: ''
      }
    },
    methods: {
      ...mapMutations({
        'addPr': 'user/addPr'
      }),
      submitFormProject() {
        this.addPr({
          name: this.projectName
        })
        
        axios.post('projects/add', {name: this.projectName}, {
          header: {
            'Authorization': localStorage.getItem('token')
          }
        })
      }
    }
}
</script>