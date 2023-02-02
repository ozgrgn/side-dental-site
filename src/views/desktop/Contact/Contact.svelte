<script>
  import RestService from "$services/rest";
  import { link } from "svelte-navigator";
  import { translate } from "../../../services/store";
  import Svg from "../../../assets/svg.json";
  import Map from "../Shared/Map.svelte";
  import { lang,general } from "../../../services/store";
  let contact;
  const getContacts = async () => {
    let response = await RestService.getContacts(undefined, undefined, $lang);

    contact = response["contacts"][0];
    console.log(contacts, "contacts");
  };
  getContacts();
</script>

<div class="relative bg-dark-300 h-96 w-full z-10">
  <img
    class="absolute top-0 h-96 w-full opacity-10 right-0 object-cover z-1"
    src="/assets/img/contact/back2.jpg"
    alt=""
  />
  {#if contact && $translate}
    <div class="container mx-auto">
      <div class="flex text-lg text-white/90 pt-20 ">
        <a use:link href="/"> {$translate.homePage} </a>
        <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
        {$translate.contact}
      </div>

      <div
        class="text-6xl text-white/90 tracking-tight w-fit pt-8 border-b-4 border-light-300/80 h-28 "
      >
        <span class="">{contact.header}</span>
      </div>
      <div class="relative text-white/90 w-1/2 pt-8 z-[1000]">
        {@html contact.text}
      </div>
    </div>{/if}
</div>


<div class="container mx-auto">
  <div class="flex flex-col">
    <div class="flex justify-center pb-10 pt-20">
      {#if contact}
        <div class="text-6xl font-bold tracking-tight text-light-300">
          {contact.spot}
        </div>
        <h1 class="pl-2 text-6xl font-bold tracking-tight text-dark-300">
          {contact.title}
        </h1>
      {/if}
    </div>
    <div class="flex justify-center">
      {#if contact}
        <p class="lg:w-1/2 px-10 text-center">
          {contact.description}
        </p>
      {/if}
    </div>
    <div class="flex justify-center my-10">
      <div class="lg:w-2/3 grid grid-cols-4 gap-1 h-32 ">
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                ><g fill="#374151">{@html Svg.emergency_call}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight  text-light-300 leading-[1.5] "
                  >{$translate.emergency_line}</span
                >
                <p class="flex flex-col justify-center h-8 ">
                  <span class="text-md tracking-tight leading-[1]">
                    <a href="tel:{$general.phone1}">
                      {$general.phone1}
                    </a></span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                ><g fill="#374151">{@html Svg.location}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5]"
                  >{$translate.address}</span
                >
                <p class="flex flex-col justify-center h-8 ">
                  <span class="text-sm tracking-tight leading-[1]">
                    {$general.address1} <br /> {$general.address2}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 92"
                ><g fill="#374151">{@html Svg.schedule}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5] "
                  >{$translate.book_by_phone}</span
                >
                <p class="flex flex-col justify-center h-8">
                  <a href="tel:{$general.phone2}">
                    {$general.phone2}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 92"><g fill="#374151">{@html Svg.mail}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5] "
                  >{$translate.mail_us}</span
                >
                <p class="flex flex-col justify-center h-8">
                  <a href="mailto:{$general.email1}"> {$general.email1}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="pb-16 mt-20 bg-dark-100">
  <Map title={false} mapBox="mapForm" />
</div>
