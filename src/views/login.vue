<template>
  <div class="login card position-absolute top-50 start-50 translate-middle">
    <div class="card-body">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="user.username"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone ada.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="user.password"
          />
        </div>
        <div class="alert alert-danger" role="alert" v-if="loginFailed">
          Username Atau Password Salah
        </div>
        <button type="submit" class="btn btn-primary col-12">
          <div
            v-if="loading"
            class="d-flex justify-content-center align-items-center"
          >
            <half-circle-spinner
              :animation-duration="1000"
              :size="30"
              color="black"
            />
          </div>
          <div class="" v-else>Login</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "login",
  components: {
    HalfCircleSpinner,
  },

  data() {
    return {
      // INI BUAT DAPET TOKEN
      token: localStorage.getItem("token"),
      TokenExp: localStorage.getItem("TokenExp"),
      user: [],
      // INI VALIDASI KALO ERROR KEISI
      validation: [],
      // INI TANDA KALO LOGIN GAGAL, NANTI RETURN ERROR
      loginFailed: null,
      // INI BUAT LOADING BIAR KAYAK WEB ORANG LAIN
      loading: false,
    };
  },
  methods: {
    login() {
      if (this.user.username && this.user.password) {
        (this.loading = true),
          axios
            .post("http://localhost:8000/api/auth/login", {
              username: this.user.username,
              password: this.user.password,
            })
            .then((res) => {
              // LOG USER
              console.log(res);

              if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                return this.$router.push({ name: "home" });
              } else {
                // BUAT ALERT TANDA LOGIN GAGAL
                this.loginFailed = true;
              }
            })
            .catch((error) => {
              // console.log(error);
              this.loginFailed = true;
            })
            .finally(() => {
              this.loading = false;
            });
      }

      this.validation = [];

      if (!this.user.username) {
        this.validation.username = true;
      }

      if (!this.user.password) {
        this.validation.password = true;
      }
    },
  },

  //check user already logged in
  mounted() {
    if (this.token) {
      return this.$router.push({ name: "home" });
    }
  },
};
</script>
