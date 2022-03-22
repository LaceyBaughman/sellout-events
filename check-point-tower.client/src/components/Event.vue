<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <img class="card-img-top" :src="event.coverImg" />
  </router-link>
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
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    return {
      events: computed(() => AppState.events),
      types: computed(() => Appstate.types),


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
