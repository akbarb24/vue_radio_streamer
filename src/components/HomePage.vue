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
            <p>{{currentTime | fancyTimeFormat}}</p>
            <a
              class="button is-large is-rounded is-white"
              :disabled="isPlaying"
              @click.prevent="play"
            >
              <span class="icon is-large has-text-warning">
                <i class="far fa-2x fa-play-circle"></i>
              </span>
            </a>
            <a
              class="button is-large is-rounded is-white"
              :disabled="!isPlaying"
              @click.prevent="pause"
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
      currentTime: 0,
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
  filters: {
    fancyTimeFormat: function fancyTimeFormat(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    }
  },
  watch: {
    currentTime: function currentTime() {
      this.currentTime = Math.round(this.currentTime);
    }
  },
  methods: {
    play: function() {
      this.updateTime();
      this.isPlaying = true;
      this.audio.play();
    },
    pause: function() {
      this.isPlaying = false;
      this.audio.pause();
    },
    updateTime: function() {
      var localThis = this;
      setTimeout(
        function() {
          localThis.currentTime = localThis.audio.currentTime;
          localThis.updateTime();
        }.bind(this),
        1000
      );
    }
  },
  mounted() {
    this.audio = new Audio();
    this.audio.src = this.stations[0].url;
  }
};
</script>

