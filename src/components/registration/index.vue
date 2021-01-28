<template>
    <div class="registration">
        <div class="registration-inner">
          <h1>Registration user</h1>
          <form action="#" @submit.prevent="submitForm">
              <input type="text" v-model="form.email" placeholder="Email">
              <br>
              <input type="password" v-model="form.password" placeholder="Password">
              <br>
              <input type="submit"  value="Submit">
          </form>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';
export default {
    name: 'registration',
    data() {
        return{
            form: {
                email: '',
                password: '',
            },
            isLogin: false
        }
    },
    methods: {
      ...mapActions({
        signIn: 'user/signIn'
      }),

      submitForm() {
        this.signIn(this.form)
      }    
    }
}
</script>

<style lang="sass">
  .registration
    background-color: #1a1a1a
    display: flex
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    padding: 20px
    color: #fff
    input
      display: block
      width: 100%
      height: 30px
  .registration-inner
    margin: auto
    max-width: 300px
    width: 100%
</style>