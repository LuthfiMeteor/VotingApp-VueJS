<template>
  <fulfilling-square-spinner
    v-if="loading"
    class="position-absolute top-50 start-50 translate-middle"
    :animation-duration="2000"
    :size="50"
    color="#ff1d5e"
  />
  <div v-else class="dashboard" style="margin-top: 80px">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              MAIN MENU
              <hr />
              <ul class="list-group">
                <router-link
                  to="/"
                  class="list-group-item text-dark text-decoration-none"
                  >DASHBOARD</router-link
                >
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              DASHBOARD
              <hr />
              Selamat Datang <strong>{{ user.name }}</strong>
            </div>
            <div class="card-body">
              <div v-for="(item, index) in poll" :key="index">
                <div v-for="(Poll, PollIndex) in item" :key="PollIndex">
                  <div class="card mt-2">
                    <!-- <div class="card-body">
                      <div class="d-flex">
                        <div class="p-2 w-100">{{ Poll.title }}</div>
                        <div class="p-2 flex-shrink-1">
                          <IconTrash
                            color="red"
                            :size="25"
                            stroke-width="1"
                            style="cursor: pointer"
                            @click="deleteItem(Poll.id)"
                          />
                        </div>
                      </div>
                      <div>{{ Poll.description }}</div>
                    </div> -->
                    <iv class="d-flex mb-0">
                      <div class="p-2 flex-grow-1 align-middle">
                        {{ Poll.title }}
                      </div>
                      <div class="p-2">
                        <IconTrash
                          v-if="user.role == 'admin'"
                          color="red"
                          :size="20"
                          stroke-width="1"
                          style="cursor: pointer"
                          @click="deletePoll(Poll.id)"
                        />
                      </div>
                    </iv>
                    <div class="d-flex text-muted mt-0">
                      <small class="ps-2 flex-grow-1 align-middle">
                        created by: {{ Poll.creator }} | deadline:
                        {{ new Date(Poll.deadline).toLocaleString("id-GB") }}
                      </small>
                    </div>
                    <div class="p-2 d-flex">{{ Poll.description }}</div>
                    <div class="d-flex flex-column mb-2">
                      <!-- Kalo udah vote -->
                      <div class="" v-if="Poll.deadline < deadline">
                        <div
                          class=""
                          v-for="(
                            PollPercentage, PollPercentageIndex
                          ) in Poll.poll_choises"
                        >
                          <div class="ps-2 pe-2 col-md-6">
                            <small class="progress-title">{{
                              PollPercentage.choise
                            }}</small>
                            <div class="progress green mb-2">
                              <div
                                class="progress-bar progress-bar-danger progress-bar-striped active"
                                :style="{
                                  width:
                                    PollPercentage.percentage === 0
                                      ? '100%'
                                      : PollPercentage.percentage + '%',
                                }"
                              >
                                <div class="progress-value">
                                  {{ PollPercentage.percentage + "%" }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="" v-else="">
                        <div class="" v-if="user.role == 'admin'">
                          <div class="">
                            <div
                              class=""
                              v-for="(
                                PollPercentage, PollPercentageIndex
                              ) in Poll.poll_choises"
                            >
                              <div class="ps-2 pe-2 col-md-6">
                                <small class="progress-title">{{
                                  PollPercentage.choise
                                }}</small>
                                <div class="progress green mb-2">
                                  <div
                                    class="progress-bar progress-bar-danger progress-bar-striped active"
                                    :style="{
                                      width: PollPercentage.percentage + '%',
                                    }"
                                  >
                                    <div class="progress-value">
                                      {{ PollPercentage.percentage + "%" }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="" v-else>
                          <div class="" v-if="Poll.has_voted.length == 0">
                            <div
                              v-for="(
                                choises, choisesIndex
                              ) in Poll.poll_choises"
                            >
                              <div class="p-1">
                                <div
                                  @click="
                                    selectChoise(
                                      choises.choise,
                                      choises.id,
                                      choises.poll_id
                                    )
                                  "
                                  class="btn btn-primary col-4 text-start"
                                >
                                  <small>{{ choises.choise }}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="" v-else>
                            <div
                              class=""
                              v-for="(
                                PollPercentage, PollPercentageIndex
                              ) in Poll.poll_choises"
                            >
                              <div class="ps-2 pe-2 col-md-6">
                                <small class="progress-title">{{
                                  PollPercentage.choise
                                }}</small>
                                <div class="progress green mb-2">
                                  <div
                                    class="progress-bar progress-bar-danger progress-bar-striped active"
                                    :style="{
                                      width: PollPercentage.percentage + '%',
                                    }"
                                  >
                                    <div class="progress-value">
                                      {{ PollPercentage.percentage + "%" }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FAB_Button v-if="user.role == 'admin'" />
</template>

<style>
.progress-title {
  font-size: 12px;
  font-weight: 700;
  color: #000;
  letter-spacing: 2px;
  margin: 0 0 15px;
}
.progress {
  height: 26px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 40px;
  overflow: visible;
  position: relative;
}
.progress .progress-bar {
  box-shadow: none;
  border-radius: 0;
  position: relative;
  background-color: #5cb85c;
  -webkit-animation: 2s linear 0s normal none infinite running
      progress-bar-stripes,
    animate-positive 1s;
  animation: 2s linear 0s normal none infinite running progress-bar-stripes,
    animate-positive 1s;
}
.progress-bar .progress-value {
  width: 50px;
  height: 100%;
  background: #000;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  position: absolute;
  line-height: 15px;
  top: 0;
  left: 0;
}
.progress:after,
.progress .progress-bar:after,
.progress .progress-value:after {
  content: "";
  border-left: 13px solid rgba(0, 0, 0, 0.1);
  border-top: 13px solid transparent;
  border-bottom: 13px solid transparent;
  position: absolute;
  top: -4px;
  right: -13px;
}
.progress.red .progress-bar:after {
  border-left-color: #d9534f;
}
.progress .progress-value:after {
  border-left: 13px solid #000;
}
.progress.blue .progress-bar:after {
  border-left-color: #5bc0de;
}
.progress.yellow .progress-bar:after {
  border-left-color: #f0ad4e;
}
.progress.green .progress-bar:after {
  border-left-color: #5cb85c !important;
}
@-webkit-keyframes animate-positive {
  0% {
    width: 0;
  }
}
@keyframes animate-positive {
  0% {
    width: 0;
  }
}
</style>

<script>
import axios from "axios";
import FAB_Button from "../components/floating_button.vue";
import { IconTrash } from "@tabler/icons-vue";
import Swal from "sweetalert2";
import { FulfillingSquareSpinner } from "epic-spinners";
const time = new Date();
const indonesiaOffset = 7; // Offset UTC+7 untuk Waktu Indonesia Barat (WIB)
const indonesiaTime = new Date(
  time.getTime() + indonesiaOffset * 60 * 60 * 1000
);
export default {
  name: "home",
  components: {
    FAB_Button,
    IconTrash,
    FulfillingSquareSpinner,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      //state user logged In
      user: [],
      loading: null,
      poll: [],
      deadline: indonesiaTime.toISOString().slice(0, 16),
    };
  },
  methods: {
    getMe() {
      (this.loading = true),
        axios
          .post("http://localhost:8000/api/auth/me", null, {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((response) => {
            console.log(response);
            this.user = response.data;
            this.loading = false;
            if (response.data.default_password) {
              return this.$router.push({ name: "ResetPassword" });
              console.log(response.data.default_password);
            }
          })
          .catch((error) => {
            this.loading = false;
            if (error.response.status == 401) {
              localStorage.removeItem("token");
              // localStorage.removeItem("tokenexp");
              return this.$router.push({ name: "login" });
            }
            console.log(error);
          });
    },
    getPoll() {
      (this.loading = true),
        axios
          .get("http://localhost:8000/v1/api/poll", {
            headers: { Authorization: "Bearer " + this.token },
          })
          .then((res) => {
            this.poll = res.data;
            (this.loading = false), console.log(res.data);
          });
    },
    deleteItem(id) {
      console.log(id);
    },
    deletePoll(id) {
      Swal.fire({
        title: "Do you want to delete poll?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8000/v1/api/poll/${id}`, {
              headers: { Authorization: "Bearer " + this.token },
            })
            .then((res) => {
              Swal.fire({
                title: "success",
                icon: "success",
              });
              this.getPoll();
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "error",
                text: err.response,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Poll Not Deleted", "", "info");
        }
      });
    },
    selectChoise(choise, id, poll_id) {
      console.log(id);
      Swal.fire({
        title: `Do you want to Vote ${choise}?`,
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `http://localhost:8000/v1/api/poll/${poll_id}/vote/${id}`,
              null,
              {
                headers: { Authorization: "Bearer " + this.token },
              }
            )
            .then((res) => {
              Swal.fire({
                title: "success",
                icon: "success",
              });
              this.getPoll();
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "error",
                text: err.response.data.message,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Vote Not Submited", "", "info");
        }
      });
    },
  },

  created() {
    this.getMe();
    this.getPoll();
    console.log(this.deadline);
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getPoll();
      },
    },
  },
  //check user logged in or not
  mounted() {},
};
</script>
