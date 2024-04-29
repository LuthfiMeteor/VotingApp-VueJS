<template>
  <div>
    <div class="login card position-absolute top-50 start-50 translate-middle">
      <div class="card-body">
        <div v-if="validation" class="alert alert-danger" role="alert">
          {{ validation }}
        </div>
        <form @submit.prevent="SubmitForm">
          <div class="mb-3">
            <label for="title">Title</label>
            <input type="text" class="form-control" v-model="formData.title" placeholder="title" />
          </div>
          <div class="mb-3">
            <label for="title">description</label>
            <input type="text" class="form-control" v-model="formData.desc" placeholder="desc" />
          </div>
          <div class="mb-3">
            <label for="title">deadline</label>
            <VueDatePicker v-model="deadline" locale="id"></VueDatePicker>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Choises</label>
            <div class="input-group" v-for="(item, index) in FormChoises" key="choises">
              <input type="text" v-model="item.value" class="form-control" name="'choises-' + index"
                aria-label="Dollar amount (with dot and two decimal places)" />
              <button class="btn btn-danger" @click="removeForm(index)" v-if="FormChoises.length > 1">
                X
              </button>
            </div>
            <button type="button" class="btn btn-primary mt-1" @click="addForm">
              +
            </button>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
const time = new Date();
const wib_time = new Date(time.getTime() + 7 * 60 * 60 * 1000);
export default {
  name: "Create_Poll",
  data() {
    return {
      FormChoises: [{ value: "" }],
      formData: [],
      deadline: ref(new Date()),
      token: localStorage.getItem("token"),
      validation: null,
    };
  },
  components: {
    VueDatePicker,
  },
  methods: {
    addForm() {
      this.FormChoises.push({ value: "" });
    },
    removeForm(index) {
      this.FormChoises.splice(index, 1);
    },
    SubmitForm() {
      console.log(this.deadline);
      axios
        .post(
          "http://localhost:8000/v1/api/poll",
          {
            title: this.formData.title,
            desc: this.formData.desc,
            deadline: this.deadline,
            choises: this.FormChoises,
          },
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          Swal.fire({
            title: "Success",
            icon: "success",
          });
          return this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.validation = error.response.data.message;
        });
    },
  },
  created() { },
};
</script>

<style scoped>
.border {
  border: 1px solid black;
  padding: 3px;
  margin-bottom: 5px;
}
</style>
