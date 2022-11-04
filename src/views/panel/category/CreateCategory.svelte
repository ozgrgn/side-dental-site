<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Switch from "$components/Switch.svelte";
  import Image from "$components/Form/Image.svelte";

  let title = { tr: {}, en: {} };
  let name = { tr: {}, en: {} };
  let order = {};
  let heroImage = {};
  let mobileImage = {};
  let isActive = { tr: { value: true }, en: { value: true } };

  const addCategory = async () => {
    let data = {
      title: { tr: title["tr"].value, en: title["en"].value },
      name: { tr: name["tr"].value, en: name["en"].value },
      isActive: { tr: isActive["tr"].value, en: isActive["en"].value },
      order: order.value,
      heroImage: heroImage.value,
      mobileImage: mobileImage.value,
    };
    let response = await RestService.addCategory(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/categories");
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
        navigate("/panel/categories");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Kategori ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Kategori başlığı TR
                </label>

                <Input
                  bind:value={title["tr"].value}
                  bind:isValid={title["tr"].isValid}
                  placeholder={"Başlık"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Kategori başlığı EN
                </label>

                <Input
                  bind:value={title["en"].value}
                  bind:isValid={title["en"].isValid}
                  placeholder={"Başlık"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Kategori perma TR
                </label>

                <Input
                  bind:value={name["tr"].value}
                  bind:isValid={name["tr"].isValid}
                  placeholder={"Başlık"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-3/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Kategori perma EN
                </label>

                <Input
                  bind:value={name["en"].value}
                  bind:isValid={name["en"].isValid}
                  placeholder={"Başlık"}
                  required={true}
                />
              </div>
            </div>
            <div class="flex w-full lg:w-3/12 px-4">
              <div class="relative ml-4 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="rectangleBanner"
                >
                  TR Aktif mi ?
                </label>
                <Switch bind:value={isActive["tr"].value} />
              </div>
            </div>
            <div class="flex w-full lg:w-3/12 px-4">
              <div class="relative ml-4 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for="rectangleBanner"
                >
                  EN Aktif mi ?
                </label>
                <Switch bind:value={isActive["en"].value} />
              </div>
            </div>
            <div class="w-full lg:w-2/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Sıra
                </label>
                <NumberInput
                  bind:value={order.value}
                  bind:isValid={order.isValid}
                  placeholder={"Sıra"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="border relative w-full h-72 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2 ml-2"
                  for="rectangleBanner"
                >
                  Hero Image
                </label>
                <div class="flex h-full flex-col justify-center my-2">
                  <Image
                    bind:value={heroImage.value}
                    bind:isValid={heroImage.isValid}
                  />
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="border relative w-full h-72 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2 ml-2"
                  for="rectangleBanner"
                >
                  Mobile Image
                </label>
                <div class="flex h-full flex-col justify-center my-2">
                  <Image
                    bind:value={mobileImage.value}
                    bind:isValid={mobileImage.isValid}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-2">
              <button
                on:click={addCategory}
                disabled={!title["tr"].isValid || !name["tr"].isValid}
                class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                type="button"
              >
                {$Translate("Save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
