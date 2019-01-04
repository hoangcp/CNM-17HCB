<template>  
    <div class="panel panel-default">
      <div style="height:400px;">
        <Map ref="form" class="travel-map" />
      </div>  
      <div class="form-group">
        <legend>DANH SÁCH YÊU CẦU</legend>
      </div>      
      <form >        
        <template>
          <b-table striped hover :items="lists" :fields="fields" @row-clicked="myRowClickHandler"></b-table>
        </template>
      </form>          
    </div>
</template>

<script>
import axios from 'axios'
import Map from './MapCompo.vue'

export default {
   components: {   
    Map
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
        },
        Assign:{
          label: 'Tài xế',
          sortable: true
        }         
      },
      current: 0,      
      count: 0
    };
  },

  mounted() {        
     this.getList();                         
  },

  methods: {       
    myRowClickHandler(record, index) {     
      var self = this;
      console.log(index); 
      self.$refs.form.addMarkerFromParent(record);  
    },
 
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

            if(self.count == 0)
            {
              self.count += 1;
              self.myRowClickHandler(self.lists[0], 0);
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
  position: fixed;
  z-index: 100;  
  width: 100%;  
  top: 0px;
}
</style>