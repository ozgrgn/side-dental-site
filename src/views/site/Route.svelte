<script>
  import { Route, Router } from "svelte-navigator";
  import Header from "./Header/Header.svelte";
  import Index from "./Home/Index.svelte";


  
</script>

<div>
  <!-- <Sidebar /> -->

  <div class=" ">
    <Header/>

    
    <div class="px-2 mx-auto w-full relative">
      <Router>
        <Route path="/" component={Index} />
      </Router>
  
  </div>
</div>
</div>
