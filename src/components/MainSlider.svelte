<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";

</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    arrows: false,
    pagination: false,
  }}
>
  <SplideSlide>
    <img
      class="h-[calc(100vh-160px)] md:h-100 w-auto object-cover "
      src="/assets/bg-1.jpg"
      alt=""
    />
  </SplideSlide>
  <SplideSlide>
    <img src="assets/bg-1.jpg" alt="" />
  </SplideSlide>
</Splide>
