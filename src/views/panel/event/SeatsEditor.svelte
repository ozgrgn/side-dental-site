<script>
  import Input from "$components/Form/Input.svelte";
  import Select from "$components/Form/Select.svelte";
  import { onMount } from "svelte";
  import RestService from "$services/rest";
  import Selecto from "svelte-selecto";

  let colorPalette = [
    "bg-green-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];

  export let eventId;
  export let rows;
  export let levels;
  export let selectedBlockId;
  let levelsMap = {};
  let reservedSeats = {};

  let arrayLevelsMap;
  let selectableArea;

  onMount(async () => {
    let levelsByEventIdResponse = await RestService.levelsByEventId(eventId);

    levels = levelsByEventIdResponse["levels"];

    if (
      levelsByEventIdResponse["status"] &&
      levelsByEventIdResponse["levels"]
    ) {
      levelsByEventIdResponse["levels"].map((level) => {
        levelsMap[level._id] = level;
      });
      arrayLevelsMap = Object.keys(levelsMap);
    }

    let ticketsResponse = await RestService.getTicketsByEventAndBlock(
      eventId,
      selectedBlockId
    );

    ticketsResponse["tickets"].map((ticket) => {
      reservedSeats[ticket.seat] = ticket;
    });
    console.log(reservedSeats, "------");
  });

  let activeSeat;
  let selectedSeats = [];
</script>

{#if activeSeat}
  <div
    class="bg-white rounded fixed w-[28rem] flex top-20 z-10 p-2 right-0 border-l-2 border-blue-600"
  >
    <div class="flex flex-row justify-between w-full gap-1">
      <div class="flex flex-col w-3/12">
        <label for="name">Numara</label>
        <Input
          customClass={"w-full"}
          bind:value={rows[activeSeat.row][activeSeat.place - 1].name}
        />
      </div>
      <div class="w-2/12">
        <label for="left">Sol</label>
        <Select
          bind:value={rows[activeSeat.row][activeSeat.place - 1].left}
          values={Array(Number(10))
            .fill(null)
            .map((a, index) => ({ val: index }))}
          title={"0"}
          valuesKey={"val"}
          valuesTitleKey={"val"}
          customClass={"w-full border-0"}
        />
      </div>
      <div class="flex flex-col w-2/12">
        <label for="name">Sağ</label>
        <Select
          bind:value={rows[activeSeat.row][activeSeat.place - 1].right}
          values={Array(Number(10))
            .fill(null)
            .map((a, index) => ({ val: index }))}
          title={"0"}
          valuesKey={"val"}
          valuesTitleKey={"val"}
          customClass={"w-full border-0"}
        />
      </div>
      <div class="flex flex-col w-5/12">
        <label for="name">Fiyat</label>
        {#if levels}
          <Select
            bind:value={rows[activeSeat.row][activeSeat.place - 1].level}
            values={levels}
            title={"Fiyat"}
            valuesKey={"_id"}
            valuesTitleKey={"title"}
            customClass={"w-full border-0"}
            secondTitleKey={"price"}
          />
        {/if}
      </div>
      <div
        class="cursor-pointer"
        on:click={() => {
          activeSeat = undefined;
        }}
      >
        <i class="fa fa-window-close text-xl text-blue-500" />
      </div>
    </div>
  </div>
{/if}

{#if selectedSeats && selectedSeats.length > 0}
  <div
    class="bg-white rounded fixed w-[28rem] flex z-10 top-20 p-2 right-0 border-l-2 border-blue-600"
  >
    <div class="flex flex-row justify-between w-full gap-1">
      <div class="flex flex-col w-3/12">
        <label for="name">{selectedSeats.length} Koltuk seçildi</label>
      </div>

      <div class="flex flex-col w-5/12">
        <label for="name">Fiyat</label>
        {#if levels}
          <Select
            change={(value) => {
              selectedSeats.map((selectedSeat) => {
                rows[selectedSeat.row][selectedSeat.place - 1].level = value;
              });
            }}
            values={levels}
            title={"Fiyat"}
            valuesKey={"_id"}
            valuesTitleKey={"title"}
            customClass={"w-full border-0"}
            secondTitleKey={"price"}
          />
        {/if}
      </div>
      <div
        class="cursor-pointer"
        on:click={() => {
          selectedSeats = [];
        }}
      >
        <i class="fa fa-window-close text-xl text-blue-500" />
      </div>
    </div>
  </div>
{/if}

{#if levels}
  <div
    class="flex flex-row md:flex-col justify-center w-6/12 gap-2 p-2 md:items-center lg:items-start"
  >
    {#each Object.keys(levels) as level, i}
      <span class="flex gap-1">
        <span class="w-6 h-6 {colorPalette[i]} rounded" />
        {levels[level].title} - {levels[level].price}₺</span
      >
    {/each}
  </div>
{/if}
{#if selectableArea}
  <Selecto
    container={selectableArea}
    dragContainer={selectableArea}
    selectableTargets={[".selecto-seat"]}
    selectByClick={false}
    selectFromInside={true}
    continueSelect={false}
    toggleContinueSelect={"shift"}
    hitRate={70}
    on:selectEnd={({ detail: e }) => {
      console.log(e, "eeeee");
      selectedSeats = [];

      e?.selected.map((seat) => {
        if (!reservedSeats[seat.getAttribute("id")]) {
          selectedSeats = [
            ...selectedSeats,
            rows[seat.getAttribute("row")][seat.getAttribute("place") - 1],
          ];
        }
      });
    }}
  />
{/if}

<div bind:this={selectableArea} class="flex flex-col gap-2 mt-8 p-8">
  {#each rows as row, rowIndex}
    {#if row}
      <div
        class="flex flex-row items-center justify-center gap-1 w-full flex-wrap"
      >
        {#each row as seat, seatIndex}
          <div class="flex flex-col place-items-center">
            <span
              on:click={() => {
                if (!reservedSeats[seat._id]) {
                  activeSeat = seat;
                }
                // seat.edit = true;
              }}
              row={seat.row}
              id={seat._id}
              place={seat.place}
              style="margin-right : {seat.right
                ? seat.right
                : 0}rem; margin-left : {seat.left ? seat.left : 0}rem;"
              class="{!seat.name
                ? 'hidden'
                : ''} flex justify-center items-center p-2
            border-0 rounded text-slate-800 font-semibold shadow w-6 text-[0.6rem] selecto-seat
            {reservedSeats[seat._id]
                ? 'bg-red-500'
                : colorPalette[arrayLevelsMap?.indexOf(seat.level)] +
                  ' cursor-pointer'} 
           
            
            "
            >
              {seat.name}</span
            >
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>
