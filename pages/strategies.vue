<template>
  <indicatorForm :indicator="indicator"/>
</template>

<script>
import indicatorForm from '~/components/indicatorForm'

var indicators = {
  BOLL: { periods: 20, sdn: 2 },
  CCI: { periods: 26 },
  DMA: { fast: 10, slow: 50 },
  DMI: { periods: 14 },
  SMA: { periods: 30 },
  EMA: { periods: 30 },
  MACD: { fast: 12, slow: 26, signal: 9 },
  MTM: { periods: 9 },
  ROC: { periods: 12 },
  RSI: { periods: 14 },
  TRIX: { periods: 12 }
}

export default {
  components: { indicatorForm },
  data(context) {
    return { indicator: { name: 'SMA', settings: indicators['SMA']} }
  }
}
</script>
