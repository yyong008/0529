<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}}</p>
    <!-- <p>{{testA}}---{{textPlus}} ---{{textC}}</p>-->
    <router-link to="/app">app</router-link>
    <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
        <router-view />
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'Jokcy\'s TOdo App'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  // mounted () {
  // console.log(this.$store/* , this['a/textPlus'] */)
  // // let i = 1
  // this.updateCountAsync({
  //   num: 5,
  //   time: 2000
  // })
  // this.updateText('123d')
  // 具有命名空间的使用方法
  // this['b/testAction']()
  // this.$store.state.count = '能在外面改数据'
  // setInterval(() => {
  //   console.log(123)
  //   this.updateCount({ num: i++, num2: 2 })
  // }, 1000)
  // },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync'])
  },
  computed: {
    // testA () {
    //   return this.$store.state.b.text
    // },
    ...mapState({
      counter: state => state.count
      // testA: state => state.a.text,
      // textC: state => state.c.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      'fullName': 'fullName'
      // textPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>
