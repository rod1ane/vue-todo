<template>
  <div class="app">
    <template v-if="authenticated">
      <h1>Hello user</h1>


      <addProject />
      <projectList />
    </template>
    <registration v-else @onLogin="onLogin" />
    
  </div>
</template>

<script>
import registration from "./components/registration/"
import addProject from "./components/project/project-add/"
import projectList from "./components/project/project-list/"
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    registration,
    addProject, 
    projectList, 
  },
  data(){
    return{
      isLogin: true
    }
  },
  methods: {
    // Принимаем данные из дочернего компонента чтоб скрыть форму регистрации
    onLogin(isLogin){
      this.isLogin = isLogin
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'user/authenticated'
    })
  }
}
</script>

<style lang="sass">
  *
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    &:before, &:after
      -webkit-box-sizing: border-box
      -moz-box-sizing: border-box
      box-sizing: border-box
</style>