<template>
  <!-- <div class="row">
    <img
      class="rounded"
      :src="creator.picture"
      alt="People hugging"
      height="20"
    />
    {{ creator.name }}
  </div> -->
  <div class="row">
    {{ comments.body }}
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsService";
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
      account: computed(() => AppState.account),
      async removeComment() {
        try {
          await commentsService.removeComment(params.comment.id)
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      }

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
