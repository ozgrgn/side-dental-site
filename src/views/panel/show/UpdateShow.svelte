<script>
  import Date from "$components/Form/Date.svelte";
  import Image from "$components/Form/Image.svelte";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { useParams } from "svelte-navigator";
  const params = useParams();
  let show;

  let values = [
    { key: "title", customValue: null },
    { key: "perma", customValue: null },
    { key: "description", customValue: null },
    { key: "verticalBanner", customValue: null },
    { key: "horizontalBanner", customValue: null },
    { key: "isActive", customValue: null },
  ];

  onMount(() => {
    getShow();
  });

  const getShow = async () => {
    let response = await RestService.getShow($params.showId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["show"][v.key] = {
            value: response["show"][v.key][v.customValue],
          };
        } else {
          response["show"][v.key] = { value: response["show"][v.key] };
        }
      });
      show = {
        ...response["show"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const updateShow = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = show[v.key]?.value;
    });

    let response = await RestService.updateShow($params.showId, data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/shows");
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
        navigate("/panel/shows");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Etkinlik ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if show}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Etkinlik
                </label>

                <Input
                  bind:value={show.title.value}
                  bind:isValid={show.title.isValid}
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
                  Etkinlik perma (url için)
                </label>

                <Input
                  bind:value={show.perma.value}
                  bind:isValid={show.perma.isValid}
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
                  Etkinlik kısa açıklama
                </label>

                <Textarea
                  bind:value={show.description.value}
                  bind:isValid={show.description.isValid}
                  placeholder={"Kısa açıklama"}
                  required={true}
                />
              </div>
            </div>

            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="backgroundBanner"
                >
                  Dikey afiş
                </label>

                <Image
                  bind:value={show.verticalBanner.value}
                  bind:isValid={show.verticalBanner.isValid}
                />
              </div>
            </div>

            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="rectangleBanner"
                >
                  Yatay afiş
                </label>

                <Image
                  bind:value={show.horizontalBanner.value}
                  bind:isValid={show.horizontalBanner.isValid}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="rectangleBanner"
                >
                  Aktif mi ?
                </label>

                <Switch bind:value={show.isActive.value} />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-2">
              <button
                on:click={updateShow}
                disabled={!show.title.isValid ||
                  !show.perma.isValid ||
                  !show.description.isValid}
                class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                type="button"
              >
                {$Translate("Update")}
              </button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
