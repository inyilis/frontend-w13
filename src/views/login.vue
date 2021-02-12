<template>
  <div class="row bg-img">
    <div class="container-fluid pt-5">
      <div class="d-flex justify-content-center">
        <div class="card loginBox border-white">
          <div class="card-header text-center border-white">
            <img src="../assets/coffeehouse.png" alt="">
          </div>
          <div class="card-body">
            <form>
              <div class="row pt-3">
                <div class="col-2">
                  <i class="far fa-envelope fa-2x" style="color: white;"></i>
                </div>
                <div class="col-10">
                  <input type="text" v-model="formLogin.email" class="form-control" placeholder="email" style="color: white;">
                </div>
              </div>
              <div class="row pt-3 pb-3">
                <div class="col-2">
                  <i class="far fa-key fa-2x" style="color: white;"></i>
                </div>
                <div class="col-10">
                  <input type="password" v-model="formLogin.pswd" class="form-control" placeholder="password" style="color: white;">
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="col btn btn-outline-light"
                  data-toggle="modal"
                  data-target="#modalRegister"
                >
                  Register
                </button>

                <!-- Modal Add Product -->
                <div
                  class="modal fade"
                  id="modalRegister"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="modalRegisterTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content loginBox border-white">
                      <div class="modal-header">
                        <h3 class="modal-title" id="modalRegisterTitle" style="color: white;">
                          Register
                        </h3>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <form class="modal-body">
                        <div class="form-group">
                          <div class="row pt-3">
                            <div class="col-2 text-center">
                              <i class="far fa-user-circle fa-2x" style="color: white;"></i>
                            </div>
                            <div class="col-10">
                              <input type="text" v-model="formRegister.name" class="form-control" placeholder="name" style="color: white;">
                            </div>
                          </div>
                          <div class="row pt-3">
                            <div class="col-2 text-center">
                              <i class="far fa-envelope fa-2x" style="color: white;"></i>
                            </div>
                            <div class="col-10">
                              <input type="text" v-model="formRegister.email" class="form-control" placeholder="email" style="color: white;">
                            </div>
                          </div>
                          <div class="row pt-3 pb-2">
                            <div class="col-2 text-center">
                              <i class="far fa-key fa-2x" style="color: white;"></i>
                            </div>
                            <div class="col-10">
                              <input type="password" v-model="formRegister.pswd" class="form-control" placeholder="password" style="color: white;">
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer text-right">
                          <button type="button" class="btn btn-outline-light" @click="register(formRegister)">Register</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>                
                <button type="button" class="col btn btn-outline-light" @click="cartNull() & login(formLogin)">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import router from '../routes';
import {mapActions} from 'vuex';

export default {
  name: "login",
  data(){
    return{
      formLogin:{
        email: null,
        pswd: null,
      },
      formRegister:{
        name: null,
        email: null,
        pswd: null,
        role: 'user',
      },
    }
  },
  methods:{
    ...mapActions(['cartNull', 'login']),
    register(value){
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

      if(value.name === '' || value.name === null){
        return alert('Isi namanya!')
      }
      if(value.email === '' || value.email === null){
        return alert('Isi emailnya!')
      }
      if(!emailRegex.test(value.email)){
        return alert('Format email salah!')
      }
      if(value.pswd === '' || value.pswd === null){
        return alert('Isi passwordnya!')
      }
      axios
      .post(process.env.VUE_APP_USERS, value)
      .then((res) => {
        if(res.data.result[0].msg === 'Nama / Email sudah terdaftar!'){
          alert('Nama / Email sudah terdaftar!');
        }else{
          alert('Success Register!');
          this.formRegister.name = null;
          this.formRegister.email = null;
          this.formRegister.pswd = null;
        }
      })
      .catch((err) => {
        alert('Gagal Register!');
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.bg-img {
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  height: 100vh;
}

.loginBox{
    background: rgba(0,0,0,.5);
}

.loginBox input[type="text"],
.loginBox input[type="password"]{
  background: transparent;
}

::placeholder{
    color: rgba(255,255,255,.5);
}
</style>