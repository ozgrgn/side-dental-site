<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import { treatments } from "../../services/store";

  import Features1 from "../Shared/Features1.svelte";
  import "@splidejs/svelte-splide/css";
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    perPage: 2,
    type: "slider",
    arrows: false,
    autoplay: true,
    pagination: false,
    interval: 3000,
  }}
>
  {#if $treatments}
    {#each $treatments as treatment}
      <SplideSlide>
        <Features1
          icon={treatment.icon}
          title={treatment.title}
          titleClass="text-light-300 "
          iconColor="#374151"
          description={treatment.shortDesc.length>70?treatment.shortDesc.slice(0,70) +"...":treatment.shortDesc}
        />
      </SplideSlide>
    {/each}
  {/if}
</Splide>
