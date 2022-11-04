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



  let browserLang = navigator.language || navigator.userLanguage;

  lang.set(browserLang.split("-")[0] || "tr");
</script>

<Modal show={$modal}/>

<SvelteToast />

<Router primary={false}>
  <Route path="auth/*auth" component={Auth} />

  <Route path="panel/*" component={AdminRoute} />
  <Route path="/*" component={SiteRoute} />
  <Route path="" component={AdminRoute} />
</Router>
