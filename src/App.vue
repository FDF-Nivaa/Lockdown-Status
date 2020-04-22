<template>
  <div id="app">
    <input class="fake-value-input" type="range" min="0" max="2500" v-model="compareValue">
    <GoalProgress :goals="goals" :compare-value="compareValue"/>
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
        compareValue: 75,
        goals: [
          {
            name: "Rens en bålgryde",
            description: "Vi hygger os rigtigt med at rense alle kredsens gamle bålgryder.",
            image: "bålgryde.jpg",
            value: 0
          },
          {
            name: "Sortering af telte",
            description: "Vi slår alle teltene op og pakker dem pænt ned igen.",
            image: "telte.jpg",
            value: 50
          },
          {
            name: "En tur til Hørsholm",
            image: "hørsholm.jpg",
            value: 100
          },
          {
            name: "En gakket tur om Lergraven",
            image: "tur.jpg",
            value: 200
          },
          {
            name: "Rundtur i Nivå Kirke",
            image: "kirke.jpg",
            value: 400
          },
          {
            name: "Tur til Kronborg — med is!",
            image: "is.jpg",
            value: 800
          },
          {
            name: "Hotdogs og dessert på bål",
            image: "hotdogs.jpg",
            value: 1200
          },
          {
            name: "Udendørs biograf",
            image: "biograf.jpg",
            value: 2000
          },
        ]
      }
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
