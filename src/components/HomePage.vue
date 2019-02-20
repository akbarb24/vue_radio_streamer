<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-4">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img alt="Disc" src="@/assets/disc.jpg">
            </figure>
          </div>
          <div class="card-content is-flex">
            <figure class="image is-48x48">
              <play-button></play-button>
            </figure>
            <figure class="image is-48x48">
              <pause-button></pause-button>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlayButton from "./PlayButton.vue";
import PauseButton from "./PauseButton.vue";

export default {
  name: "HomePage",
  components: {
    "play-button": PlayButton,
    "pause-button": PauseButton
  }
};
</script>

