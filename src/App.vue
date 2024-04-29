<template>
  <fulfilling-square-spinner
    v-if="loading"
    class="position-absolute top-50 start-50 translate-middle"
    :animation-duration="2000"
    :size="50"
    color="#ff1d5e"
  />
  <div class="" v-else>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="/favicon.ico" alt="" /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul class="navbar-nav">
            <li v-if="token" @click="logout">
              <a class="nav-link" style="cursor: pointer">LOGOUT</a>
            </li>
            <li v-else="">
              <router-link to="/login" class="nav-link">LOGIN</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <RouterView />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { FulfillingSquareSpinner } from "epic-spinners";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      exptoken: localStorage.getItem("tokenexp"),
      loading: false,
    };
  },
  components: {
    FulfillingSquareSpinner,
  },
  methods: {
    getLoggedIn() {
      this.token = localStorage.getItem("token");
    },
    logout() {
      this.loading = true;
      axios
        .post("http://localhost:8000/api/logout", null, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then(() => {
          this.loading = false;
          localStorage.removeItem("token");
          return this.$router.push({ name: "login" });
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn();
      },
    },
  },

  mounted() {
    // if (!this.token) {
    //   return this.$router.push({ name: "login" });
    // }
    console.log(Date.now() / 1000);
  },
};
</script>
