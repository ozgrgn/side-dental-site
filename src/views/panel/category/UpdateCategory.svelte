<script>
  import Input from "$components/Form/Input.svelte";
  import { Translate, TranslateApiMessage } from "$services/language";
  import RestService from "$services/rest.js";
  import ToastService from "$services/toast";
  import { navigate, useParams } from "svelte-navigator";
  const params = useParams();
  import { modal } from "$services/store";
  import { bind } from "svelte-simple-modal";
  import Alert from "$components/Alert.svelte";
  import NumberInput from "$components/Form/NumberInput.svelte";
  import Switch from "$components/Switch.svelte";
  import Image from "$components/Form/Image.svelte";
  const deleteCategoryApprove = (categoryId) => {
    modal.set(
      bind(Alert, {
        message: "Bu işlemi onaylıyor musunuz ?",
        answer: (message) => {
          if (message) {
            deleteCategory(categoryId);
          }
          modal.set(null);
        },
      })
    );
  };

  let category;
  let editedCategory = {};
  let values = [
    { key: "title" },
    { key: "name" },
    { key: "order" },
    { key: "isActive" },
    { key: "heroImage" },
    { key: "mobileImage" },
  ];

  const updateCategory = async () => {
    values.map((v) => {
      if ([v.key] == "order" || [v.key] == "heroImage"|| [v.key] == "mobileImage") {
        editedCategory[v.key] = category[v.key].value;
      } else {
        editedCategory[v.key] = { tr: null, en: null };
        editedCategory[v.key]["tr"] = category[v.key]["tr"].value;
        editedCategory[v.key]["en"] = category[v.key]["en"].value;
      }
    });

    let response = await RestService.updateCategory(
      category._id,
      editedCategory
    );
    if (response["status"]) {
      ToastService.success($Translate("Successfully-completed"));
      navigate("/panel/categories");
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  const getCategory = async () => {
    let response = await RestService.getCategory($params.categoryId);

    if (response["status"]) {
      values.map((v) => {
        if (v.key == "order" || v.key == "heroImage" || [v.key] == "mobileImage") {
          response["category"][v.key] = {
            value: response["category"][v.key],
          };
        } else {
          response["category"][v.key]["tr"] = {
            value: response["category"][v.key]["tr"],
          };
          response["category"][v.key]["en"] = {
            value: response["category"][v.key]["en"],
          };
        }
      });
      category = {
        ...response["category"],
      };
    } else {
      ToastService.error($TranslateApiMessage(response.message));
    }
  };

  getCategory();

  const deleteCategory = async (categoryId) => {
    let response = await RestService.deleteCategory(categoryId);
    if (response["status"]) {
      ToastService.success("İşlem başarılı");
      navigate("/panel/categories");
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
          navigate("/panel/categories");
        }}
      >
        <i class="fa fa-arrow-left" />
        {$Translate("Back")}
      </button>

      <button
        class="bg-white text-blue-600 hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
        type="button"
        on:click={() => deleteCategoryApprove($params.categoryId)}
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
            Kategori güncelle
          </h3>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        {#if category}
          <form>
            <div class="flex flex-wrap my-4">
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Başlık TR
                  </label>

                  <Input
                    bind:value={category.title["tr"].value}
                    bind:isValid={category.title["tr"].isValid}
                    placeholder={"Başlık"}
                    required={true}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Başlık EN
                  </label>

                  <Input
                    bind:value={category.title["en"].value}
                    bind:isValid={category.title["en"].isValid}
                    placeholder={"Başlık"}
                    required={true}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Perma TR
                  </label>

                  <Input
                    bind:value={category.name["tr"].value}
                    bind:isValid={category.name["tr"].isValid}
                    placeholder={"İsim"}
                    required={true}
                  />
                </div>
              </div>
              <div class="w-full lg:w-3/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Perma EN
                  </label>

                  <Input
                    bind:value={category.name["en"].value}
                    bind:isValid={category.name["en"].isValid}
                    placeholder={"İsim"}
                    required={true}
                  />
                </div>
              </div>
              <div class="flex w-full lg:w-3/12 px-4">
                <div class="relative ml-4 mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2"
                    for="rectangleBanner"
                  >
                    TR Aktif mi ?
                  </label>
                  <Switch bind:value={category.isActive["tr"].value} />
                </div>
              </div>
              <div class="flex w-full lg:w-3/12 px-4">
                <div class="relative ml-4 mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2"
                    for="rectangleBanner"
                  >
                    EN Aktif mi ?
                  </label>
                  <Switch bind:value={category.isActive["en"].value} />
                </div>
              </div>
              <div class="w-full lg:w-2/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block  text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-name"
                  >
                    Sıra
                  </label>
                  <NumberInput
                    bind:value={category.order.value}
                    bind:isValid={category.order.isValid}
                    placeholder={"Sıra"}
                    required={true}
                  />
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="border relative w-full h-72 mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2 ml-2"
                    for="rectangleBanner"
                  >
                    Hero Image
                  </label>
                  <div class="flex h-full flex-col justify-center my-2">
                    <Image
                      bind:value={category.heroImage.value}
                      bind:isValid={category.heroImage.isValid}
                    />
                  </div>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="border relative w-full h-72 mb-3">
                  <label
                    class="block text-blueGray-600 text-xs font-bold mb-2 ml-2"
                    for="rectangleBanner"
                  >
                    Mobile Image
                  </label>
                  <div class="flex h-full flex-col justify-center my-2">
                    <Image
                      bind:value={category.mobileImage.value}
                      bind:isValid={category.mobileImage.isValid}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-12/12 px-4 text-right mt-5">
                <button
                  on:click={updateCategory}
                  disabled={!category.title["tr"].isValid ||
                    !category.name["tr"].isValid}
                  class="bg-blue-600 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
                  type="button"
                >
                  {$Translate("Update")}
                </button>
              </div>
            </div>
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>
