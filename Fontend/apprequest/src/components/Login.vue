<template>
  <div class="panel panel-default container-fluid col-md-3">
    <div class="form-group">
      <legend>Đăng nhập</legend>
    </div>  
    <form>        
        <div class="form-group">        
          <input type="text" class="form-control" id="txtUsername" placeholder="Tên đăng nhập" v-model="user.username">
        </div>
        <div class="form-group">          
          <input type="text" class="form-control" id="txtPassword" placeholder="Mật khẩu" v-model="user.password">
        </div>       
        <button type="button" class="btn btn-primary" @click="login">Đăng nhập</button>        
    </form>  
    <!--<div class="card-body">
      <form>
        <div class="form-group">          
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Tên đăng nhập"
            v-model="user.username"
          >
        </div>
        <div class="form-group">          
          <input
            type="password"
            class="form-control"
            id="formGroupExampleInput2"
            placeholder="Mật khẩu"
            v-model="user.password"
          >
        </div>
        <div class="form-group">
          <button @click="login" type="button" class="btn btn-outline-primary">Đăng nhập</button>
        </div>
      </form>
    </div>-->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      var self = this;

      axios.post('http://localhost:6300/account/login', 
                  {
                    Username: self.user.username,
                    Password: self.user.password
                  }
                )
          .then(res => {                       
            if(res.data.auth == true)
            {
              localStorage.access_token = res.data.access_token;                              
              localStorage.username = res.data.username;
              self.$router.push('/request');
              return;
            }
            else
            {
              alert('Tên đăng nhập hoặc mật khẩu không đúng');
            }
          })
          .catch(err => {
            console.log(err);
          })          
    }
  }
};
</script>
