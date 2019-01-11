<template>
  <section class="section">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="tags has-addons">
            <span class="tag is-link has-text-weight-bold">trader.script.tools</span>
            <span class="tag is-light is-italic">v0.1 alpha</span>
          </div>
        </div>

        <div class="level-item">
          <div class="columns is-mobile">
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/app">App</nuxt-link>
              </span>
            </div>
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/doc">Doc</nuxt-link>
              </span>
            </div>
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/api">Api</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="columns is-mobile has-text-right">
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/app/datasets/">Datasets</nuxt-link>
              </span>
            </div>
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/app/strategies/">Strategies</nuxt-link>
              </span>
            </div>
            <div class="column">
              <span class="button is-white">
                <nuxt-link to="/app/backtests/">Backtests</nuxt-link>
              </span>
            </div>
            <div class="column">
              <span class="button is-link is-outlined">
                <nuxt-link to="/login">Login</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>