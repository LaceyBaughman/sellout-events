<template>
  <div class="container">
    <div class="row align-content-center shadow p-4 mt-5">
      <div class="card px-0">
        <div class="row px-0 g-0">
          <div class="col-md-4">
            <img
              :src="event.coverImg"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-4 p-4">
            <div class="card-body">
              <h5 class="card-title py-2">
                {{ event.name }} {{ event.location }} ||
                {{ event.startDate }}
              </h5>

              <p class="card-text scroller">
                {{ event.description }}
              </p>

              <p class="card-text" v-if="event.isCanceled">
                <small class="text-muted">
                  <img src="https://image.pngaaa.com/788/1603788-small.png" />
                </small>
              </p>
              <p class="card-text" v-else>
                <small class="text-muted"
                  ><b>Event Capacity:</b> {{ event.capacity }}
                  <b>Event Type:</b> {{ event.type }}</small
                >
              </p>
            </div>
          </div>
          <div class="col-md-4 scroller" v-for="c in comments" :key="c.id">
            <Comment :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/ticketsService";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService";

export default {
  name: "EventDetails",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {

        AppState.activeEvent = {};
        const eventId = AppState.events.id
        await eventsService.getEventById(route.params.id);
        await commentsService.getEventComments(route.params.id)
        await ticketsService.getEventTickets(route.params.id);
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      events: computed(() => AppState.events),
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets.sort((a, b) => b.capacity - a.capacity)),
      comments: computed(() => AppState.comments),
      hasTicket: computed(() => AppState.tickets.find((b) => b.id == AppState.account.id)),


      createTicket() {
        let myTicket = {
          accountId: AppState.account.id,
          eventId: Appstate.activeEvent.id,
          capacity: AppState.activeEvent.capacity - 1,
        }
      },
    }
  }
}
</script>


<style scoped>
.cover-img {
  max-width: 300px;
}

.scroller {
  overflow-y: scroll;
  scrollbar-color: rebeccapurple green;
  scrollbar-width: thin;
}

.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.card-img-top {
  max-height: 300px;
}
</style>