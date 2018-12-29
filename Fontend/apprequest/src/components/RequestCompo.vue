<template>  
    <div class="panel panel-default container-fluid col-md-4">
      <div class="form-group">
        <legend>Đặt xe</legend>
      </div>
      <form>        
        <div class="form-group">
          <!--<label for="inputFullname">Họ và tên</label>-->
          <input type="text" class="form-control" id="txtFullname" placeholder="Họ và tên" v-model="Fullname">
        </div>
        <div class="form-group">
          <!--<label for="inputPhonenumber">Điện thoại</label>-->
          <input type="text" class="form-control" id="txtPhonenumber" placeholder="Số điện thoại" v-model="PhoneNumber">
        </div>       
        <div class="form-group">
          <!--<label for="inputAddress">Địa chỉ đón</label>-->
          <input type="text" class="form-control" id="txtAddress" placeholder="Địa chỉ" v-model="Address">
        </div>
        <div class="form-group">
          <!--<label for="inputNote">Ghi chú</label>-->
          <textarea class="form-control" id="txtNote" placeholder="Ghi chú" rows="3" v-model="Note"></textarea>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="SubmitInfo()">Gửi yêu cầu</button>
      </form>      
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      Fullname: "",
      PhoneNumber:"",
      Address: "",
      Note: "",
      AccessToken: "INVALID"
    };
  },

  mounted() {        
    var self = this;
    if(self.AccessToken == "INVALID")
    {
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
            }
          })
          .catch(err => {
            console.log(err);
          })
    }
  },

  methods: {
    GetAccessToken() {      
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
            }
          })
          .catch(err => {
            console.log(err);
          })
    },


    SubmitInfo() {      
      var self = this;
      console.log(self.AccessToken);
      if(self.AccessToken == "INVALID")
        self.GetAccessToken();

      axios.post('http://localhost:6300/request/', 
                  {
                    Fullname: self.Fullname,
                    PhoneNumber: self.PhoneNumber,
                    Address: self.Address,
                    Note: self.Note
                  },
                  {
                    headers: {'access-token': self.AccessToken }
                  },
                )
          .then(res => {   
            alert(res.data.msg);
            self.Fullname = "";
            self.Address = "";
            self.PhoneNumber = "";
            self.Note = "";
          })
          .catch(err => {
            console.log(err);
            self.AccessToken = "INVALID"
          })
    },   
    
  },
};
</script>

<style scoped>
</style>