<!-- App.svelte -->
<script>
  import { Route, Router, navigate } from "svelte-navigator";
  import {
    lang,
    langs,
    user,
    general,
    translate,
    treatments,
  } from "./services/store";
  import DesktopRoutes from "./views/desktop/Route.svelte";
  import MobileRoutes from "./views/mobile/Route.svelte";
  import Auth from "./views/auth/Auth.svelte";
  import { onDestroy } from "svelte";
  import RestService from "./services/rest";
  import { isDesktop } from "$services/utils";

  $: {reload($lang)}

  const reload = async () => {

  getLangs();
  getGenerals();
  getTranslates();
  getTreatments();
  }
  const getGenerals = async () => {
    let response = await RestService.getGenerals(undefined, undefined, $lang);

    general.set(response["generals"][0]);
  };
  const getTranslates = async () => {
    let response = await RestService.getTranslates(undefined, undefined, $lang);
    translate.set(response["translates"][0]);

  };

  const getLangs = async () => {
    let response = await RestService.getLangs(undefined, undefined);
    langs.set(response["langs"]);
  };
  const getTreatments = async () => {
    let response = await RestService.getTreatments(
      undefined,
      undefined,
      $lang,
      true,
      undefined
    );
    treatments.set(response["treatments"]);
  };
  if (
    window.location.pathname == "/auth/login" ||
    window.location.pathname == "/panel" ||
    window.location.pathname == "/panel/" ||
    window.location.pathname.includes("panel")
  ) {
    let userAuthSubscription = user.subscribe(async (auth) => {
      if (!auth) {
        navigate("/auth/login");

        if (window.location.pathname.indexOf("admin") != -1) {
          navigate("/auth/login");
        }
      } else {
        let response = await RestService.verifyToken();
        if (response && response.status) {
          if (
            window.location.pathname == "/auth/login" ||
            window.location.pathname == "/panel" ||
            window.location.pathname == "/" ||
            window.location.pathname == "/panel/"
          ) {
            navigate("/panel/dashboard");
          }
        } else {
          user.set(null);
        }
      }
    });
    onDestroy(() => {
      userAuthSubscription;
    });
  }

  let browserLang = navigator.language || navigator.userLanguage;
  if (!$lang) lang.set(browserLang.split("-")[0]);
</script>




<Router primary={false}>
  <Route path="auth/*auth" component={Auth} />

  {#if isDesktop()}
    <Route component={DesktopRoutes} />
  {:else}
    <Route component={MobileRoutes} />
  {/if}
</Router>
