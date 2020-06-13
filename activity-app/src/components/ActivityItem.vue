<template>
    <div class="activity-item">
        <ActivityItemUpdate v-if="isUpdating" :activity="activity" :categories="categories" :user="user"
                            @updateActivityState="toggleUpdateState"/>
        <ActivityItemDetail v-else :activity="activity" :categories="categories" :user="user"
                            @updateActivityState="toggleUpdateState"/>
    </div>
</template>

<script>
import ActivityItemDetail from './ActivityItemDetail'
import ActivityItemUpdate from './ActivityItemUpdate'

export default {
  components: {
    ActivityItemDetail,
    ActivityItemUpdate
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    categories: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isUpdating: false
    }
  },
  methods: {
    toggleUpdateState (state) {
      this.isUpdating = state
    }
  }
}
</script>

<style scoped lang="scss">
    .activity-item {
        margin-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
