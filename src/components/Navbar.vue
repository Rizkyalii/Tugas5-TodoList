<template>
  <nav class="navbar">
    <router-link to="/" class="link">Home</router-link>
    <router-link to="/about" class="link">About</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  gap: 16px;
}

.link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
}
</style>
