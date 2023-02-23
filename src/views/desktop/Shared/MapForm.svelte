<script>
    import RestService from "$services/rest";

  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import { translate,lang } from "$services/store";
  export let treatment

  let name;
  let phone;
  let message;
  let contact;
  let formStatus = false;
  let warn = false;
  const getContacts = async () => {
    let response = await RestService.getContacts(undefined, undefined, $lang);

    contact = response["contacts"][0];
    console.log(contact, "contacts");
  };
  $: getContacts($lang);

  const addRes = async () => {
    if (!name || !phone) {
      warn = true;
      return;
    }
    warn = false;
    formStatus = true;

  treatment="Genel"
    let date = new Date().toLocaleString("tr-TR");
    let bodyData = {
      lang:$lang,
      name,
      date,
      phone,
      message,
      treatment
    };
    console.log(bodyData,"bodydata")
    let addResResponse = await RestService.addRes(bodyData)
    console.log(addResResponse, "addResResponse");
    addResResponse = addResResponse["permissionGroups"];
  };
</script>

<div
  class="lg:-ml-20 shadow-2xl bg-white h-[28rem] lg:w-2/6 m-4 flex flex-col justify-center lg:my-auto px-10"
>
  <div class="flex flex-col pl-3 text-dark-300">
    {#if $translate && contact && !formStatus}
      <h3
        class="text-4xl text-light-300 border-b h-20 flex flex-col justify-center "
      >
        {$translate.write_us}
      </h3>
    {/if}
    <form class="contact__form">
      <div
        class="alert alert-success contact__msg {formStatus == true
          ? ''
          : 'hidden'}"
        role="alert"
      >
       {contact?.description}
      </div>
      <div
        class="alert-warn text-lg contact__msg {warn == true ? '' : 'hidden'}"
        role="alert"
      >
        {name?"":$translate.name_required}
        {phone?"":$translate.phone_required}
      </div>
      {#if !formStatus}
    <div class="flex gap-4 relative w-full mt-5 grid grid-cols-2">
      <Input
        customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
        bind:value={name}
        type="text"
        name="name"
        placeholder={$translate.name}
        autocomplete="name"
      />

      <Input
        customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
        bind:value={phone}
        type="tel"
        name="tel"
        placeholder={$translate.phone}
        autocomplete="tel"
      />
      <div class="col-span-2">
        <Textarea
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-md"
          bind:value={message}
          placeholder={$translate.note}
        />
      </div>
    </div>
    <button
    on:click={addRes}

      class="h-12 mt-2 bg-light-300 drop-shadow shadow-lg text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
    >
      {$translate.send}
    </button>
    {/if}
    </form>
  </div>
</div>
<style>

  .alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    text-align: center;
  }
  .alert {
    width: 100%;
    text-align: center;
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  .alert-warn {

    text-align: center;
    position: relative;
    color: red;
  }

</style>
