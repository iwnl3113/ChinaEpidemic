<template>
  <div class="box">
    <div @scroll="scrollEvent" ref="scrollEl" class="scroll">
      <div class="loadingBox" v-if="touchstartTitleShow">下拉刷新表格!</div>
      <div class="loadingBox" v-if="touchEndTitleShow">加载中...</div>
      <!-- 插槽 -->
      <slot></slot>
      <div v-if="!isScroll">没有更多了</div>
    </div>
  </div>
</template>
l
<script setup lang="ts">
  import { reactive, toRefs } from "@vue/reactivity";

  const props = defineProps({
      distance:Number,
      isScroll:Boolean,
      endText:{
          type:String,
          default:'没有更多了'
      }
  })

  //定义emits
  const $emits = defineEmits(["getList"])

  const data = reactive({
    scrollEl: null,
    startText: "释放可刷新",
    scrollTop: 0,
    startY: 0,
    translateY: 0,
    touchEndTitleShow: false, //手指离开屏幕显示
    touchstartTitleShow: false, //按下屏幕title显示
  });

  let { scrollEl, startText, scrollTop, startY, translateY, touchEndTitleShow, touchstartTitleShow } = toRefs(data);

  const scrollEvent =(e:any)=>{
    data.scrollTop = e.srcElement.scrollTop
    if(!props.isScroll){return}
    if(data.scrollTop + e.srcElement.offsetHeight > e.srcElement.offsetHeight - 100){
        $emits('getList')
    }
  }
</script>

<style lang="scss" scoped>
.box{
    display: flex;
    width: 100wv;
    height: 50vh;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
}
.scroll{
    overflow: auto;
}
</style>
