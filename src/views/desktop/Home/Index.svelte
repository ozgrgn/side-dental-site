<script>
  import RestService from "$services/rest";
  import MainSlider from "$components/MainSlider.svelte";
  import SmallSlider from "$components/SmallSlider.svelte";
  import Box2 from "./Box2.svelte";
  import Map from "../Shared/Map.svelte";
  import Treatments from "../../../components/Shared/TreatmentCards.svelte";
  import Reviews from "$components/Shared/Reviews.svelte";
  import { lang } from "../../../services/store";

  let sliders;
  let homes;
  let treatments;
  const getSliders = async () => {
    let response = await RestService.getSliders(undefined, undefined, $lang);
    sliders = response["sliders"];
  };
  getSliders();

  const getHomes = async () => {
    let response = await RestService.getHomes(undefined, undefined, $lang);

    homes = response["homes"];
    console.log(homes, "homes");
  };
  getHomes();

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
  getTreatments();
</script>

{#if sliders}
  <div class="bg-dark-100 pb-20">
    <div class="flex justify-center relative">
      <MainSlider {sliders} />
    </div>

    <div
      class="w-full absolute lg:w-6/12 flex flex-col font-semibold items-start top-24 pl-20 right-0"
    >
      <h3 class="text-4xl text-light-300 tracking-tight font-thin leading-12">
        {sliders[0]?.title}
      </h3>
      <h3
        class="xl:text-[5em] text-6xl xl:leading-[4.5rem] font-extrabold text-dark-300"
      >
        {sliders[0]?.description}
      </h3>

      <div class="z-10 w-full">
        <SmallSlider />
      </div>

      <!-- 
  <div class="pt-2">
    <LightButton iconRightClass={">"}>Dental Solutions</LightButton>
  </div> -->
    </div>
    <div
      class="2xl:mt-[34rem] xl:mt-[28rem] mt-[28rem]  top-0 lg:mx-64 md:mx-16 absolute "
    >
      {#if homes}
        <div class=" z-9">
          <Box2 header={homes[0].form_header} text={homes[0].form_text} />
        </div>
      {/if}
    </div>

    <div class="pt-32"/>
    {#if homes}
      <Treatments
        spot={homes[0].treatment_spot}
        header={homes[0].treatment_header}
        {treatments}
        customClass="2xl:pt-28 xl:pt-32 pt-68"
      />
    {/if}
  </div>
  {#if homes}
    <div class=" px-6  py-10  bg-white">
      <div class="container mx-auto">
        <div class="text-light-300 text-4xl tracking-tight ">
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

    <div class="pb-16 bg-dark-100">
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
