<template>
  <div class="w-1/2 rounded-lg overflow-hidden shadow-lg">
    <div class="flex w-full pt-4 pb-4 px-4 justify-between">
      <p class="font-mono text-blue-light">{{selectedStation.name}}</p>
      <p class="font-mono text-blue-light">{{currentTime | fancyTimeFormat}}</p>
    </div>
    <div class="flex w-full py-4 px-8 justify-between items-center">
      <div class="flex-col w-12">
        <div class="flex justify-center mb-4">
          <a class="cursor-pointer" @click="reload">
            <font-awesome-icon icon="sync-alt" class="text-blue-light hover:text-grey"></font-awesome-icon>
          </a>
        </div>
        <a class="cursor-pointer" @click.prevent="togglePlay(isPlaying)">
          <font-awesome-icon
            icon="play-circle"
            size="3x"
            class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
            v-if="!isPlaying"
          />
          <font-awesome-icon
            icon="pause-circle"
            size="3x"
            class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
            v-if="isPlaying"
          />
        </a>
      </div>
      <div class="flex-col justify-center">
        <a class="cursor-pointer" @click="mutedVolume(isMuted)">
          <font-awesome-icon
            icon="volume-up"
            class="text-blue-light hover:text-grey mb-2"
            v-if="!isMuted"
          ></font-awesome-icon>
          <font-awesome-icon
            icon="volume-mute"
            class="text-blue-light hover:text-grey mb-2"
            v-if="isMuted"
          ></font-awesome-icon>
        </a>
        <vue-slider @mousemove="setVolume" ref="slider" v-model="valVolume" v-bind="sliderOption"></vue-slider>
        <font-awesome-icon icon="volume-down" class="text-blue-lighter mt-2"></font-awesome-icon>
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
        width: 3,
        height: 100,
        dotSize: 16,
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
      this.audio.play().catch(function() {
        alert("Radio cannot played!");
      });
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
    this.selectedStation = this.stations[0];
  },
  mounted() {
    this.audio = new Audio();
    this.audio.src = this.selectedStation.url;
  }
};
</script>

