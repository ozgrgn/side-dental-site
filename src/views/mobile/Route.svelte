<script>
  import Footer from "$components/Footers/Footer.svelte";
  import { Route, Router } from "svelte-navigator";
  import Treatments from "../panel/treatment/Treatments.svelte";
  import About from "./About/About.svelte";
  import Contact from "./Contact/Contact.svelte";
  import Header from "./Header/Header.svelte";
  import Index from "./Home/Index.svelte";
  import {
    lang,
    langs,
    user,
    general,
    translate,
    treatments,
  } from "$services/store";
  </script>
{#if treatments && general && translate && lang}

  <div class="min-h-screen">
    <Header />
    <div class=" mx-auto w-full relative ">
      <Router>
        <Route path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/treatments/:perma" component={Treatments} />
        <Route path="/contact" component={Contact} />

      </Router>
    </div>
  </div>
    <Footer />

{/if}
