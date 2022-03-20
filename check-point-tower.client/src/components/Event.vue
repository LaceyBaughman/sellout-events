<template>
  <!-- <router-link :to="{ name: 'EventDetails', params: { id: event.id } }"> -->
  <img class="card-img-top" :src="event.coverImg" />
  <div class="card-block text-wrap">
    <h5 class="card-title">{{ event.name }} || {{ event.location }}</h5>
  </div>
  <div class="card-text ellipsis">
    {{ event.description }}
    {{ event.type }} |
    {{ event.isCanceled }}
    <hr />
    <p>
      <small class="text-muted"
        >{{ event.startDate }} | {{ event.capacity }}</small
      >
    </p>
  </div>

  <!-- </router-link> -->
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      formatNumber(num) {
        const iNF = new Intl.NumberFormat("en-US");
        return iNF.format(num);
      },
    }
  }
}

</script>


<style lang="scss" scoped>
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-img-top {
  max-height: 300px;
}
</style>
