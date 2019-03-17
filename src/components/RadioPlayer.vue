<template>
  <div class="w-full">
    <!-- desktop layout -->
    <mq-layout mq="lg">
      <div
        class="w-2/5 rounded-lg overflow-hidden shadow-lg bg-white mx-auto mt-32 justify-center items-start"
      >
        <div class="flex w-full px-8 pt-8 pb-6 border-b-2 justify-start items-end">
          <v-icon name="broadcast-tower" scale="2" class="mx-3 text-grey-darkest"/>
          <h2 class="font-mono text-xl text-grey-darkest">V-Radio Streamer</h2>
        </div>
        <div>
          <div class="tab__header">
            <a
              href="#"
              class="tab__link p-4 block bg-white no-underline border-b-2 border-white flex justify-between"
              @click.prevent="active = !active"
            >
              <v-icon name="bars" scale="2" v-show="!active" class="text-blue-light"/>
              <v-icon name="times" scale="2" v-show="active" class="text-blue-light"/>
              <p class="font-mono text-lg text-blue-light">{{selectedStation.name}}</p>
              <p class="font-mono text-lg text-blue-light">{{currentTime | fancyTimeFormat}}</p>
            </a>
          </div>
          <div class="tab__content overflow-auto h-48 shadow-inner" v-show="active" :class="active ? ['border-b', 'border-t'] : ''">
            <a
              href="#"
              class="tab__link p-4 block no-underline bg-grey-lightest hover:bg-grey-lighter border-b-2 border-white flex font-mono text-lg text-blue-light"
              @click="selectStation(s)"
              v-for="s in stations"
            >{{s.name}}</a>
          </div>
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
                v-if="isPlaying && audio.paused"
              />
              <v-icon
                name="pause-circle"
                scale="3"
                class="text-blue-light hover:text-white hover:bg-blue-light rounded-full border-white border-2 hover:border-blue-light"
                v-if="isPlaying && !audio.paused"
              />
            </a>
          </div>
          <div class="flex-col justify-center py-4">
            <vue-slider ref="slider" v-model="valVolume" v-bind="desktopSliderOption"></vue-slider>
            <a class="cursor-pointer" @click="mutedVolume(isMuted)">
              <div class="text-blue-light hover:text-grey rounded-full h-6 w-6 p-1">
                <v-icon scale="2" name="volume-up" v-if="!isMuted"/>
                <v-icon scale="2" name="volume-mute" v-if="isMuted"/>
              </div>
            </a>
          </div>
        </div>
      </div>
    </mq-layout>

    <!-- mobile layout -->
    <mq-layout :mq="['sm', 'md']">
      <div class="w-full h-screen overflow-hidden bg-white mx-auto justify-center">
        <div class="flex w-full px-8 pt-8 pb-6 border-b justify-between items-end">
          <v-icon name="broadcast-tower" scale="3" class="mx-3 text-grey-darkest"/>
          <h2 class="font-mono text-xl text-grey-darkest">V-Radio Streamer</h2>
        </div>
        <div>
          <div class="tab__header">
            <a
              href="#"
              class="tab__link p-4 block bg-white no-underline border-b-2 border-white flex justify-between"
              @click.prevent="active = !active"
            >
              <v-icon name="bars" scale="2" v-show="!active" class="text-blue-light"/>
              <v-icon name="times" scale="2" v-show="active" class="text-blue-light"/>
              <p class="font-mono text-lg text-blue-light">{{selectedStation.name}}</p>
              <p class="font-mono text-lg text-blue-light">{{currentTime | fancyTimeFormat}}</p>
            </a>
          </div>
          <div class="tab__content overflow-auto h-48 shadow-inner" v-show="active" :class="active ? ['border-b', 'border-t'] : ''">
            <a
              href="#"
              class="tab__link p-4 block no-underline bg-grey-lightest hover:bg-grey-lighter border-b-2 border-white flex font-mono text-lg text-blue-light"
              @click="selectStation(s)"
              v-for="s in stations"
            >{{s.name}}</a>
          </div>
        </div>
        <div class="z-0 flex w-full h-full"></div>
        <div class="z-10 sticky pin-b">
          <div class="flex w-full items-end justify-center pb-6">
            <a class="cursor-pointer" @click="reload">
              <v-icon name="sync-alt" scale="2" class="text-blue-light"/>
            </a>
          </div>
          <div class="flex w-full items-end justify-center pb-6">
            <a class="cursor-pointer" @click.prevent="togglePlay(isPlaying)">
              <v-icon
                name="play-circle"
                scale="5"
                class="text-blue-light rounded-full border-white border-2"
                v-if="!isPlaying"
              />
              <v-icon
                name="spinner"
                scale="5"
                pulse
                class="text-blue-light rounded-full"
                v-if="isPlaying && audio.paused"
              />
              <v-icon
                name="pause-circle"
                scale="5"
                class="text-blue-light rounded-full border-white border-2"
                v-if="isPlaying && !audio.paused"
              />
            </a>
          </div>
          <div class="flex justify-center items-center h-24 p-8 border bg-grey-lighter">
            <div class="h-full">
              <vue-slider ref="slider" v-model="valVolume" v-bind="mobileSliderOption"></vue-slider>
            </div>
            <div class="h-full ml-6">
              <a @click="mutedVolume(isMuted)">
                <div class="text-blue-light rounded-full">
                  <v-icon name="volume-up" scale="3" v-if="!isMuted"/>
                  <v-icon name="volume-mute" scale="3" v-if="isMuted"/>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </mq-layout>
    <!-- until here -->
  </div>
</template>
<script src="./js/radioplayer.js"/>

