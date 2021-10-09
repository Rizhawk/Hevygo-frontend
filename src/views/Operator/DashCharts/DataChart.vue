<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>
<script>
import { getAPI } from "../../../axios-api";
export default {
  name: "DataChart",
  data() {
    return {
      labelData: [],
      revenueData: "",
      averageData: "",
      dataChartData: {},
      myChart: {},
      switch: null,
      //
      year: "",
      month: "",
      week: "",
      day: "",
      //
      value: "Year",
    };
  },
  beforeMount: function () {
    this.getData();
  },
  methods: {
    getData() {
      getAPI
        .get("/api/chart/operator_stat/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.switch == null) {
            this.labelData = this.APIData.data.annual.year;
            this.revenueData = this.APIData.data.annual.revenue;
            this.averageData = this.APIData.data.annual.average;
            this.renderChart();
          } else if (this.switch == 1) {
            this.labelData = this.APIData.data.annual[this.year]["month"];
            this.revenueData = this.APIData.data.annual[this.year]["revenue"];
            this.averageData = this.APIData.data.annual[this.year]["average"];
            this.value = `${this.year}`;
            this.myChart.destroy();
            this.renderChart();
          } else if (this.switch == 2) {
            this.labelData =
              this.APIData.data.annual[this.year][this.month]["week"];
            this.revenueData =
              this.APIData.data.annual[this.year][this.month]["revenue"];
            this.averageData =
              this.APIData.data.annual[this.year][this.month]["average"];
            this.value = `Month ${this.month} of ${this.year}`;
            this.myChart.destroy();
            this.renderChart();
          } else if (this.switch == 3) {
            this.labelData =
              this.APIData.data.annual[this.year][this.month][this.week]["day"];
            this.revenueData =
              this.APIData.data.annual[this.year][this.month][this.week][
                "revenue"
              ];
            this.averageData =
              this.APIData.data.annual[this.year][this.month][this.week][
                "average"
              ];
            this.value = `Day ${
              this.APIData.data.annual[this.year][this.month][this.week]["day"]
            }th of the Month ${this.month} of ${this.year}`;
            this.myChart.destroy();
            this.renderChart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renderChart() {
      this.dataChartData = {
        type: "bar",
        data: {
          labels: this.labelData,
          datasets: [
            {
              label: `Total Revenue of the ${this.value}`,
              data: this.revenueData,
              backgroundColor: "rgba(71, 183,132,.5)",
              borderColor: "#47b784",
              borderWidth: 3,
            },
            {
              label: `Average Revenue of the ${this.value}`,
              data: this.averageData,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      };
      const ctx = document.getElementById("myChart");
      this.myChart = new Chart(ctx, this.dataChartData);
      ctx.onclick = this.clickHandler;
    },
    clickHandler(click) {
      const points = this.myChart.getElementsAtEventForMode(
        click,
        "nearest",
        { intersect: true },
        true
      );

      if (points.length) {
        const firstPoint = points[0];
        const label = this.myChart.data.labels[firstPoint.index];
        const value =
          this.myChart.data.datasets[firstPoint.datasetIndex].data[
            firstPoint.index
          ];
        // console.log(firstPoint.index);
        // console.log(label);
        if (this.switch == null) {
          this.switch = 1;
          this.year = label;
          this.getData();
        } else if (this.switch == 1) {
          this.switch = 2;
          this.month = label;
          this.getData();
        } else if (this.switch == 2) {
          this.switch = 3;
          this.week = label;
          this.getData();
        }
      }
    },
  },
};
</script>