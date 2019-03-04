<template>
  <div class="bg-grey-light h-screen">
    <div class="flex">
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

