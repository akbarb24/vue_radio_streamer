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
            desktopSliderOption: {
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
            },
            mobileSliderOption: {
                data: null,
                eventType: "auto",
                direction: "horizontal",
                width: 300,
                height: 10,
                dotSize: 30,
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
    }
};