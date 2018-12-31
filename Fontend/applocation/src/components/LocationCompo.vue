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
      AccessToken: "INVALID"
    };
  },

  mounted() {        
    var self = this;    
    var Username = "hoangcp";
    var Password = "123";
    axios.post('http://localhost:6300/account/login', 
                {
                  Username: Username,
                  Password: Password
                }
              )
        .then(res => {                       
          if(res.data.auth == true)
          {
            self.AccessToken = res.data.access_token;
            self.$emit('AccessToken', self.AccessToken);
            //console.log('data nè: ' +  self.AccessToken);   
            axios.post('http://localhost:6300/request/getlist',{}, 
                      {
                        headers: {'access-token': self.AccessToken }
                      }
                     )
                .then(res => {      
                  self.lists = res.data;
                })
                .catch(err => {
                  console.log(err);
                })                             
          }
        })
        .catch(err => {
          console.log(err);
        })        
  },

  methods: {    
    categoryClicked(c) {
      var self = this;
      self.selectedId = c.ID;
      // alert(JSON.stringify(c));
      self.$emit('SelectedReqID', c);
    }
    
  },
};
</script>

<style scoped>
</style>