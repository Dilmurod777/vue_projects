<template>
    <nav class="navbar is-white">
        <div class="container">
            <div class="navbar-menu is-active">
                <div class="navbar-start">
                    <a class="navbar-item" :class="{'is-active': filter==='all'}" @click="changeFilter('all')">All</a>
                    <a class="navbar-item" :class="{'is-active': filter==='not-started'}" @click="changeFilter('not-started')">Not Started</a>
                    <a class="navbar-item" :class="{'is-active': filter==='in-progress'}" @click="changeFilter('in-progress')">In Progress</a>
                    <a class="navbar-item" :class="{'is-active': filter==='finished'}" @click="changeFilter('finished')">Finished</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    changeFilter (filter) {
      this.$emit('changeFilter', filter)
    }
  }
}
</script>

<style lang="stylus">

</style>
