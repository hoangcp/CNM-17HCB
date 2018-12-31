<template>
  <div id="app">        
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-3">
          <Location @SelectedReqID="GetID" @AccessToken="SetAccessToken"/>
        </div>
        <div class="col-sm-9 col-md-9">
          <Map :CusInfo="ReqInfo" :AccessToken="AccessToken"/>
        </div>
      </div>
      
    </div>    
  </div>
</template>

<script>
import Location from './components/LocationCompo.vue'
import Map from './components/MapCompo.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    Location,
    Map
  },

  data () {
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
</style>
