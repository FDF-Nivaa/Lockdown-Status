<template>
  <span class="animated-number">{{ formattedDisplayValue }}</span>
</template>

<script>
  import { Circular as ease } from 'easing-functions'
  import { formatNumber } from '../utils/format'

  export default {
    name: 'AnimatedNumber',
    props: {
      value: {
        type: Number,
        required: true,
      },
      initialValue: {
        type: Number,
        default: 0,
      },
      animationThreshold: {
        type: Number,
        default: 1,
      },
      decimals: {
        type: Number,
        default: 0,
      },
      duration: {
        type: Number,
        default: 1500,
      },
      ease: {
        type: String,
        default: 'in-out',
        validator: value => ['linear', 'in', 'out', 'in-out'].includes(value),
      },
    },
    data() {
      return {
        animationFrameRequest: null,
        animationStartTime: 0,
        oldDisplayValue: this.initialValue,
        displayValue: this.initialValue,
      }
    },
    computed: {
      /**
       * Formats the display value to match the current locale
       */
      formattedDisplayValue() {
        return formatNumber(this.displayValue)
      },
    },
    watch: {
      /**
       * Start the animation every time the value changes
       */
      value(newValue, oldValue) {
        if (!this.animationFrameRequest && Math.abs(oldValue - newValue) <= this.animationThreshold) {
          this.oldDisplayValue = this.displayValue = newValue
        } else {
          this.startAnimation()
        }
      },
    },
    methods: {
      /**
       * Stops the current animation at its current position
       */
      stopAnimation() {
        cancelAnimationFrame(this.animationFrameRequest)
      },

      /**
       * Starts an animation animating from `displayValue` to `value`
       */
      startAnimation() {
        // Make sure any old animation is stopped
        this.stopAnimation()

        // Store the old display value, so that we know where to animate from
        this.oldDisplayValue = this.displayValue

        // Reset the animation start time to let the animation tick function know that a new animation has started
        this.animationStartTime = 0

        // Start the animation by performing the first tick
        this.animationTick(this.animationStartTime)
      },

      /**
       * Performs a single frame of the animation based on the given timestamp
       * @param {number} timestamp
       */
      animationTick(timestamp) {
        // If no animation start time is set, we know it's a new animation
        // and we have to store the current timestamp as the start time
        if (this.animationStartTime === 0) {
          this.animationStartTime = timestamp
        }

        // Calculate where in the animation we are as a number between 0 and 1.
        const animationPercentage = this.applyEasing(
          Math.min(
            (timestamp - this.animationStartTime) / this.duration,
            // We have to make sure the number never exceeds 1 in case of animation timer overshoot.
            1
          )
        )

        // Calculate the difference between the old and the new value
        const valueDiff = this.value - this.oldDisplayValue

        // Apply the product of the animation percentage and value diff
        // to the old display value to get a new display value
        this.displayValue = this.oldDisplayValue + animationPercentage * valueDiff

        // Request a new animation frame if the animation should still be running
        if (timestamp < this.animationStartTime + this.duration) {
          this.animationFrameRequest = requestAnimationFrame(this.animationTick.bind(this))
        } else {
          // Reset the animation frame request variable for good measures
          this.animationFrameRequest = null
        }
      },

      /**
       * Applies the current easing method to the given value
       * @param {number} value
       * @returns {number}
       * @throws an error if no valid easing method is provided
       */
      applyEasing(value) {
        switch (this.ease) {
          case 'linear':
            return value
          case 'in':
            return ease.In(value)
          case 'out':
            return ease.Out(value)
          case 'in-out':
            return ease.InOut(value)
          default:
            throw `Unknown easing method: ${value}`
        }
      },
    },

    /**
     * Start the animation timer when mounted
     */
    mounted() {
      this.startAnimation()
    },

    /**
     * Stops the animation timer before the component is destroyed
     */
    beforeDestroy() {
      this.stopAnimation()
    },
  }
</script>

<style scoped>
  .animated-number {
    font-variant-numeric: tabular-nums;
  }
</style>
