<template>
  <notifications :duration="5000">
    <template #body="{ item, close }">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <!-- Global notification live region, render this permanently at the end of the document -->
      <transition name="fade">
        <div
          aria-live="assertive"
          class="flex items-end px-4 py-2 pointer-events-none sm:p-2 sm:items-start z-40"
        >
          <div
            class="w-full flex flex-col items-center space-y-4 sm:items-end z-0"
          >
            <div
              class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
            >
              <div class="p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <!-- Heroicon name: outline/check-circle -->
                    <svg
                      class="h-6 w-6 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      v-if="item.type === 'success'"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      v-if="item.type === 'error'"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-yellow-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      v-if="item.type === 'warning'"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <!-- <div v-if="type === 'success'" class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ item.text }}
                    </p>
                  </div> -->

                  <div class="ml-3 w-0 flex-1 pt-0.5">
                    <p class="text-sm font-medium text-gray-900">
                      {{ item.title }}
                    </p>
                    <p
                      v-html="item.text"
                      class="mt-1 text-sm text-gray-500 max-h-96 overflow-y-auto"
                    ></p>
                  </div>
                  <div class="ml-4 flex-shrink-0 flex">
                    <button
                      class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary"
                      @click="close"
                    >
                      <span class="sr-only">Close</span>
                      <!-- Heroicon name: solid/x -->
                      <svg
                        class="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </notifications>
</template>

<style lang="scss">
.vue-notification-group {
  width: 380px !important;
  z-index: 30 !important;
}

@keyframes popout {
  from {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
@-webkit-keyframes popout {
  from {
    -webkit-transform: scale(0);
  }
  80% {
    -webkit-transform: scale(1.2);
  }
  to {
    -webkit-transform: scale(1);
  }
}
</style>
