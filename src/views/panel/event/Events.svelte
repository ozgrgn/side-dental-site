<script>
  import RestService from "$services/rest";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { navigate } from "svelte-navigator";
  import ToastService from "$services/toast";
  import Select from "$components/Form/Select.svelte";
  import moment from "moment";
  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import DateRangeInput from "$components/Form/DateRangeInput.svelte";
  const deleteEventApprove = (eventId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteEvent(eventId);
          }
          modal.set(null);
        },
      })
    );
  };
  let venues;
  const getVenues = async () => {
    let getVenueResponse = await RestService.getVenues();

    venues = getVenueResponse["venues"];
  };
  getVenues();

  let categories;
  const getCategories = async () => {
    let response = await RestService.getCategories(undefined, undefined);
    categories = response["categories"];
  };
  getCategories();

  let events;
  let limit = 10;
  let skip = 0;
  let totalDataCount = 0;
  let _id;
  let venue;
  let category;
  let tag;
  let boxOffice;
  let startDate;
  let endDate;
  let organizer;
  let isActive;
  let show;

  const getEvents = async () => {
    let response = await RestService.getEventsWithDetailedFilters(
      isActive,
      tag,
      startDate,
      endDate,
      show,
      limit,
      skip,
      _id,
      venue,
      category,
      boxOffice,
      organizer,
      
    );
    events = response["events"];
    totalDataCount = response["count"];
  };
  getEvents();

  const deleteEvent = async (eventId) => {
    let response = await RestService.deleteEvent(eventId);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-deleted"));
      getEvents();
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };
  const ceilAndCalculate = () => {
    if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
      skip = skip + limit;
      getEvents();
    }
  };

  const pages = () => {
    if (totalDataCount > limit) {
      return new Array(Math.ceil(totalDataCount / limit));
    } else {
      return [1];
    }
  };

  export let color = "light";
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
  <div class="w-full mb-12 px-2 lg:px-4 ">
    <button
      class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
      type="button"
      on:click={() => {
        navigate("/panel/create-event");
      }}
    >
      <i class="fa fa-plus" />
      {$Translate("Add")}
    </button>

    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-blueGray-700">
              Satıştaki etkinlikler
            </h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        {#if events}
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Başlık
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  {#if venues}
                    <Select
                      bind:value={venue}
                      change={() => getEvents()}
                      values={venues}
                      title={"Mekan Seç"}
                      valuesKey={"_id"}
                      valuesTitleKey={"title"}
                      customClass={"w-full border-0 max-w-xs"}
                      all={true}
                    />
                  {/if}
                </th>
                <th
                  class=" align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  {#if categories}
                    <Select
                      bind:value={category}
                      change={() => getEvents()}
                      values={categories}
                      title={"Kategori Seç"}
                      valuesKey={"_id"}
                      valuesTitleKey={"title"}
                      valuesTitleKeySub={"tr"}
                      customClass={"w-full border-0 max-w-xs"}
                      all={true}
                    />
                  {/if}
                </th>
                <th
                  class="px-6 align-middle border border-solid  text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  <DateRangeInput
                    bind:startDate
                    bind:endDate
                    change={() => getEvents()}
                    customClass={"w-full border-0 max-w-xs"}
                  />
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Koltuklar ve Fiyatlar
                </th>
                <th
                  class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                >
                  Aktif mi ?
                </th>

                <th
                  class="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
                  'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-red-700 text-red-200 border-red-600'}"
                />
              </tr>
            </thead>
            <tbody>
              {#each events as event}
                <tr>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {event.title}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {event.venue?.title}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center capitalize"
                  >
                    {event.category?.name?.tr}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    {moment(event.eventDate).format("DD.MM.YYYY HH:mm")}
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      on:click={() =>
                        navigate(`/panel/event/seatsAndPrices/${event._id}`)}
                      class="{event.isActive
                        ? 'bg-orange-500'
                        : 'bg-red-500'} bg-orange-500 p-2 rounded text-white font-semibold"
                    >
                      Düzenle
                    </button>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="{event.isActive
                        ? 'bg-green-500'
                        : 'bg-red-500'} bg-green-500 p-2 rounded text-white font-semibold"
                    >
                      {event.isActive ? "Aktif" : "Pasif"}
                    </button>
                  </td>
                  <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
                  >
                    <button
                      class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                      type="button"
                      on:click={navigate(
                        `/panel/update-event/${event._id.toString()}`
                      )}
                    >
                      {$Translate("Edit")}
                    </button>
                    <button
                      on:click={() => deleteEventApprove(event._id.toString())}
                      class="bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
                      type="button"
                    >
                      {$Translate("Delete")}
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </div>
      <hr class="my-4 md:min-w-full" />
      {#if events}
        <div
          class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
        >
          <Select
            bind:value={limit}
            change={() => {
              getEvents();
            }}
            values={[
              { limit: 10 },
              { limit: 20 },
              { limit: 50 },
              { limit: 100 },
            ]}
            title={"Select page"}
            valuesKey={"limit"}
            valuesTitleKey={"limit"}
            customClass={"border border-blue-600 text-blue-600 py-1 w-full mx-16 lg:mx-0 lg:w-auto"}
          />

          <button
            class="bg-blue-600 text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
            type="button"
            on:click={() => {
              skip != 0 ? (skip = skip - limit) : (skip = skip);
              getEvents();
            }}
          >
            {$Translate("Prev")}
          </button>
          {#each pages() as page, i}
            <button
              class="border {skip == limit * i
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600'} font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
              class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
              type="button"
              on:click={() => {
                skip = limit * i;
                getEvents();
              }}
            >
              {i + 1}
            </button>
          {/each}

          <button
            onclick={ceilAndCalculate}
            class="bg-blue-600 text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
            type="button"
          >
            {$Translate("Next")}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
