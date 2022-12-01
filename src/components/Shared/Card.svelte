<script>
  export let treatment;
</script>

<div class="flex flex-col relative rounded-md">
  <img class="w-full rounded-t-md " src={treatment.images[0].image} alt="" />
  <div
    class="absolute shadow-2xl drop-shadow rounded-md bg-white 2xl:top-52 xl:top-40 lg:top-32 top-24 left-8 lg:h-20 lg:w-20 h-14 w-14 flex flex-col justify-center items-center"
  >
    {@html treatment.icon}
  </div>
  <div class="h-52 w-full bg-light-300 pt-12 xl:px-7 px-2 rounded-b-md">
    <h2 class="xl:text-3xl lg:text-3xl text-2xl xl:pt-3 lg:pt-2 text-white tracking-tight">
      {treatment.title}
    </h2>
    <p class="text-white text-sm pt-3">
      {treatment.shortDesc}
    </p>
  </div>
</div>
