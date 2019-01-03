<template>
  <div>        
    <div class="container-fluid">
      <Mana />      
    </div>        
  </div>
</template>

<script>
import Mana from './ManaCompo.vue'
//import axios from 'axios'

export default { 
  components: {    
    Mana,
    TravelMap
  },

  data () {
    return {
      ReqInfo: {},      
    }
  },

  mounted() {        
      
    },

  methods: {
    
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.travel-map {
  height: 400px;
}
</style>
