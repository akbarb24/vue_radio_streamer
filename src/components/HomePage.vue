<template>
  <div class="bg-grey-light h-screen">
    <div class="flex mx-auto pt-32 justify-center items-start">
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

