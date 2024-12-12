<template>
  <div class="home">
    <div class="menu">
      <div class="container">
        <nav class="nav-bar">
          <RouterLink to="/">Converter</RouterLink>
          <RouterLink to="/rates">Current rates</RouterLink>
        </nav>
      </div>
    </div>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.menu {
  box-shadow: var(--cc-box-shadow);
}
.nav-bar {
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
