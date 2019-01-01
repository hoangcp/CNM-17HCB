<template>  
    <div class="panel panel-default">
      <div class="form-group">
        <legend>DANH SÁCH YÊU CẦU</legend>
      </div>
      <div class="list-group">
        <a v-for="c in lists"
          :key="c.ID"
          href="javascript:;"
          class="list-group-item"
          :class="{active: c.ID === selectedId}"
          @click="categoryClicked(c)">
          {{c.CreateDate2}}
          <br>{{c.Fullname}} - {{ c.PhoneNumber }}
          <br>{{c.Address}}
        </a>
      </div>
      <form hidden="">        
        <template>
          <b-table striped hover :items="lists" :fields="fields"></b-table>
        </template>
      </form>      
    </div>
</template>

<script>
import axios from 'axios'

export default {

  data() {
    return {
      selectedId: -1,
      lists: [],
      fields: {
        CreateDate: {
          label: 'Thời gian',
          sortable: false
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
        }       
      },
      current: 0,      
    };
  },

  mounted() {        
     this.getList();                         
  },

  methods: {    
    categoryClicked(c) {
      var self = this;
      self.selectedId = c.ID;      
      self.$emit('SelectedReqID', c);
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
          })
          .catch(err => {
            console.log(err.response);
            /*alert(err.response.data.msg);
            localStorage.clear();
            self.$router.push('/login');*/
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
</style>