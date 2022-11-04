<script>
  import Select from "$components/Form/Select.svelte";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { onMount } from "svelte";
  import { navigate, useParams } from "svelte-navigator";
  const params = useParams();
  let event;
  let blocks;
  let rows;
  let selectedBlockId;
  onMount(() => {
    getEvent();
    getBlocks();
  });

  const getEvent = async () => {
    let response = await RestService.getEvent($params.eventId);

    if (response["status"]) {
      event = response["event"];
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getBlocks = async () => {
    let getBlocksResponse = await RestService.getBlocks(undefined, undefined, {
      event: $params.eventId,
    });

    blocks = getBlocksResponse["blocks"];
  };

  const updateSeats = async () => {
    let _seats = [];

    rows.map((r) => {
      if (r) {
        r.map((s) => {
          _seats = [..._seats, s];
        });
      }
    });

    let response = await RestService.updateSeats(_seats);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/events");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getSeats = async (blockId) => {
    selectedBlockId = blockId;
    let seatsResponse = await RestService.getSeatsByEventAndBlock(
      $params.eventId,
      blockId
    );

    if (seatsResponse["status"]) {
      rows = [];
      console.log("mounted seatsResponse", seatsResponse["seats"]);
      seatsResponse["seats"].map((seat) => {
        if (rows[seat.row]) {
          rows[seat.row] = [...rows[seat.row], seat];
        } else {
          rows[seat.row] = [seat];
        }
      });

      rows.map((r, index) => {
        rows[index].sort((a, b) => a.place - b.place);
      });
      // seats = response["seats"];
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
      {#if event}
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="text-center flex justify-between">
            <h3 class="font-semibold text-lg text-blueGray-700">
              Etkinlik koltuklar ve fiyatlar - <span class="font-normal">
                {event?.title}</span
              >
            </h3>
          </div>
        </div>
        <div class="flex-auto px-4 py-10 pt-0">
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-6/12 mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for=""
                >
                  Düzenlemek istediğiniz bloğu seçiniz
                </label>

                {#if blocks}
                  <Select
                    change={(value) => getSeats(value)}
                    values={blocks}
                    title={"Blok"}
                    valuesKey={"_id"}
                    valuesTitleKey={"title"}
                    customClass={"w-full border-0"}
                  />
                {/if}
              </div>
            </div>

           
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-2">
              <button
                on:click={updateSeats}
                class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                type="button"
              >
                {$Translate("Update")}
              </button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
