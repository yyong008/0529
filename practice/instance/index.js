import Vue from 'vue'

const app = new Vue({
  template: `<div>this is {{text}}</div>`,
  data: {
    text: 1
  }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
}, 1000)
