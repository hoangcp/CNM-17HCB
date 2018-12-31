<template lang="pug">
  #app
    component(:is="component")
      slot
</template>

<script>
import PublicLayout from '@/layouts/public/main.vue'
import DefaultLayout from '@/layouts/default/main.vue'
import * as constants from '@/constants'
export default {
  name: 'App',

  components: {
    PublicLayout,
    DefaultLayout
  },

  computed: {
    component () {
      return this.$store.state.common.layout
    }
  },

  mounted () {
    // Update page title.
    this.$store.watch((state) => {
      return state.common.title
    }, (title) => {
      document.title = title
      if (constants.DEBUG) {
        console.log(title)
      }
    }, {
      deep: true
    })
  }
}
</script>
