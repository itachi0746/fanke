<template>
  <div id="loadingPage">

    <img src="../assets/loading.gif" alt="loading">
    <div id="process">{{ per }}</div>
  </div>
</template>

<script>


  export default {
    data: function () {
      return {
        count: 0,
        per: '',
        imgObj: [
          {'pic': '01', 'src': require('@/assets/bg1.jpg')},
          {'pic': '02', 'src': require('@/assets/bg2.jpg')},
          {'pic': '03', 'src': require('@/assets/faiImg2-2.jpg')},
          {'pic': '04', 'src': require('@/assets/gift.png')},
          {'pic': '05', 'src': require('@/assets/light.png')},
          {'pic': '06', 'src': require('@/assets/title.png')},
          {'pic': '07', 'src': require('@/assets/yao.png')},
          {'pic': '08', 'src': require('@/assets/startBtn.png')},
          {'pic': '09', 'src': require('@/assets/startBtn-1.png')},
        ]
      }
    },

    mounted: function () {
      const len = this.imgObj.length;
      const imgArr = [];

      console.log('图片加载中');
      Array.from(this.imgObj).forEach((item,index) => {
//        console.log('图片加载中2');

        imgArr[index] = new Image();

        imgArr[index].src = item.src;

        imgArr[index].onerror = () => {
          console.log('图片chucuo');
          console.log(imgArr[index].src);

        };

        imgArr[index].onload = () => {
//          console.log(imgArr[index]);

          this.count++;

          this.per = Math.floor((this.count / len) * 100) + "%";

          if (this.count >= len) {
            console.log('图片加载完毕');

            setTimeout(() => {
              this.$router.replace('/home')
            }, 500)
          }
        };
      });


    }
  }
</script>

<style>
  #loadingPage {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    /*text-align: center;*/
    /*display: none;*/
  }

  #loadingPage img {
    position: absolute;
    top: -10rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  #process {
    color: white;
    width: 10rem;
    height: 5rem;
    font-size: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;

  }
</style>
