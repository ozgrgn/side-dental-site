<script>
  import LightButton from "$components/Buttons/LightButton.svelte";
  import Card from "$components/Shared/Card.svelte";
  import TreatmentsSlider from "$components/Sliders/TreatmentsSlider.svelte";
  import { translate } from "../../services/store";

export let customClass
export let spot;
  export let header;
  export let treatments
  console.log(treatments,"treatmenstcarddaki treatment")
  </script>

<div class="container mx-4 {customClass}">
  <div class="flex justify-between w-full">
    <div class=" ">
      <h4 class="text-4xl tracking-tight text-light-300">{spot}</h4>
      <h3 class="text-5xl tracking-tight font-semibold text-dark-300">
        {header}
      </h3>
    </div>
    <!-- <div class="flex flex-col justify-center">
    <LightButton customClass="h-12">{$translate.allTreatments}</LightButton></div> -->
  </div>
<div class="py-10">
{#if treatments}

<TreatmentsSlider treatments={treatments}/>

{/if}
</div>
</div>