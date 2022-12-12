<script>
  import RestService from "$services/rest";
  import ImgSlider from "$components/ImgSlider.svelte";
  import { lang } from "../../../services/store";
  import AboutHero from "./AboutHero.svelte";

  let about;
  let images;
  let logos;
  const getAbouts = async () => {
    let response = await RestService.getAbouts(undefined, undefined, $lang);
    console.log(response, "response");
    about = response["abouts"][0];
    images = about.images;
    logos = about.logos;
    console.log(logos, "srgfere");
  };
  getAbouts();
</script>

{#if about}
<div class="relative bg-dark-300 h-96 w-full z-10">
  <img
    class="absolute top-0 h-96 w-full opacity-10 right-0 object-cover z-1"
    src="/assets/img/treatments/back1.jpg"
    alt=""
  />
 
    <div class="absolute top-0 left-0 w-full">
      <div class="container mx-5 z-20">
        <AboutHero {about} />
      </div>
    </div> 

</div>
  <div class="container mx-auto mb-10">
    <div class="mx-6 grid lg:grid-cols-3 pt-10 gap-12 h-full">
      <div class="flex flex-col gap-4 h-full justify-around ">
        {@html about.about_left}
      </div>
 
      <div class="rounded-xl">
        <ImgSlider
          perPage="1"
          {images}
          customClass="h-64 w-full object-cover rounded-xl"
        />
      </div>
      <div
      class="flex lg:flex-col lg:gap-4 lg:h-full lg:justify-around "
    >
      {@html about.about_right}
    </div>
    </div>
  </div>

  <div class="mx-6 bg-transparent">
    <div class="py-20 container mx-auto">
      <ImgSlider
        perPage="3"
        images={logos}
        customClass="object-cover rounded-xl w-full"
      />
    </div>
  </div>

  {/if}