<template>  
    <div class="panel panel-default">
      <div>
        <TravelMap class="travel-map"/>
      </div>  
      <div class="form-group">
        <legend>DANH SÁCH YÊU CẦU</legend>
      </div>      
      <form >        
        <template>
          <b-table striped hover :items="lists" :fields="fields"></b-table>
        </template>
      </form>          
    </div>
</template>

<script>
import axios from 'axios'
import TravelMap from './TravelMap'

export default {
   components: {   
    TravelMap
  },
  data() {
    return {
      selectedId: -1,
      lists: [],
      fields: {
        STT: {
          label: '#',
          sortable: false
        },
        CreateDate2: {
          label: 'Thời gian',
          sortable: true
        },
        Fullname: {
          label: 'Họ tên',
          sortable: false
        },
        PhoneNumber: {          
          label: 'Số điện thoại',
          sortable: true
        },
        Address: {          
          label: 'Địa chỉ',
          sortable: true
        },
        Note: {          
          label: 'Ghi chú',
          sortable: true
        },
        StatusDesc:{
          label: 'Tình trạng',
          sortable: true
        },
        UpdateBy:{
          label: 'Người cập nhật',
          sortable: true
        }       
      },
      current: 0,      
    };
  },

  mounted() {        
     this.getList();                         
  },

  methods: {        
    getList(){
      var self = this;           
      axios.post('http://localhost:6300/request/getlist',
                {
                  "current": self.current
                }, 
                {
                  headers: {'access-token': localStorage.access_token }
                }
               )
          .then(res => {      
            //console.log(res.data);
            for(var r in res.data)
            {
              //console.log(r);
              self.lists.unshift(res.data[r]);
              self.current = res.data[r].CreateDate3;
              //console.log(self.current);
            }                       
          })
          .catch(err => {
            console.log(err.response);            
          }).then(function() {
              setTimeout(function () {
                self.getList();
              }, 3000);   
          })    
    },

  },
};
</script>

<style scoped>
.travel-map {
  height: 400px;
}
</style>