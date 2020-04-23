<template>
  <div id="app">
    <p v-if="loading">Henter data...</p>
    <GoalProgress v-else :goals="goals" :compare-value="compareValue"/>
  </div>
</template>

<script>
  import GoalProgress from "./components/GoalProgress";

  export default {
    name: 'App',
    components: {
      GoalProgress
    },
    data() {
      return {
        compareValue: -1,
        sheetId: '1s2IkwIBHSrzTqa0pHZejYtr8cYOZ9_ZDaS9j4TfJOhw',
        loading: true,
        goals: []
      }
    },
    computed: {
      jsonPointsSheetUrl() {
        return `https://spreadsheets.google.com/feeds/list/${this.sheetId}/1/public/values?alt=json`
      },
      jsonGoalsSheetUrl() {
        return `https://spreadsheets.google.com/feeds/list/${this.sheetId}/2/public/values?alt=json`
      },
    },
    mounted() {
      return Promise.all([
        fetch(this.jsonPointsSheetUrl)
          .then(response => response.json())
          .then(data => {
            return data.feed.entry.reduce((total, entry) => {
              return total + (parseInt(entry.gsx$point.$t) || 0)
            }, 0)
          }).then((value) => {
          this.loading = false

          setTimeout(() => {
            this.compareValue = value
          })
        }),
        fetch(this.jsonGoalsSheetUrl)
          .then(response => response.json())
          .then(data => {
            return data.feed.entry.map(entry => ({
              name: entry.gsx$navn.$t,
              description: entry.gsx$beskrivelse.$t,
              image: entry.gsx$billede.$t,
              value: parseInt(entry.gsx$point.$t)
            }))
          })
          .then(goals => {
            this.goals = goals
          })
      ])
    }
  }
</script>

<style>
  body {
    background: rgb(228, 234, 243);
  }

  #app {
    font-family: "Work Sans", helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    max-width: 50em;
    margin: auto;
  }
</style>
