<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate } from "svelte-navigator";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { useParams } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  const params = useParams();

  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  const deleteTagApprove = (tagId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteTag(tagId);
          }
          modal.set(null);
        },
      })
    );
  };

  let tag;

  let values = [
    { key: "title" },
    { key: "minLimit" },
    { key: "maxLimit" },
    { key: "order" },
    { key: "customType" },
  ];

  const updateTag = async () => {
    let editedTag = {};
    values.map((v) => {
      editedTag[v.key] = tag[v.key].value;
    });

    let response = await RestService.updateTag(tag._id, editedTag);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/tags");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getTag = async () => {
    let response = await RestService.getTag($params.tagId);

    if (response["status"]) {
      values.map((v) => {
        response["tag"][v.key] = { value: response["tag"][v.key] };
      });
      tag = {
        ...response["tag"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getTag();

  const deleteTag = async (tagId) => {
    let response = await RestService.deleteTag(tagId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/tags");
    } else {
      ToastService.success("İşlem başarılı");
    }
  };
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <div class="flex justify-between">
      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => {
          navigate("/panel/tags");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteTagApprove($params.tagId)}
      >
        <i class="fa fa-trash" />
        Sil
      </button>
    </div>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="text-center flex justify-between">
          <h3 class="font-semibold text-lg text-blueGray-700">Tag güncelle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if tag}
          <form>
            <div class="flex flex-wrap my-4">
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Tag başlığı
                  </label>

                  <Input
                    bind:value={tag.title.value}
                    bind:isValid={tag.title.isValid}
                    placeholder={"Başlık"}
                    required={true}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2"
                    for=""
                  >
                    Tag Tipi
                  </label>

                  <Select
                    bind:value={tag.customType.value}
                    bind:isValid={tag.customType.isValid}
                    values={[
                      { name: "general", header: "Genel" },
                      {
                        name: "upcomingEvents",
                        header: "Yaklaşan Etkinlikler",
                      },
                    ]}
                    title={"Tag Tipi Seçin"}
                    valuesKey={"name"}
                    valuesTitleKey={"header"}
                    customClass={"w-full border-0"}
                  />
                </div>
              </div>
              <div class="w-full lg:w-2/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Min.Etkinlik Limiti
                  </label>

                  <NumberInput
                    bind:value={tag.minLimit.value}
                    bind:isValid={tag.minLimit.isValid}
                    placeholder={"Min.Etkinlik Limiti"}
                    required={false}
                  />
                </div>
              </div>
              <div class="w-full lg:w-2/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Max.Etkinlik Limiti
                  </label>

                  <NumberInput
                    bind:value={tag.maxLimit.value}
                    bind:isValid={tag.maxLimit.isValid}
                    placeholder={"Max.Etkinlik Limiti"}
                    required={false}
                  />
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
                    bind:value={tag.order.value}
                    bind:isValid={tag.order.isValid}
                    placeholder={"Sıra"}
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4 text-right mt-5">
                <button
                  on:click={updateTag}
                  disabled={!tag.title.isValid || !tag.order.isValid}
                  class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                  type="button"
                >
                  {$Translate("Update")}
                </button>
              </div>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
