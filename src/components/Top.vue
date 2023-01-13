<template>
  <div class="main">
    <div class="top">
      <div class="img">
        <div class="title">
          <div class="tip"></div>
          <h2>科学防护 共度难关</h2>
          <h4>新冠疫情实时数据动态播报</h4>
        </div>
        <img src="../assets/病毒.jpeg" alt="" />
      </div>
      <div class="box">
        <div class="detail">
          <div class="box-top">
            <div class="btn" @click="changeDetail(1)" :class="{ active: data.type === 1 }">全国疫情数据(港澳台)</div>
            <div class="btn" @click="changeDetail(2)" :class="{ active: data.type === 2 }">浙江疫情数据</div>
          </div>
          <!-- 全国 -->
          <div class="box-main" v-show="data.type === 1">
            <div class="data" v-if="chinaTotal.total">
              <span>境外输入</span>
              <span>{{ chinaTotal.total.input }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.input }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.extData">
              <span>无症状感染者</span>
              <span>{{ chinaTotal.extData.noSymptom }}</span>
              <span>较昨日:<label>+{{ chinaTotal.extData.incrNoSymptom }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>现有确诊</span>
              <span style="color: red">{{ chinaTotal.total.confirm }}</span>
              <span>较昨日:+<label>{{ chinaTotal.today.storeConfirm }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>累计确诊</span>
              <span style="color: rgb(198, 5, 5)">{{ chinaTotal.total.confirm }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.confirm }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>累计死亡</span>
              <span style="color: rgb(57, 44, 79)">{{ chinaTotal.total.dead }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.dead }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>累计治愈</span>
              <span style="color: yellowgreen">{{ chinaTotal.total.heal }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.heal }}</label></span>
            </div>
          </div>
          <!-- 浙江 -->
          <div class="box-main" v-show="data.type === 2">
            <div class="data" v-if="chinaTotal.total">
              <span>累计确诊</span>
              <span style="color: rgb(198, 5, 5)">{{ chinaTotal.total.confirm }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.confirm }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>累计死亡</span>
              <span style="color: rgb(57, 44, 79)">{{ chinaTotal.total.dead }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.dead }}</label></span>
            </div>
            <div class="data" v-if="chinaTotal.total">
              <span>累计治愈</span>
              <span style="color: yellowgreen">{{ chinaTotal.total.heal }}</span>
              <span>较昨日:<label>+{{ chinaTotal.today.heal }}</label></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <h3>中国疫情图</h3>
      <div class="map">
        <div id="map" v-show="data.mapType === 1"  :class="data.mapType ===1 ? 'to-right':'to-left'"></div>
        <div id="map2" v-show="data.mapType === 2"  :class="data.mapType ===1 ? 'to-right':'to-left'"></div>
      </div>
      <div class="btn-box">
        <div class="map-btn" @click="changeMap(1)">现有确诊</div>
        <div class="map-btn" @click="changeMap(2)">累计确诊</div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <Chart/>
      <ScrollCom :distance='100' :isScroll="true" :getList="getList">
        <List v-if="china.length > 0" :list="china" :msg="中国疫情"/>
      </ScrollCom>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { onMounted, reactive, ref, toRefs,nextTick } from "vue"
import type { IData } from "../type/index"
import { InteData, initDataFun } from "../pageJs/index"
import List from './List.vue'
import Test from './listTest.vue'
import Chart from './chart.vue'
import ScrollCom from './ScrollCom.vue'

const showDetail = ref(true)
const data = reactive(new InteData())

const changeDetail = (type: number) => {
  data.type = type
}
const changeMap = (type: number) => {
  initDataFun(data)
  nextTick(()=>{
    data.mapType = type
  })
}

const getList = ()=>{
  
}

const { chinaTotal, zjData,china } = toRefs(data)

onMounted(() => {
  initDataFun(data)
})
</script>


<style lang="scss" scoped>
@import "../css/top.scss";
</style>
