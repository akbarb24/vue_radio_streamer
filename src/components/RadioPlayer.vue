<template>
  <div class="w-2/5 rounded-lg overflow-hidden shadow-lg bg-white">
    <div class="flex w-full px-8 pt-8 pb-6 border-b justify-start items-end">
      <v-icon name="broadcast-tower" scale="2" class="mx-3 text-grey-darkest"/>
      <h2 class="font-mono text-lg text-grey-darkest">V-Radio Streamer</h2>
    </div>
    <div class="flex w-full pt-4 pb-4 px-4 justify-between">
      <p class="font-mono text-blue-light">{{selectedStation.name}}</p>
      <p class="font-mono text-blue-light">{{currentTime | fancyTimeFormat}}</p>
    </div>
    <div class="flex w-full py-4 px-8 justify-between items-center">
      <div class="flex-col w-12">
        <div class="flex justify-center mb-4">
          <a class="cursor-pointer" @click="reload">
            <v-icon name="sync-alt" class="text-blue-light hover:text-grey"/>
          </a>
        </div>
        <a class="cursor-pointer" @click.prevent="togglePlay(isPlaying)">
          <v-icon
            name="play-circle"
            scale="3"
            class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
            v-if="!isPlaying"
          />
          <v-icon
            name="spinner"
            scale="3"
            pulse
            class="text-blue-light rounded-full"
            v-if="isPlaying && audio.seeking"
          />
          <v-icon
            name="pause-circle"
            scale="3"
            class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
            v-if="isPlaying && !audio.seeking"
          />
        </a>
      </div>
      <div class="flex-col justify-center">
        <vue-slider ref="slider" v-model="valVolume" v-bind="sliderOption"></vue-slider>
        <a class="cursor-pointer" @click="mutedVolume(isMuted)">
          <div class="text-blue-light hover:text-grey rounded-full h-6 w-6 p-1">
            <v-icon name="volume-up" v-if="!isMuted"/>
            <v-icon name="volume-mute" v-if="isMuted"/>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import vueSlider from "vue-slider-component";

export default {
  name: "RadioPlayer",
  components: {
    vueSlider
  },
  data() {
    return {
      audio: undefined,
      currentTime: 0,
      valVolume: 50,
      minVolume: 0,
      maxVolume: 100,
      isMuted: false,
      isPlaying: false,
      selectedStation: undefined,
      stations: [
        {
          name: "Prambors FM",
          url: "http://103.226.246.58:80/masima-pramborsjakarta"
        }
      ],
      sliderOption: {
        data: null,
        eventType: "auto",
        direction: "vertical",
        width: 5,
        height: 100,
        dotSize: 12,
        dotHeight: null,
        dotWidth: null,
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        speed: 0.5,
        disabled: false,
        piecewise: false,
        usdKeyboard: false,
        enableCross: true,
        piecewiseStyle: false,
        piecewiseLabel: false,
        tooltip: "false",
        tooltipDir: "top",
        reverse: false,
        data: null,
        clickable: true,
        realTime: false,
        lazy: false,
        formatter: null,
        bgStyle: null,
        sliderStyle: null,
        processStyle: {
          "background-color": "#6cb2eb"
        },
        piecewiseActiveStyle: null,
        piecewiseStyle: null,
        tooltipStyle: null,
        labelStyle: null,
        labelActiveStyle: null
      }
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
    },
    setVolume: function() {
      this.changeVolume(this.valVolume);
    },
    changeVolume: function(value) {
      this.audio.volume = value / 100;
    },
    mutedVolume: function(muted) {
      console.log(muted);
      if (!muted) {
        this.isMuted = true;
        this.valVolume = 0;
        this.changeVolume(this.valVolume);
      } else {
        this.isMuted = false;
        this.valVolume = 50;
        this.changeVolume(this.valVolume);
      }
    },
    reload: function() {
      this.currentTime = 0;
      location.reload();
    }
  },
  beforeMount() {
    this.audio = new Audio();
    this.selectedStation = this.stations[0];
  },
  mounted() {
    this.audio.src = this.selectedStation.url;
  },
  updated() {
    this.changeVolume(this.valVolume);
    console.log(this.audio.seeking);
  }
};
</script>

