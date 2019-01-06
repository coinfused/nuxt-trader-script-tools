<template>
  <b-field label="Exchange">
    <b-select placeholder="Select an exchange" required>
      <option
        v-for="exchange in ['binance','bitfinex','hitbtc','kraken','gdax','bittrex','poloniex','gemini','ethfinex', '_custom'].sort()"
        :key="exchange"
        :value="exchange"
      >{{ exchange }}</option>
    </b-select>
  </b-field>
</template>