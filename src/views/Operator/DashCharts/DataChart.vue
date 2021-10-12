<template>
  <div>
    <div class="row my-3">
      <div class="col-md-4">
        <div class="text-start">
          <v-btn
            v-if="this.switch != 0"
            x-small
            elevation="5"
            rounded
            @click.prevent="drillBack"
            ><v-icon x-small left>mdi-arrow-left</v-icon> Back</v-btn
          >
        </div>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <div class="text-end">
          <v-btn-toggle dense rounded color="#47b784">
            <v-btn x-small elevation="5" dense @click="switchType(0)">Bar</v-btn
            ><v-btn x-small elevation="5" dense outlined @click="switchType(1)"
              >Line</v-btn
            ></v-btn-toggle
          >
        </div>
      </div>
    </div>
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
      switch: 0, // Variable to controll the Drilldown flow of the chart.
      chartType: "bar",
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
      // Api call, which return chart data in json format.
      getAPI
        .get("/api/chart/operator_stat/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.switch == 0) {
            //Data of the chart by default/Chart Intialization.
            this.labelData = this.APIData.data.annual.year;
            this.revenueData = this.APIData.data.annual.revenue;
            this.averageData = this.APIData.data.annual.average;
            this.renderChart(); // Fucntion call to render chart.
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
            this.value = `${
              this.APIData.data.annual[this.year][this.month][this.week]["day"]
            }th Week of the Month ${this.month} of ${this.year}`;
            this.myChart.destroy();
            this.renderChart();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renderChart() {
      // Function, which defining and rendering the chart.
      this.dataChartData = {
        type: this.chartType,
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
      ctx.onclick = this.clickHandler; // Fucntion call, when the user click on the chart element.
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
        //Condition to check the Drilldown stage.
        if (this.switch == 0) {
          this.switch = 1; // On the first click.
          this.year = label;
          this.getData();
        } else if (this.switch == 1) {
          this.switch = 2; // On the second click.
          this.month = label;
          this.getData();
        } else if (this.switch == 2) {
          this.switch = 3; // On the third click.
          this.week = label;
          this.getData();
        }
      }
    },
    drillBack() {
      // Function handling the Drill back.
      this.switch -= 1;
      this.myChart.destroy();
      this.getData();
    },
    switchType(value) {
      // Fucntion for performing the type switching of chart.
      if (value == 0) {
        this.chartType = "bar";
        this.myChart.destroy();
        this.getData();
      } else if (value == 1) {
        this.chartType = "line";
        this.myChart.destroy();
        this.getData();
      }
    },
  },
};
</script>
