<script>
  import Treatments from "$components/Shared/Treatments.svelte";
  import Reviews from "$components/Shared/Reviews.svelte";
  import ImgSlider from "$components/ImgSlider.svelte";
  import Svg from "../../../assets/svg.json";
  import LightButton from "$components/Buttons/LightButton.svelte";
  import Features1 from "$components/Shared/Features1.svelte";

  let images = ["/clinic/1.jpg", "/clinic/2.jpg", "/clinic/2.jpg"];

  let brands = [
    "/brands/megagen.png",
    "/brands/nobel-biocare.png",
    "/brands/nucleoss.png",
    "/brands/osstem.png",
  ];
</script>

<div class="container mx-auto mb-10">
  <div class="px-6 pb-12 pt-24 border-b ">
    <div class="text-light-300 text-4xl tracking-tight ">We Would Love To</div>

    <div class="text-dark-300 font-semibold tracking-tight text-6xl">
      See Your Smile
    </div>
  </div>
  <div class="grid grid-cols-3 pt-10 gap-12 h-full">
    <div class="flex flex-col gap-4 h-full justify-around ">
      <p>
        Distinctively re-engineer revolutionary meta-services and premium
        architectures. Intrinsically incubate intuitive opportunities and
        real-time potentialities.
      </p>
      <p>
        Appropriately communicate one-to-one technology after plug-and-play
        networks. Quickly aggregate B2B users and worldwide potentialities.
      </p>
      <p>
        Quickly cultivate optimal processes and tactical architectures.
        Completely iterate covalent strategic theme areas via accurate
        e-markets.
      </p>
    </div>
    <div class="hidden lg:flex lg:flex-col lg:gap-4 lg:h-full lg:justify-around ">
      <p>
        Podcasting operational change management inside of workflows to
        establish a framework. Taking seamless key performance indicators
        offline.
      </p>
      <p>
        Keeping your eye on the ball while performing a deep dive on the
        start-up mentality to derive convergence on cross-platform integration.
      </p>
      <p>
        Dramatically maintain clicks-and-mortar solutions without functional
        solutions. Holistically pontificate installed base portals after
        maintainable products.
      </p>
    </div>
    <div class="rounded-xl">
      <ImgSlider
        perPage="1"
        {images}
        customClass="h-64 w-full object-cover rounded-xl"
      />
    </div>
  </div>
</div>
<div class=" bg-transparent">
  <div class="py-20 container mx-auto">
    <ImgSlider
      perPage="7"
      images={brands}
      customClass="object-cover rounded-xl w-full"
    />
  </div>
<!-- <div class="container mx-auto flex justify-between mt-16">
  <Features1
    icon={Svg.tooth_whitening}
    titleClass="font-semibold"
    iconColor="#374151"
    title="Tooth Whitening"
    description="Competently parallel task researched data and process improvements."
  />
  <Features1
    icon={Svg.tooth_whitening}
    titleClass="font-semibold"
    iconColor="#bc74a5"
    title="Tooth Whitening"
    description="Competently parallel task researched data and process improvements."
  />
  <Features1
    icon={Svg.tooth_whitening}
    titleClass="font-semibold"
    iconColor="#374151"
    title="Tooth Whitening"
    description="Competently parallel task researched data and process improvements."
  />
  <Features1
    icon={Svg.tooth_whitening}
    titleClass="font-semibold"
    iconColor="#bc74a5"
    title="Tooth Whitening"
    description="Competently parallel task researched data and process improvements."
  />
</div> -->
<!-- <div class="flex justify-center">
  <LightButton customClass="h-12 w-38 my-10 ">All Treatments</LightButton>
</div> -->


  
     </div>
