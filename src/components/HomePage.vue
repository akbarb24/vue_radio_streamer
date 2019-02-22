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
            <a class="button is-large is-rounded is-white" :disabled="isPlaying" @click.prevent="play">
              <span class="icon is-large has-text-warning">
                <i class="far fa-2x fa-play-circle"></i>
              </span>
            </a>
            <a class="button is-large is-rounded is-white" :disabled="!isPlaying" @click.prevent="pause">
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
      audio: undefined,
      isPlaying: false,
      stations: [
        {
          name: "Prambors FM",
          url: "http://103.226.246.58:80/masima-pramborsjakarta"
        }
      ]
    };
  },
  methods: {
    play: function(){
      this.isPlaying = true;
      this.audio.play();
    },
    pause: function(){
      this.isPlaying = false;
      this.audio.pause();
    }
  },
  mounted() {
    this.audio = new Audio();
    this.audio.src = this.stations[0].url;
  }
};
</script>

