<template>
  <div>
    <button @click="makeExcelFile">Excel 다운로드</button>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {},
  methods: {
    makeExcelFile() {
      let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
      tab_text +=
        '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      tab_text += "<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";
      tab_text += "<x:Name>Export</x:Name>";
      tab_text +=
        "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>";
      tab_text += "</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>";
      tab_text += "<table>";
      const temp = document.getElementById("printMe").innerHTML;
      // console.log(temp)
      tab_text += temp;
      tab_text += "</table></body></html>";
      console.log(tab_text);
      const fileName = moment().format("YYYY-MM-DD_HHmmss") + "_export.xls";
      const a_tag = document.createElement("a");
      const blob = new Blob([tab_text], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      a_tag.href = window.URL.createObjectURL(blob);
      a_tag.download = fileName;
      a_tag.click();
    },
  },
};
</script>
