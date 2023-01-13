import type { IData } from "../type/index";
import * as echarts from "echarts";
import axios from "axios";
import chinaJson from "../assets/china.json";
import { nextTick } from "vue";

type EChartsOption = echarts.EChartsOption;

class InteData implements IData {
  areaTree: any[] = [];
  chinaDayList: any[] = [];
  chinaTotal: any[] = [];
  china: any[] = [];
  zjData: object = {};
  type: number = 1;
  mapType: number = 1;
  lineType: number = 1;
  lastUpdateTime: string = "";
  name: string = "";
  type: number = 1;
}

const initDataFun = (data: InteData) => {
  // 地图options
  var mapDom: HTMLElement | null = document.getElementById("map");
  var mapDom2: HTMLElement | null = document.getElementById("map2");
  var optionMap: EChartsOption = {
    title: {
      subtext: "单击省份可以查看病例数",
    },
    tooltip: {
      trigger: "item",
      formatter: "现有确诊病例<br/>{b}:{c}",
    },
  };

  var series: object = {
    type: "map",
    map: "china",
    data: [],
    colorBy: "series",
    zoom: 1.5,
    top: 90,
    label: {
      show: true,
      color: "#333",
      fontSize: 11,
    },
    dataRange: {
      x: "left",
      y: "bottom",
      splitList: [
        { start: 1500 },
        { start: 900, end: 1500 },
        { start: 310, end: 1000 },
        { start: 200, end: 300 },
        { start: 10, end: 200, },
        { start: 5, end: 5, color: "black" },
        { end: 10 },
      ],
      color: ["#eee", "#949fb1", "#f3ce85"],
    },
    itemStyle: {
      areaColor: "#E74C3C", //背景色
      borderColor: "#F5B041",
      borderWidth: 0.5,
      normal: {
        label: { show: true },
        borderColor: "rgba(147, 235, 248, 1)",
        borderWidth: 1,
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(175,238,238, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(47,79,79, .1)", // 100% 处的颜色
            },
          ],
          globalCoord: true, // 缺省为 false
        },
        shadowColor: "rgba(128, 217, 248, 1)", //阴影的颜色
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
    },
  };

  var myMap = echarts.init(mapDom as HTMLElement);
  var myMap2 = echarts.init(mapDom2 as HTMLElement);
  myMap.showLoading();

  axios("/api/ug/api/wuhan/app/data/list-total?t=330415245809")
    .then((result) => {
      data.areaTree = result.data.data.areaTree;
      data.chinaDayList = result.data.data.chinaDayList;
      data.chinaTotal = result.data.data.chinaTotal;
      data.china = data.areaTree.find((v) => v.id === "0").children;
      // 浙江
      data.zjData = data.china.find((v) => v.id === "330000").children;
      
      console.log(data.china);
      

      let mapData: any[] = [];
      data.china.map((v: any) => {
        mapData.push({
          name: v.name,
          value: v.total.confirm - v.total.dead - v.total.heal || 0,
        });
      });
      myMap.hideLoading();
      echarts.registerMap("china", chinaJson as any);
      myMap.setOption({
        ...optionMap,
        series: {
          ...series,
          data: mapData,
        },
      });
      nextTick(() => {
        myMap2.showLoading();
        myMap2.resize();
        myMap2.setOption({
          ...optionMap,
          series: {
            ...series,
            data: mapData,
          },
        });
        myMap2.resize();
        myMap2.hideLoading();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { InteData, initDataFun };
