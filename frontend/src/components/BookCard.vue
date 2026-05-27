<template>
  <div class="book-card">
    <div class="cover-wrapper">
      <img v-if="book.coverUrl" :src="book.coverUrl" :alt="book.title" />
      <span v-else>No Cover</span>
    </div>
    <div class="card-content">
      <div class="title">{{ book.title }}</div>
      <div class="author">{{ book.author }} ({{ book.year }})</div>
      
      <!-- Actions for Search View -->
      <button v-if="mode === 'search'" @click="$emit('add', book)" class="btn">
        Add to Library
      </button>

      <!-- Actions for Library View -->
      <div v-if="mode === 'library'" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <span style="font-size: 0.8rem; font-weight: bold; text-transform: uppercase;"
              :style="{ color: book.status === 'reading' ? 'var(--primary)' : 'green' }">
          Status: {{ book.status }}
        </span>
        <button v-if="book.status === 'reading'" @click="$emit('finish', book.id)" class="btn btn-secondary">
          Mark as Finished
        </button>
        <button @click="$emit('remove', book.id)" class="btn btn-danger">
          Delete Book
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: Object,
    mode: {
      type: String,
      default: 'search'
    }
  }
}
</script>
