import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as echarts from 'echarts'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts
app.use(ElementPlus)
app.mount('#app')