<template>
  <!-- <v-app>
    <component :is="resolveLayout">
      <router-view></router-view>
    </component>
  </v-app> -->
  <div id="app">
    <main class="flexbox">
      <BoardVue id="board-1">
        <CardVue id="card-1" draggable="true">
          <p>card one</p>
        </CardVue>
      </BoardVue>
      <BoardVue id="board-2">
        <CardVue id="card-2" draggable="true">
          <p>card two</p>
        </CardVue>
      </BoardVue>
    </main>
  </div>
</template>

<script>
import BoardVue from './views/dashboard/Board.vue'
import CardVue from './views/dashboard/Card.vue'
// import { computed } from '@vue/composition-api'
// import { useRouter } from '@/utils'
// import LayoutBlank from '@/layouts/Blank.vue'
// import LayoutContent from '@/layouts/Content.vue'

export default {
  components: {
    BoardVue,
    CardVue,
    // LayoutBlank,
    // LayoutContent,
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
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background-color: white;
  }
  .flexbox{
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 760px;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    padding: 15px;
  }
  .flexbox .board{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    background-color: black;
    padding: 15px;
  }
  .flexbox .board .card{
    padding: 15px 25px;
    background-color: white;
    cursor: pointer;
    margin-bottom: 15px;
  }
</style>