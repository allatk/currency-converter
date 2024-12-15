<template>
  <div class="menu">
    <div class="container">
      <nav class="nav-bar">
        <RouterLink to="/">Converter</RouterLink>
        <RouterLink to="/rates">Current rates</RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
  color: var(--cc-color-text-active);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: var(--color-border);
  font-size: 18px;
  font-weight: 600;
}

nav a:first-of-type {
  padding-left: 0;
  border: 0;
}
</style>
