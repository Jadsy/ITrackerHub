<template>
  <div>
    <project-members></project-members>
    <edit-project-type></edit-project-type>
    <delete-project></delete-project>
  </div>
</template>

<script>
import DeleteProject from './DeleteProject.vue'
import EditProjectType from './EditProjectType.vue'
import ProjectMembers from './ProjectMembers.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    DeleteProject,
    EditProjectType,
    ProjectMembers,
  },
}
</script>

<style></style>
