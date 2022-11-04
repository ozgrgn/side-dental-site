<script>
      import Svg from "../../../assets/svg.json";
      import { link } from "svelte-navigator";

</script>
<div class="container hidden md:flex justify-between mx-auto border-b ">
    <a  use:link href={"/"} class="d">
      <img
      
        src="assets/img/logos/side-smile-logo.png"
        class="h-24"
        alt=""
      />
    </a>
    <div>
      <div class="flex gap-6 ">
        <div class="flex pt-6">
          <svg class="h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"
            ><title>Call</title><g id="Call" fill="#ef663a"
              >{@html Svg.emergency_call}</g
            ></svg
          >
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span class="text-2xl tracking-tight leading-[1] pb-1">
              0242-334-2424</span
            >
            <span class="text-sm  leading-[1.5] ">24/7 Emergency Phone</span>
          </div>
        </div>
        <div class="flex pt-6">
          <svg
            class="h-12 "
            xmlns="http://www.w3.org/2000/svg"
            fill="#ef663a"
            viewBox="0 0 512.001 512.001"
          >
            {@html Svg.call_24_hours}
          </svg>
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span class="text-2xl tracking-tight leading-[1] pb-1">
              Monday - Friday
            </span>
            <span class="text-sm  leading-[1.5] ">9AM - 9PM</span>
          </div>
        </div>
      </div>
    </div>
  </div>