<template>
  <article class="goal-progress">
    <h1 class="progress-title">
      <span class="progress-title-line">I har opnået hele</span>
      <AnimatedNumber class="progress-title-value" :value="compareValue"/>
      <span class="progress-title-line">point 🥳</span>
    </h1>
    <p>
      <a href="https://xn--fdfniv-nua.dk/arrangementer/lockdown/">⬅ Tilbage til hjemmesiden</a>
    </p>
    <ul class="goal-progress-list">
      <Goal v-for="(goal, index) in goals" :goal="goal" :index="index" :compare-value="compareValue" :key="goal.value"/>
    </ul>
  </article>
</template>

<script>
  import AnimatedNumber from "./AnimatedNumber";
  import Goal from "./Goal";
  import {formatNumber} from "../utils/format";

  export default {
    name: "GoalProgress",
    components: {AnimatedNumber, Goal},
    props: {
      compareValue: {
        type: Number,
        required: true
      },
      goals: {
        type: Array,
        required: true
      }
    },
    computed: {
      formattedCompareValue() {
        return formatNumber(this.compareValue)
      }
    },
  }
</script>
<style scoped>
  .progress-title {
    font-size: 2em;
    font-weight: normal;
  }

  a {
    color: #500;
    border-bottom: .1em dotted #000;
    text-decoration: none;
  }

  @media (hover: hover) {
    a:hover {
      color: #530;
    }
  }

  .progress-title-line,
  .progress-title-value {
    display: block;
  }

  .progress-title-line {

  }

  .progress-title-value {
    font-size: 1.75em;
    line-height: 1.25em;
    font-weight: bold;
  }

  .goal-progress-list {
    list-style: none;
    padding-left: 0;
  }

</style>