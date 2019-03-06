<template>
  <div>
      <div id="graphPixels"></div>
    <button
      class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded ml-2"
      @click="play"
    >Play!</button>
    <button
      class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded ml-2"
      @click="pause"
    >Pause!</button>
  </div>
</template>
<script>
import "soundmanager2";
export default {
  name: "RadioGraph",
  props: {},
  data() {
    return {
      mySound: undefined
    };
  },
  beforeMount() {
    this.init();
  },
  mounted() {
    // console.log("Homina:" + this.mySound);
    this.wave();
  },
  methods: {
    init: function() {
      soundManager.setup({
        onready: function() {
          soundManager.createSound({
            id: "prambors",
            url: "http://103.226.246.58:80/masima-pramborsjakarta"
          });
        }
      });
    },
    play: function() {
      soundManager.play("prambors");
    },
    pause: function() {
      soundManager.pause("prambors");
    },
    wave: function() {
      soundManager.whilePlaying = function() {
        var gPixels = document
          .getElementById("graphPixels")
          .getElementsByTagName("div");
        var gScale = 32; // draw -32 to +32px from "zero" (i.e., center Y-axis point)
        for (var i = 0; i < 256; i++) {
          graphPixels[i].style.top =
            gScale + Math.ceil(this.waveformData.left[i] * -gScale) + "px";
        }
      };
    }
  }
};
</script>
