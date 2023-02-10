<script setup lang="ts">
import { computed } from "vue";
import { ChartData, ChartOptions } from "chart.js/auto";
import { useColorSchemeStore } from "../../stores/color-scheme";
import { useDarkModeStore } from "../../stores/dark-mode";
import Chart from "../../base-components/Chart";
import { getColor } from "../../utils/colors";
import { randomNumbers } from "../../utils/helper";

const props = defineProps<{
  width?: number;
  height?: number;
  lineColor?: string;
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const data = computed<ChartData>(() => {
  return {
    labels: [
      "08시",
      "09시",
      "10시",
      "11시",
      "12시",
      "13시",
      "14시",
      "15시",
      "16시",
      "17시",
      "18시",
      "19시",
    ],
    datasets: [
      {
        label: "1시간",
        data: [0, 1, 2, 3, 4, 0, 2, 2, 3, 3, 2, 2],
        borderWidth: 2,
        borderColor: colorScheme.value ? getColor("primary") : "",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
      {
        label: "누적",
        data: [0, 1, 3, 6, 10, 10, 12, 14, 17, 20, 22, 24],
        borderWidth: 2,
        borderDash: [2, 2],
        borderColor: darkMode.value
          ? getColor("slate.400", 0.6)
          : getColor("slate.400"),
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
    ],
  };
});

const options = computed<ChartOptions>(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: getColor("slate.500", 0.8),
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: getColor("slate.500", 0.8),
        },
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          color: getColor("slate.500", 0.8),
          callback: function (value) {
            return value + "  ";
          },
        },
        grid: {
          color: darkMode.value
            ? getColor("slate.500", 0.3)
            : getColor("slate.300"),
          borderDash: [2, 2],
          drawBorder: false,
        },
      },
    },
  };
});
</script>

<template>
  <Chart
    type="line"
    :width="props.width"
    :height="props.height"
    :data="data"
    :options="options"
  />
</template>
