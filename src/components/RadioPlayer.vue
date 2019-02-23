<template>
  <div class="w-1/2 rounded-lg overflow-hidden shadow-lg">
    <div class="flex w-full pt-4 pb-4 px-4 justify-between">
      <p class="font-mono text-teal-dark">{{selectedStation.name}}</p>
      <p class="font-mono text-teal-dark">{{currentTime | fancyTimeFormat}}</p>
    </div>
    <div class="flex w-full py-4 px-8 justify-between items-center">
      <a
        class="cursor-pointer hover:bg-teal border-4 border-white hover:border-teal rounded-full"
        @click.prevent="togglePlay(isPlaying)"
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
      <div class="flex-col w-2">
        <a class="cursor-pointer" @click="mutedVolume(isMuted)">
          <font-awesome-icon icon="volume-up" class="text-teal-dark hover:text-grey-darker mb-2" v-if="!isMuted"></font-awesome-icon>
          <font-awesome-icon icon="volume-mute" class="text-teal-dark hover:text-grey-darker mb-2" v-if="isMuted"></font-awesome-icon>
        </a>
        <input
          id="volumeSlider"
          type="range"
          orient="vertical"
          :min="minVolume"
          :max="maxVolume"
          :value="valVolume"
          step="1"
          class="h-12"
          @mousemove="setVolume"
        >
        <font-awesome-icon icon="volume-down" class="text-teal-light mt-2"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RadioPlayer",
  data() {
    return {
      audio: undefined,
      currentTime: 0,
      valVolume: 50,
      minVolume: 0,
      maxVolume: 100,
      volumeSlider: undefined,
      isMuted: false,
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
    },
    setVolume: function() {
      this.audio.volume = this.valVolume / 100;
    },
    mutedVolume: function(muted){
      console.log(muted)
      if(!muted){
        this.isMuted = true;
        this.valVolume = 0;
        this.setVolume();
      }else {
        this.isMuted = false;
        this.valVolume = 50;
        this.setVolume();
      }
    }
  },
  beforeMount() {
    this.selectedStation = this.stations[0];
  },
  mounted() {
    this.audio = new Audio();
    this.audio.src = this.selectedStation.url;

    this.volumeSlider = document.getElementById("volumeSlider");
    this.valVolume = this.volumeSlider.value;
  }
};
</script>

