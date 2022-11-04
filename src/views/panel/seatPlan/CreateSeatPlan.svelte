<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";
  import Select from "$components/Form/Select.svelte";
  import PlanEditor from "./PlanEditor.svelte";

  let venues;
  let title = {};
  let blocksSVG = {};
  let venue = {};
  let plan = [];

  onMount(() => {
    getVenues();
  });

  const getVenues = async () => {
    let getVenuesResponse = await RestService.getVenues();

    venues = getVenuesResponse["venues"];
  };

  const addSeatPlan = async () => {
    let data = {
      venue: venue.value,
      title: title.value,
      plan,
      blocksSVG: blocksSVG.value,
    };
    let response = await RestService.addSeatPlan(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/seatPlans");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/seatPlans");
      }}
    >
      <i class="fa fa-arrow-left" />
      {$Translate("Back")}
    </button>
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Oturma planı ekle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-2 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Oturma planı başlığı
              </label>

              <Input
                bind:value={title.value}
                bind:isValid={title.isValid}
                placeholder={"Başlık"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Blok svg
              </label>

              <Textarea
                bind:value={blocksSVG.value}
                bind:isValid={blocksSVG.isValid}
                placeholder={"Blok svg"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block text-blueGray-600 text-xs font-bold mb-2"
                for=""
              >
                Mekan
              </label>

              {#if venues}
                <Select
                  bind:value={venue.value}
                  bind:isValid={venue.isValid}
                  values={venues}
                  title={"Mekan seçiniz"}
                  valuesKey={"_id"}
                  valuesTitleKey={"title"}
                  customClass={"w-full border-0"}
                />
              {/if}
            </div>
          </div>

          <div class="w-full relative">
            <PlanEditor bind:plan />
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addSeatPlan}
              disabled={!title.isValid || !blocksSVG.isValid || !venue.isValid}
              class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
              type="button"
            >
              {$Translate("Save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
