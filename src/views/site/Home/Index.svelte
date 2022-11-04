<script>
  import LightButton from "$components/Buttons/LightButton.svelte";
  import MainSlider from "$components/MainSlider.svelte";
  import SmallSlider from "$components/SmallSlider.svelte";
</script>
<div class="flex justify-center">
<MainSlider />
</div>
<div
  class="w-full absolute lg:w-6/12 flex flex-col font-semibold items-start top-32 pl-20 right-0"
>
  <h3 class="text-4xl text-light-300 tracking-tight	 leading-12">Care for Lifetime</h3>
  <h3 class="text-[5em] leading-[4.5rem] font-extrabold text-dark-300">
    Let Us Brighten Your Smile
  </h3>
  <div class="w-gu">
<SmallSlider />

</div>


<!-- 
  <div class="pt-2">
    <LightButton iconRightClass={">"}>Dental Solutions</LightButton>
  </div> -->
</div>
