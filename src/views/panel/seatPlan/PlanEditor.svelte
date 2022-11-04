<script>
  import Input from "$components/Form/Input.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Select from "$components/Form/Select.svelte";
  export let plan = [];
  let blockName = {};
  let blockTitle = {};
  let availableSeats = {};
  let activeSeat;
</script>

<div class="w-full">
  <div
    class="flex justify-center items-end flex-row w-full px-4 mt-8 gap-4 text-primary"
  >
    <div class="w-3/12 flex justify-center flex-col">
      <label for="title">Parter veya Block ID'si</label>
      <Input
        bind:value={blockName.value}
        bind:isValid={blockName.isValid}
        placeholder={"Parter veya Block ID"}
        customClass={"p-2 w-full"}
      />
    </div>
    <div class="w-3/12 flex justify-center flex-col">
      <label for="title">Parter veya Block Başlığı</label>
      <Input
        bind:value={blockTitle.value}
        bind:isValid={blockTitle.isValid}
        placeholder={"Parter veya Block ID"}
        customClass={"p-2 w-full"}
      />
    </div>

    <div class="w-2/12 flex justify-center flex-col">
      <label for="title">Oturma planı yoksa toplam biletlenebilir sayı</label>
      <NumberInput
        bind:value={availableSeats.value}
        bind:isValid={availableSeats.isValid}
        placeholder={"Plan başlığı"}
        customClass={"p-2 w-full"}
      />
    </div>

    <div class="w-2/12 flex justify-center flex-col">
      <button
        type="button"
        on:click={() => {
          if (availableSeats.value && availableSeats.value > 0) {
            let seats = Array(Number(availableSeats.value))
              .fill(null)
              .map(() => ({ row: 0, place: 0, name: "n" }));

            plan = [
              ...plan,
              {
                title: blockTitle.value,
                name: blockName.value,
                type: "numberless",
                align: null,
                rowCount: 1,
                rows: [[...seats]],
              },
            ];
          } else {
            plan = [
              ...plan,
              {
                title: blockTitle.value,
                name: blockName.value,
                type: "normal",
                align: null,
                rowCount: 0,
                rows: [],
              },
            ];
          }
          availableSeats.value = 0;
          blockName.value = null;
          blockTitle.value = null;
        }}
        class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 p-2 rounded shadow hover:shadow-md"
        >Parter veya blok ekle</button
      >
    </div>
  </div>

  {#if activeSeat}
    <div
      class="bg-white rounded fixed w-[50vw] flex top-[20rem] z-10 p-2 right-0 border-l-2 border-blue-600"
    >
      <div class="flex flex-row justify-between w-full gap-1">
        <div class="flex flex-col w-3/12">
          <label for="name">Numara</label>
          <Input
            customClass={"w-full"}
            bind:value={plan[activeSeat.blockIndex].rows[
              activeSeat.seat.row - 1
            ][activeSeat.seat.place - 1].name}
          />
        </div>
        <div class="w-4/12">
          <label for="left">Sol</label>
          <Select
            bind:value={plan[activeSeat.blockIndex].rows[
              activeSeat.seat.row - 1
            ][activeSeat.seat.place - 1].left}
            values={Array(Number(10))
              .fill(null)
              .map((a, index) => ({ val: index }))}
            title={"0"}
            valuesKey={"val"}
            valuesTitleKey={"val"}
            customClass={"w-full border-0"}
          />
        </div>
        <div class="flex flex-col w-4/12">
          <label for="name">Sağ</label>
          <Select
            bind:value={plan[activeSeat.blockIndex].rows[
              activeSeat.seat.row - 1
            ][activeSeat.seat.place - 1].right}
            values={Array(Number(10))
              .fill(null)
              .map((a, index) => ({ val: index }))}
            title={"0"}
            valuesKey={"val"}
            valuesTitleKey={"val"}
            customClass={"w-full border-0"}
          />
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

  {#each plan as block, blockIndex}
    <div
      class="flex justify-around items-end flex-row w-full px-4 mx-auto mt-8 text-primary"
    >
      <span class="text-primary">
        Block ID : <strong> {block?.name}</strong></span
      >

      <span class={!block.availableSeats ? "hidden" : ""}
        >Available Seats : {block.availableSeats}</span
      >

      <div>
        <label for="">Sıra sayısı</label>
        <Select
          bind:value={block.align}
          values={[
            { align: "start", alignTitle: "Sol" },
            { align: "end", alignTitle: "Sağ" },
            { align: "center", alignTitle: "Ortala" },
          ]}
          title={"Hiza"}
          valuesKey={"align"}
          valuesTitleKey={"alignTitle"}
          customClass={"w-full border-0"}
        />
      </div>
      <div class={block.availableSeats ? "hidden" : ""}>
        <label for="">Sıra sayısı</label>
        <NumberInput
          bind:value={block.rowCount}
          placeholder={"Sıra sayısı"}
          customClass={"p-2"}
        />
      </div>

      <button
        type="button"
        on:click={() => {
          plan.splice(blockIndex, 1);
          plan = [...plan];
        }}
        class="bg-red-600 disabled:bg-blue-300 text-white active:bg-bred-400 p-2 rounded shadow hover:shadow-md"
        >Bu bloğu sil</button
      >
    </div>

    {#if block.rowCount > 0}
      <div
        class="flex justify-center items-center flex-row w-full px-4 mx-auto mt-8 text-primary"
      >
        <span>(Sahne yukarı yöndedir)</span>
      </div>
    {/if}

    <div
      class="{!block.rowCount
        ? 'hidden'
        : ''}flex flex-col items-end flex-row w-full mt-8 gap-2"
    >
      {#each Array(block.rowCount) as count, i}
        <div class="relative flex flex-row gap-2 items-center w-full">
          <div class="flex flex-row w-2/12 justify-center gap-1 items-center">
            <label for="">{i + 1}.</label>
            <div class="w-5/12">
              <Input
                value={block.rows[i] && block.rows[i].length
                  ? block.rows[i].length
                  : 0}
                input={(value) => {
                  activeSeat = undefined;
                  block.rows[i] = Array(Number(value))
                    .fill(null)
                    .map((v, index) => ({ row: i + 1, place: index + 1 }));
                }}
                placeholder={"Sıra sayısı"}
                customClass={"p-2 w-full"}
              />
            </div>

            <div class="w-5/12">
              <Input
                disabled={!block.rows[i] || block.rows[i].length < 1}
                input={(value) => {
                  activeSeat = undefined;
                  block.rows[i].map((s, sIndex) => {
                    block.rows[i][sIndex].name = `${value}${++sIndex}`;
                  });
                }}
                placeholder={"Satır İsmi"}
                customClass={"p-2 w-full"}
              />
            </div>
          </div>

          <div
            class="flex flex-row items-center justify-{block.align} gap-1 w-10/12 overflow-auto"
          >
            {#if block.rows[i]}
              {#each block.rows[i] as seat, seatIndex}
                <div class="flex flex-col place-items-center">
                  <span
                    on:click={() => {
                      activeSeat = undefined;
                      setTimeout(() => {
                        activeSeat = { blockIndex, seat };
                      }, 100);
                    }}
                    style="margin-right : {seat.right
                      ? seat.right
                      : 0}rem; margin-left : {seat.left ? seat.left : 0}rem;"
                    class="{!seat.name
                      ? 'hidden'
                      : ''} cursor-pointer flex justify-center items-center p-2
                    border-0 rounded bg-slate-300 text-slate-800 font-semibold shadow w-6 text-[0.6rem]"
                  >
                    {seat.name}</span
                  >
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/each}

  <div class="flex justify-center flex-col w-full px-4 mx-auto mt-8">
    <hr class="w-full h-px bg-slate-900" />
  </div>
</div>
