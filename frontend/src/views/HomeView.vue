<template>
  <div>
    <h2 style="margin-bottom: 1rem;">Search Books</h2>
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        @keyup.enter="searchBooks"
        type="text" 
        placeholder="Enter book title or author..." 
      />
      <button class="btn" @click="searchBooks" :disabled="loading">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </div>

    <div v-if="error" style="color: red; margin-bottom: 1rem;">{{ error }}</div>

    <div class="book-grid">
      <BookCard 
        v-for="book in books" 
        :key="book.id" 
        :book="book" 
        mode="search"
        @add="addToLibrary"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BookCard from '../components/BookCard.vue'

export default {
  name: 'HomeView',
  components: { BookCard },
  data() {
    return {
      searchQuery: '',
      books: [],
      loading: false,
      error: null
    }
  },
  methods: {
    async searchBooks() {
      if (!this.searchQuery) return;
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://localhost:3000/api/books/search?q=${this.searchQuery}`);
        this.books = response.data;
      } catch (err) {
        this.error = 'Failed to search books. Make sure backend is running.';
      } finally {
        this.loading = false;
      }
    },
    async addToLibrary(book) {
      try {
        await axios.post('http://localhost:3000/api/mybooks', book);
        alert(`"${book.title}" added to your library!`);
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to add book');
      }
    }
  }
}
</script>
