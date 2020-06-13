<template>
    <div id="app">
        <nav class="navbar is-white topNav">
            <div class="container">
                <div class="navbar-brand">
                    <h1>{{ fullAppName }}</h1>
                </div>
            </div>
        </nav>
        <Navbar :filter="filter" @changeFilter="changeFilter"/>
        <section class="container">
            <div class="columns">
                <div class="column is-3">
                    <ActivityCreateForm :categories="categories"/>
                </div>
                <div class="column is-9">
                    <div class="box content" :class="{fetching: isFetching, 'has-error': error}">
                        <div v-if="error">
                            {{ error }}
                        </div>
                        <div v-else>
                            <div v-if='isFetching'>Loading...</div>
                            <div v-if="isDataLoaded">
                                <ActivityItem v-for="activity in filteredActivities" :key="activity.id" :activity="activity"
                                              :categories="categories" :user="user">
                                </ActivityItem>
                            </div>
                            <div v-if='!isFetching'>
                                <div class="activity-length">Currently {{ activitiesLength }} activities</div>
                                <div class="activity-motivation">{{ activitiesMotivation }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import store from './store'
import ActivityItem from './components/ActivityItem'
import ActivityCreateForm from './components/ActivityCreateForm'
import Navbar from './components/Navbar'
import fakeAPI from './lib/fakeAPI'

export default {
  name: 'app',
  components: {
    ActivityItem,
    ActivityCreateForm,
    Navbar
  },
  data: function () {
    const { state: { activities, categories, user } } = store
    return {
      creator: 'Dilmurod Valiev',
      appName: 'Activity Planner',
      isFetching: false,
      error: null,
      user: user,
      activities: activities,
      categories: categories,
      filter: 'all'
    }
  },
  computed: {
    fullAppName () {
      return this.appName + ' by ' + this.creator
    },
    activitiesLength () {
      return Object.keys(this.filteredActivities).length
    },
    categoriesLength () {
      return Object.keys(this.categories).length
    },
    activitiesMotivation () {
      if (this.activitiesLength && this.activitiesLength < 5) {
        return 'Nice to see some activities (:'
      } else if (this.activitiesLength >= 5) {
        return 'So many activities! Good Job!'
      } else {
        return 'No activities! So sad!'
      }
    },
    isDataLoaded () {
      return this.activitiesLength && this.categoriesLength && !this.isFetching
    },
    filteredActivities () {
      let filteredActivities = {}
      let progress = 0

      if (this.filter === 'all') {
        filteredActivities = this.activities
      } else if (this.filter === 'not-started') {
        Object.keys(this.activities).forEach(key => {
          progress = parseInt(this.activities[key].progress)
          if (progress === 0) {
            filteredActivities[key] = this.activities[key]
          }
        })
      } else if (this.filter === 'in-progress') {
        Object.keys(this.activities).forEach(key => {
          progress = this.activities[key].progress
          if (progress > 0 && progress < 100) {
            filteredActivities[key] = this.activities[key]
          }
        })
      } else if (this.filter === 'finished') {
        Object.keys(this.activities).forEach(key => {
          progress = parseInt(this.activities[key].progress)
          if (progress === 100) {
            filteredActivities[key] = this.activities[key]
          }
        })
      }

      return filteredActivities
    }
  },
  created () {
    this.isFetching = true
    fakeAPI.initializeDataInLocalStorage()

    store.fetchActivities()
      .then(activities => {
        this.isFetching = false
      })
      .catch(error => {
        this.isFetching = false
        this.error = error
      })
    store.fetchCategories()
      .then(categories => {
      })
      .catch(error => {
        this.isFetching = false
        this.error = error
      })
    store.fetchUser()
      .then(user => {
      })
      .catch(error => {
        this.isFetching = false
        this.error = error
      })
  },
  methods: {
    changeFilter (filter) {
      this.filter = filter
    }
  }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    html,
    body {
        font-family: "Open Sans", serif;
        background: #f2f6fa;
    }

    footer {
        background-color: #f2f6fa !important;
    }

    .fetching {
        border: 2px solid orange;
    }

    .has-error {
        border: 2px solid red;
    }

    .activity-motivation {
        float: right;
    }

    .activity-length {
        display: inline-block;
    }

    .topNav {
        border-top: 5px solid #3498db;
    }

    .topNav .container {
        border-bottom: 1px solid #e6eaee;
    }

    .container .columns {
        margin: 3rem 0;
    }

    .navbar-menu .navbar-item {
        padding: 0 2rem;
    }

    aside.menu {
        padding-top: 3rem;
    }

    aside.menu .menu-list {
        line-height: 1.5;
    }

    aside.menu .menu-label {
        padding-left: 10px;
        font-weight: 700;
    }

    .button.is-primary.is-alt {
        background: #00c6ff;
        background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
        background: linear-gradient(to bottom, #0072ff, #00c6ff);
        font-weight: 700;
        font-size: 14px;
        height: 3rem;
        line-height: 2.8;
    }

    .media-left img {
        border-radius: 50%;
    }

    .media-content p {
        font-size: 14px;
        line-height: 2.3;
        font-weight: 700;
        color: #8f99a3;
    }

    article.post {
        margin: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e6eaee;
    }

    article.post:last-child {
        padding-bottom: 0;
        border-bottom: none;
    }

    .menu-list li {
        padding: 5px;
    }

    .navbar-brand > h1 {
        font-size: 31px;
        padding: 20px;
    }
</style>
