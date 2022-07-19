<template>
  <div>
    <div class="flex flex-col">
      <div class="">
        <div class="py-2 align-middle inline-block min-w-full">
          <div class="border-b sm:rounded-lg border border-blue-50 overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-blue-550">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-bold text-blue-primary tracking-wider underline"
                  >
                    <input type="checkbox" v-model="selectAllCheckbox" @input="onAllRowsSelected" />
                  </th>
                  <th
                    v-if="pinned"
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-bold text-blue-primary tracking-wider underline"
                  ></th>
                  <th
                    v-for="(column, index) in columns"
                    :key="index"
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-bold text-blue-primary"
                  >
                    <div class="flex">
                      <div>
                        {{ column.text }}
                      </div>
                      <div class="my-auto">
                        <button v-if="column.sort" @click="onColumnSort(column.value)">
                          <svg
                            v-if="sorting.field == '' || sorting.field != column.value"
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline-block h-4 w-4 -mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 11l5-5m0 0l5 5m-5-5v12"
                            />
                          </svg>
                          <svg
                            v-if="sorting.field == column.value"
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline-block h-4 w-4 -mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              :d="sorting.order === 'asc' ? 'M7 11l5-5m0 0l5 5m-5-5v12' : 'M17 13l-5 5m0 0l-5-5m5 5V6'"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </th>
                  <th scope="col" class="py-2">
                    <slot name="actionHeader"></slot>
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredData.length <= 0">
                  <td colspan="7" class="whitespace-nowrap text-sm text-gray-500 text-center">
                    <span class="font-bold block py-3">No data found</span>
                  </td>
                </tr>
                <tr v-else v-for="(item, index) in filteredData" :key="index">
                  <td class="p-4 whitespace-nowrap text-xs text-gray-500">
                    <input
                      :id="'item-' + item[itemKey]"
                      type="checkbox"
                      :value="item[itemKey]"
                      :checked="isRowChecked(item[itemKey])"
                      @input="onItemChecked"
                    />
                  </td>
                  <td v-if="pinned" class="p-4">
                    <svg
                      class="cursor-pointer"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      @click="onPinSelect(item)"
                      @keydown="onPinSelect(item)"
                    >
                      <path
                        d="M6.30294 11.875L1 17.1806"
                        stroke="#9EB3CC"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.49609 8.84874L9.33513 14.6907C10.5766 13.4486 10.865 11.6054 10.1842 10.0828L14.1329 6.13212C15.1261 6.39657 16.2234 6.14815 17.0004 5.37082L12.8113 1.17969C12.0424 1.949 11.7861 3.04687 12.0424 4.03254L8.08563 7.99128C6.56379 7.31814 4.72958 7.60663 3.49609 8.84874Z"
                        :fill="item.isPinned ? '#9EB3CC' : ''"
                        stroke="#9EB3CC"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </td>
                  <td
                    class="px-4 py-4 whitespace-nowrap text-sm text-black font-light"
                    v-for="(column, ii) in columns"
                    :key="ii"
                  >
                    <slot :name="column.value" :item="item">
                      <div :class="['flex', 'items-center', 'w-max', 'text-center', 'rounded-full', 'text-xxs', 'h-5']">
                        <p class="font-medium">
                          {{ getTableRowData(item, column) }}
                        </p>
                      </div>
                    </slot>
                  </td>
                  <td>
                    <slot name="action" :item="item"></slot>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import _ from "lodash";

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    // unique key identifier in items
    itemKey: {
      type: String,
      default: "id",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    defaultSort: {
      type: Object,
      default: null,
      required: false,
    },
    checkedRows: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["onPinned", "onRowsSelected"],
  setup(props, context) {
    const selectedRows = ref([]);
    const selectAllCheckbox = ref(false);
    const sorting = reactive({
      field: "",
      order: "",
    });

    function onPinSelect(data) {
      context.emit("onPinned", data);
    }

    function onItemChecked($event) {
      const itemIndex = selectedRows.value.findIndex(
        // eslint-disable-next-line
        (row) => row == $event.target.value
      );
      console.log(itemIndex);
      if (itemIndex !== -1) {
        selectedRows.value.splice(itemIndex, 1);
      } else {
        selectedRows.value.push(Number($event.target.value));
      }

      if (selectedRows.value.length === props.items.length) {
        selectAllCheckbox.value = true;
      } else {
        selectAllCheckbox.value = false;
      }

      context.emit("onRowsSelected", selectedRows.value);
    }

    function onAllRowsSelected($event) {
      if ($event.target.checked) {
        const itemIds = props.items.map((data) => data[props.itemKey]);
        selectedRows.value = itemIds;
      } else {
        selectedRows.value = [];
      }

      context.emit("onRowsSelected", selectedRows.value);
    }

    function isRowChecked(key) {
      const itemIndex = selectedRows.value.findIndex((row) => row === key);
      if (itemIndex !== -1) {
        return true;
      }
      return false;
    }

    function onColumnSort(column) {
      if (sorting.field !== column) {
        sorting.order = "desc";
      } else {
        sorting.order = sorting.order === "asc" ? "desc" : "asc";
      }
      sorting.field = column;
    }

    function getTableRowData(item, column) {
      if (column.characterLimit && typeof column.characterLimit === "number") {
        if (item[column.value] && item[column.value].length > column.characterLimit) {
          return `${item[column.value].substr(0, column.characterLimit)}...`;
        }
      }
      return item[column.value];
    }

    const filteredData = computed(() => {
      let objOne = [];
      let obj = [];

      // seperate pinned and non-pinned arrays
      if (props.pinned) {
        const pinnedRows = props.items.filter((item) => item.isPinned && item.isPinned === true);
        objOne = [...pinnedRows];
        if (sorting.field !== "") {
          if (sorting.order === "asc") {
            objOne = _.sortBy(objOne, sorting.field);
          }
          if (sorting.order === "desc") {
            objOne = _.sortBy(objOne, sorting.field).reverse();
          }
        }
      }

      const nonPinnedRow = props.items.filter((item) => !item.isPinned || !item.isPinned === true);
      obj = [...nonPinnedRow];
      if (sorting.field !== "") {
        if (sorting.order === "asc") {
          obj = _.sortBy(obj, sorting.field);
        } else {
          obj = _.sortBy(obj, sorting.field).reverse();
        }
      }

      return [...objOne, ...obj];
    });

    watch(
      () => props.checkedRows,
      (newVal, preVal) => {
        if (newVal !== preVal) {
          selectedRows.value = newVal;
          if (selectedRows.value.length <= 0) {
            selectAllCheckbox.value = false;
          }
        }
      }
    );

    onMounted(() => {
      if (props.defaultSort !== null) {
        sorting.field = props.defaultSort.key;
        sorting.order = props.defaultSort.sortBy;
      }
    });

    return {
      filteredData,
      onPinSelect,
      onItemChecked,
      onAllRowsSelected,
      selectedRows,
      isRowChecked,
      selectAllCheckbox,
      onColumnSort,
      sorting,
      getTableRowData,
    };
  },
};
</script>
