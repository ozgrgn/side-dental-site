<script>
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";

  let events;

  let values = [
    { key: "title", customValue: null },
    { key: "name", customValue: null },
    { key: "event", customValue: null },
    { key: "price", customValue: null },
  ];

  onMount(() => {
    getEvents();
  });

  const getEvents = async () => {
    let getEventsResponse = await RestService.getEvents(undefined, undefined);

    events = getEventsResponse["events"];
  };

  let level = {};

  values.map((v) => {
    if (v.defaultValue) {
      level[v.key] = { value: v.defaultValue };
    } else {
      level[v.key] = {};
    }
  });

  const addLevel = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = level[v.key]?.value;
    });
    let response = await RestService.addLevel(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/levels");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/levels");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Fiyat ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Fiyat başlığı
              </label>

              <Input
                bind:value={level.title.value}
                bind:isValid={level.title.isValid}
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
                Fiyat perma
              </label>

              <Input
                bind:value={level.name.value}
                bind:isValid={level.name.isValid}
                placeholder={"Perma"}
                required={true}
              />
            </div>
          </div>

          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for=""
              >
                Satışta etkinlik
              </label>

              {#if events}
                <Select
                  bind:value={level.event.value}
                  bind:isValid={level.event.isValid}
                  values={events}
                  title={"Etkinlik seç"}
                  valuesKey={"_id"}
                  valuesTitleKey={"title"}
                  customClass={"w-full border-0"}
                />
              {/if}
            </div>
          </div>

          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Fiyat
              </label>

              <NumberInput
                bind:value={level.price.value}
                bind:isValid={level.price.isValid}
              />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addLevel}
              disabled={!level.title.isValid ||
                !level.name.isValid ||
                !level.price.isValid ||
                !level.event.isValid}
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
