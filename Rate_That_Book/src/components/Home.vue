<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="book in books" :key="book._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/books/${book._id}`">
              {{ book.name }}
              </v-btn>
            </div>
            <span class="grey--text">{{ book.release_year }} ‧ {{ book.genre }}</span>
          </div>
        </v-card-title>
        <v-card-text>
        {{ book.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Books',
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    this.fetchBooks();
  },
  /*
  While making the axios call, we will have to pass one extra parameter
  in the headers. We need to read the token from the local storage
  and pass it to the movies API through the headers. With this, any
  user who is not logged in to the app will not be able to view
  the movie listing page.
  */
  methods: {
    async fetchBooks() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/books',
        headers: {
          Authorization: `JWT ${token}`,//try cancelling
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.books = response.data.books;
          this.current_user = response.data.current_user;
        })
        .catch(() => {
        });
    },
  },
};
</script>
