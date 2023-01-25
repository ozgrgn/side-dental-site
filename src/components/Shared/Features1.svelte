<script>
  export let title;
  export let description;
  export let icon;
  export let titleClass;
  export let iconColor;
</script>
<div class=" grid grid-cols-5 gap-2 pt-6">
  <div class="col-span-1">
    <svg
      class="h-fit "
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill={iconColor}
    >
      {@html icon}
    </svg>
  </div>
  <div class="col-span-3 flex flex-col ">
    <h2 class="text-[1.125rem] leading-5  {titleClass} ">{title}</h2>
    <p class="text-md w-52 font-thin pt-1 leading-5">
        {description}
    </p>
  </div>
</div>
