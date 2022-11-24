<script>
  import MapWorking from "./MapWorking.svelte";
  import MapForm from "./MapForm.svelte";

  export let title;
  export let mapBox
</script>

<div class="xl:pt-20 pt-8">
  <h4
    class="{title
      ? ''
      : 'hidden'} text-center lg:text-5xl text-3xl font-semibold text-dark-300 tracking-tight"
  >
    <span class="text-light-300">Where is</span> Side Shine Dental?
  </h4>
  <div class="flex flex-col lg:flex-row">
    <img class="lg:w-3/5 shadow-xl pt-5" src="assets/img/map.png" alt="" />

    {#if mapBox=="mapWorking"}
 <MapWorking/> 
 {:else}
<MapForm />
 {/if}

 

  </div>
</div>
