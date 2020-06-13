<template>
    <div class='activityCreateForm'>
        <a class='button is-primary is-block is-alt is-large' v-if='!isFormDisplayed' @click='showForm'>New Activity</a>

        <div class='create-form' v-else>
            <h2>Create Activity</h2>
            <form>
                <div class='field'>
                    <label class='label'>Title</label>
                    <div class='control'>
                        <input class='input' type='text' placeholder='Enter the title' v-model='newActivity.title'/>
                    </div>
                </div>
                <div class='field'>
                    <label class='label'>Notes</label>
                    <div class='control'>
                        <textarea class='textarea' placeholder='Write some notes here.'
                                  v-model='newActivity.notes'></textarea>
                    </div>
                </div>
                <div class='field'>
                    <label class='label'>Category</label>
                    <div class='control'>
                        <select class="select" v-model="newActivity.category">
                            <option value="" disabled>Please Select One</option>
                            <option v-for="category in categories" :key="category.id" :value='category.id'>
                                {{ category.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class='field is-grouped'>
                    <div class='control'>
                        <button class='button is-link' :disabled='!isFormValid' @click.prevent='createActivity'>
                            Create Activity
                        </button>
                    </div>
                    <div class='control'>
                        <button class='button is-text' @click.prevent='hideForm'>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import store from '../store'
export default {
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isFormDisplayed: false,
      newActivity: {
        title: '',
        notes: '',
        category: ''
      }
    }
  },
  computed: {
    isFormValid () {
      return this.newActivity.title && this.newActivity.notes && this.newActivity.category
    }
  },
  methods: {
    showForm (event) {
      event.preventDefault()
      this.isFormDisplayed = true
    },
    hideForm (event) {
      event.preventDefault()
      this.isFormDisplayed = false
    },
    resetActivityForm () {
      this.newActivity.title = ''
      this.newActivity.notes = ''
      this.newActivity.category = ''
    },
    createActivity () {
      store.createActivity({ ...this.newActivity })
        .then(activity => {
          this.resetActivityForm()
          this.isFormDisplayed = false
        })
    }
  }
}
</script>

<style>

</style>
