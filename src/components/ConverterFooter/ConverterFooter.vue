<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-link">
        <a class="footer-link" href="https://www.exchangerate-api.com" target="_blank"
          >Rates By Exchange Rate API</a
        >
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  border-top: var(--color-border);
  height: 60px;
}
.footer-link {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.footer-link a {
  text-decoration: underline;
  font-weight: 500;
}
</style>
