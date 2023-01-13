<template>
  <el-table :data="list" style="width: 100%; margin-bottom: 2vh" border size="small" :cell-style="cellStyle" lazy :load="load" row-key="id" height="50vh">
    <el-table-column width="75vw" prop="name" label="地区" />
    <el-table-column width="75vw" prop="today.confirm" label="现有确诊" />
    <el-table-column width="75vw" prop="total.confirm" label="确诊" />
    <el-table-column width="75vw" prop="total.dead" label="死亡" />
    <el-table-column width="75vw" fixed="right" prop="total.heal" label="治愈" />
  </el-table>
</template>

<script setup lang="ts">
  // 声明 props
  import { color } from "echarts";
  import { onMounted, reactive, ref } from "vue";
  // 无需引入
  const props = defineProps({
    // 表格数据
    list: Array,
    msg: String,
  });

  // 修改列颜色
  const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 1) {
      return {
        color: "#ff450d",
      };
    } else if (columnIndex === 4) {
      return {
        color: "yellowgreen",
      };
    } else if (columnIndex === 3) {
      return {
        color: "#a51039",
      };
    } else if (columnIndex === 2) {
      return {
        color: "red",
      };
    }
  };

  const data = reactive({
    isShowChildren: "",
  });

  const getChowChildren = (id: string) => {
    data.isShowChildren == id ? (data.isShowChildren = "") : (data.isShowChildren = id);
  };
</script>

<style lang="scss" scoped>
  @import "../css/list.scss";
  .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
  }
  .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
  }
  :deep(.el-table__indent) {
    padding-left: 0px !important;
  }
</style>
