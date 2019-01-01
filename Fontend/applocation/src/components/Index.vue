<template>
  <div>        
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-3">
          <Location @SelectedReqID="GetID"/>
        </div>
        <div class="col-sm-9 col-md-9">
          <Map :CusInfo="ReqInfo"/>
        </div>
      </div>
      
    </div>    
  </div>
</template>

<script>
import Location from './LocationCompo.vue'
import Map from './MapCompo.vue'
import axios from 'axios'

export default { 
  components: {
    Location,
    Map
  },

  data () {
    return {
      ReqInfo: {},      
    }
  },

  mounted() {        
      
    },

  methods: {
    GetID(req) {
      var self = this;      
      axios.post(`http://localhost:6300/request/getid`,
                  { id: req.ID},
                  { headers: {'access-token': localStorage.access_token } },
                )
        .then(res => {          
          self.ReqInfo = res.data[0];
        })
        .catch(err => {
          console.log(err.response);
          alert(err.response.data.msg);
          localStorage.clear();
          self.$router.push('/login');
        })      
    },
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
