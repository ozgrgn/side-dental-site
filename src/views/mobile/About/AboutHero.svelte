<script>
    import { link } from "svelte-navigator";
    import { translate } from "../../../services/store";
  
    export let about;
    console.log(about, "about");
  </script>
  
  <div class="flex text-lg text-white/90 pt-20">
    <a use:link href="/"> {$translate.homePage} </a>
    <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
    {$translate.about}

  </div>
  <div class=" mb-10">
    <div class="pr-6 pb-12 pt-14 ">
      <div class="text-light-300 text-4xl tracking-tight ">
        {about.about_spot}
      </div>

      <div class="text-white/90 font-semibold tracking-tight text-6xl">
        {about.about_title}
      </div>
    </div>
  </div>
  