<script>
  import Alert from "$components/Alert.svelte";
  import Image from "$components/Form/Image.svelte";
  import ImageArray from "$components/Form/ImageArray.svelte";
  import Input from "$components/Form/Input.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import { modal } from "$services/store";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  import { bind } from "svelte-simple-modal";
  const deleteVenueApprove = (venueId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteVenue(venueId);
          }
          modal.set(null);
        },
      })
    );
  };

  const params = useParams();

  let deleteImage = (index) => {
    venue.images.splice(index, 1);
    venue.images = venue.images;
  };
  let venue;

  let values = [
    { key: "title", customValue: null },
    { key: "perma", customValue: null },
    { key: "city", customValue: null },
    { key: "region", customValue: null },
    { key: "seatPlan", customValue: null },
  ];

  const updateVenue = async () => {
    let editedVenue = {};
    editedVenue.images = venue.images;
    values.map((v) => {
      editedVenue[v.key] = venue[v.key].value;
    });

    let response = await RestService.updateVenue(venue._id, editedVenue);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/venues");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getVenue = async () => {
    let response = await RestService.getVenue($params.venueId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["venue"][v.key] = {
            value: response["venue"][v.key][v.customValue],
          };
        } else {
          response["venue"][v.key] = { value: response["venue"][v.key] };
        }
      });
      venue = {
        ...response["venue"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getVenue();

  const deleteVenue = async (venueId) => {
    let response = await RestService.deleteVenue(venueId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/venues");
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
          navigate("/panel/venues");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteVenueApprove($params.venueId)}
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
          <h3 class="font-semibold text-lg text-blueGray-700">
            Venue güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if venue}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Mekan başlığı
                </label>

                <Input
                  bind:value={venue.title.value}
                  bind:isValid={venue.title.isValid}
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
                  Mekan perma
                </label>

                <Input
                  bind:value={venue.perma.value}
                  bind:isValid={venue.perma.isValid}
                  placeholder={"Perma"}
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
                  bind:value={venue.city.value}
                  bind:isValid={venue.city.isValid}
                  placeholder={"Şehir"}
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
                  Mekan bölge
                </label>

                <Input
                  bind:value={venue.region.value}
                  bind:isValid={venue.region.isValid}
                  placeholder={"Perma"}
                  required={true}
                />
              </div>
            </div>

            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="seatPlan"
                >
                  Oturma planı görseli
                </label>

                <Image
                  bind:value={venue.seatPlan.value}
                  bind:isValid={venue.seatPlan.isValid}
                />
              </div>
            </div>
            <div class="md:w-6/12 px-4">
              <div>
                {#each venue.images as venueImage, index}
                  <div class="border mt-2 p-1 grid grid-cols-4">
                    <span
                      class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
                      >{index + 1}.{"Resim"}</span
                    >
                    <div class="col-span-2">
                      <ImageArray
                        bind:value={venue.images[index].image}
                        {index}
                      />
                    </div>
                    <div
                      class="flex flex-col justify-center items-end"
                    >
                      <button
                        on:click={() => deleteImage(index)}
                        class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs m-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
                        type="button"
                      >
                        SİL
                      </button>
                    </div>
                  </div>
                {/each}
              </div>

              <button
                on:click={() =>
                  (venue.images = [...venue.images, { image: null }])}
                class=" mt-2 bg-red-400 disabled:bg-red-300 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Mekan Resmi Ekle
              </button>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={updateVenue}
                disabled={!venue.title.isValid ||
                  !venue.perma.isValid ||
                  !venue.city.isValid}
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
