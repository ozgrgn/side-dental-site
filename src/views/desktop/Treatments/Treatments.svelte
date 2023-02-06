<script>
  import RestService from "$services/rest";
  import Input from "$components/Form/Input.svelte";
  import Svg from "../../../assets/svg.json";
  import TreatmentsDetail from "./TreatmentsDetail.svelte";
  import TreatmentsHero from "./TreatmentsHero.svelte";
  import {
    lang,
    treatments,
    translate,
    general,
  } from "../../../services/store";
  import { link } from "svelte-navigator";

  export let perma;

  let name;
  let email;
  let phone;
  let treatment;
  let treatmentPage;
  let contact;
  let formStatus = false;
  let warn = false;
  let sent;
  const getTreatment = async (perma) => {
    let response = await RestService.getTreatmentViaPerma(perma);
    treatment = response["treatment"];
    console.log(treatment, "treasssstments");
  };
  $: getTreatment(perma);
  const addRes = async () => {
    if (!name || !phone) {
      warn = true;
      return;
    }
    warn = false;
    formStatus = true;

    let date = new Date().toLocaleString("tr-TR");
    let bodyData = {
      lang: $lang,
      name,
      date,
      email,
      undefined,
      treatment:treatment._id,
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
  const getContacts = async () => {
    let response = await RestService.getContacts(undefined, undefined, $lang);

    contact = response["contacts"][0];
    console.log(contact, "contacts");
  };
  getContacts();
  const getTreatmentPages = async () => {
    let response = await RestService.getTreatmentPages(
      undefined,
      undefined,
      $lang
    );
    treatmentPage = response["treatmentPages"][0];
  };
  getTreatmentPages();
</script>

<div class="relative bg-dark-300 h-96 w-full z-10">
  <img
    class="absolute top-0 h-96 w-full opacity-10 right-0 object-cover z-1"
    src="/assets/img/treatments/back1.jpg"
    alt=""
  />
  {#if treatmentPage && treatment}
    <div class="absolute top-0 left-0 w-full">
      <div class="container mx-auto z-20">
        <TreatmentsHero {treatment} {treatmentPage} />
      </div>
    </div>
  {/if}
</div>
<div class="container mx-auto grid grid-cols-12">
  <div class="col-span-8 pt-10 w-5/6">
    <TreatmentsDetail {treatment} />
  </div>

  <div class="flex flex-col">
    <div
      class="right-menu w-72 lg:w-96 h-fit bg-light-300 rounded-md -mt-10 z-20"
    >
      <div class="text-4xl text-white w-16 border-b-4 border-white m-8 h-14">
        {#if $translate}
          <span class="-ml-1" />{$translate.treatments}
        {/if}
      </div>
      <div class="flex flex-col mx-8 text-white text-lg pb-4 ">
        {#if $treatments}
          {#each $treatments as t}
            <a
              use:link
              href="/treatments/{t.perma}"
              class="relative border-b border-white/50 font-semibold py-2 mx-2  last:border-none hover:before:content-[''] hover:before:absolute hover:before:h-[0.15rem] hover:before:bg-white hover:before:w-3 hover:before:-left-5 hover:before:top-[1.4rem] {perma ==
              t.perma
                ? "before:content-[''] before:absolute before:h-[0.15rem] before:bg-white before:w-3 before:-left-5 before:top-[1.4rem]"
                : ''}"
            >
              {t.title}
            </a>
          {/each}
        {/if}
      </div>
    </div>
    <div
      class="w-72 lg:w-96 my-10 border-8 border-dark-300/10 rounded-md flex flex-col p-8"
    >
      <div
        class="lg:text-3xl md:text-2xl font-medium tracking-tight text-light-300 border-b h-12"
      >
        {$translate.get_in_touch_with_us}
      </div>
      <div class="flex flex-col">
        <div class="flex py-6 z-10 border-b  ">
          <svg
            class="h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            ><title>Call</title><g id="Call" fill="#374151"
              >{@html Svg.emergency_call}</g
            ></svg
          >
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span
              class="lg:text-2xl md:text-xl tracking-tight text-light-300 leading-[1.5] "
              >{$translate.call_us_anytime}</span
            >
            <a
              href="tel:{$general.phone1}"
              class="lg:text-lg md:text-sm tracking-tight leading-[1] pb-1"
            >
              {$general.phone1}</a
            >
          </div>
        </div>
        <div class="flex py-6 z-10">
          <div class="w-20">
            <svg
              class="h-20 w-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 112"
              ><title>Call</title><g id="Call" fill="#374151"
                >{@html Svg.mail}</g
              ></svg
            >
          </div>
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span
              class="md:text-xl lg:text-2xl tracking-tight text-light-300 leading-[1.5] "
              >{$translate.mail_us}</span
            >
            <a
              href="mailto:{$general.email1}"
              class="text-sm lg:text-lg tracking-tight leading-[1] pb-1"
            >
              {$general.email1}
            </a>
          </div>
        </div>
      </div>
      <div
        class="lg:text-3xl md:text-2xl font-medium tracking-tight text-light-300 border-b h-12"
      >
        {$translate.book_an_appointment}
      </div>
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
        {name ? "" : $translate.name_required}
        {phone ? "" : $translate.phone_required}
      </div>
      <div class="flex gap-4 relative w-full mt-4 flex flex-col">
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={name}
          type="text"
          name="name"
          placeholder={$translate.name}
          autocomplete="name"
        />
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={email}
          placeholder={$translate.mail}
          type="email"
          autocomplete="email"
        />
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={phone}
          type="tel"
          name="tel"
          placeholder={$translate.phone}
          autocomplete="tel"
        />

        <button
        class="h-12 mt-2 bg-light-300 drop-shadow shadow-lg text-white active:bg-dark-300 disabled:bg-dark-300/30 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        disabled={formStatus}
          on:click={() => addRes()}

        >
          {$translate.send}
        </button>
      </div>
    </div>
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