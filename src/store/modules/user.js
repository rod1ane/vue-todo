import axios from 'axios';

export default {
    namespaced: true,

    state: {
        token: null,
        projects: []
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },
        SET_PROJECT(state, payload) {
            state.projects = payload
        },
        addPr(state, payload) {
            state.projects.push(payload)   
        }
    },
    actions: {
        async signIn ({dispatch}, credentials) {
            
            let responseLogin = await axios.post('users/login', credentials)
            

            dispatch('attempt', responseLogin.data.token)
        },

        async attempt ({commit, state}, token) {
            if(token) {
                commit('SET_TOKEN', token)
            }

            if(!state.token) {
                return
            }

            try {
                let res = await axios.get('projects/', {
                    headers: {
                        'Authorization': token
                    }
                })

                commit('SET_PROJECT', res.data)

            } catch(e) {
                console.log(e)
            }
        }
    },
    getters: {
        // Геттеры это функции позволяют обратиться к сеттерам и его свойствам
        // функция принимает параметр это объект state, которое возвращает его значение к которому обращаемся
        authenticated(state) {
            return state.token 
        },
        projects(state) {
            return state.projects 
        }
    }
}
