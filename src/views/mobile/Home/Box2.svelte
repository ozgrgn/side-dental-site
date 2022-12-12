<script>
  import Input from "$components/Form/Input.svelte";
export let header;
  let name;
  let phone;
</script>

<div class=" bg-light-300 rounded-lg flex flex-col shadow-2xl mx-4 pt-5">
  <h3
    class="text-3xl text-white border-b h-24 flex flex-col justify-center mx-14  "
  >
    {header}
  </h3>
  <div class="w-full flex shadow-2xl ">

    <div class="w-full px-12 py-2">
   
      <div class="flex flex-col gap-4 relative w-full my-10 ">
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={name}
          placeholder={"Your Name"}
          required={true}
        />

        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={phone}
          placeholder={"Your phone number"}
          required={true}
        />

        <button
          class="h-12 bg-white drop-shadow shadow-2xl text-light-300 active:bg-light-300 active:text-dark-300  text-sm font-bold uppercase  rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          SEND
        </button>
      </div>
    </div>
  </div>
</div>

