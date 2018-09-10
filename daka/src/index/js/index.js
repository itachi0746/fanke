new Vue(
  {
    el: '#carousel',
    data() {
      return {
        items: [
          {
            'src': 'img/p1.png',
            'id': 1,
            'link': '1'
          },
          {
            'src': 'img/p2.png',
            'id': 2,
            'link': '2'
          },
          {
            'src': 'img/p3.png',
            'id': 3,
            'link': '3'
          },
          {
            'src': 'img/g2.png',
            'id': 4,
            'link': '4'
          }
        ]
      };
    },
    methods: {
      clickCarousel(e) {
        // console.log(1)
        console.log(e.currentTarget.id)

      }

    },
  }
);

new Vue(
  {
    el: '#ABox',
    data() {
      return {

        acts: [
          {
            'id': 1,
            'name': '足球场亲子社交活动介绍',
            'link': ''
          },
          {
            'id': 2,
            'name': '7天打卡活动介绍',
            'link': ''
          }
        ]
      };
    },
    methods: {
      clickAct(e) {
        // console.log(2)
        console.log(e.currentTarget.id)

      }
    }
  }
);