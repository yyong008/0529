export default {
  updateCountAsync (store, data) {
    console.log('asdasdfsdf')
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
