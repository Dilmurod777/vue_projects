<template>
    <article class="post">
        <div class="activity-title">
            <input type="text" class="input" v-model="updatingActivity.title">
        </div>
        <div class="activity-category">
            <select class="select" v-model="updatingActivity.category">
                <option disabled>Please select one</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.text }}
                </option>
            </select>
        </div>
        <div class="control activity-notes">
            <textarea class="textarea" placeholder="Text" v-model="updatingActivity.notes"/>
        </div>
        <div class="media">
            <div class="media-left">
                <p class="image is-32x32">
                    <img src="../assets/user.png">
                </p>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <a href="#">{{ user.name }}</a> updated on {{ updatingActivity.updatedAt | prettyTime }} &nbsp;
                    </p>
                </div>
            </div>
            <div class="media-right">
                <input id="progress"
                       v-model.number="updatingActivity.progress"
                       type="range"
                       name="progress"
                       min="0" max="100" step="10">
                <label for="progress">{{ updatingActivity.progress }}%</label>
            </div>
        </div>
        <div class="activity-control">
            <a class="button is-warning" @click="updateActivity()">Commit Update</a>
            <a class="button is-danger" @click="updateActivityState()">Cancel</a>
        </div>
    </article>
</template>

<script>
import store from '../store'
import textUtility from '../mixins/textUtility'

export default {
  mixins: [textUtility],
  props: {
    categories: {
      type: Object,
      required: true
    },
    activity: {
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
      isOptionsMenuDisplayed: false,
      updatingActivity: { ...this.activity }
    }
  },
  methods: {
    updateActivity () {
      store.updateActivity(this.updatingActivity)
        .then(_ => {
          this.$emit('updateActivityState', false)
        })
    },
    updateActivityState () {
      this.$emit('updateActivityState', false)
    }
  }
}
</script>

<style scoped lang="scss">
    .activity-title {
        margin-bottom: 10px;
    }

    .activity-category {
        margin-bottom: 10px;
    }

    .activity-notes {
        margin-bottom: 10px;
    }

    .activity-settings {
        float: right;
        font-size: 22px;

        &:hover {
            cursor: pointer;
        }
    }

    .activity-control {
        margin: 20px 0 0 0;

        a {
            margin-right: 5px;
        }
    }

    .post .title {
        margin-bottom: 5px;
    }
</style>
