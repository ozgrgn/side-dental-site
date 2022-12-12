<script>
  import { useLocation, link } from "svelte-navigator";
  import { translate, general } from "../../../services/store";
  import Svg from "../../../assets/svg.json";
  const location = useLocation();
</script>

<div class="relative">

  <div
    class="container hidden lg:flex md:border-b justify-between mx-auto bg-transparent z-20 "
  >
    <a use:link href={"/"} class="z-10 ">
      <img src={$general.logo1} class="h-10" alt="" />
    </a>
    <div>
      {#if $translate && $general}
        <div class="flex gap-6">
          <div class="flex pt-6 z-10 ">
            <svg
              class="h-12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 96"
              ><title>Call</title><g id="Call" fill="#374151"
                >{@html Svg.emergency_call}</g
              ></svg
            >
            <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
              <span class="text-2xl tracking-tight leading-[1] pb-1">
                {$general.phone1}</span
              >
              <span class="text-sm  leading-[1.5] "
                >{$translate.emergency_line}</span
              >
            </div>
          </div>
          <div class="flex pt-6 z-10">
            <svg
              class="h-12 "
              xmlns="http://www.w3.org/2000/svg"
              fill="#374151"
              viewBox="0 0 512.001 512.001"
            >
              {@html Svg.call_24_hours}
            </svg>
            <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
              <span class="text-2xl tracking-tight leading-[1] pb-1">
                {$translate.weekdays}
              </span>
              <span class="text-sm  leading-[1.5] ">
                {$translate.weekendWorkDays}</span
              >
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
