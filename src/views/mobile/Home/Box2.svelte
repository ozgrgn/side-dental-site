<script>
  import { translate, lang } from "../../../services/store";
  import RestService from "$services/rest";

  import Input from "$components/Form/Input.svelte";
  let contact;
  let treatment;
  let sent;
  let warn;
  let formStatus;
  const getContacts = async () => {
    let response = await RestService.getContacts(undefined, undefined, $lang);

    contact = response["contacts"][0];
    console.log(contact, "contacts");
  };
  getContacts();
  export let header;
  let name;
  let phone;
  const addRes = async () => {
    if (!name || !phone) {
      warn = true;
      return;
    }
    warn = false;
    formStatus = true;

    treatment = "Genel";

    let date = new Date().toLocaleString("tr-TR");
    let bodyData = {
      lang: $lang,
      name,
      date,
      undefined,
      undefined,
      treatment,
      phone,
      undefined,
      undefined,
    };
    let addResResponse = await RestService.addRes(bodyData);
    if (addResResponse && addResResponse["status"]) {
      sent = true;
    }
    console.log(addResResponse, "addResResponse");
  };
</script>

<div class=" bg-light-300 rounded-lg flex flex-col shadow-2xl mx-4 pt-5">
  <h3
    class="text-2xl text-white border-b h-24 flex flex-col justify-center mx-14  "
  >
    {header}
  </h3>
  <div class="w-full flex shadow-2xl ">
    {#if $translate && contact}
      <div class="w-full px-12 py-2">
        <div class="flex flex-col gap-4 relative w-full my-10 ">
          <Input
            customClass="h-12  shadow-md"
            type="text"
            name="name"
            placeholder={$translate.name}
            autocomplete="name"
            bind:value={name}
          />
          <Input
            customClass="h-12  shadow-md"
            type="tel"
            name="tel"
            placeholder={$translate.phone}
            autocomplete="tel"
            bind:value={phone}
          />

          <button
            on:click={() => addRes()}
            class="h-12 bg-white drop-shadow shadow-2xl text-light-300 active:bg-light-300 disabled:bg-dark-300/30 disabled:text-white active:text-dark-300  text-sm font-bold uppercase  rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
            type="button"
            disabled={formStatus}
          >
            {$translate.send}
          </button>
        </div>
        <div
          class="alert-warn text-sm contact__msg {warn == true ? '' : 'hidden'}"
          role="alert"
        >
          {name ? "" : $translate.name_required}
          {phone ? "" : $translate.phone_required}
        </div>
        <div
          class="alert alert-success contact__msg {formStatus == true
            ? ''
            : 'hidden'}"
          role="alert"
        >
          {contact.description}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .alert-success {
    color: white;

    text-align: center;
  }
  .alert {
    width: 100%;
    text-align: center;
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-top: -25px;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  .alert-warn {
    text-align: center;
    position: relative;
    color: white;
    margin-top: -25px;

  }
</style>
