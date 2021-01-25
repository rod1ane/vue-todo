<template>
    <div class="registration">
        <h1 v-if="userName === null">Registration user</h1>
        <h1 v-else>{{userName}}</h1>
        <form action="#" @submit.prevent="submitForm">
            <input type="text" v-model="form.email" placeholder="Email">
            <br>
            <br>
            <input type="password" v-model="form.password" placeholder="Password">
            <br>
            <br>

            <input type="submit"  value="Submit">
        </form>


        <h2>Add project </h2>
        <form @submit.prevent="submitFormProject">
          <input type="text" v-model="projectName" placeholder="project name">
          <input type="submit" value="Add project">
        </form>


        <h3>Projects</h3>

        <ul>
          <li v-for="project of projects" :key="project.id">{{project.name}}</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'registration',
    data() {
        return{
            form: {
                email: '',
                password: '',
            },
            userName: 'User',
            projectName: '',
            projects: []
        }
    },
    methods: {
        submitForm() {
            axios.post('https://wunder-1.herokuapp.com/users/register', this.form)
              .then((response) => {
                console.log(response)
              })
              .catch((error) => {
                console.log(error)
                console.log("bad")
              })
              .finally(()=> {
                axios.post('https://wunder-1.herokuapp.com/users/login', this.form)
                .then(res => {
                  const token = res.data.token
                  const user = this.form.email
                  const password = this.form.password
                  localStorage.setItem('user-token', token)
                  localStorage.setItem('user-name', user)
                  localStorage.setItem('user-password', password)
                })
                .catch((error) => {
                  console.log(error)
                })
                .finally(()=> {
                })
              })
        },

        submitFormProject(){
          axios.post('https://wunder-1.herokuapp.com/projects/add', {name: this.projectName}, {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJAZ21haWwuY29tIiwidXNlcklkIjoiNjAwZThhNDJmMjdkMDYwMDE3NWExNjhiIiwiaWF0IjoxNjExNTY1NjM2LCJleHAiOjE2MTE1NjkyMzZ9.NtMiNU8Ef3bu44M7lX0mUvDt1sxwEN37mnRwQDUgcQQ'
            }
          })
        }
    },
    mounted() {
        const token = localStorage.getItem('user-token')
        const userName = localStorage.getItem('user-name')
        const userPassword = localStorage.getItem('user-password')
        axios.post('https://wunder-1.herokuapp.com/users/login',  {
          email: userName,
          password: userPassword
        }, {
          headers: {
            'Authorization': token
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(()=> {
          console.log(token)
          axios.get('https://wunder-1.herokuapp.com/projects/', {
            headers: {
              'Authorization': token
            }
          })
          .then((response) => {
            this.projects = response.data
          })
          .catch((error) => {
            console.log(error)
          })
        })
        
        if (token) {
          this.userName = userName
        }

    }
}
</script>