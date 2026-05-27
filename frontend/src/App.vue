<template>
  <nav>
    <h1>Personal Book Library</h1>
    <div>
      <router-link to="/">Search Books</router-link>
      <router-link to="/mybooks">My Library</router-link>
    </div>
  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
