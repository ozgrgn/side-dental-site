<script>
    import { link } from "svelte-navigator";
  
    import { lang } from "../../services/store";

    import LangSelect from "../Form/LangSelect.svelte";
    export let treatments;
    export let general;
    const langTrigger = (_lang) => {
      document.documentElement.setAttribute("lang", _lang);
      setTimeout(() => {
        lang.set(_lang);
      }, 1); // cause svelte is faster than browser
    };
  </script>
  
  <footer class="relative bg-dark-300" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="pb-8 xl:grid xl:grid-cols-6 xl:gap-2">
        <div class="md:grid md:grid-cols-2 gap-16 xl:col-span-4">
          <div class="first">
            <div class="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3
                  class="text-sm font-semibold text-white tracking-wider uppercase"
                >
                SİDE SHINE DENTAL
                </h3>
  
                <div class="">
                  <p class=" px-2 pt-5 text-md tracking-tight text-gray-200 ">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10 md:mt-0 md:grid md:grid-cols-1 md:gap-8">
            <div>
              <h3
                class="text-sm font-semibold text-white tracking-wider uppercase"
              >
              Tedaviler
              </h3>
              <div class="grid-rows-1">
                <div class="grid grid-cols-2 ">
                  <div class="">
                    <ul class="mt-4 space-y-4">
                      {#each Array(4) as treatment,i}
                        <li>
                          <a
                            use:link
                            href="e"
                            class="text-base text-gray-200 hover:text-white"
                          >
                            Tedavi {i+1}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  </div>
                  <ul class="mt-4 space-y-4">
                    {#each Array(4) as treatment,i}
                      <li>
                        <a
                          use:link
                          href="e"
                          class="text-base text-gray-200 hover:text-white"
                        >
                          Tedavi {i+5}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="third">
          <div class=" mt-10 lg:mt-0 md:grid md:grid-cols-1 ">
            <div>
              <h3
                class="text-sm font-semibold text-white tracking-wider uppercase"
              >
              İletişim
              </h3>
  
              <div class="">
                <p class=" pt-5 text-md tracking-tight text-gray-200">
                  <a href="tel:e23234234">
                  +535 553 53 54
                  </a>
                </p>
                <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                  <a href="mailto:23423">
                info@sideshinedental.com</a
                  >
                </p>
                <p class=" pt-5 text-md tracking-tight text-gray-200 ">
                 Deniz cad. Ilıca Mah. 252 sok. Side/Ilıca/Antalya 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 xl:mt-0">
          <h3 class="text-sm font-semibold text-white tracking-wider uppercase">
          Dil
          </h3>
          <form class="mt-4 sm:max-w-xs">
            <fieldset class="w-full">
              <label for="language" class="sr-only">Language</label>
              <div class="relative">
                <LangSelect
                  value={$lang}
                  change={(value) => langTrigger(value)}
                  values={[{ lang: "en" }]}
                  title=sdf
                  valuesKey={"lang"}
                  valuesTitleKey={"lang"}
                  required={false}
                  customClass={"uppercase appearance-none w-full bg-none bg-gray-700 border border-transparent rounded-md block py-2 pl-3 pr-10 text-base text-white focus:outline-none focus:ring-white focus:border-white sm:text-sm"}
                />
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center"
                >
                  <!-- Heroicon name: solid/chevron-down -->
                  <svg
                    class="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
  
      <div
        class="mt-8 border-t border-white/50 pt-8 md:flex md:items-center md:justify-between"
      >
        <div class="flex space-x-6 md:order-2">
          <a
            use:link
            href="tel:sdav"
            target="_blank"
            class="text-white hover:text-gray-200"
          >
            <span class="sr-only">Phone</span>
            <img
              class="h-[1.25rem] w-[1.25rem] mt-[0.1rem]"
              src="/assets/img/icons/phone-call.png"
              alt=""
            />
          </a>
          <a
            use:link
            href=vasd
            target="_blank"
            class="text-white hover:text-gray-200"
          >
            <span class="sr-only">Facebook</span>
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
  
          <a
            use:link
            href=sdv
            target="_blank"
            class="text-white hover:text-gray-200"
          >
            <span class="sr-only">Instagram</span>
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
  
          <a
            use:link
            href=svda
            target="_blank"
            class="text-white hover:text-gray-200"
          >
            <span class="sr-only">Instagram</span>
            <img
              class="h-[1.25rem] w-[1.25rem] mt-[0.1rem]"
              src="/assets/img/icons/whatsapp.png"
              alt=""
            />
          </a>
        </div>
        <p class="mt-8 text-base text-white md:mt-0 md:order-1">
        Önüm arkam sağım solum sobe 2022 Saklanmayan ebe.
        </p>
      </div>
    </div>
  </footer>
  