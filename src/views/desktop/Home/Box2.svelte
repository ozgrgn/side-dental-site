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
  export let text;
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

<div class="w-full bg-white rounded-lg flex flex-col shadow-2xl">
  <h3
    class="text-4xl text-light-300 border-b h-20 flex flex-col justify-center mx-16 "
  >
    {header}
  </h3>
  {#if $translate && contact}
    <div class="w-full flex shadow-2xl ">
      <img class="h-52 ml-12 my-10" src="assets/img/img-booking.png" alt="" />

      <div class="w-full px-12 py-10">
        <div class="">
          {text}
        </div>
        <div class="flex gap-4 relative w-full my-10 grid grid-cols-3">
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
            class="h-12 bg-light-300 drop-shadow shadow-2xl text-white active:bg-dark-300 disabled:bg-dark-300/30 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    </div>
  {/if}
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

    border: 1px solid transparent;
    border-radius: 0.25rem;
  }
  .alert-warn {
    position: relative;
    color: red;
  }
</style>
