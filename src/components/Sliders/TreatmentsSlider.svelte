<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import { treatments } from "../../services/store";

    import "@splidejs/svelte-splide/css";
  import Card from "$components/Shared/Card.svelte";
  console.log($treatments,"sliderdaki treatments")
  </script>
  
  <Splide
    aria-label="My Favorite Images"
    options={{
       perPage: 4,
            breakpoints: {
              1028: {
                perPage: 3,
              },
              640: {
                perPage: 2,
              },
            },
      type: "slide",
      arrows: false,
      autoplay: true,
      pagination: false,
      interval: 3000,
    }}
  >
    {#if $treatments}
      {#each $treatments as treatment}
        <SplideSlide>
            <div class="px-2">
            <Card treatment={treatment}/></div>
        </SplideSlide>
      {/each}
    {/if}
  </Splide>
  