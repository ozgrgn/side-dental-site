<script>
  export let title;
  export let description;
  export let icon;
</script>

<div class="grid grid-cols-4 gap-2 w-84 pt-6">
  <div class="col-span-1">
    <svg
      class="h-fit"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill="#3b3c3f"
    >
      {@html icon}
    </svg>
  </div>
  <div class="col-span-3 flex flex-col ">
    <h2>{title}</h2>
    <p class="text-sm font-thin pt-1">
        {description}
    </p>
  </div>
</div>
