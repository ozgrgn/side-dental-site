<script>
  import { link } from "svelte-navigator";
  import { translate } from "../../../services/store";

  export let treatment;
  console.log(treatment, "hero");
  export let treatmentPage;
</script>

<div class="flex text-lg text-white/90 pt-20">
  <a use:link href="/"> {$translate.homePage} </a>
  <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
  {$translate.treatments}
  <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
  {treatment?.header}
</div>
<div
  class="text-6xl text-white/90 tracking-tight w-fit pt-8 border-b-4 border-light-300/80 h-28 "
>
  <span class="">{treatmentPage?.header}</span>
</div>
<p class="text-white/90  pt-2 md:pt-8">
  {treatmentPage?.text}
</p>
