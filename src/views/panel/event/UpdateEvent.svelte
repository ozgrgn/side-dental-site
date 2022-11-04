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
  import moment from "moment";
  import { onMount } from "svelte";
  import { navigate, useParams } from "svelte-navigator";
  const params = useParams();
  let event;
  let shows;
  let organizers;
  let venues;
  let categories;
  let tags;
  let boxOffices;

  let values = [
    { key: "title", customValue: null },
    { key: "perma", customValue: null },
    { key: "description", customValue: null },
    { key: "explanation", customValue: null },
    { key: "rules", customValue: null },
    { key: "verticalBanner", customValue: null },
    { key: "horizontalBanner", customValue: null },
    { key: "show", customValue: null },
    { key: "organizer", customValue: null },
    { key: "venue", customValue: "_id" },
    { key: "category", customValue: "_id" },
    { key: "tags", customValue: null, defaultValue: [] },
    { key: "boxOffices", customValue: null, defaultValue: [] },
    { key: "eventDate", customValue: null },
    { key: "isActive", customValue: null },
  ];

  onMount(() => {
    getShows();
    getVenues();
    getCategories();
    getTags();
    getBoxOffices();
    getEvent();
    getOrganizers();
  });

  const getEvent = async () => {
    let response = await RestService.getEvent($params.eventId);

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["event"][v.key] = {
            value: response["event"][v.key][v.customValue],
          };
        } else {
          response["event"][v.key] = { value: response["event"][v.key] };
        }
      });
      event = {
        ...response["event"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getOrganizers = async () => {
    let getOrganizersResponse = await RestService.getOrganizers();

    organizers = getOrganizersResponse["organizers"];
  };

  const getShows = async () => {
    let getShowsResponse = await RestService.getShows();

    shows = getShowsResponse["shows"];
  };
  const getVenues = async () => {
    let getVenueResponse = await RestService.getVenues();

    venues = getVenueResponse["venues"];
  };

  const getCategories = async () => {
    let getCategoriesResponse = await RestService.getCategories();

    categories = getCategoriesResponse["categories"];
  };

  const getTags = async () => {
    let getTagsResponse = await RestService.getTags();

    tags = getTagsResponse["tags"];
  };

  const getBoxOffices = async () => {
    let getBoxOfficesResponse = await RestService.getBoxOffices();

    boxOffices = getBoxOfficesResponse["boxOffices"];
  };

  const updateEvent = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = event[v.key]?.value;
    });

    let response = await RestService.updateEvent($params.eventId, data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/events");
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
        navigate("/panel/events");
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
            Etkinlik düzenle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if event}
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
                  bind:value={event.title.value}
                  bind:isValid={event.title.isValid}
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
                  bind:value={event.perma.value}
                  bind:isValid={event.perma.isValid}
                  placeholder={"Başlık"}
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
                  Organizatör
                </label>

                {#if organizers}
                  <Select
                    bind:value={event.organizer.value}
                    bind:isValid={event.organizer.isValid}
                    values={organizers}
                    title={"Organizatör seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"fullName"}
                    customClass={"w-full border-0"}
                  />
                {/if}
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for=""
                >
                  Satışta olmayan etkinlik referansı
                </label>

                {#if shows}
                  <Select
                    bind:value={event.show.value}
                    bind:isValid={event.show.isValid}
                    values={shows}
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
                  for=""
                >
                  Kategori
                </label>

                {#if categories}
                  <Select
                    bind:value={event.category.value}
                    bind:isValid={event.category.isValid}
                    values={categories}
                    title={"Kategori seç"}
                    valuesKey={"_id"}
                    valuesTitleKey={"title"}
                    valuesTitleKeySub={"tr"}
                    customClass={"w-full border-0"}
                  />
                {/if}
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for=""
                >
                  Mekan
                </label>

                {#if venues}
                  <Select
                    bind:value={event.venue.value}
                    bind:isValid={event.venue.isValid}
                    values={venues}
                    title={"Kategori seç"}
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
                  for=""
                >
                  Etkinlik tag'leri (seçiniz)
                </label>

                {#if tags}
                  {#each tags as tag}
                    <button
                      on:click={() => {
                        if (event.tags.value.indexOf(tag._id) == -1) {
                          event.tags.value = [...event.tags.value, tag._id];
                        } else {
                          event.tags.value.splice(
                            event.tags.value.indexOf(tag._id),
                            1
                          );
                          event.tags.value = [...event.tags.value];
                        }
                      }}
                      type="button"
                      class="relative bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                    >
                      <span
                        class="{event.tags.value.indexOf(tag._id) != -1
                          ? ''
                          : 'hidden'} text-red-400 text-xl font-bold absolute right-0 -top-3"
                        >✓</span
                      >
                      {tag.title}
                    </button>
                  {/each}
                {/if}
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for=""
                >
                  Etkinlik gişeleri (seçiniz)
                </label>

                {#if boxOffices}
                  {#each boxOffices as boxOffice}
                    <button
                      on:click={() => {
                        if (
                          event.boxOffices.value.indexOf(boxOffice._id) == -1
                        ) {
                          event.boxOffices.value = [
                            ...event.boxOffices.value,
                            boxOffice._id,
                          ];
                        } else {
                          event.boxOffices.value.splice(
                            event.boxOffices.value.indexOf(boxOffice._id),
                            1
                          );
                          event.boxOffices.value = [...event.boxOffices.value];
                        }
                      }}
                      type="button"
                      class="relative bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                    >
                      <span
                        class="{event.boxOffices.value.indexOf(boxOffice._id) !=
                        -1
                          ? ''
                          : 'hidden'} text-red-400 text-xl font-bold absolute right-0 -top-3"
                        >✓</span
                      >
                      {boxOffice.title}
                    </button>
                  {/each}
                {/if}
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
                  bind:value={event.description.value}
                  bind:isValid={event.description.isValid}
                  placeholder={"Kısa açıklama"}
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
                  Etkinlik açıklaması
                </label>

                <Textarea
                  bind:value={event.explanation.value}
                  bind:isValid={event.explanation.isValid}
                  placeholder={"Açıklama"}
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
                  Etkinlik kuralları
                </label>

                <Textarea
                  bind:value={event.rules.value}
                  bind:isValid={event.rules.isValid}
                  placeholder={"Kurallar"}
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
                  bind:value={event.verticalBanner.value}
                  bind:isValid={event.verticalBanner.isValid}
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
                  bind:value={event.horizontalBanner.value}
                  bind:isValid={event.horizontalBanner.isValid}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative w-full mb-3 flex flex-row gap-2 items-center"
              >
                <div>
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="rectangleBanner"
                  >
                    Etkinlik tarihi
                  </label>
                  <Date
                    bind:value={event.eventDate.value}
                    placeholder="Tarih"
                  />
                </div>
                <div>
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="rectangleBanner"
                  >
                    Saat
                  </label>

                  <Select
                    value={moment(event.eventDate.value).hour()}
                    change={(value) => {
                      event.eventDate.value = moment(event.eventDate.value)
                        .hour(value)
                        .toDate();
                    }}
                    values={Array(Number(23))
                      .fill(null)
                      .map((v, i) => ({ key: i + 1, value: i + 1 }))}
                    title={"Saat"}
                    valuesKey={"key"}
                    disabled={!event.eventDate.value}
                    valuesTitleKey={"value"}
                    customClass={"border border-blue-600 text-blue-600 py-1 mx-16 lg:mx-0 lg:w-auto"}
                  />
                </div>

                <div>
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="rectangleBanner"
                  >
                    Dakika
                  </label>

                  <Select
                    value={moment(event.eventDate.value).minute()}
                    change={(value) => {
                      event.eventDate.value = moment(event.eventDate.value)
                        .minute(value)
                        .toDate();
                    }}
                    values={[
                      { key: 0, value: "00" },
                      { key: 15, value: "15" },
                      { key: 30, value: "30" },
                      { key: 45, value: "45" },
                    ]}
                    title={"Saat"}
                    valuesKey={"key"}
                    valuesTitleKey={"value"}
                    disabled={!event.eventDate.value}
                    customClass={"border border-blue-600 text-blue-600 py-1 mx-16 lg:mx-0 lg:w-auto"}
                  />
                </div>
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
                <Switch bind:value={event.isActive.value} />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-2">
              <button
                on:click={updateEvent}
                disabled={!event.title.isValid ||
                  !event.description.isValid ||
                  !event.show.isValid}
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
