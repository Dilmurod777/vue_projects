import fakeAPI from '../lib/fakeAPI'
import Vue from 'vue'

const store = {
  state: {
    activities: {},
    categories: {},
    user: {}
  },
  generateUid () {
    return Math.floor(new Date() * Math.random())
  },
  fetchActivities () {
    return fakeAPI.get('activities', { force: 1 })
      .then(activities => {
        Object.keys(activities).forEach(key => {
          this.setStateElement('activities', key, activities[key])
        })
        return this.state.activities
      })
  },
  fetchCategories () {
    return fakeAPI.get('categories', { force: 1 })
      .then(categories => {
        Object.keys(categories).forEach(key => {
          this.setStateElement('categories', key, categories[key])
        })
        return this.state.categories
      })
  },
  fetchUser () {
    return fakeAPI.get('user', { force: 1 })
      .then(user => {
        Object.keys(user).forEach(key => {
          this.setStateElement('user', key, user[key])
        })
        return this.state.user
      })
  },
  createActivity (activity) {
    activity.id = this.generateUid()
    activity.progress = 0
    activity.createdAt = new Date()
    activity.updatedAt = new Date()

    return fakeAPI.post('activities', activity)
      .then(activity => {
        this.setStateElement('activities', activity.id, activity)
        return activity
      })
  },
  updateActivity (activity) {
    activity.updatedAt = new Date()

    return fakeAPI.post('activities', activity)
      .then(activity => {
        this.setStateElement('activities', activity.id, activity)
        return activity
      })
  },
  deleteActivity (activity) {
    return fakeAPI.delete('activities', activity)
      .then(activity => {
        Vue.delete(this.state.activities, activity.id)
        return activity
      })
  },
  setStateElement (resource, key, element) {
    Vue.set(this.state[resource], key, element)
  }
}

export default store
