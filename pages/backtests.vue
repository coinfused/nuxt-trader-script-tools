<template>
  <div class="main-content">
    <section class="section container">
      <!--
    <div class="control">
      <div class="select">
        <select v-for="(strategy, index) in strategies" :key="'strategy'+index">
          <option value="strategy">strategy</option>
        </select>
      </div>
    </div>
      -->
      <div class="field is-grouped">
        <div class="control">
          <input class="input" v-model="request.dataset.market" type="text" placeholder="market">
        </div>
      </div>
      <exchangeSelect v-model="request.dataset.exchange"></exchangeSelect>
      <from-to></from-to>
      <div class="field is-grouped is-right">
        <p class="control">
          <a class="button" @click="runLocal">Run locally</a>
        </p>
        <p class="control">
          <a class="button" disabled @click="runServer">Run on Server</a>
        </p>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <div id="chartDiv" :chart="chart">

        </div>
      </div>
    </section>
  </div>
</template>

<script>

import * as _ from 'lodash'
//import * as TI from 'technicalindicators'
import Plotly from 'plotly.js-finance-dist'
import fromTo from '../components/backtests/fromTo'
import exchangeSelect from '../components/backtests/exchangeSelect'

export default {
  components: {
    fromTo,
    exchangeSelect
  },
  data() {
    return {
      request: {
        dataset: {
          exchange: '',
          market: '',
          interval: ''
        },
        strategy: {
          indicators: [
            {
              name: 'SMA',
              ohlcv: 'close',
              timeframe: '5m',
              settings: [
                {
                  key: 'period',
                  default: 30,
                  value: 50
                }
              ]
            },
            {
              name: 'SMA',
              ohlcv: 'close',
              timeframe: '5m',
              settings: [
                {
                  key: 'period',
                  default: 30,
                  value: 150
                }
              ]
            }
          ],
          conditions: [],
          groups: [],
          actions: []
        }
      },

      chart: {
        data: [
          {
            x: [],
            open: [],
            close: [],
            low: [],
            high: [],
            name: 'ohlc',
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            increasing: {line: {color: '#D3D3D3'}},
            decreasing: {line: {color: '#a8a8a8'}},
          }
        ],
        layout: {
          margin: {
            l: 30,
            r: 30,
            b: 50,
            t: 30,
            pad: 5
          },
          title: false,
          datarevision: null,
          dragmode: 'zoom',
          showlegend: false,
            font: {
    family: 'Inconsolata, monospace',
  },
          xaxis: {
            autorange: true,
            domain: [0, 1],
            range: [0, 1],
            rangeslider: {
              visible: false
            },
            type: 'date'
          },
          yaxis: {
            autorange: true,
            domain: [0, 1],
            range: [0, 1],
            type: 'linear'
          }
        },
        config: {
          displayModeBar: false,
          displaylogo: false,
          responsive: true
        }
      }
    }
  },
  methods: {
    runLocal: function() {
      const key = 'fdaa2d33a4cd6f3c21164f23abe8df22'
      this.$axios
        .get(
          'https://api.cloud.tyk.io/nomics/exchange_candles?' +
          'key='+ key +
          '&market=' + request.dataset.market + 
          '&exchange='+ request.dataset.exchange +
          '&interval=' + request.dataset.interval
        )
        .then(OHLCV => {
          OHLCV.data.forEach(
            function(element) {
              this.layout.datarevision = new Date().getTime()

              this.data[0].x.push(new Date(Date.parse(element.timestamp)))
              this.data[0].open.push(element.open)
              this.data[0].close.push(element.close)
              this.data[0].low.push(element.low)
              this.data[0].high.push(element.high)

              this.layout.xaxis.range = [
                new Date(Date.parse(_.head(this.data[0].x))),
                new Date(Date.parse(_.last(this.data[0].x)))
              ]

              this.layout.yaxis.range = [
                _.min(this.data[0].low),
                _.max(this.data[0].high)
              ]
            },
            { data: this.chart.data, layout: this.chart.layout }
          )

          const colors = [
            '#b565a7',
            '#5b5ea6',
            '#6b5b95',
            '#00a591',
            '#7fffd4',
            '#bc70a4',
            '#bfd641',
            '#ecdb54',
            '#f7786b'
          ]

          this.request.strategy.indicators.forEach(
            function(indicator, index) {
              let settings = indicator.settings.reduce(function(
                obj,
                setting,
                i
              ) {
                obj[setting.key] = setting.value || setting.default
                return obj
              },
              {})

              let slug =
                indicator.name +
                '(' +
                indicator.ohlcv.split('')[0] +
                ',' +
                indicator.settings
                  .map(function(s) {
                    return s.value || s.default
                  })
                  .join(',') +
                ').' +
                indicator.timeframe
              settings.values = this.chart.data[0][indicator.ohlcv].map(
                function(val) {
                  return parseFloat(val)
                }
              )
              this.chart.data[index + 1] = {
                x: this.chart.data[0].x,
                y: [],
                line: { color: colors[index], width: 1, shape: 'line' },
                name: slug
              }
              this.chart.data[index + 1].y = TI[indicator.name].calculate(
                settings
              )
            },
            { chart: this.chart }
          )
        })
    },
    runServer: function() {}
  },

  mounted() {
    Plotly.plot(
      'chartDiv',
      this.chart.data,
      this.chart.layout,
      this.chart.config
    )
  },

  watch: {
    chart: {
      handler: function() {
        Plotly.react(
          'chartDiv',
          this.chart.data,
          this.chart.layout,
          this.chart.config
        )
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
