<script>
  import RestService from "$services/rest";
  import MainSlider from "$components/Sliders/MainSliderMob.svelte";
  import SmallSlider from "$components/Sliders/SmallSliderMob.svelte";
  import Box2 from "./Box2.svelte";
  import Map from "../Shared/Map.svelte";
  import Treatments from "../../../components/Shared/TreatmentCards.svelte";
  import Reviews from "$components/Shared/Reviews.svelte";
  import { lang,general } from "../../../services/store";
  import ImgSliderMob from "$components/Sliders/ImgSliderMob.svelte";

  let sliders;
  let homes;
  let treatments;
  const getSliders = async () => {
    let response = await RestService.getSliders(undefined, undefined, $lang);
    sliders = response["sliders"];
  };
  $: getSliders($lang);

  const getHomes = async () => {
    let response = await RestService.getHomes(undefined, undefined, $lang);

    homes = response["homes"];
    console.log(homes, "homes");
  };
  $: getHomes($lang);

  const getTreatments = async () => {
    let response = await RestService.getTreatments(
      undefined,
      undefined,
      $lang,
      true,
      true
    );
    treatments = response["treatments"];
    console.log(treatments, "treatments");
  };
  $: getTreatments($lang);
</script>
<svelte:head
  >  <title>Side Shine Dental</title>
  <meta name="description" content={$general.shortDesc} />
</svelte:head>
{#if sliders}
  <div class="bg-dark-100 pb-20">
    <div class="flex justify-center relative">
      <MainSlider {sliders} />
    </div>

    <div
      class="w-full absolute flex flex-col font-semibold items-start top-20 px-2 right-0"
    >
      <h3 class="text-4xl w-full text-light-300 tracking-tight font-thin">
        {sliders[0]?.title}
      </h3>
      <h3
        class="xl:text-[5em] text-6xl xl:leading-[4.5rem] font-extrabold text-dark-300"
      >
        {sliders[0]?.description}
      </h3>

      <!-- 
  <div class="pt-2">
    <LightButton iconRightClass={">"}>Dental Solutions</LightButton>
  </div> -->
    </div>
    <div
      class="2xl:mt-[34rem] xl:mt-[28rem] mt-[38rem] -top-48 lg:mx-64 md:mx-16 absolute "
    >
      {#if homes}
        <div class=" z-9">
          <Box2 header={homes[0].form_header} text={homes[0].form_text} />
        </div>
      {/if}
    </div>

    <div class=" mx-4 mt-52  ">
      {#if homes && treatments}
        <div class="text-light-300 text-3xl tracking-tight  ">
          {homes[0].treatment_spot}
        </div>
        <div class="text-dark-300 font-semibold tracking-tight text-5xl mb-10">
          {homes[0].treatment_header}
        </div>
        <ImgSliderMob {treatments} customClass="2xl:pt-28 xl:pt-32 pt-68" />
      {/if}
    </div>
  </div>
  {#if homes}
    <div class="py-10  bg-white">
      <div class="container mx-auto px-6">
        <div class="text-light-300 text-4xl tracking-tight  ">
          {homes[0].review_spot}
        </div>
        <div class="text-dark-300 font-semibold tracking-tight text-5xl">
          {homes[0].review_header}
        </div>
      </div>
      <div class=" bg-white ">
        <Reviews />
      </div>
    </div>

    <div class="bg-dark-100">
      <Map
        spot={homes[0].map_spot}
        header={homes[0].map_header}
        boxHeader={homes[0].map_box_header}
        boxDesc={homes[0].map_box_desc}
        title={true}
        mapBox="mapWorking"
      />
    </div>{/if}
{/if}
