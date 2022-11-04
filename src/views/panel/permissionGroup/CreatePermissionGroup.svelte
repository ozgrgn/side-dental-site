<script>
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { Translate, TranslateApiMessage } from "$services/language.js";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import Input from "$components/Form/Input.svelte";
  import Textarea from "$components/Form/Textarea.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Image from "$components/Form/Image.svelte";
  import Select from "$components/Form/Select.svelte";

  let permissions;

  let values = [
    { key: "name", customValue: null },
    { key: "permissions", customValue: null, defaultValue: [] },
  ];

  let permissionGroup = {};

  values.map((v) => {
    if (v.defaultValue) {
      permissionGroup[v.key] = { value: v.defaultValue };
    } else {
      permissionGroup[v.key] = {};
    }
  });

  onMount(() => {
    getPermissions();
  });

  const getPermissions = async () => {
    let getPermissionsResponse = await RestService.getPermissions();

    if (getPermissionsResponse["status"]) {
      permissions = getPermissionsResponse["permissions"];
    }

    console.log(permissions, "perrmrmrmrm");
  };

  const addPermissionGroup = async () => {
    let data = {};
    values.map((v) => {
      data[v.key] = permissionGroup[v.key]?.value;
    });
    let response = await RestService.addPermissionGroup(data);
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));

      navigate("/panel/permissionGroups");
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
        navigate("/panel/permissionGroups");
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
            Yetki gurubu ekle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div class="flex flex-wrap my-4">
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for="grid-name"
              >
                Yetki grubu başlığı
              </label>

              <Input
                bind:value={permissionGroup.name.value}
                bind:isValid={permissionGroup.name.isValid}
                placeholder={"Tam isim"}
                required={true}
              />
            </div>
          </div>
          <div class="w-full lg:w-12/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block  text-blueGray-600 text-xs font-bold mb-2"
                for=""
              >
                Yetkiler
              </label>

              <div class="grid grid-cols-4 gap-4">
                {#if permissions}
                  {#each Object.keys(permissions) as permission}
                    <div class="flex flex-col gap-2">
                      <label class="uppercase font-semibold" for="">
                        {permission}</label
                      >

                      {#each Object.keys(permissions[permission]) as subPermission}
                        <button
                          on:click={() => {
                            if (
                              permissionGroup.permissions.value.indexOf(
                                subPermission
                              ) == -1
                            ) {
                              permissionGroup.permissions.value = [
                                ...permissionGroup.permissions.value,
                                subPermission,
                              ];
                            } else {
                              permissionGroup.permissions.value.splice(
                                permissionGroup.permissions.value.indexOf(
                                  subPermission
                                ),
                                1
                              );
                              permissionGroup.permissions.value = [
                                ...permissionGroup.permissions.value,
                              ];
                            }
                          }}
                          type="button"
                          class="relative bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                        >
                          <span
                            class="{permissionGroup.permissions.value.indexOf(
                              subPermission
                            ) != -1
                              ? ''
                              : 'hidden'} text-red-400 text-xl font-bold absolute right-0 -top-3"
                            >✓</span
                          >
                          {subPermission}
                        </button>
                      {/each}
                    </div>
                  {/each}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 text-right mt-2">
            <button
              on:click={addPermissionGroup}
              disabled={!permissionGroup.name.isValid ||
                (permissionGroup.permissions &&
                  permissionGroup.permissions.length < 1)}
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
