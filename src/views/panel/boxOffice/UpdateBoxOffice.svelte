<script>
  import Alert from "$components/Alert.svelte";
  import Image from "$components/Form/Image.svelte";
  import Input from "$components/Form/Input.svelte";
  import Switch from "$components/Switch.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import { modal } from "$services/store";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteBoxOfficeApprove = (boxOfficeId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteBoxOffice(boxOfficeId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let boxOffice;

  let values = [
    { key: "title", customValue: null },
    { key: "city", customValue: null },
    { key: "isActive", customValue: null },
  ];

  const updateBoxOffice = async () => {
    let editedBoxOffice = {};
    values.map((v) => {
      editedBoxOffice[v.key] = boxOffice[v.key].value;
    });

    let response = await RestService.updateBoxOffice(
      boxOffice._id,
      editedBoxOffice
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/boxOffices");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getBoxOffice = async () => {
    let response = await RestService.getBoxOffice($params.boxOfficeId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["boxOffice"][v.key] = {
            value: response["boxOffice"][v.key][v.customValue],
          };
        } else {
          response["boxOffice"][v.key] = {
            value: response["boxOffice"][v.key],
          };
        }
      });
      boxOffice = {
        ...response["boxOffice"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getBoxOffice();

  const deleteBoxOffice = async (boxOfficeId) => {
    let response = await RestService.deleteBoxOffice(boxOfficeId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/boxOffices");
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
          navigate("/panel/boxOffices");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteBoxOfficeApprove($params.boxOfficeId)}
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
          <h3 class="font-semibold text-lg text-blueGray-700">Gişe güncelle</h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if boxOffice}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Gişe başlığı
                </label>

                <Input
                  bind:value={boxOffice.title.value}
                  bind:isValid={boxOffice.title.isValid}
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
                  Şehir
                </label>

                <Input
                  bind:value={boxOffice.city.value}
                  bind:isValid={boxOffice.city.isValid}
                  placeholder={"Şehir"}
                  required={true}
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

                <Switch bind:value={boxOffice.isActive.value} />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={updateBoxOffice}
                disabled={!boxOffice.title.isValid || !boxOffice.city.isValid}
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
