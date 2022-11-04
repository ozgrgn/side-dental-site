<script>
  import Input from "$components/Form/Input.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { onMount } from "svelte";
  import { navigate, useParams } from "svelte-navigator";
  const params = useParams();
  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  const deletePermissionGroupApprove = (permissionGroupId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deletePermissionGroup(permissionGroupId);
          }
          modal.set(null);
        },
      })
    );
  };

  let permissions;
  let permissionGroup;

  let values = [
    { key: "name", customValue: null },
    { key: "permissions", customValue: null },
  ];

  onMount(() => {
    getPermissions();
  });

  const getPermissions = async () => {
    let getPermissionsResponse = await RestService.getPermissions();

    permissions = getPermissionsResponse["permissions"];
  };

  const updatePermissionGroup = async () => {
    let editedPermissionGroup = {};
    values.map((v) => {
      editedPermissionGroup[v.key] = permissionGroup[v.key].value;
    });

    let response = await RestService.updatePermissionGroup(
      permissionGroup._id,
      editedPermissionGroup
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/permissionGroups");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getPermissionGroup = async () => {
    let response = await RestService.getPermissionGroup(
      $params.permissionGroupId
    );

    if (response["status"]) {
      values.map((v) => {
        if (v.customValue) {
          response["permissionGroup"][v.key] = {
            value: response["permissionGroup"][v.key][v.customValue],
          };
        } else {
          response["permissionGroup"][v.key] = {
            value: response["permissionGroup"][v.key],
          };
        }

        if (v.resetValue) {
          response["permissionGroup"][v.key] = { value: null };
        }
      });
      permissionGroup = {
        ...response["permissionGroup"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getPermissionGroup();

  const deletePermissionGroup = async (permissionGroupId) => {
    let response = await RestService.deletePermissionGroup(permissionGroupId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/permissionGroups");
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
          navigate("/panel/permissionGroups");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deletePermissionGroupApprove($params.permissionGroupId)}
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
            Yetki grubu güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if permissionGroup}
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
                  placeholder={"başlık"}
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
            <div class="w-full lg:w-12/12 px-4 text-right mt-5">
              <button
                on:click={updatePermissionGroup}
                disabled={!permissionGroup.name.isValid ||
                  (permissionGroup.permissions &&
                    permissionGroup.permissions.length < 1)}
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
