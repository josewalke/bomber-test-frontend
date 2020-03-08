import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    right: {
      type: Number,
      default: 0
    },
    wrong: {
      type: Number,
      default: 0
    },
    blank: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.renderChart(
      {
        title: 'ola que hace',
        cutoutPercentage: 0,
        labels: [
          `${Math.round((this.right / this.total) * 100)}% de aciertos`,
          `${Math.round((this.wrong / this.total) * 100)}% de fallos`,
          `${Math.round((this.blank / this.total) * 100)}% sin contestar`
        ],
        datasets: [
          {
            backgroundColor: ['rgb(102,204,0)', 'rgb(255,0,0)', '#E0E0E0'],
            hoverBackgroundColor: [
              'rgb(102,204,0,0.4)',
              'rgb(255,0,0,0.4)',
              '#f3f3f3'
            ],
            borderWidth: 1,
            weight: 10,
            borderColor: ['rgb(102,204,0)', 'rgb(255,0,0)', 'rgb(224,224,224)'],
            data: [this.right, this.wrong, this.blank]
          }
        ]
      },
      {
        responsive: true,
        maintainApectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          fontColor: '#FF0000'
        },
        animation: {
          duration: 2000
        },
        tooltips: {
          backgroundColor: ['rgb(55,55,55)']
        }
      }
    )
  }
}
