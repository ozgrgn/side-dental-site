<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
export let sliders
console.log(sliders,"sfsf")
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    arrows: false,
    pagination: false,
  }}
>
{#each sliders as slider}
  <SplideSlide>

    <img
      class="h-[calc(100vh-160px)] md:h-100 w-auto object-cover  "
      src={slider.backgroundBanner}
      alt=""
    />

  </SplideSlide>

  {/each}
</Splide>
