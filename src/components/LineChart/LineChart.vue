<script setup lang="ts">
import { computed } from "vue";
import { ChartData, ChartOptions } from "chart.js";
import { useColorSchemeStore } from "../../stores/color-scheme";
import { useDarkModeStore } from "../../stores/dark-mode";
import Chart from "../../base-components/Chart";
import { getColor } from "../../utils/colors";
import { randomNumbers } from "../../utils/helper";

const props = defineProps<{
  width?: number;
  height?: number;
  lineColor?: string;
  data_labels?: [];
  data_set: {
    target_label?: string;
    target_data: [];
    output_label?: string;
    output_data: [];
  };
}>();

const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const darkMode = computed(() => useDarkModeStore().darkMode);

const data = computed<ChartData>(() => {
  return {
    labels: props.data_labels,
    // labels: [
    //   "1월",
    //   "2월",
    //   "3월",
    //   "4월",
    //   "5월",
    //   "6월",
    //   "7월",
    //   "8월",
    //   "9월",
    //   "10월",
    //   "11월",
    //   "12월",
    // ],
    datasets: [
      {
        // label: "2023",
        // data: [220, 340, 560, 4710],
        label: props.data_set.target_label,
        data: props.data_set.target_data,
        borderWidth: 2,
        borderColor: colorScheme.value ? getColor("primary") : "",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
      {
        // label: "2022",
        // data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
        label: props.data_set.output_label,
        data: props.data_set.output_data,
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
          display: false,
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
