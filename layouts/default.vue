<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link
            class="navbar-item has-text-weight-bold"
            to="/index"
          >
            trader.script.tools
          </nuxt-link>
          <span
            class="navbar-burger burger"
            data-target="navbarMenuHeroC"
          >
            <span/>
            <span/>
            <span/>
          </span>
        </div>
        <div
          id="navbarMenuHeroC"
          class="navbar-menu"
        >
          <div class="navbar-start">
            <nuxt-link
              class="navbar-item"
              to="/datasets"
            >Datasets</nuxt-link>
            <nuxt-link
              class="navbar-item"
              to="/strategies"
            >Strategies</nuxt-link>
            <nuxt-link
              class="navbar-item"
              to="/backtests"
            >Backtests</nuxt-link>
            <nuxt-link
              class="navbar-item"
              to="/signals"
            >Trading Signals</nuxt-link>
            <nuxt-link
              class="navbar-item"
              to="/live"
            >Live Trading</nuxt-link>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="main-content columns">

      <div class="container column is-12">
        <section class="section">
          <div class="columns is-mobile">
            <nuxt />
          </div>
        </section>
      </div>

    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: $nuxt.$route.name
    }
  }
}
</script>
