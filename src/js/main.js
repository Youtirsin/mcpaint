var vm = new Vue({
    el: "#container",
    data: {
        active: false,
        startpos: [0, 0],
        endpos: [0, 0],
        colors: ['red', 'orange', 'yellow', 'green', 'black', 'blue', 'purple'],
        currentColor: 'black',
        bgm:new Audio('src/stuff/bgm.flac'),
        bgmplayed:false
    },
    methods: {
        pendown: function () {
            this.active = true;
            let cxt = document.querySelector("#drawpanel canvas").getContext("2d");
            this.startpos = [event.offsetX, event.offsetY];
            cxt.moveTo(this.startpos[0], this.startpos[1]);
            if(!this.bgmplayed){
                this.bgm.play();
                this.bgm.addEventListener("ended", () => {
                    this.bgm.play();
                });
                this.bgmplayed=true;
            }
        },
        penmove: function () {
            if (this.active) {
                let cxt = document.querySelector("#drawpanel canvas").getContext("2d");
                this.endpos = [event.offsetX, event.offsetY];
                cxt.lineTo(this.endpos[0], this.endpos[1]);
                cxt.stroke();
            }
        },
        penup: function () {
            this.active = false;
        },
        clear: function () {
            let cxt = document.querySelector("#drawpanel canvas").getContext("2d");
            cxt.clearRect(0, 0, 600, 600);
            cxt.beginPath();
        }
    }
});
vm.$watch("currentColor", function (n, o) {
    let cxt = document.querySelector("#drawpanel canvas").getContext("2d");
    cxt.strokeStyle = this.currentColor;
    cxt.beginPath();
});
// var bgmplayed=false;
// var bgm=new Audio('src/stuff/bgm.flac');
// document.querySelector("body").addEventListener("mousemove",function(){
//     if(!bgmplayed){
//         bgm.play();
//         bgmplayed=true;
//     }
// });