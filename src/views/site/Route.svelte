<script>
  import Footer from "$components/Footers/Footer.svelte";
  import FooterAdmin from "$components/Footers/FooterAdmin.svelte";
  import FooterSmall from "$components/Footers/FooterSmall.svelte";
  import { Route, Router } from "svelte-navigator";
  import About from "./About/About.svelte";
  import Header from "./Header/Header.svelte";
  import Index from "./Home/Index.svelte";
  import Treatments from "./Treatments/Treatments.svelte";
</script>

  <div class="min-h-screen">
    <Header />

    <div class=" mx-auto w-full relative ">
      <Router>
        <Route path="/" component={Index} />
        <Route path="/about" component={About} />
        <Route path="/treatments" component={Treatments} />
      </Router>
    </div>
  </div>
    <Footer />


