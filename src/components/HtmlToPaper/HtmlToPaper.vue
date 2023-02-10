<template>
    <div>
      <button @click="print">Print 출력</button>
      </div>
</template>

<script>
import VueHtmlToPaper from "vue-html-to-paper";

export default {
  data() {
    return {
      output: null,
    };
  },
  methods: {
    async print() {
      // Pass the element id here
      await this.$htmlToPaper("printMe");
    },

    // print: function () {
    //   VueHtmlToPaper("print_area"); /** Error occurs here */
    // },
  },
};
</script>
