<script setup>
import { getParkInfoAPI } from '@/api/park'
import {ref,onMounted} from 'vue'
//1.导入echarts包
import * as echarts from 'echarts';

//2.获取要渲染的dom元素(准备好了宽高，并且已经渲染的到了页面中)
//3.把dom元素传入到echart.init() 获取echarts实例
//4.准备渲染echarts的配置项
//5.把配置传给echarts实例
  





//声明响应式数据
const parkInfo=ref({})
//分装方法调用接口
const getParkInfo=async()=>{
  const res=await getParkInfoAPI()
  // console.log(res)
  parkInfo.value=res.data
}


//渲染柱状图

const barChart=ref(null)

const initBarChart=()=>{
  const parkIncome=parkInfo.value.parkIncome
  const myChart=echarts.init(barChart.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      // 让图表占满容器
      top: '10px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
          show: false,
        },
        data: parkIncome.xMonth,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '园区年度收入',
        type: 'bar',
        barWidth: '10px',
        data: parkIncome.yIncome.map((item, index) => {
          const color =
            index % 2 === 0
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0.23, color: '#74c0f8' },
                { offset: 1, color: 'rgba(116,192,248,0.00)' },
              ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0.23, color: '#ff7152' },
                { offset: 1, color: 'rgba(255,113,82,0.00)' },
              ])
          return { value: item, itemStyle: { color } }
        }),
      },
    ],
    textStyle: {
      color: '#B4C0CC',
    },
  }
myChart.setOption(option)
}

//渲染饼状图
const pieChart=ref(null)
const initPieChart=()=>{
  const myChart=echarts.init(pieChart.value)
  const parkIndustry=parkInfo.value.parkIndustry
  const pieOption = {
    color: [
      '#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
    legend: {
      itemGap: 20,
      bottom: '0',
      icon: 'rect',
      itemHeight: 10, // 图例icon高度
      itemWidth: 10, // 图例icon宽度
      textStyle: {
        color: '#c6d1db',
      },
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '园区产业分析',
        type: 'pie',
        radius: ['55%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
        center: ['50%', '40%'], // 圆心位置， 用于调整整个图的位置
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`
          }
        },
        label: {
          show: false,
          position: 'center',
        },
        data: parkIndustry,
      },
    ],

  }
  myChart.setOption(pieOption)
}
onMounted(async()=>{
  await getParkInfo()
  initBarChart()
  initPieChart()
})
</script>






<template>
  <div class="all-charts">
    <!-- 园区概况 -->
    <div class="section-one" >
      <!-- v-if="Object.keys(parkInfo).length>0" -->
      <img class="img-header"
        src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
        alt="" />
      <div class="icons-container">
        <div class="item">
          <div class="icons-item building-icon">
            <span class="number">
              <!-- 可选链运算符 ?.-->
              <!-- parkInfo.base?.buildingTotal -->
              {{ parkInfo.base?.buildingTotal }}
            </span>
          </div>
          <span class="title">楼宇总数</span>
          <span class="unity">（栋）</span>
        </div>
        <div class="item">
          <div class="icons-item enterprise-icon">
            <span class="number">
              {{ parkInfo.base?.enterpriseTotal }}
            </span>
          </div>
          <span class="title">入驻企业总数</span>
          <span class="unity">（家）</span>
        </div>
        <div class="item">
          <div class="icons-item car-icon">
            <span class="number">
              {{ parkInfo.base?.parkingTotal}}
            </span>
          </div>
          <span class="title">车位总数</span>
          <span class="unity">（个）</span>
        </div>
        <div class="item">
          <div class="icons-item rod-icon">
            <span class="number">
              {{ parkInfo.base?.chargePoleTotal}}
            </span>
          </div>
          <span class="title">一体杆总数</span>
          <span class="unity">（个）</span>
        </div>
      </div>
    </div>
    
    <!-- 园区年度收入分析 -->
  <div class="section-two">
    <img class="img-header"
      src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
      alt="" />
    <div class="bar-chart-titile">
      <span>单位：元</span>
      <div>
        <span class="bar-icon blue-bar-icon"></span>
        <span class="bar-icon red-bar-icon"></span>
        收入情况
      </div>
    </div>
    <div class="bar-chart" ref="barChart"></div>
  </div>
  <!-- 园区产业分布 -->
<div class="section-three">
  <img class="img-header"
    src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
    alt="" />
  <div class="pie-chart" ref="pieChart"></div>
</div>
  </div>
</template>

<style>
.section-two {
    flex-basis: 35%;
    .bar-chart {
      width: 100%;
      height: calc(100% - 90px);
    }
  }
  .section-three {
    flex-basis: 40%;

    .pie-chart {
      position: relative;
      margin: 0 auto;
      padding-bottom: 20px;
      width: 80%;
      height: calc(100% - 40px);
    }
  }
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to left, rgba(0, 6, 15, 0.00) 0%, rgba(0, 6, 15, 0.00) 20%, rgba(0, 0, 0, 0.40) 30%, rgba(0, 0, 0, 0.60) 40%, rgba(1, 4, 11, 1) 70%, #04070d 100%);

  .img-header {
    height: 30px;
  }
}

.section-one {
  flex-basis: 25%;

  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 / contain;
      }

      .rod-icon {
        background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}
</style>