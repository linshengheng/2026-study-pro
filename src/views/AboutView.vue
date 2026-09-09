<template>
  <main class="public-page">
    <nav>
      <RouterLink to="/login">登录</RouterLink>
      <RouterLink to="/help">帮助中心</RouterLink>
    </nav>

    <section class="hero-card">
      <span class="badge">PUBLIC PAGE</span>
      <h1>关于我们</h1>
      <p>这是一个无需登录即可访问的公开页面，用于展示产品与团队的基本信息。</p>
      <RouterLink class="action" to="/help">查看帮助中心 →</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.public-page {
  min-height: 100svh;
  padding: 32px;
  box-sizing: border-box;
  background:
    radial-gradient(circle at 15% 20%, rgba(170, 59, 255, 0.18), transparent 35%),
    var(--bg);
}

nav {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

nav a {
  color: var(--text);
  text-decoration: none;
}

.hero-card {
  width: min(680px, 100%);
  margin: 15vh auto 0;
  padding: 56px;
  text-align: left;
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
  box-sizing: border-box;
}

.badge {
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1 {
  margin-bottom: 20px;
}

p {
  max-width: 520px;
  line-height: 1.8;
}

.action {
  display: inline-block;
  margin-top: 32px;
  color: var(--accent);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 640px) {
  .public-page {
    padding: 20px;
  }

  .hero-card {
    margin-top: 10vh;
    padding: 32px 24px;
  }
}
</style>
