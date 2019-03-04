<template>
  <div class="w-full">
    <!-- <h1>current: {{$mq}}</h1> -->
    <!-- desktop layout -->
    <mq-layout mq="lg">
      <div
        class="w-2/5 rounded-lg overflow-hidden shadow-lg bg-white mx-auto mt-32 justify-center items-start"
      >
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
            <vue-slider ref="slider" v-model="valVolume" v-bind="desktopSliderOption"></vue-slider>
            <a class="cursor-pointer" @click="mutedVolume(isMuted)">
              <div class="text-blue-light hover:text-grey rounded-full h-6 w-6 p-1">
                <v-icon name="volume-up" v-if="!isMuted"/>
                <v-icon name="volume-mute" v-if="isMuted"/>
              </div>
            </a>
          </div>
        </div>
      </div>
    </mq-layout>

    <!-- mobile layout -->
    <mq-layout :mq="['sm', 'md']">
      <div class="w-full h-screen overflow-hidden bg-white mx-auto justify-center items-start">
        <div class="flex w-full px-8 pt-8 pb-6 border-b justify-start items-end">
          <v-icon name="broadcast-tower" scale="2" class="mx-3 text-grey-darkest"/>
          <h2 class="font-mono text-lg text-grey-darkest">V-Radio Streamer</h2>
        </div>
        <div class="flex w-full pt-4 pb-4 px-4 justify-between">
          <p class="font-mono text-blue-light">{{selectedStation.name}}</p>
          <p class="font-mono text-blue-light">{{currentTime | fancyTimeFormat}}</p>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="flex w-full py-4 px-8 items-end">
          <div class="flex-col w-12 justify-center ">
            <div class="flex justify-center mb-4">
              <a class="cursor-pointer" @click="reload">
                <v-icon name="sync-alt" scale="2" class="text-blue-light hover:text-grey"/>
              </a>
            </div>
            <a class="cursor-pointer" @click.prevent="togglePlay(isPlaying)">
              <v-icon
                name="play-circle"
                scale="5"
                class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
                v-if="!isPlaying"
              />
              <v-icon
                name="spinner"
                scale="5"
                pulse
                class="text-blue-light rounded-full"
                v-if="isPlaying && audio.seeking"
              />
              <v-icon
                name="pause-circle"
                scale="5"
                class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
                v-if="isPlaying && !audio.seeking"
              />
            </a>
          </div>
        </div>
        <div class="flex justify-center h-24 p-12 border-t">
          <div class="h-full items-center">
            <vue-slider ref="slider" v-model="valVolume" v-bind="mobileSliderOption"></vue-slider>
          </div>
          <div class="h-full items-center ml-6">
            <a @click="mutedVolume(isMuted)">
              <div class="text-blue-light active:text-grey rounded-full">
                <v-icon name="volume-up" scale="3" v-if="!isMuted"/>
                <v-icon name="volume-mute" scale="3" v-if="isMuted"/>
              </div>
            </a>
          </div>
        </div>
      </div>
    </mq-layout>
    <!-- until here -->
  </div>
</template>
<script src="./js/radioplayer.js"/>

