<template>
    <div class="project-list">
        <h3>Projects</h3>

        <ul>
            <li v-for="project of projects" :key="project.id">{{project.name}}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'projectList',
    computed: {
    ...mapGetters({
      projects: 'user/projects'
    })
  }
}
</script>