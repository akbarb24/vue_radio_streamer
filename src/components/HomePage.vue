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
          <div class="card-content">
            <a
              class="button is-large is-rounded is-white"
              :disabled="isPlaying"
              @click="playing(isPlaying)"
            >
              <span class="icon is-large has-text-warning">
                <i class="far fa-2x fa-play-circle"></i>
              </span>
            </a>
            <a
              class="button is-large is-rounded is-white"
              :disabled="!isPlaying"
              @click="playing(isPlaying)"
            >
              <span class="icon is-large has-text-warning">
                <i class="far fa-2x fa-pause-circle"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    playing: function(play) {
      this.isPlaying = !play;

      const radio_url = "http://103.226.246.58:80/masima-pramborsjakarta";
      var audio = new Audio(radio_url);

      if (this.isPlaying) {
        console.log("Playing...")
        audio.play();
      } else {
        console.log("Pause");
        // audio.pause();
      }
    }
  }
};
</script>

