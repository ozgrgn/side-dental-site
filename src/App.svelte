<!-- App.svelte -->
<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Route, Router, navigate } from "svelte-navigator";
  import { modal, lang, user, closeModal } from "./services/store";
  import Modal from "svelte-simple-modal";
  import AdminRoute from "./views/panel/Route.svelte";
  import SiteRoute from "./views/site/Route.svelte";
  import Auth from "./views/auth/Auth.svelte";
  import { onDestroy } from "svelte";
  import SOCKET from "./services/socket";
  import RestService from "./services/rest";
  import moment from "moment-timezone";
  moment.tz.setDefault("Europe/Istanbul");
  if (
          window.location.pathname == "/auth/login" ||
          window.location.pathname == "/panel" ||
          window.location.pathname == "/panel/"
        ) {
  let userAuthSubscription = user.subscribe(async (auth) => {
    if (!auth) {
      navigate("/auth/login");
      SOCKET.stopConnection();
      if (window.location.pathname.indexOf("admin") != -1) {
        navigate("/auth/login");
      }
    } else {
      let response = await RestService.verifyToken();
      if (response && response.status) {
        SOCKET.startConnection();
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
    }}
  )};
  onDestroy(() => {
    userAuthSubscription;
  });

  let browserLang = navigator.language || navigator.userLanguage;
  if (!$lang) lang.set(browserLang.split("-")[0]);
</script>

<Modal show={$modal} />

<SvelteToast />

<Router primary={false}>
  <Route path="auth/*auth" component={Auth} />

  <Route path="panel/*" component={AdminRoute} />
  <Route path="/*" component={SiteRoute} />
  <Route path="" component={SiteRoute} />
</Router>
