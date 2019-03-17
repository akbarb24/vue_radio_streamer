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
                this.valVolume = 100;
                this.changeVolume(this.valVolume);
            }
        },
        reload: function () {
            this.currentTime = 0;
            location.reload();
        },
        setStation: function(station) {
            if(this.isPlaying){
                this.pause();
            }
            this.selectStation(station);
            this.active = !this.active;
        },
        selectStation: function(station){
            this.selectedStation = station;
            this.audio.src = this.selectedStation.url;
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
        valVolume: 100,
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
    this.selectStation(stations[0]);
}

function updated() {
    this.changeVolume(this.valVolume);
}