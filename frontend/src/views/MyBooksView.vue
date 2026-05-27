<template>
  <div>
    <h2 style="margin-bottom: 2rem;">My Reading List</h2>

    <div v-if="loading">Loading library...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="books.length === 0" style="color: var(--text-muted)">
      Your library is empty. Go search for some books!
    </div>

    <div class="book-grid">
      <BookCard 
        v-for="book in books" 
        :key="book.id" 
        :book="book" 
        mode="library"
        @finish="markFinished"
        @remove="deleteBook"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BookCard from '../components/BookCard.vue'

export default {
  name: 'MyBooksView',
  components: { BookCard },
  data() {
    return {
      books: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/api/mybooks');
        this.books = response.data;
      } catch (err) {
        this.error = 'Failed to load library.';
      } finally {
        this.loading = false;
      }
    },
    async markFinished(id) {
      try {
        await axios.put(`http://localhost:3000/api/mybooks/${id}`, { status: 'finished' });
        this.fetchBooks(); // refresh list
      } catch (err) {
        alert('Failed to update status');
      }
    },
    async deleteBook(id) {
      if (!confirm('Are you sure you want to delete this book?')) return;
      try {
        await axios.delete(`http://localhost:3000/api/mybooks/${id}`);
        this.fetchBooks(); // refresh list
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  }
}
</script>
