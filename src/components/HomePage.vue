<template>
  <div>
    <div class="flex w-3/5 mx-auto pt-8 pb-6 border-b justify-start items-end">
      <font-awesome-icon icon="broadcast-tower" size="2x" class="mx-3 text-grey-darkest"/>
      <h2 class="font-mono text-lg text-grey-darkest">V-Radio Streamer.</h2>
    </div>
    <div class="flex w-3/5 mx-auto pt-12 justify-center items-start">
      <radio-player></radio-player>
    </div>
  </div>
</template>
<script>
import RadioPlayer from "./RadioPlayer.vue";
export default {
  name: "HomePage",
  components: {
    "radio-player": RadioPlayer
  }
};
</script>

