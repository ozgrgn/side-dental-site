<script>
   export let treatment;
    console.log(treatment,"dsfdfdfd")
</script>
{#if treatment}
<div class="text-4xl tracking-tight text-light-300">
    {treatment.spot}
  </div>
  <div class="text-6xl font-bold tracking-tight text-dark-300">
    {treatment.header}
  </div>
  <div class="pt-2">
  {@html treatment.text}</div>
  <div class="grid grid-cols-2 grid-rows-2 gap-4 py-10">
{#each treatment.images as image }
<img src={image.image} alt="" />

{/each}
  </div>
  {/if}