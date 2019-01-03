<template>
  <div id="app">        
    <router-view/>  
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },

  /*data () {
    return {
      ReqInfo: {},
      AccessToken: ""
    }
  },

  mounted() {        
      
    },

  methods: {
    GetID(req) {
      var self = this;      
      axios.post(`http://localhost:6300/request/getid`,
                  { id: req.ID},
                  { headers: {'access-token': self.AccessToken } },
                )
        .then(res => {          
          self.ReqInfo = res.data[0];
        })
        .catch(err => {
          console.log(err);
        })      
    },

    SetAccessToken(req){
      this.AccessToken = req; 
    }
  }*/

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
</style>
