<template>
  <div class="container mt-3">
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput2">Team Name</label>
        <input v-model="form.name" type="text" class="form-control" placeholder="" />
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Sport</label>
        <select v-model="form.id_sport" class="browser-default custom-select">
          <option v-for="sport in sports" :value="sport.id_sport">{{ sport.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput2">Country</label>
        <input v-model="form.country" type="text" class="form-control" placeholder="" />
      </div>
    </form>
    <div class="d-flex flex-row-reverse align-items-center">
      <button class="btn btn-primary" @click="add()">Add</button>
      <button class="btn btn-secondary mr-2" @click="">Cancel</button>
    </div>
  </div>
</template>

<script>
import http from "@/http";
export default {
  data() {
    return {
      form: {
          name: '',
          id_sport: '',
          country: ''
        },
      sports: undefined,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    add() {
      http.post('http://localhost:4000/api/teams/', this.form).then(res => {
        this.load()
        this.form.name = ''
        this.form.id_sport = ''
        this.form.country = ''
      })
    },
    load() {
      http
        .get("http://localhost:4000/api/sports/")
        .then((res) => {
          this.sports = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
