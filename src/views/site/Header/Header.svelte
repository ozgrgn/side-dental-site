<script>
  import AItem from "./AItem.svelte";
  import { useLocation, link, navigate } from "svelte-navigator";
  import Svg from "../../../assets/svg.json";
  import Top from "./Top.svelte";

  const location = useLocation();
  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }

  let active = false;
  let drawerOpen = false;
  const changeNavStatus = () => {
    setTimeout(() => {
      active = !active;
    }, 50);
  };
  const drawerToggle = () => {
    drawerOpen = !drawerOpen;
  };
  let hover;
</script>
<div class="	">
<Top />
<div
  class="sticky top-0 left-0 z-[20] text-dark-400 lg:h-16 {$location.pathname=="/"? "bg-white box-shadow shadow-lg":"bg-transparent border-t"}"
>
  <div class="mobile lg:hidden grid h-full grid-cols-11">
    <div class="flex items-center p-2">
      <button
        on:click={(event) => {
          event.stopPropagation();
          changeNavStatus();
        }}
        class="flex items-center px-2 py-2 border rounded text-black border-black "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill=#bc74a5
          viewBox="0 0 16 16"
        >
          {@html !active ? Svg.openedToggle : Svg.closedToggle}
        </svg>
      </button>
    </div>

    <div class="flex items-center justify-center h-full col-span-4">
      <img
        on:click={() => navigate("/")}
        on:keydown={() => navigate("/")}
        src="assets/img/logos/side-smile-logo.png"
        class="h-16"
        alt=""
      />
    </div>

    <div
      class="flex items-center gap-2 w-full justify-end pr-2 h-full col-span-6 "
    />
  </div>

  <div
    class="desktop hidden container lg:flex xl:container items-center flex-row text-dark-400 h-full w-full mx-auto z-[20] {$location.pathname=="/"? "bg-white":"bg-transparent"} "
  >
    <div
      class="hidden items-center lg:flex basis-8/12 gap-8 h-full relative {$location.pathname=="/"? "bg-white":"bg-transparent"} "
    >
      <AItem active={$location.pathname == "/"} path="/">Ana Sayfa</AItem>
      <AItem active={$location.pathname == "/about"} path="/about"
        >Hakkımızda</AItem
      >
      <AItem active={$location.pathname == "/treatments"} path="/treatments"
        >Tedaviler</AItem
      >
      <AItem active={$location.pathname == "/contact"} path="/contact"
        >Contact</AItem
      >
    </div>

    <div
      class="hidden lg:flex items-center justify-end basis-4/12 gap-4 relative h-full {$location.pathname=="/"? "bg-white":"bg-transparent"}"
    >
      <svg
        class="h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill=#bc74a5
      >
        {@html Svg.facebook}
      </svg>
      <svg
        class="h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill=#bc74a5
      >
        {@html Svg.instagram}
      </svg>
      <svg
        class="h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#bc74a5"
      >
        {@html Svg.youtube}
      </svg>
      <svg
      class="h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill=#bc74a5
    >
      {@html Svg.whatsapp}
    </svg>
    </div>
  </div>
</div>
</div>

<div
  class="lg:hidden {active ? 'visible' : 'invisible'} top-20 aside-container"
  class:active
>
  <aside
    class="bg-white fixed w-[80%] transition-all duration-1000 z-[1000] top-20 bottom-20 "
  >
    <div class="menu flex flex-col h-full mb-10">
      {#each Array(4) as _, i}
        <a
          class="flex items-center px-2 w-full h-[3rem] bg-white"
          href={"/slot"}>Slot</a
        >
        <a
          class="flex items-center px-2 w-full h-[3rem] bg-white"
          href={"/casino"}>Casino</a
        >
      {/each}
    </div>
  </aside>
</div>

<style>
  .aside-container {
    position: fixed;
    left: -100vh;
    height: 100%;
    width: 100%;
    z-index: 999;
  }
  .active {
    left: 0px;
    transition: all 1s;
  }
</style>
