<script>
  import LightButton from "$components/Buttons/LightButton.svelte";
  import MainSlider from "$components/MainSlider.svelte";
  import SmallSlider from "$components/SmallSlider.svelte";
  import Box1 from "./Box1.svelte";
  import Box2 from "./Box2.svelte";
  import Map from "./Map.svelte";
  import Treatments from "../../../components/Shared/Treatments.svelte";
  import Reviews from "$components/Shared/Reviews.svelte";
</script>

<div class="bg-dark-100 pb-20">
  <div class="flex justify-center relative">
    <MainSlider />
  </div>
  <div
    class="w-full absolute lg:w-6/12 flex flex-col font-semibold items-start top-24 pl-20 right-0"
  >
    <h3 class="text-4xl text-light-300 tracking-tight font-thin leading-12">
      Care for Lifetime
    </h3>
    <h3 class="text-[5em] leading-[4.5rem] font-extrabold text-dark-300">
      Let Us Brighten Your Smile
    </h3>
    <div class="z-10 w-full">
      <SmallSlider />
    </div>

    <!-- 
  <div class="pt-2">
    <LightButton iconRightClass={">"}>Dental Solutions</LightButton>
  </div> -->
  </div>
  <div class="mt-[34rem] top-0 mx-64 absolute">
    <div class=" z-9">
      <Box2 />
    </div>
  </div>
  <div class="pt-24" />
  <Treatments customClass="pt-28" />

</div>
<div class=" px-6  py-10  bg-white">
  <div class="container mx-auto">
    <div class="text-light-300 text-4xl tracking-tight ">Client</div>

    <div class="text-dark-300 font-semibold tracking-tight text-5xl">
      Testimonials
    </div>
  </div>
  <div class=" bg-white ">
    <Reviews />
  </div>
  
</div><div class="pb-16  bg-dark-100">
  <Map /></div>