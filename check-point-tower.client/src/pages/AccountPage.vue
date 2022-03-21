<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="
          col-lg-12
          post
          elevation-3
          d-flex
          justify-content-between
          profile
        "
      >
        <div class="col-lg-5 d-none d-lg-block">
          <img
            :src="account.picture"
            class="profile-img"
            style="height: 100px"
            alt=""
          />
        </div>

        <div class="col-md-5">
          <h3>{{ account.name }}</h3>

          <b>Email:</b>
          <p>{{ account.email || "Email goes here." }}</p>
        </div>

        <span v-if="account.id == profile.id">
          <button class="btn btn-primary rounded-pill">
            <i class="mdi mdi-pencil"></i></button
        ></span>

        <div
          v-if="account.id == profile.id"
          class="col-md-12 card post elevation-3"
        >
          <EventForm />
        </div>

        <div
          class="col-md-12 card post elevation-3"
          v-for="e in events"
          :key="e.id"
        >
          <Event :event="e" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { onMounted, watchEffect } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profilesService.getProfilePosts(route.params.id);
      } catch (error) {
        console.error(error);
        Pop.toast(error.message, "error");
      }
    });
    watchEffect(async () => {
      try {
        if (route.name == "Account") {
          await profilesService.getAccount(route.params.id);
        }
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.log(error);
      }
    });
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.profilePosts),

    };
  },
};
</script>


<style lang="scss" scoped>
.profile-img {
  height: 40px;
  width: 90px;
  transform: translate(270px, -80px);
  border-radius: 50%;
}
.cover-img {
  margin-top: 2em;
  max-width: 100%;
  height: auto;
  border-radius: 20px;
}
.profile {
  height: auto;
}
.post {
  background-color: rgb(255, 255, 255);
  font-family: "Poppins", sans-serif;
  padding: 2em;
  margin-top: 2em;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.primary {
  color: rgb(63, 91, 153);
}
.hoverable {
  cursor: pointer;
}
h3 {
  font-weight: 800;
}
b {
  font-weight: 900;
}
</style>








<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
