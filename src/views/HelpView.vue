<template>
  <main class="help-page">
    <header>
      <div>
        <span>SUPPORT</span>
        <h1>帮助中心</h1>
        <p>无需登录，快速找到常见问题的答案。</p>
      </div>
      <RouterLink to="/about">关于我们</RouterLink>
    </header>

    <section class="questions">
      <article>
        <strong>01</strong>
        <h2>如何登录？</h2>
        <p>前往登录页，输入演示账号 admin 和密码 123456。</p>
      </article>
      <article>
        <strong>02</strong>
        <h2>忘记密码怎么办？</h2>
        <p>请联系系统管理员重置密码，或使用演示账号继续体验。</p>
      </article>
      <article>
        <strong>03</strong>
        <h2>需要更多帮助？</h2>
        <p>发送邮件至 support@example.com，我们会尽快回复。</p>
      </article>
    </section>

    <RouterLink class="login-link" to="/login">前往登录 →</RouterLink>
  </main>
</template>

<style scoped>
.help-page {
  min-height: 100svh;
  padding: 64px;
  text-align: left;
  box-sizing: border-box;
  background: linear-gradient(145deg, var(--bg), var(--accent-bg));
}

header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  max-width: 900px;
  margin: 0 auto 56px;
}

header span {
  color: var(--accent);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}

header h1 {
  margin: 12px 0;
}

header a,
.login-link {
  color: var(--accent);
  text-decoration: none;
}

.questions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

article {
  min-height: 180px;
  padding: 28px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

article strong {
  color: var(--accent);
  font-family: var(--mono);
}

article h2 {
  margin-top: 24px;
}

article p {
  line-height: 1.7;
}

.login-link {
  display: block;
  max-width: 900px;
  margin: 40px auto 0;
  font-weight: 600;
}

@media (max-width: 760px) {
  .help-page {
    padding: 32px 20px;
  }

  .questions {
    grid-template-columns: 1fr;
  }
}
</style>
