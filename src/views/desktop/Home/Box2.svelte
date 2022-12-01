<script>
  import Input from "$components/Form/Input.svelte";
export let header;
export let text;
  let name;
  let phone;
</script>

<div class="w-full bg-white rounded-lg flex flex-col shadow-2xl">
  <h3
    class="text-4xl text-light-300 border-b h-20 flex flex-col justify-center mx-16 "
  >
    {header}
  </h3>
  <div class="w-full flex shadow-2xl ">
    <img class="h-52 ml-12 my-10" src="assets/img/img-booking.png" alt="" />

    <div class="w-full px-12 py-10">
      <div class="">
        {text}
      </div>
      <div class="flex gap-4 relative w-full my-10 grid grid-cols-3">
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
          class="h-12 bg-light-300 drop-shadow shadow-2xl text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          SEND
        </button>
      </div>
    </div>
  </div>
</div>

