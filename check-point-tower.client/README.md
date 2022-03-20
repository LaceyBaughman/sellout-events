 <div class="col d-flex justify-content-around">
          <button class="btn btn-color" onclick="filter('priority')">Priority</button>
          <button class="btn btn-color" onclick="filter('heavy')">Heavy</button>
          <button class="btn btn-color" onclick="filter('fragile')">Fragile</button>
          <button class="btn btn-color" onclick="filter('brand')">Brand</button>

          function filter(filteredProperty) {
  let lostPackage = packages.find(package => package.lost)
  search = search.filter(package => package[filteredProperty] === lostPackage[filteredProperty])
  draw()
}




<button
          @click="changePage(older)"
          class="btn btn-outline-danger me-2"
          :class="{disabled: !older}"
          :disabled="!older"
        >
          Older Posts
        </button>
        <button
          v-if="newer"
          @click="changePage(newer)"
          class="btn btn-outline-danger"

        >
          Newer Posts
        </button>

