const data = {
  activities: {
    1546968934: {
      id: '1546968934',
      title: 'Learn Vue.js',
      notes: 'I started today and it was not good.',
      progress: 0,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    },
    1546969212: {
      id: '1546969212',
      title: 'Read Witcher Books',
      notes: 'These books are super nice',
      progress: 25,
      category: '1546969049',
      createdAt: 1546969144391,
      updatedAt: 1546969144391
    }
  },
  categories: {
    1546969049: {
      id: '1546969049',
      text: 'books'
    },
    1546969225: {
      id: '1546969225',
      text: 'movies'
    }
  },
  user: {
    name: 'Dilmurod Valiev',
    id: '-Aj34jknvncx98812'
  }
}

export default class FakeAPI {
  static initializeDataInLocalStorage () {
    if (!localStorage.getItem('activity_data')) {
      this.storeDataInLocalStorage(data)
    }
  }

  static canContinue () {
    const rndNumber = Math.floor(Math.random() * 10)
    return rndNumber > 5
  }

  static get (resource, { force = 0 }) {
    return new Promise((resolve, reject) => {
      this.asyncCall(() => {
        if (force || this.canContinue()) {
          const data = this.fetchDataFromLocalStorage()
          resolve({ ...data[resource] })
        } else {
          reject(new Error('Cannot fetch ' + resource))
        }
      })
    })
  }

  static post (resource, payload) {
    return new Promise(resolve => {
      const data = this.fetchDataFromLocalStorage()
      data[resource][payload.id] = payload
      this.storeDataInLocalStorage(data)
      resolve(payload)
    })
  }

  static delete (resource, payload) {
    return new Promise(resolve => {
      const data = this.fetchDataFromLocalStorage()
      delete data[resource][payload.id]
      this.storeDataInLocalStorage(data)
      resolve(payload)
    })
  }

  static storeDataInLocalStorage (data) {
    localStorage.setItem('activity_data', JSON.stringify(data))
  }

  static fetchDataFromLocalStorage () {
    return JSON.parse(localStorage.getItem('activity_data'))
  }

  static asyncCall (cb) {
    setTimeout(cb, 1000)
  }
}
