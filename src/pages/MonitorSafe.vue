<script setup lang="ts">
import _, { isArguments } from "lodash";
import { ref, Ref } from "vue";
import Button from "../base-components/Button";
import { FormInput, FormSelect, FormCheck } from "../base-components/Form";
import Lucide from "../base-components/Lucide";
import { Dialog, Menu } from "../base-components/Headless";
import Table from "../base-components/Table";
import moment from "moment";
import Print from "../components/HtmlToPaper/HtmlToPaper.vue";
import Excel from "../components/MakeExcelFile/MakeExcelFile.vue";
import Litepicker from "../base-components/Litepicker";
import { toast } from "vue3-toastify";

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import { MonitorSafe } from "../interfaces/menu/monitorInterface";

// 페이징기능
import { onMounted, watch } from "vue";
import PaginationComponent from "../components/Pagination/PaginationComponent.vue"; // 페이징설정
const currentPage = ref(1); // 현재페이지
const rowsPerPage = ref(10); // 한 페이지에 보여질 데이터 갯수

const pageChange = () => {
  // 한 페이지에 보여질 데이터 갯수 변경 시 1페이지로 이동
  currentPage.value = 1;
};

// api 보내기
const url = "/api/monitor/safe";
const {
  datas,
  dataCount,
  datasAreLoading,
  loadDatas,
  searchDatas,
  insertData,
  editData,
  deleteData,
  numberOfPages,
} = useSendApi<MonitorSafe>(url, currentPage, rowsPerPage);

const searchKey = ref("전체");
const searchInput = ref("");
onMounted(async () => {
  await loadDatas();
  if (dataCount.value > 0) {
    toast.error("안전재고 미달 " + dataCount.value + "건이 있습니다.");
  }
}); // 페이지 로딩 시 데이터 불러오기

// 조회
const search = () => {
  // console.log(searchKey.value, searchInput.value);
  searchDatas("", searchKey.value, searchInput.value);
};

// 날짜 구하기
const now = moment().format("YYYY-MM-DD");
const nowPlus = moment().add(7, "days").format("YYYY-MM-DD");
const max_year = moment().format("YYYY");
const min_year = moment().add(-3, "years").format("YYYY");
const now2 = "전체기간";

// 테이블 열 크기 조정 (안전재고 미달 통보)
const table_width = [
  "width: 50px", // 순번
  "width: 200px", // 품목코드
  "width: 150px", // 거래처명
  "width: 300px", // 품명
  "width: 300px", // 규격
  "width: 50px", // 단위
  "width: 50px", // 재고수
  "width: 50px", // 안전재고
  "width: 50px", // 부족재고수
  "width: 50px", // 안전재고보유
];
</script>

<template>
  <!-- style="height: calc(100vh - 250px)" : 브라우저 화면 창크기에 맞게 변경됨 : 100vh - 브라우저 창 크기 -->
  <div class="grid grid-cols-12 gap-1 mt-1">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 mb-2 intro-y sm:flex-nowrap"
    >
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="mr-2">
        <a href="" class="flex items-center ml-auto text-primary">
          <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
        </a>
      </div>
      <div class="ml-2">
        <FormSelect modelValue="전체" class="w-30 mt-3 !box sm:mt-0">
          <option>전체</option>
          <option>품목코드</option>
          <option>거래처명</option>
          <option>품명</option>
        </FormSelect>
      </div>
      <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-2">
        <div class="relative w-56 text-slate-500">
          <FormInput
            type="text"
            class="w-56 pr-10 !box"
            v-model="searchInput"
            @keyup.enter="
              () => {
                search();
                pageChange();
              }
            "
            placeholder="검색어를 입력해주세요"
          />
          <button
            @click="
              {
                search();
                pageChange();
              }
            "
          >
            <Lucide
              icon="Search"
              class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </button>
        </div>
      </div>
      <div class="ml-2">
        <!-- BEGIN: Pagination Pages-->
        <FormSelect
          class="w-20 mt-3 !box sm:mt-0"
          v-model="rowsPerPage"
          @change="pageChange"
        >
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </FormSelect>
        <!-- END: Pagination Pages-->
      </div>
      <div class="ml-2">
        <Menu>
          <Menu.Button :as="Button" class="px-2 !box">
            <span class="flex items-center justify-center w-5 h-5">
              <Lucide icon="MoreVertical" class="w-4 h-4" />
            </span>
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item>
              <Lucide icon="Printer" class="w-4 h-4 mr-2" />
              <Print />
            </Menu.Item>
            <Menu.Item>
              <Lucide icon="FileText" class="w-4 h-4 mr-2" />
              <Excel />
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </div>
    <!-- BEGIN: Pagination-->
    <div
      class="flex flex-wrap items-center col-span-12 mt-0 intro-y sm:flex-nowrap"
    >
      <div>
        <PaginationComponent
          class="pagination-component"
          v-model="currentPage"
          :numberOfPages="numberOfPages"
        />
      </div>
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div>
        <span class="mr-3">[ {{ dataCount }}개 데이터 조회됨 ] </span>
        <span class="mr-5"
          >[ {{ currentPage }} / {{ numberOfPages }} 페이지 ]</span
        >
        <!-- END: Pagination-->
      </div>
    </div>
    <!-- BEGIN: Data List -->
    <!-- style="height: calc(100vh - 350px)" : 브라우저 화면 창크기에 맞게 변경됨 -->
    <div
      class="col-span-12 overflow-auto intro-y lg:overflow-visible"
      id="printMe"
    >
      <div
        class="mr-3"
        style="overflow-y: scroll; overflow-x: hidden; height: 580px"
      >
        <Table class="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead
            class="bg-slate-100"
            style="position: sticky; top: 0px; z-index: 2"
          >
            <Table.Tr>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[0]"
              >
                순번
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[1]"
              >
                품목코드
              </Table.Th>
              <Table.Th
                class="border-b-0 whitespace-nowrap"
                :style="table_width[2]"
              >
                거래처명
              </Table.Th>
              <Table.Th
                class="border-b-0 whitespace-nowrap"
                :style="table_width[3]"
              >
                품명
              </Table.Th>
              <Table.Th
                class="border-b-0 whitespace-nowrap"
                :style="table_width[4]"
              >
                규격
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[5]"
              >
                단위
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[6]"
              >
                재고수
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[7]"
              >
                안전재고수
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[8]"
              >
                부족재고수
              </Table.Th>
              <Table.Th
                class="text-center border-b-0 whitespace-nowrap"
                :style="table_width[9]"
              >
                안전재고보유
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style="position: relative; z-index: 1">
            <!-- <Table.Tr
          <Table.Tr
            v-for="(faker, fakerKey) in _.take(fakerData, 10)"
            :key="fakerKey"
            class="intro-x"
          > -->
            <Table.Tr
              v-for="(todo, index) in datas"
              :key="todo.NO"
              class="intro-x"
            >
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-5 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[0]"
              >
                <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[1]"
              >
                <div>{{ todo.품목코드 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[2]"
              >
                <div>{{ todo.거래처명 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-50 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[3]"
              >
                <div>{{ todo.품명 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-5 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[4]"
              >
                <div>{{ todo.규격 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[5]"
              >
                <div>{{ todo.단위 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-10 text-center text-danger bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[6]"
              >
                <div>{{ todo.재고수 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[7]"
              >
                <div>{{ todo.안전재고수 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-10 text-center bg-white text-danger border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[8]"
              >
                <div>{{ todo.부족재고수 }}</div>
              </Table.Td>
              <Table.Td
                class="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                :style="table_width[10]"
              >
                <div class="flex items-center justify-center text-danger">
                  <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                  부족
                </div>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <div class="text-center mt-20" v-if="dataCount == 0">
          저장된 데이터가 없습니다.
        </div>
      </div>
    </div>
    <!-- END: Data List -->
  </div>
  <!-- BEGIN: FOOTER(COPYRIGHT) -->
  <div class="intro-y mt-5 mr-5" style="text-align: right">
    <footer>&copy;2023 QInnotek. All rights reserved.</footer>
  </div>
  <!-- END: FOOTER(COPYRIGHT) -->
</template>
