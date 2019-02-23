<template>
  <div class="w-1/2 rounded-lg overflow-hidden shadow-lg">
    <div class="flex w-full pt-4 pb-4 px-4 justify-between">
      <p class="font-mono text-teal-dark">{{selectedStation.name}}</p>
      <p class="font-mono text-teal-dark">{{currentTime | fancyTimeFormat}}</p>
    </div>
    <div class="flex w-full py-4 px-4">
      <a
        class="cursor-pointer hover:bg-teal border-4 border-white hover:border-teal rounded-full mx-4"
        @click.prevent="togglePlay(isPlaying)"
        alt="Play!"
      >
        <font-awesome-icon
          icon="play-circle"
          size="3x"
          class="text-teal-dark hover:text-white"
          v-if="!isPlaying"
        />
        <font-awesome-icon
          icon="pause-circle"
          size="3x"
          class="text-teal-dark hover:text-white"
          v-if="isPlaying"
        />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RadioPlayer",
  data() {
    return {
      currentTime: 0,
      audio: undefined,
      isPlaying: false,
      selectedStation: undefined,
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
    togglePlay: function(isPlaying) {
        console.log(">>"+isPlaying);
      if (!isPlaying) {
        this.play();
      } else {
        this.pause();
      }
    },
    play: function() {
      this.updateTime();
      this.isPlaying = true;
      this.audio.play();
      console.log("played");
    },
    pause: function() {
      this.isPlaying = false;
      this.audio.pause();
      console.log("paused");
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
  beforeMount() {
    this.selectedStation = this.stations[0];
  },
  mounted() {
    this.audio = new Audio();
    this.audio.src = this.selectedStation.url;
  }
};
</script>

