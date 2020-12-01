<template>
  <div class="container mt-3">
    <form>
      <div class="form-group">
        <label for="formGroupExampleInput2">Add New Sport</label>
        <input v-model="form.name" type="text" class="form-control" placeholder="New sport.." />
      </div>
    </form>
    <div class="d-flex flex-row-reverse align-items-center">
      <button class="btn btn-primary" @click="add()">Add</button>
      <button class="btn btn-secondary mr-2" @click="">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
          name: '',
        },
    };
  },
  methods: {
    add() {
      http.post('http://localhost:4000/api/sports/', this.form).then(res => {
        this.form.name = ''
      })
    },
  },
};
</script>
