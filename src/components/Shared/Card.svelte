<script>
  import Popup from "$components/Popup.svelte";
  import { modal1, translate } from "$services/store";
  import { bind } from "svelte-simple-modal";

  export let treatment;
</script>

{#if treatment}
  <a href="/treatments/{treatment?.perma}" class="flex flex-col relative rounded-md">
    <img
      class="w-full rounded-t-md "
      src={treatment?.images[0]?.image}
      alt=""
    />
    <div
      class="absolute shadow-2xl drop-shadow rounded-md bg-white 2xl:top-52 xl:top-40 lg:top-32 top-48 left-8 lg:h-20 lg:w-20 h-20 w-20 flex flex-col justify-center items-center"
    >
      {@html treatment.icon}
    </div>
    <div class="h-52 w-full bg-light-300 pt-12 xl:px-7 px-2 rounded-b-md">
      <h2
        class=" text-[1.5rem] xl:pt-3 lg:pt-2 pt-2 text-white tracking-tight leading-6"
      >
        {treatment.title}
      </h2>
      <p class="text-white text-sm pt-3">
        {treatment.shortDesc}
      </p>
      <div class="flex justify-center">
        <button
        on:click={() => {
          modal1.set(
           bind (Popup, {treatment:treatment._id
            })
          );
        }}
          class="absolute md:hidden h-8 bottom-2 bg-white drop-shadow shadow-2xl text-light-300 active:bg-dark-300 text-xs font-bold uppercase px-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          {$translate.book}
        </button>
      </div>
    </div>
  </a>
{/if}
