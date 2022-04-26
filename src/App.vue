<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'
import LayoutBlank from '@/layouts/Blank.vue'
import LayoutContent from '@/layouts/Content.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  
  components: {
    // BoardVue,
    // CardVue,
    LayoutBlank,
    LayoutContent,
  },
  
  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'blank') return 'layout-blank'

      return 'layout-content'
    })

    return {
      resolveLayout,
    }
  },

  methods: {
    ...mapActions(['getProjectList', 'getIssueStatus', 'getIssueSeverity']),
  },

  computed: {
    ...mapGetters(['ProjectList']),
  },

  async mounted() {
    await this.getProjectList()
    
    this.getIssueStatus()
    this.getIssueSeverity()

  },
}
</script>
