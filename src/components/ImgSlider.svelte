<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";
  export let images;
  console.log(images,"iamrgewr")
  export let customClass;
  export let perPage=4
  </script>
  
  <Splide
    aria-label="My Favorite Images"
    options={{
      perPage: perPage,
      type: "loop",
      arrows: false,
      autoplay: true,
      interval: 3000,
    }}
  > 
  {#each images as image}
    <SplideSlide>

     <img class="{customClass}" src={image.image} alt="">
    </SplideSlide>
   {/each}
  </Splide>
  