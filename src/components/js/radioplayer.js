import vueSlider from "vue-slider-component";
import { stations } from "./stations";
import { desktopSliderOption, mobileSliderOption } from "./slideroptions";

export default {
    name: "RadioPlayer",
    components: {
        vueSlider
    },
    data,
    mounted,
    updated,
    methods: {
        togglePlay: function (isPlaying) {
            if (!isPlaying) {
                this.play();
            } else {
                this.pause();
            }
        },
        play: function () {
            this.updateTime();
            this.isPlaying = true;
            this.audio.play();
        },
        pause: function () {
            this.isPlaying = false;
            this.audio.pause();
        },
        updateTime: function () {
            var localThis = this;
            setTimeout(
                function () {
                    localThis.currentTime = localThis.audio.currentTime;
                    localThis.updateTime();
                }.bind(this),
                1000
            );
        },
        setVolume: function () {
            this.changeVolume(this.valVolume);
        },
        changeVolume: function (value) {
            this.audio.volume = value / 100;
        },
        mutedVolume: function (muted) {
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
        reload: function () {
            this.currentTime = 0;
            location.reload();
        },
        selectStation: function(station) {
            if(this.isPlaying){
                this.pause();
            }
            this.active = !this.active;
            this.selectedStation = station;
            this.audio.src = this.selectedStation.url;
            console.log(this.audio.src);
        }
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
};

function data() {
    return {
        audio: new Audio(),
        currentTime: 0,
        valVolume: 50,
        minVolume: 0,
        maxVolume: 100,
        isMuted: false,
        isPlaying: false,
        active: false,
        selectedStation: null,
        stations,
        desktopSliderOption,
        mobileSliderOption
    };
}

function mounted() {
    this.selectedStation = stations[3];
    this.audio.src = this.selectedStation.url;
}

function updated() {
    this.changeVolume(this.valVolume);
}