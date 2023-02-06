<script>
  import Popup from "$components/Popup.svelte";
  import { bind } from "svelte/internal";
  import Svg from "../../../assets/svg.json";
  import {translate,general, modal1 } from "../../../services/store";

  export let boxHeader;
  export let boxDesc;
</script>

<div
  class="-ml-20 shadow-xl bg-dark-300 h-96 w-2/6 justify-center hidden lg:flex flex-col justify-center my-auto px-10"
>
  <div class="flex flex-col pl-3 text-white">
    <span class="text-2xl font-semibold ">{boxHeader}</span>
    <p class="">{boxDesc}</p>
    <div class="flex flex-col ">
      <div class=" border-b border-white/30 pt-10 flex justify-between">
        <div class="w-20">{$translate.monday}</div>
        <div class="w-28 text-white/60">{$general.weekday}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center">
              {$translate?.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
      <div class=" border-b border-white/30 pt-2 flex justify-between">
        <div class="w-20">{$translate.tuesday}</div>
        <div class="w-28 text-white/60">{$general.weekday}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center">
              {$translate.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
      <div class=" border-b border-white/30 pt-2 flex justify-between">
        <div class="w-20">{$translate.wednesday}</div>
        <div class="w-28 text-white/60">{$general.weekday}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center">
              {$translate.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
      <div class=" border-b border-white/30 pt-2 flex justify-between">
        <div class="w-20">{$translate.thursday}</div>
        <div class="w-28 text-white/60">{$general.weekday}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center">
              {$translate.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
      <div class=" border-b border-white/30 pt-2 flex justify-between">
        <div class="w-20">{$translate.friday}</div>
        <div class="w-28 text-white/60">{$general.weekday}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center">
              {$translate.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
      <div class="pt-2 flex justify-between">
        <div class="w-20">{$translate.saturday}</div>
        <div class="w-28 text-white/60">{$general.weekend}</div>
        <a class="" href="/">
          <div
            class="bg-white w-16 h-6 mb-2 text-center flex flex-col justify-center rounded-md text-sm text-light-300"
          >
            <div class="flex justify-center"
     
            >
              {$translate.book} <svg
                class="h-3 w-3 mt-[0.2rem] ml-1"
                fill="#bc74a5"
                viewBox="0 0 122.88 122.88"
                ><style type="text/css">
                  .st0 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                  }
                </style>

                >
                {@html Svg.clock}
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
