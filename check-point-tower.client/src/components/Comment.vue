<template>
  {{ comment.body }}
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    return {
      comments: computed(() => AppState.comments),

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
