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
import TomSelect from "tom-select";

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import { MasterProduct } from "../interfaces/menu/masterInterface";
import { MasterBom } from "../interfaces/menu/masterInterface";

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
const url = "/api/master/product";
const {
  dataAll,
  datas,
  dataCount,
  datasAreLoading,
  loadDatas,
  searchDatas,
  insertData,
  editData,
  deleteData,
  numberOfPages,
} = useSendApi<MasterProduct>(url, currentPage, rowsPerPage);

// api 보내기2
const url_2 = "/api/master/bom";
const bom = useSendApi<MasterBom>(url_2, currentPage, rowsPerPage);

const searchKey = ref("전체");
const searchInput = ref("");
onMounted(async () => loadDatas()); // 페이지 로딩 시 데이터 불러오기

// 조회
const search = () => {
  // console.log(searchKey.value, searchInput.value);
  searchDatas("", searchKey.value, searchInput.value);
};

//등록 Modal
const insertModal = ref(false);
const setInsertModal = (value: boolean) => {
  insertModal.value = value;
  insertModalData = {}; // 변수 초기화
  insertModalData.품목NO = radioSelect.value[0];
};
let insertModalData: MasterBom; // 등록할 변수
// TomSelect 에 필요한 함수
const vTom = {
  mounted(el: any, binding: any, vnode: any) {
    const options = binding.value || {};
    const defaultOptions = {
      onInitialize: function () {
        // the onInitialize callback is invoked once the control is completely initialized.
        // console.log("onInitialize", this);
      },
    };
    new TomSelect(el, { ...defaultOptions, ...options });
  },
  unmounted(el: any) {
    const tomSelect = el.tomselect;
    if (tomSelect) {
      tomSelect.destroy();
      delete el.tomselect;
    }
  },
};

//수정 Modal
const editModal = ref(false);
const setEditModal = (value: boolean) => {
  editModal.value = value;
  search();
};
let editModalData: MasterBom; // 수정할 변수

//삭제 Modal
const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
const deleteDataFunction = async () => {
  await bom.deleteData(checkDebug.value); // await : 이 함수가 끝나야 다음으로 넘어간다
  resetCheckBox();
  bom.searchDatas("", "품목NO", radioSelect.value[0]);
};

// 날짜 구하기
const now = moment().format("YYYY-MM-DD");
const nowPlus = moment().add(7, "days").format("YYYY-MM-DD");
const max_year = moment().format("YYYY");
const min_year = moment().add(-3, "years").format("YYYY");
const now2 = "전체기간";

// 체크박스 선택으로 데이터 가져오기
const checkDebug: any = ref([]); // 체크박스 선택 데이터 저장변수
const mainCheckBox = ref(true); // 메인 체크박스 상태
const checkAll = (value: boolean) => {
  // 메인 체크박스가 눌릴 때 모두 체크
  const checkboxes = document.querySelectorAll("input[id=checkbox]"); // input의 id가 checkbox인 요소를 가져오기
  // 만약 메인 체크박스가 눌렸다면
  if (value === true) {
    checkDebug.value = []; // 체크박스 선택 데이터 초기화
    checkboxes.forEach((cb: any) => {
      cb.checked = value; // 모든 체크박스를 메인체크박스에 맞춰서 바꿈
      checkDebug.value.push(cb.value); // 모든 체크박스의 value를 가져와 저장
    });
  } else {
    checkboxes.forEach((cb: any) => {
      cb.checked = value;
      checkDebug.value = [];
    });
  }
};

const resetCheckBox = () => {
  // 페이징 넘기면 체크박스 데이터 초기화
  const mBox = document.querySelector<HTMLElement>(
    "input[id=checkbox_all]"
  ) as HTMLInputElement | null; // 오류 안뜨게 하려고 넣어둔것
  if (!mBox) return; // 오류 안뜨게 하려고 넣어둔것
  mBox.checked = false; // 메인체크박스 체크해제
  mainCheckBox.value = true; // 메인체크박스 데이터 초기화
  checkDebug.value = [];
};

// 라디오 선택하기
const radioSelect: any = ref([]);
// now2가 변경되면 실행
watch([radioSelect], (newValue, oldValue) => {
  // console.log(oldValue[0], "->", newValue[0]);
  bom.searchDatas("", "품목NO", radioSelect.value[0]);
});

// 테이블 열 크기 조정 (BOM 등록)
const table_width = [
  "width: 50px", // 선택
  "width: 50px", // 순번
  "width: 100px", // 품목코드
  "width: 150px", // 거래처명
  "width: 200px", // 품명
  "width: 200px", // 규격
];
const table_width2 = [
  "width: 50px", // 체크박스
  "width: 100px", // 순번
  "width: 300px", // 원자재코드
  "width: 300px", // 원자재명
  "width: 150px", // 수량
  "width: 150px", // 편집
];
</script>

<template>
  <div class="container" style="display: flex; max-width: 100%">
    <div class="item mr-3" style="flex: 1 1 40%">
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
            <FormSelect v-model="searchKey" class="w-30 mt-3 !box sm:mt-0">
              <option>전체</option>
              <option>품목코드</option>
              <option>거래처명</option>
              <option>품명</option>
              <option>규격</option>
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
          <div class="ml-2 mr-3">
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
              @click="resetCheckBox()"
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
            <Table class="border-spacing-y-[8px] border-separate -mt-2">
              <Table.Thead
                class="bg-slate-100"
                style="position: sticky; top: 0px; z-index: 2"
              >
                <Table.Tr>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width[0]"
                  >
                    선택
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width[1]"
                  >
                    순번
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width[2]"
                  >
                    품목코드
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width[3]"
                  >
                    거래처명
                  </Table.Th>
                  <Table.Th
                    class="border-b-0 whitespace-nowrap"
                    :style="table_width[4]"
                  >
                    품명
                  </Table.Th>
                  <Table.Th
                    class="border-b-0 whitespace-nowrap"
                    :style="table_width[5]"
                  >
                    규격
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody style="position: relative; z-index: 1">
                <Table.Tr
                  v-for="(todo, index) in datas"
                  :key="todo.NO"
                  class="intro-x"
                  htmlFor="radio"
                >
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    id="radio"
                    :style="table_width[0]"
                  >
                    <input
                      class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10"
                      id="radio"
                      type="radio"
                      :value="[todo.NO, true]"
                      v-model="radioSelect"
                    />
                  </Table.Td>
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    :style="table_width[1]"
                  >
                    <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
                  </Table.Td>
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    :style="table_width[2]"
                  >
                    <div>{{ todo.품목코드 }}</div>
                  </Table.Td>
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    :style="table_width[3]"
                  >
                    <div>
                      {{ todo.거래처명 }}
                    </div>
                  </Table.Td>
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    :style="table_width[4]"
                  >
                    <div>{{ todo.품명 }}</div>
                  </Table.Td>
                  <Table.Td
                    :class="[
                      'first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]',
                      { 'bg-warning': radioSelect[0] == todo.NO },
                    ]"
                    :style="table_width[5]"
                  >
                    <div>{{ todo.규격 }}</div>
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
    </div>

    <div class="item ml-3" style="flex: 1 1 40%">
      <!-- style="height: calc(100vh - 250px)" : 브라우저 화면 창크기에 맞게 변경됨 : 100vh - 브라우저 창 크기 -->
      <div class="grid grid-cols-12 gap-1 mt-1">
        <div
          class="flex flex-wrap items-center col-span-12 mt-2 mb-2 intro-y sm:flex-nowrap"
        >
          <div class="hidden mx-auto md:block text-slate-500"></div>
          <Button
            class="mr-2 shadow-md"
            as="a"
            variant="primary"
            @click="
              (event) => {
                event.preventDefault();
                setInsertModal(true);
              }
            "
          >
            <Lucide icon="FilePlus" class="w-4 h-4 mr-2" />
            원자재 등록
          </Button>
          <Button
            class="mr-2 shadow-md"
            as="a"
            variant="danger"
            @click="
              (event) => {
                event.preventDefault();
                setDeleteConfirmationModal(true);
              }
            "
          >
            <Lucide icon="Trash2" class="w-4 h-4 mr-2" /> 삭제</Button
          >
          <div class="ml-2 mr-3">
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
          <div class="hidden mx-auto md:block text-slate-500"></div>
          <div class="mt-6">
            <span class="mr-3">[ {{ bom.dataCount }}개 데이터 조회됨 ] </span>

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
            <Table class="border-spacing-y-[8px] border-separate -mt-2">
              <Table.Thead
                class="bg-slate-100"
                style="position: sticky; top: 0px; z-index: 2"
              >
                <Table.Tr>
                  <Table.Th
                    class="border-b-0 whitespace-nowrap"
                    id="checkbox"
                    :style="table_width2[0]"
                  >
                    <Input
                      class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed"
                      id="checkbox_all"
                      type="checkbox"
                      :value="mainCheckBox"
                      @click="
                        () => {
                          checkAll(mainCheckBox);
                          mainCheckBox = !mainCheckBox;
                        }
                      "
                    />
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width2[1]"
                  >
                    순번
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width2[2]"
                  >
                    원자재코드
                  </Table.Th>
                  <Table.Th
                    class="border-b-0 whitespace-nowrap"
                    :style="table_width2[2]"
                  >
                    원자재명
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    :style="table_width2[3]"
                  >
                    구성수량
                  </Table.Th>
                  <Table.Th
                    class="text-center border-b-0 whitespace-nowrap"
                    id="edit"
                    :style="table_width2[5]"
                  >
                    편집
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody style="position: relative; z-index: 1">
                <Table.Tr
                  v-for="(todo, index) in bom.datas.value"
                  :key="todo.NO"
                  class="intro-x"
                >
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                    id="checkbox"
                    :style="table_width2[0]"
                  >
                    <input
                      class="transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed"
                      id="checkbox"
                      type="checkbox"
                      :value="todo.NO"
                      v-model="checkDebug"
                    />
                  </Table.Td>
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                    :style="table_width2[1]"
                  >
                    <div>{{ index + 1 + (currentPage - 1) * rowsPerPage }}</div>
                  </Table.Td>
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                    :style="table_width2[2]"
                  >
                    <div>{{ todo.원자재코드 }}</div>
                  </Table.Td>
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                    :style="table_width2[2]"
                  >
                    <div>{{ todo.원자재명 }}</div>
                  </Table.Td>
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]"
                    :style="table_width2[4]"
                  >
                    <div>{{ todo.수량?.toLocaleString() }}</div>
                  </Table.Td>
                  <Table.Td
                    class="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400"
                    :style="table_width2[5]"
                    id="edit"
                  >
                    <div class="flex items-center justify-center text-danger">
                      <a
                        class="flex items-center mr-3"
                        href="#"
                        @click="
                          (event) => {
                            event.preventDefault();
                            setEditModal(true);
                            editModalData = todo;
                          }
                        "
                      >
                        <Lucide icon="Edit" class="w-4 h-4 mr-1" />
                        수정
                      </a>
                    </div>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <div class="text-center mt-20" v-if="bom.dataCount.value == 0">
              저장된 데이터가 없습니다.
            </div>
          </div>
        </div>
        <!-- END: Data List -->
      </div>
      <!-- BEGIN: Insert Modal Content -->
      <!-- BEGIN: FOOTER(COPYRIGHT) -->
      <div class="intro-y mt-5 mr-5" style="text-align: right">
        <footer>&copy;2023 QInnotek. All rights reserved.</footer>
      </div>
      <!-- END: FOOTER(COPYRIGHT) -->
      <Dialog
        size="md"
        :open="insertModal"
        @close="
          () => {
            setInsertModal(false);
          }
        "
      >
        <Dialog.Panel class="p-10 text-center">
          <!--추가 Modal 내용 시작-->
          <div class="mb-5" style="font-weight: bold">원자재 등록</div>
          <div style="text-align: left">
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">원자재코드</FormLabel>
              <select v-tom v-model="insertModalData.원자재코드">
                <option value="" selected>=== 필수선택 ===</option>
                <option
                  v-for="todo in dataAll"
                  :key="todo.NO"
                  :value="todo.품목코드"
                >
                  {{ todo.품목코드 }} # 품명:{{ todo.품명 }}
                </option>
              </select>
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-3">구성수량</FormLabel>
              <FormInput
                id="vertical-form-3"
                type="text"
                v-model="insertModalData.수량"
                placeholder=""
              />
            </div>
            <div class="mt-5 text-right">
              <Button
                class="mr-2 shadow-md"
                variant="primary"
                @click="
                  async () => {
                    await bom.insertData(insertModalData);
                    await bom.searchDatas('', '품목NO', radioSelect[0]);
                    setInsertModal(false);
                  }
                "
                >확인</Button
              >
              <Button
                class="mr-2 shadow-md"
                variant="outline-primary"
                @click="
                  () => {
                    setInsertModal(false);
                  }
                "
                >취소</Button
              >
            </div>
          </div>
          <!--Modal 내용 끝--></Dialog.Panel
        >
      </Dialog>
      <!-- END: Insert Modal Content -->
      <!-- BEGIN: Edit Modal Content -->
      <Dialog
        size="md"
        :open="editModal"
        @close="
          () => {
            setEditModal(false);
          }
        "
      >
        <Dialog.Panel class="p-10 text-center">
          <div class="mb-5" style="font-weight: bold">수정</div>
          <div style="text-align: left">
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-2">원자재코드</FormLabel>
              <FormSelect v-model="editModalData.원자재코드">
                <option
                  v-for="todo in dataAll"
                  :key="todo.NO"
                  :value="todo.품목코드"
                  selected
                >
                  {{ todo.품목코드 }} # 품명:{{ todo.품명 }}
                </option>
              </FormSelect>
            </div>
            <div class="mt-3">
              <FormLabel htmlFor="vertical-form-3">구성수량</FormLabel>
              <FormInput
                id="vertical-form-3"
                type="text"
                v-model="editModalData.수량"
                placeholder=""
              />
            </div>
            <div class="mt-5 text-right">
              <Button
                class="mr-2 shadow-md"
                variant="primary"
                @click="
                  () => {
                    bom.editData(editModalData);
                    setEditModal(false);
                  }
                "
                >확인</Button
              >
              <Button
                class="mr-2 shadow-md"
                variant="outline-primary"
                @click="
                  () => {
                    setEditModal(false);
                  }
                "
                >취소</Button
              >
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <!-- END: Edit Modal Content -->
      <!-- BEGIN: Delete Confirmation Modal -->
      <Dialog
        :open="deleteConfirmationModal"
        @close="
          () => {
            setDeleteConfirmationModal(false);
          }
        "
        :initialFocus="deleteButtonRef"
      >
        <Dialog.Panel>
          <div class="p-5 text-center">
            <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
            <div class="mt-5 text-3xl">삭제</div>
            <div class="mt-2 text-slate-500">정말 삭제하시겠습니까?</div>
          </div>
          <div class="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              @click="
                () => {
                  setDeleteConfirmationModal(false);
                }
              "
              class="w-24 mr-1"
            >
              취소
            </Button>
            <Button
              variant="danger"
              type="button"
              class="w-24"
              ref="deleteButtonRef"
              @click="
                () => {
                  deleteDataFunction();
                  setDeleteConfirmationModal(false);
                }
              "
            >
              삭제
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      <!-- END: Delete Confirmation Modal -->
    </div>
  </div>
</template>
