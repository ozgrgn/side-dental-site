<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate } from "svelte-navigator";
  import { TranslateApiMessage, Translate } from "$services/language";
  import { useParams } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";
  import Select from "$components/Form/Select.svelte";
  import { onMount } from "svelte";
  import PlanEditor from "./PlanEditor.svelte";
  const params = useParams();
  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  const deleteSeatPlanApprove = (seatPlanId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteSeatPlan(seatPlanId);
          }
          modal.set(null);
        },
      })
    );
  };

  let venues;
  let seatPlan;

  let values = [
    { key: "blocksSVG", customValue: null },
    { key: "plan", customValue: null },
    { key: "title", customValue: null },
    { key: "venue", customValue: "_id" },
  ];

  onMount(() => {
    getVenues();
  });

  const getVenues = async () => {
    let getVenuesResponse = await RestService.getVenues();

    venues = getVenuesResponse["venues"];
  };

  const updateSeatPlan = async () => {
    let editedSeatPlan = {};
    values.map((v) => {
      editedSeatPlan[v.key] = seatPlan[v.key].value;
    });

    let response = await RestService.updateSeatPlan(
      seatPlan._id,
      editedSeatPlan
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/seatPlans");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getSeatPlan = async () => {
    let response = await RestService.getSeatPlan($params.seatPlanId);
    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["seatPlan"][v.key] = {
            value: response["seatPlan"][v.key][v.customValue],
          };
        } else {
          response["seatPlan"][v.key] = { value: response["seatPlan"][v.key] };
        }
      });

      seatPlan = {
        ...response["seatPlan"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getSeatPlan();

  const deleteSeatPlan = async (seatPlanId) => {
    let response = await RestService.deleteSeatPlan(seatPlanId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/seatPlans");
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
          navigate("/panel/seatPlans");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteSeatPlanApprove($params.seatPlanId)}
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
            SeatPlan güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if seatPlan}
          <div class="flex flex-wrap my-4">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block  text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Oturma planı başlığı
                </label>

                <Input
                  bind:value={seatPlan.title.value}
                  bind:isValid={seatPlan.title.isValid}
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
                  Blok svg
                </label>

                <Textarea
                  bind:value={seatPlan.blocksSVG.value}
                  bind:isValid={seatPlan.blocksSVG.isValid}
                  placeholder={"Blok svg"}
                  required={true}
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-xs font-bold mb-2"
                  for=""
                >
                  Mekan
                </label>

                {#if venues}
                  <Select
                    bind:value={seatPlan.venue.value}
                    bind:isValid={seatPlan.venue.isValid}
                    values={venues}
                    title={"Mekan seçiniz"}
                    valuesKey={"_id"}
                    valuesTitleKey={"title"}
                    customClass={"w-full border-0"}
                  />
                {/if}
              </div>
            </div>

            <div class="w-full relative">
              <PlanEditor bind:plan={seatPlan.plan.value} />
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={updateSeatPlan}
                disabled={!seatPlan.title.isValid ||
                  !seatPlan.venue.isValid ||
                  !seatPlan.blocksSVG.isValid}
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
