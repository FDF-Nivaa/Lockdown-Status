<template>
  <li class="goal" :class="{achieved, surpassed}" :style="{'--transition-delay': `${transitionDelay}ms`}">
    <div class="goal-image-wrapper">
      <img class="goal-image" :src="`/${goal.image}`" alt="">
    </div>
    <div class="goal-text-wrapper">
      <h2 class="goal-name">{{goal.name}}</h2>
      <p class="goal-description">{{goal.description}}</p>
      <p class="goal-value">
        <span class="goal-value-inner">{{formattedValue}}</span>
        <span class="goal-value-unit">point</span>
      </p>
    </div>
  </li>
</template>

<script>
  import {formatNumber} from "../utils/format";

  export default {
    name: "Goal",
    props: {
      goal: {
        type: Object,
        required: true
      },
      nextGoal: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: 0
      },
      compareValue: {
        type: Number,
        required: true
      }
    },
    computed: {
      achieved() {
        return this.goal.value <= this.compareValue
      },
      surpassed() {
        return this.nextGoal && this.nextGoal.value <= this.compareValue
      },
      formattedValue() {
        return formatNumber(this.goal.value)
      },
      transitionDelay() {
        if (this.achieved) {
          return this.index * 1000
        }

        return 0
      }
    }
  }
</script>

<style scoped>
  .goal {
    --transition-delay: 0ms;

    position: relative;
    display: grid;
    grid-template-columns: 12em auto;
    padding: .3em;
    margin-bottom: 1.5em;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: .2em;
    box-shadow: 0 0.05em 0.15em rgba(0, 0, 0, 0.2);
    text-align: left;
    transition: all .5s ease-in-out;
    transition-delay: var(--transition-delay);
  }
  .goal::after {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('/crossout.svg') no-repeat 50% 50%;
    background-size: 80% 90%;
    opacity: 0;
    transition: all .5s ease-in-out;
    transition-delay: calc(var(--transition-delay) + 500ms);
  }

  .goal-value {
    position: absolute;
    display: grid;
    top: 50%;
    left: 6em;
    width: 5em;
    height: 5em;
    margin: 0;
    grid-template-rows: auto 1.66em .9em auto;
    text-align: center;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    text-shadow: 0 .1em .2em rgba(0, 0, 0, .2);
    background: linear-gradient(-20deg, darkgoldenrod, gold 66%, goldenrod);
    box-shadow: 0 0.05em 0.3em rgba(0, 0, 0, 0.2);
  }

  .goal-value-inner {
    display: block;
    font-size: 1.4em;
    line-height: 1em;
    font-weight: bold;
    grid-row: 2;

  }

  .goal-value-unit {
    display: block;
    grid-row: 3;
    font-size: .75em;
  }

  .goal-image {
    display: block;
    width: 100%;
  }

  .goal-text-wrapper {
    padding: 0 1.5em;
  }

  .goal-name {
    margin-bottom: .5em;
  }

  .goal:not(.achieved) {
    opacity: .5;
    transform: scale(.85);
    filter: grayscale(100%);
  }

  .goal:not(.achieved):not(:hover) {
    filter: grayscale(100%) blur(.25em);
  }

  .goal.surpassed {
    filter: grayscale(40%);
    transform: scale(.85);
  }

  .goal.surpassed::after {
    opacity: 0;
  }

  @media (max-width: 30rem) {
    .goal {
      grid-template-columns: 40% auto;
      font-size: .8125rem;
    }
    .goal-image {
      object-fit: cover;
      height: 100%;
    }
    .goal-value {
      left: 20%;
    }
  }
</style>