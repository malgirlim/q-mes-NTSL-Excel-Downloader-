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
import fakerData from "../utils/faker";
import Tippy from "../base-components/Tippy";
import Progress from "../base-components/Progress";

// API 보내는 함수 및 인터페이스 불러오기
import { useSendApi } from "../composables/useSendApi";
import { MasterUser } from "../interfaces/menu/MasterInterface";

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
const url = "/api/master/user";
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
} = useSendApi<MasterUser>(url, currentPage, rowsPerPage);

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
};
let insertModalData: MasterUser; // 등록할 변수

//수정 Modal
const editModal = ref(false);
const setEditModal = (value: boolean) => {
  editModal.value = value;
  search();
};
let editModalData: MasterUser; // 수정할 변수

//삭제 Modal
const deleteConfirmationModal = ref(false);
const setDeleteConfirmationModal = (value: boolean) => {
  deleteConfirmationModal.value = value;
};
const deleteButtonRef = ref(null);
const deleteDataFunction = async () => {
  await deleteData(checkDebug.value); // await : 이 함수가 끝나야 다음으로 넘어간다
  resetCheckBox();
  search();
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
</script>

<template>
  <!-- style="height: calc(100vh - 250px)" : 브라우저 화면 창크기에 맞게 변경됨 : 100vh - 브라우저 창 크기 -->
  <div class="grid grid-cols-12 gap-1 mt-1">
    <div
      class="flex flex-wrap items-center col-span-12 mt-2 mb-2 intro-y sm:flex-nowrap"
    >
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
        등록
      </Button>
      <div class="hidden mx-auto md:block text-slate-500"></div>
      <div class="mr-2">
        <a href="" class="flex items-center ml-auto text-primary">
          <Lucide icon="RefreshCcw" class="w-4 h-4 mr-3" /> 새로고침
        </a>
      </div>
      <div class="ml-2">
        <FormSelect v-model="searchKey" class="w-30 mt-3 !box sm:mt-0">
          <option>전체</option>
          <option>이름</option>
          <option>부서명</option>
          <option>연락처</option>
          <option>이메일</option>
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
    <!-- BEGIN: Users Layout -->

    <div
      v-for="todo in datas"
      :key="todo.NO"
      class="col-span-12 intro-y md:col-span-3 m-1"
    >
      <div class="box">
        <div
          class="flex flex-col items-center p-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="mt-3 text-center lg:ml-2 lg:mr-auto lg:text-left lg:mt-0">
            <span class="font-medium">
              {{ todo.이름 }} ({{ todo.아이디 }})</span
            >
            <div class="text-slate-500 text-xs mt-0.5">
              {{ todo.부서 }}
            </div>
            <div class="text-slate-500 text-xs mt-0.5">
              <span class="mr-3"><b>Mobile.</b> {{ todo.연락처 }}</span>
              <span><b>E-mail.</b> {{ todo.이메일 }}</span>
            </div>
          </div>
          <div
            class="flex mt-3 -ml-2 lg:ml-0 lg:justify-end lg:mt-0"
            style="text-align: right"
          >
            <div><!--네임카드 우측 공간 기입란--></div>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-center p-3 lg:flex-nowrap"
        >
          <div class="w-full mb-4 mr-auto lg:w-1/2 lg:mb-0">
            <div class="flex text-xs text-slate-500">
              <div class="mr-auto">시스템 사용률</div>
              <div>20%</div>
            </div>
            <Progress class="h-1 mt-2">
              <Progress.Bar
                class="w-1/4 bg-primary"
                role="progressbar"
                :aria-valuenow="0"
                :aria-valuemin="0"
                :aria-valuemax="100"
              ></Progress.Bar>
            </Progress>
          </div>
          <Button
            variant="outline-secondary"
            class="px-2 py-1 mr-2"
            @click="
              (event) => {
                event.preventDefault();
                setEditModal(true);
                editModalData = todo;
              }
            "
          >
            수정
          </Button>
          <Button
            variant="outline-danger"
            class="px-2 py-1 mr-2"
            @click="
              () => {
                checkDebug = [todo.NO];
                setDeleteConfirmationModal(true);
              }
            "
          >
            삭제
          </Button>
        </div>
      </div>
    </div>

    <!-- END: Users Layout -->
    <!-- END: Data List -->

    <!-- BEGIN: Insert Modal Content -->
    <Dialog size="md" :open="insertModal" @close="setInsertModal(false)">
      <Dialog.Panel class="p-10 text-center">
        <!--추가 Modal 내용 시작-->
        <div class="mb-5" style="font-weight: bold">사용자 등록</div>
        <div style="text-align: left">
          <div>
            <FormLabel htmlFor="vertical-form-1">이름</FormLabel>
            <FormInput
              id="vertical-form-1"
              type="text"
              v-model="insertModalData.이름"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-2">아이디</FormLabel>
            <FormInput
              id="vertical-form-2"
              type="text"
              v-model="insertModalData.아이디"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-3">부서</FormLabel>
            <FormInput
              id="vertical-form-3"
              type="text"
              v-model="insertModalData.부서"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-4">연락처</FormLabel>
            <FormInput
              id="vertical-form-4"
              type="text"
              v-model="insertModalData.연락처"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-5">이메일</FormLabel>
            <FormInput
              id="vertical-form-5"
              type="text"
              v-model="insertModalData.이메일"
              placeholder=""
            />
          </div>
          <div class="mt-5 text-right">
            <Button
              class="mr-2 shadow-md"
              variant="primary"
              @click="
                () => {
                  insertData(insertModalData);
                  setInsertModal(false);
                  search();
                  pageChange();
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
          <div>
            <FormLabel htmlFor="vertical-form-1">이름</FormLabel>
            <FormInput
              id="vertical-form-1"
              type="text"
              v-model="editModalData.이름"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-2">아이디</FormLabel>
            <FormInput
              id="vertical-form-2"
              type="text"
              v-model="editModalData.아이디"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-3">부서</FormLabel>
            <FormInput
              id="vertical-form-3"
              type="text"
              v-model="editModalData.부서"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-4">연락처</FormLabel>
            <FormInput
              id="vertical-form-4"
              type="text"
              v-model="editModalData.연락처"
              placeholder=""
            />
          </div>
          <div class="mt-3">
            <FormLabel htmlFor="vertical-form-5">이메일</FormLabel>
            <FormInput
              id="vertical-form-5"
              type="text"
              v-model="editModalData.이메일"
              placeholder=""
            />
          </div>
          <div class="mt-5 text-right">
            <Button
              class="mr-2 shadow-md"
              variant="primary"
              @click="
                () => {
                  editData(editModalData);
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
  <div class="text-center mt-20 intro-y" v-if="dataCount == 0">
    저장된 데이터가 없습니다.
  </div>
  <!-- BEGIN: FOOTER(COPYRIGHT) -->
  <div class="intro-y mt-5 mr-5" style="text-align: right">
    <footer>&copy;2023 QInnotek. All rights reserved.</footer>
  </div>
  <!-- END: FOOTER(COPYRIGHT) -->
</template>
