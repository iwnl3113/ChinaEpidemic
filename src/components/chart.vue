<template>
  <div id="main"></div>
</template>

<script setup lang="ts">
  import axios from "axios";
  import { defineComponent, nextTick, onMounted, getCurrentInstance, reactive, toRaw } from "vue";
  const { proxy } = getCurrentInstance() as any;
  var option = {
    title: {
      text: "浙江省疫情数据",
      left: "2%",
      color: "rgb(145, 19, 19)",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: [],
      textStyle: {
        fontSize: 10,
        fontWeight: "bolder",
      },
      top: "8%",
    },
    grid: {
      top: "20%",
      left: "2%",
      right: "4%",
      bottom: "2%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          show: true,
          interval: 1,
          textStyle: {
            fontSize: "10",
          },
        },
        boundaryGap: false,
        data: [],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name:"",
        type: "line",
        data:[],
      },
    ],
  };
  onMounted(() => {
    axios("/api/ug/api/wuhan/app/data/list-total?t=330415245809")
      .then((result) => {
        var data = {
          china: [],
          zjData: [],
          area: [],
          xAxis: [],
          yAxis: [],
          confirm: [],
        };
        data.china = result.data.data.areaTree.find((v) => v.id === "0").children;
        data.zjData = data.china.find((v) => v.id === "330000").children;
        data.area = data.zjData.map((item) => {
          return item.name;
        });
        data.confirm = data.zjData.map((item) => {
          return item.total.confirm;
        });
        console.log(data.confirm);

        console.log(data.area);

        // 渲染后台数据
        nextTick(() => {
          const chartDom = <HTMLElement>document.getElementById("main");
          const myChart = proxy.$echarts.init(chartDom);
          //给图标标题赋值
          option.legend.data = data.area;
          //读取横坐标值
          option.xAxis[0].data = data.area;
          //series数据
          option.series.data = data.confirm;
          console.log(option.series.data);
          //   for (let i = 0; i < series_arr.length; i++) {
          //     option.series[i] = data.confirm[i];
          //   }
          let seriesList: { name: string; value: any; }[] = []
          data.zjData.map((v:any)=>{
              seriesList.push({
                  name:v.name,
                  value:v.total.confirm | 0
              })
          })
          console.log('@@');
          console.log(seriesList);
          
          myChart.setOption({
              ...option,
              series:{
                  name:'',
                  type:"line",
                  data:seriesList
              }
          });
          window.onresize = function () {
            myChart.resize();
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
</script>

<style lang="scss" scoped>
  #main {
    margin-bottom: 2vh;
    width: 100vw;
    height: 50vh;
  }
</style>
