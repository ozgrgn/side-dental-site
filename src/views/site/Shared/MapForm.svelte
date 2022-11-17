<script>
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  let name;
  let phone;
</script>

<div
  class="-ml-20 shadow-2xl bg-white h-[28rem] w-2/6 flex flex-col justify-center my-auto px-10"
>
  <div class="flex flex-col pl-3 text-white">
    <h3
    class="text-4xl text-light-300 border-b h-20 flex flex-col justify-center "
  >
    Write Us
  </h3>
  <div class="flex gap-4 relative w-full mt-5 grid grid-cols-2">
    <Input
      customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
      bind:value={name}
      placeholder={"Your Name"}
      required={true}
    />

    <Input
      customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
      bind:value={phone}
      placeholder={"Your phone number"}
      required={true}
    />
<div class="col-span-2">
  <Textarea
  customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
  bind:value={phone}
  placeholder={"Your message"}
  required={true}
/>
</div>
  </div>
  <button
  class="h-12 mt-2 bg-light-300 drop-shadow shadow-lg text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
  type="button"
>
  SEND
</button>
  </div>
</div>
