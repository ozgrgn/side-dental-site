<script>
  import RestService from "$services/rest";

  import AItem from "./AItem.svelte";
  import { useLocation, navigate, link } from "svelte-navigator";
  import Svg from "../../../assets/svg.json";
  import Top from "./Top.svelte";
  import LangSelect from "$components/Form/LangSelect.svelte";
  import { langs, lang, translate, general } from "../../../services/store";
  import { Modal } from "svelte-simple-modal";
  let y;
  $: removeSidebar(y);

  const removeSidebar = (y) => {
    active = false;
  };

  const location = useLocation();
  console.log(location, "location");
  $: {
    if ($location) {
      window.scrollTo(0, 0);
    }
  }
  const langTrigger = (_lang) => {
    document.documentElement.setAttribute("lang", _lang);
    setTimeout(() => {
      lang.set(_lang);
      // window.location.reload();
    }, 1); // cause svelte is faster than browser
  };
  let active = false;

  const changeNavStatus = () => {
    setTimeout(() => {
      active = !active;
    }, 50);
  };

  let hover;
  let treatments;
  const getTreatments = async () => {
    let response = await RestService.getTreatments(
      undefined,
      undefined,
      $lang,
      true,
      undefined
    );
    treatments = response["treatments"];
  };
 $: getTreatments($lang);
</script>

<svelte:window bind:scrollY={y} />
<div class="	">
  <div
    class="sticky top-0 left-0 z-[20] text-dark-400 lg:h-16  {$location.pathname ==
    '/'
      ? 'bg-white box-shadow shadow-lg'
      : $location.pathname == '/about'
      ? 'border-t  container mx-auto'
      : ''}"
  >
    <div class="absolute top-2 right-2 z-[100000] ">
      {#if $langs}
        <LangSelect
          value={$lang}
          change={(value) => langTrigger(value)}
          values={$langs}
          title={$translate.language}
          valuesKey={"lang"}
          valuesTitleKey={"lang"}
          required={false}
          customClass={"uppercase w-20 appearance-none w-full  shadow-none bg-white border border-transparent rounded-md pl-3 text-light-300 focus:outline-none focus:ring-white focus:border-white sm:text-sm lg:text-lg"}
        />
      {/if}
    </div>
    <div class="relative mobile lg:hidden grid h-full grid-cols-11 ">
      <div
        class="{active
          ? 'opacity-50'
          : 'opacity-0 invisible'} transition ease-in-out delay-150  "
      >
        <div
          class="absolute top-[4rem] w-screen h-screen bg-black  "
          on:click={() => changeNavStatus()}
        />
      </div>
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
            fill="#bc74a5"
            viewBox="0 0 16 16"
          >
            {@html !active ? Svg.openedToggle : ""}
          </svg>
        </button>
      </div>
      <div class="flex" />
      <div class="flex items-center justify-center h-full col-span-4">
        <img
          on:click={() => navigate("/")}
          on:keydown={() => navigate("/")}
          src={$general.logo1}
          class="h-16"
          alt=""
        />
      </div>

      <div
        class="flex items-center gap-2 w-full justify-end pr-2 h-full col-span-6 bg-white"
      />
    </div>
  </div>
</div>

<div
  class="lg:hidden {active ? 'visible' : 'invisible'} top-20 aside-container "
  class:active
>
  <aside
    class="bg-white fixed transition-all duration-1000 z-[1000] top-0 bottom-20 "
  >
    <div class="menu flex flex-col mb-10 mx-4">
      <div class="flex justify-between">
        <div class="flex items-center justify-center h-full col-span-4">
          <img
            on:click={() => navigate("/")}
            on:keydown={() => navigate("/")}
            src={$general.logo1}
            class="h-16"
            alt=""
          />
        </div>

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
              fill="#bc74a5"
              viewBox="0 0 16 16"
            >
              {@html active ? Svg.closedToggle : ""}
            </svg>
          </button>
        </div>
      </div>
      {#if $translate}
        <a
          use:link
          class="flex items-center px-2 w-full h-[2rem] bg-white"
          active={$location.pathname == "/"}
          href={"/"}
          on:click={() => changeNavStatus()}
          >{$translate.homePage}
        </a>
        <a
          use:link
          on:click={() => changeNavStatus()}
          class="flex items-center px-2 w-full h-[2rem] bg-white"
          active={$location.pathname == "/about"}
          href={"/about"}>{$translate.about}</a
        >
        <span class="flex items-center px-2 w-full h-[2rem] bg-white">
          {$translate.treatments}</span
        >
        {#if treatments}
          {#each treatments as treatment}
            <a
              use:link
              on:click={() => changeNavStatus()}
              active={$location.pathname == "/about"}
              href={"/treatments/" + treatment.perma}
              class="flex items-center pl-5 w-full h-[2rem] bg-white"
            >
              {treatment.title}</a
            >
          {/each}
        {/if}
        <a
          use:link
          on:click={() => changeNavStatus()}
          class="flex items-center px-2 w-full h-[2rem] bg-white"
          active={$location.pathname == "/contact"}
          href={"/contact"}>{$translate.contact}</a
        >
      {/if}

      <div
        class="flex items-center gap-6 h-full pt-6 {$location.pathname == '/'
          ? 'bg-white'
          : 'bg-transparent'}"
      >
        <a href={"/" + $general.facebook} target="_blank">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#bc74a5"
          >
            {@html Svg.facebook}
          </svg>
        </a>
        <a href={"/" + $general.instagram} target="_blank">
          <svg
            class="h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#bc74a5"
          >
            {@html Svg.instagram}
          </svg>
        </a>
        <a href={"/" + $general.youtube} target="_blank">
          <svg
            class="h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#bc74a5"
          >
            {@html Svg.youtube}
          </svg>
        </a>
        <a href={$general.whatsapp} target="_blank">
          <svg
            class="h-5 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#bc74a5"
          >
            {@html Svg.whatsapp}
          </svg>
        </a>
      </div>
    </div>
  </aside>
</div>

<style>
  .aside-container {
    position: fixed;
    left: -100vh;

    width: 80%;
    z-index: 999;
  }
  .active {
    left: 0px;
    transition: all 1s;
  }
</style>
