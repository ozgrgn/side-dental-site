<script>
  import RestService from "$services/rest";
  import ImgSlider from "$components/ImgSlider.svelte";
  import { lang,general } from "../../../services/store";

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
  $:  getAbouts($lang);


</script>
<svelte:head
  >  <title>Side Shine Dental</title>
  <meta property="description" content={$general.shortDesc} />
</svelte:head>
{#if about}
  <div class="container mx-auto mb-10">
    <div class="px-6 pb-12 pt-24 border-b ">
      <div class="text-light-300 text-4xl tracking-tight ">
        {about.about_spot}
      </div>

      <div class="text-dark-300 font-semibold tracking-tight text-6xl">
        {about.about_title}
      </div>
    </div>
    <div class="grid lg:grid-cols-2 pt-10 gap-20 h-full">
      <div class="flex flex-col gap-4 h-full justify-around ">
        {@html about.about_left}
      </div>
    
      <div class="rounded-xl flex justify-center">
        <ImgSlider
          perPage=1
          {images}
          customClass="h-full w-auto object-fit rounded-xl"
        />
      </div>
    </div>
  </div>

  <div class=" bg-transparent">
    <div class="py-20 container mx-auto">
      <ImgSlider
        perPage=5
        images={logos}
        customClass="object-cover px-10 rounded-xl w-full"
      />
    </div>

  </div>
{/if}
