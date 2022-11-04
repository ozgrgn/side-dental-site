<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import Features1 from "./Drafts/Features1.svelte";
  import Svg from "../assets/svg.json";
  import "@splidejs/svelte-splide/css";
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    perPage: 2,
    type: "loop",

    arrows: false,
    autoplay: true,
    width:600,
    interval: 3000,
  }}
>
  <SplideSlide>
    <Features1
      icon="{Svg.tooth_whitening} "
      title="Tooth Whitening"
      description="Competently parallel task researched data and process improvements."
    />
  </SplideSlide>
  <SplideSlide>
    <Features1
      icon="{Svg.tooth_whitening} "
      title="Tooth Whitening"
      description="Competently parallel task researched data and process improvements."
    />
  </SplideSlide>
  <SplideSlide>
    <Features1
      icon="{Svg.tooth_whitening} "
      title="Tooth Whitening"
      description="Competently parallel task researched data and process improvements."
    />
  </SplideSlide>
  <SplideSlide>
    <Features1
      icon="{Svg.tooth_whitening} "
      title="Tooth Whitening"
      description="Competently parallel task researched data and process improvements."
    />
  </SplideSlide>
</Splide>
