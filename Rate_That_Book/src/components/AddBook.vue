<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Book Name" v-model="name" :rules="nameRules" required>
    </v-text-field>
    <v-text-field name="input-7-1" label="Book Description" v-model="description"
      multi-line required :rules="descRules">
    </v-text-field>
    <v-text-field label="Book Release Year" v-model="release_year" required :rules="releaseRules">
    </v-text-field>
    <v-select label="Book Genre" v-model="genre"  required :rules="genreRules" :items="namely">
    </v-select>
    <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>  </v-form>
</template>
<script>
import axios from 'axios';

export default{
  data: () => ({
    valid: true,
    name: '',
    description: '',
    release_year: '',

    genre: '',
    nameRules: [v => !!v || 'Book name is required'],
    genreRules: [v => !!v || 'Book genre is required'],
    descRules: [v => !!v || 'Book description is required',
      v => (v && v.length > 200 && v.length < 500) || 'Description must be between 200 and 500 characters long'],
    releaseRules: [v => !!v || 'Book release Year is required',
      v => (v && v > 1000 && v < 2020) || 'Enter valid year in digit format yyyy'],

    select: null,
    namely: [
      'Poetry',
      'Drama',
      'Fiction',
      'Non-Fiction',
    ],
    checkbox: false,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            name: this.name,
            description: this.description,
            release_year: this.release_year,
            genre: this.genre,
          },
          url: '/books',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Great!',
              'Book added successfully!',
              'success',
            );
            this.$router.push({ name: 'Home' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Oh oo!',
              'Could not add the book',
              'error',
            );
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
