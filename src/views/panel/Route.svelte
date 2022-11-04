<script>
  import FooterAdmin from "$components/Footers/FooterAdmin.svelte";
  import { Route, Router } from "svelte-navigator";
  import AdminNavbar from "./Navbar.svelte";
  import Categories from "./category/Categories.svelte";
  import CreateCategory from "./category/CreateCategory.svelte";
  import UpdateCategory from "./category/UpdateCategory.svelte";
  import Dashboard from "./Dashboard.svelte";
  import CreateEvent from "./event/CreateEvent.svelte";
  import Events from "./event/Events.svelte";
  import UpdateEvent from "./event/UpdateEvent.svelte";
  import CreateSeatPlan from "./seatPlan/CreateSeatPlan.svelte";
  import SeatPlans from "./seatPlan/SeatPlans.svelte";
  import UpdateSeatPlan from "./seatPlan/UpdateSeatPlan.svelte";
  import CreateShow from "./show/CreateShow.svelte";
  import Shows from "./show/Shows.svelte";
  import UpdateShow from "./show/UpdateShow.svelte";
  import CreateSlider from "./slider/CreateSlider.svelte";
  import Sliders from "./slider/Sliders.svelte";
  import UpdateSlider from "./slider/UpdateSlider.svelte";
  import CreateTag from "./tag/CreateTag.svelte";
  import Tags from "./tag/Tags.svelte";
  import UpdateTag from "./tag/UpdateTag.svelte";
  import UpdateAdmin from "./admin/UpdateAdmin.svelte";
  import CreateAdmin from "./admin/CreateAdmin.svelte";
  import Admins from "./admin/Admins.svelte";
  import UpdatePermissionGroup from "./permissionGroup/UpdatePermissionGroup.svelte";
  import CreatePermissionGroup from "./permissionGroup/CreatePermissionGroup.svelte";
  import PermissionGroups from "./permissionGroup/PermissionGroups.svelte";
  import UpdateVenue from "./venue/UpdateVenue.svelte";
  import CreateVenue from "./venue/CreateVenue.svelte";
  import Venues from "./venue/Venues.svelte";
  import UpdateBoxOffice from "./boxOffice/UpdateBoxOffice.svelte";
  import CreateBoxOffice from "./boxOffice/CreateBoxOffice.svelte";
  import BoxOffices from "./boxOffice/BoxOffices.svelte";
  import Levels from "./level/Levels.svelte";
  import CreateLevel from "./level/CreateLevel.svelte";
  import UpdateLevel from "./level/UpdateLevel.svelte";
  import Users from "./user/Users.svelte";
  import SeastAndPrices from "./event/SeastAndPrices.svelte";

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

</script>

<div>
  <!-- <Sidebar /> -->

  <div class="relative bg-blueGray-100">
    <AdminNavbar />

    <div class="relative bg-blue-600 md:pt-32 pb-32 pt-12" />

    <div class="px-2 mx-auto w-full -m-24">
      <Router>
        <!-- Dashboard -->
        <Route path="dashboard" component={Dashboard} />

        <!-- PermissionGroup -->
        <Route
          path="update-permissionGroup/:permissionGroupId"
          component={UpdatePermissionGroup}
        />

        <Route
          path="create-permissionGroup"
          component={CreatePermissionGroup}
        />

        <Route path="permissionGroups" component={PermissionGroups} />

        <!-- Admin -->
        <Route path="update-admin/:adminId" component={UpdateAdmin} />

        <Route path="create-admin" component={CreateAdmin} />

        <Route path="admins" component={Admins} />

        <!-- Show -->
        <Route path="update-show/:showId" component={UpdateShow} />

        <Route path="create-show" component={CreateShow} />

        <Route path="shows" component={Shows} />

        <!-- Event -->
        <Route path="update-event/:eventId" component={UpdateEvent} />

        <Route
          path="event/seatsAndPrices/:eventId"
          component={SeastAndPrices}
        />

        <Route path="create-event" component={CreateEvent} />

        <Route path="events" component={Events} />

        <!-- Slider -->
        <Route path="update-slider/:sliderId" component={UpdateSlider} />

        <Route path="create-slider" component={CreateSlider} />

        <Route path="sliders" component={Sliders} />

        <!-- Tags -->
        <Route path="update-tag/:tagId" component={UpdateTag} />

        <Route path="create-tag" component={CreateTag} />

        <Route path="tags" component={Tags} />

        <!-- Categories -->
        <Route path="update-category/:categoryId" component={UpdateCategory} />

        <Route path="create-category" component={CreateCategory} />

        <Route path="categories" component={Categories} />

        <!-- SeatPlan -->

        <Route path="update-seatPlan/:seatPlanId" component={UpdateSeatPlan} />

        <Route path="create-seatPlan" component={CreateSeatPlan} />

        <Route path="seatPlans" component={SeatPlans} />

        <!-- Venue -->

        <Route path="update-venue/:venueId" component={UpdateVenue} />

        <Route path="create-venue" component={CreateVenue} />

        <Route path="venues" component={Venues} />

        <!-- BoxOffice -->

        <Route
          path="update-boxOffice/:boxOfficeId"
          component={UpdateBoxOffice}
        />

        <Route path="create-boxOffice" component={CreateBoxOffice} />

        <Route path="boxOffices" component={BoxOffices} />

        <!-- Level -->

        <Route path="update-level/:levelId" component={UpdateLevel} />

        <Route path="create-level" component={CreateLevel} />

        <Route path="levels" component={Levels} />

        <!-- User -->

        <Route path="users" component={Users} />
      </Router>

      <FooterAdmin />
    </div>
  </div>
</div>
