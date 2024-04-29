<template>
  <div class="card position-absolute top-50 start-50 translate-middle">
    <div class="text-center card-title p-3 mb-0">
      <h4>Reset Password</h4>
      <br />
      <div class="alert alert-warning">
        You Password Is Default Please Change The Password For Security
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="ResetPassword">
        <div class="mb-0">
          <label for="exampleInputEmail1" class="form-label"
            >OLD Password</label
          >
          <input
            type="password"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="user.oldpassword"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >New Password</label
          >
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="user.newpassword"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >New Password</label
          >
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="user.confirm_newpassword"
          />
        </div>
        <div class="alert alert-danger" role="alert" v-if="resetpassword">
          {{ resetpassword_message }}
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
          <div class="" v-else>Reset Sekarang</div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { HalfCircleSpinner } from "epic-spinners";
import Swal from "sweetalert2";

export default {
  name: "ResetPassword",
  components: {
    HalfCircleSpinner,
  },

  data() {
    return {
      // INI VALIDASI KALO ERROR KEISI
      user: [],
      validation: [],
      loading: false,
      resetpassword: false,
      resetpassword_message: [],
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    ResetPassword() {
      if (
        this.user.oldpassword &&
        this.user.newpassword &&
        this.user.confirm_newpassword
      ) {
        (this.loading = true),
          axios
            .post(
              "http://localhost:8000/api/auth/reset_password",
              {
                OldPassword: this.user.oldpassword,
                NewPassword: this.user.newpassword,
                Confirm_Password: this.user.confirm_newpassword,
              },
              {
                headers: {
                  Authorization: "Bearer " + this.token,
                },
              }
            )
            .then((res) => {
              // LOG USER
              console.log(res);
              localStorage.removeItem("token");
              Swal.fire({
                title: "Success!",
                text: "Password Reset, Logged Out",
                icon: "success",
                confirmButtonText: "OK",
              });
              return this.$router.push({ name: "login" });
            })
            .catch((error) => {
              console.log(error);
              this.resetpassword = true;
              this.resetpassword_message = error.response.data.message;
            })
            .finally(() => {
              this.loading = false;
            });
      }

      this.validation = [];

      if (!this.user.OldPassword) {
        this.validation.oldpassword = true;
      }

      if (!this.user.NewPassword) {
        this.validation.newpassword = true;
      }
    },
  },
};
</script>
