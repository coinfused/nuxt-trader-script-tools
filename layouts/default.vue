<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link
            class="navbar-item has-text-weight-bold"
            to="/"
          >
            <div class="tags has-addons">
              <span class="tag is-dark has-text-weight-bold">trader.script.tools</span>
              <span class="tag is-light is-italic">v0.1 alpha</span>
            </div>
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
          <div class="navbar-end">
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
          <!--
          <div class="navbar-end">
            <div class="navbar-item">
                <b-dropdown position="is-bottom-left">
                    <a class="navbar-item" slot="trigger">
                        <span>Login</span>
                        <b-icon icon="menu-down"></b-icon>
                    </a>

                    <b-dropdown-item custom paddingless>
                        <form action="">
                            <div class="modal-card" style="width:300px;">
                                <section class="modal-card-body">
                                    <b-field label="Email">
                                        <b-input
                                            type="email"
                                            placeholder="Your email"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-field label="Password">
                                        <b-input
                                            type="password"
                                            password-reveal
                                            placeholder="Your password"
                                            required>
                                        </b-input>
                                    </b-field>

                                    <b-checkbox>Remember me</b-checkbox>
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-primary">Login</button>
                                </footer>
                            </div>
                        </form>
                    </b-dropdown-item>
                </b-dropdown>
 
            </div>
          </div>
          -->
        </div>
      </div>
    </nav>
    <nuxt/>
    <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Warning:</strong> by using this tool you will burn your portfolio.
    </p>
  </div>
</footer>
  </div>
  
</template>

<script>
export default {
  head() {
    return {
      title: this.$route.name
    }
  }
}
</script>