<script>
  import LightButton from "$components/Buttons/LightButton.svelte";
  import Card from "$components/Shared/Card.svelte";
export let customClass
</script>

<div class="container mx-auto {customClass}">
  <div class="flex justify-between w-full">
    <div class=" ">
      <h4 class="text-4xl tracking-tight text-light-300">Our Dental</h4>
      <h3 class="text-5xl tracking-tight font-semibold text-dark-300">
        Treatments
      </h3>
    </div>
    <div class="flex flex-col justify-center">
    <LightButton customClass="h-12 ">All Treatments</LightButton></div>
  </div>
<div class="py-10 grid grid-cols-4 gap-6">


<Card>Dental Implant
</Card>
<Card>Dental Implant
</Card>
<Card>Dental Implant
</Card>
<Card>Dental Implant
</Card>
</div>
</div>