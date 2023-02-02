<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import TextEditor from "$components/Form/TextEditor.svelte";
  import Image from "$components/Form/Image.svelte";
  import Switch from "$components/Switch.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  let platform = [{ key: "Google" }, { key: "TrustPilot" }];

  let values = [ 
    { key: "lang", customValue: null },
    { key: "reviewName", customValue: null },
    { key: "reviewDate", customValue: null },
    { key: "reviewPlatform", customValue: null },
    { key: "reviewText", customValue: null },
    { key: "reviewStars", customValue: null },
    { key: "reviewLink", customValue: null },
    { key: "isActive", customValue: null },
    { key: "order", customValue: null },
  ];

  let review = {};

  values.map((v) => {
    if (v.defaultValue) {
      review[v.key] = { value: v.defaultValue };
    } else {
      review[v.key] = {};
    }
  });
  let langs;
  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs = response["langs"];
    console.log(langs, "langs");
  };
  getLangs();

  const addReview = async () => {
    let data = {};
    values.map((v) => {
      if (review[v.key].value) {
        data[v.key] = review[v.key]?.value;
      }
    });
    let response = await RestService.addReview(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/reviews");
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
        navigate("/panel/reviews");
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
          <h3 class="font-semibold text-lg text-blueGray-700">Özellik ekle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Dil
              </label>
              {#if langs}
                <Select
                  bind:value={review.lang.value}
                  bind:isValid={review.lang.isValid}
                  values={langs}
                  title={"Dil Seçin"}
                  valuesKey={"lang"}
                  valuesTitleKey={"title"}
                  customClass={"w-full"}
                />
              {/if}
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Sıra
              </label>

              <NumberInput
                bind:value={review.order.value}
                bind:isValid={review.order.isValid}
                placeholder={"Sıra"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorum Puanı
              </label>
              <Select
                bind:value={review.reviewStars.value}
                bind:isValid={review.reviewStars.isValid}
                values={[
                  { key: "1" },
                  { key: "2" },
                  { key: "3" },
                  { key: "4" },
                  { key: "5" },
                ]}
                title={"Yorum Puanı"}
                valuesKey={"key"}
                valuesTitleKey={"key"}
                customClass={"w-full"}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="rectangleBanner"
              >
                Aktif mi ?
              </label>

              <Switch bind:value={review.isActive.value} />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                İsim Soyisim
              </label>
              <Input
                bind:value={review.reviewName.value}
                bind:isValid={review.reviewName.isValid}
                placeholder={"Yorum Yazan Kişinin İsmi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorum Tarihi
              </label>
              <Input
                bind:value={review.reviewDate.value}
                bind:isValid={review.reviewDate.isValid}
                placeholder={"Yorum Tarihi"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorum Platformu
              </label>

              <Select
                bind:value={review.reviewPlatform.value}
                bind:isValid={review.reviewPlatform.isValid}
                values={platform}
                title={"Platform Seçin"}
                valuesKey={"key"}
                valuesTitleKey={"key"}
                customClass={"w-full"}
              />
            </div>
          </div>

          <div class="w-full lg:w-3/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorum Linki
              </label>
              <Input
                bind:value={review.reviewLink.value}
                bind:isValid={review.reviewLink.isValid}
                placeholder={"Yorum Linki"}
                required={true}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yorum Metni
              </label>
              <Textarea
                bind:value={review.reviewText.value}
                bind:isValid={review.reviewText.isValid}
                placeholder={"Yorum"}
                required={true}
              />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addReview}
              disabled={!review.lang.isValid || review.lang.value == null}
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
