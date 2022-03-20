<template>
  <div class="container">
    <div class="row align-content-center bg-light shadow p-4 mt-5">
      <div class="card px-0">
        <div class="row px-0 g-0">
          <div class="col-md-4">
            <img
              :src="event.coverImg"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8 p-4">
            <div class="card-body">
              <h5 class="card-title py-2">
                {{ event.name }} || {{ event.location }}
              </h5>

              <p class="card-text">
                {{ event.description }} {{ event.type }} |
                {{ event.isCanceled }}
              </p>

              <p class="card-text">
                <small class="text-muted"
                  >{{ event.startDate }} | {{ event.capacity }}</small
                >
              </p>
            </div>
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
// import { bidsService } from "../services/BidsService";
import { useRoute } from "vue-router";
// import { Modal } from "bootstrap";
export default {
  name: "EventDetails",
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        // NOTE this first line is only to get rid of the previous car from showing up for half a second as we pick a new active car. not required to work.
        AppState.activeEvent = {};
        await eventsService.getEventById(route.params.id);
        // await bidsService.getCarBids(route.params.id);
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      events: computed(() => AppState.events),
      event: computed(() => AppState.activeEvent),
      //     bids: computed(() => AppState.bids.sort((a, b) => b.amount - a.amount)),

      //     hasBid: computed(() =>
      //       AppState.bids.find((b) => b.id == AppState.account.id)
      //     ),
      //     createBid() {

      //       let newBid = {
      //         accountId: AppState.account.id,
      //         carId: AppState.activeCar.id,
      //         amount: AppState.activeCar.price + 100,
      //       };
      //       bidsService.createBid(newBid);
      //     },
      //     openModal() {
      //       Modal.getOrCreateInstance(document.getElementById("form-modal")).show();
      //     },
      //     formatNumber(num) {
      //       const iNF = new Intl.NumberFormat("en-US");
      //       return iNF.format(num);
    }
  }
}
</script>


<style scoped>
.cover-img {
  max-width: 300px;
}
</style>