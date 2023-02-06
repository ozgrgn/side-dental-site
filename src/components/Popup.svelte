<script>
  import RestService from "$services/rest";
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import { translate, lang } from "$services/store";
  export let treatment
  let contact;
  let formStatus = false;
  let warn = false;
  let sent;
  const getContacts = async () => {
    let response = await RestService.getContacts(undefined, undefined, $lang);

    contact = response["contacts"][0];
    console.log(contact, "contacts");
  };
  getContacts();
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
      lang: $lang,
      name,
      date,
      undefined,
      undefined,
      treatment,
      phone,
      message,
      undefined,
    };
    let addResResponse = await RestService.addRes(bodyData);
    if (addResResponse && addResResponse["status"]) {
      sent = true;
    }
    console.log(addResResponse, "addResResponse");
  };

  let name;
  let phone;
  let message;
</script>
{#if contact}
  <div class="">


    <h2 class="text-2xl text-light-300 py-10 text-center">
      {$translate.book_an_appointment}
    </h2>
    <form class="contact__form">
      <div
        class="alert alert-success contact__msg {formStatus == true
          ? ''
          : 'hidden'}"
        role="alert"
      >
       {contact.description}
      </div>
      <div
        class="alert-warn text-lg contact__msg {warn == true ? '' : 'hidden'}"
        role="alert"
      >
        {name?"":$translate.name_required}
        {phone?"":$translate.phone_required}
      </div>
      <ul class="flex flex-col gap-4 {formStatus == true ? "hidden" : ""}">
        <li>
          <Input
          customClass="h-12 text-lg placeholder:text-lg shadow-md"
            type="text"
            name="name"
            placeholder={$translate.name}
            autocomplete="name"
            bind:value={name}
          />
        </li>
        <li>
          <Input
          customClass="h-12 text-lg placeholder:text-lg shadow-md"

            type="tel"
            name="tel"
            placeholder={$translate.phone}
            autocomplete="tel"
            bind:value={phone}
          />
        </li>
        <li>
            <Textarea
            customClass="h-12 text-lg placeholder:text-lg shadow-md"
            bind:value={message}
            placeholder={$translate.note}
            required={false}
          />
        </li>

        <button
          type="button"
          class="h-12 mt-2 bg-light-300 drop-shadow shadow-lg text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          on:click={() => addRes()}
        >
          {$translate.send}</button
        >

        <li />
      </ul>
    </form>

  </div>
  {/if}
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
