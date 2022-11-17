<script>
  import Input from "$components/Form/Input.svelte";
  import Svg from "../../../assets/svg.json";
  import Box2 from "../Home/Box2.svelte";
  import Map from "../Shared/Map.svelte";
  let name;
  let email;
  let phone;
</script>

<div class="relative bg-dark-300  h-96 w-full z-10">
  <img
    class="absolute top-0 h-96 w-full opacity-10 right-0 object-cover z-1"
    src="/assets/img/contact/back2.jpg"
    alt=""
  />
  <div class="container mx-auto">
    <div class="flex text-lg text-white/90 pt-20 ">
      Home <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
      Contact
    </div>
    <div
      class="text-6xl text-white/90 tracking-tight w-fit pt-8 border-b-4 border-light-300/80 h-28 "
    >
      <span class="">Contact</span>
    </div>
    <p class="text-white/90 w-1/2 pt-8">
      Credibly innovate granular internal or organic sources whereas high
      standards in web-readiness. Energistically scale future-proof core
      competencies vis-a-vis impactful experiences. Dramatically synthesize
      integrated schemas with optimal networks.
    </p>
  </div>
</div>
<div class="container mx-auto">
  <div class="flex flex-col">
    <div class="flex justify-center pb-10 pt-20">
      <div class="text-6xl font-bold tracking-tight text-light-300">
        Contact
      </div>
      <h1 class="pl-2 text-6xl font-bold tracking-tight text-dark-300">
        Side Dental Clinic
      </h1>
    </div>
    <div class="flex justify-center">
      <p class="lg:w-1/2 px-10 text-center">
        Globally incubate standards compliant channels before scalable benefits.
        Quickly disseminate superior deliverables whereas web-enabled
        applications.
      </p>
    </div>
    <div class="flex justify-center my-10">
      <div class="lg:w-2/3 grid grid-cols-4 gap-1 h-32 ">
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                ><g fill="#374151">{@html Svg.emergency_call}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight  text-light-300 leading-[1.5] "
                  >Emergency Call</span
                >
                <p class="flex flex-col justify-center h-8 ">
                  <span class="text-sm tracking-tight leading-[1]">
                    0242-334-2424</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                ><g fill="#374151">{@html Svg.location}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5]"
                  >Address</span
                >
                <p class="flex flex-col justify-center h-8 ">
                  <span class="text-sm tracking-tight leading-[1]">
                    Ilıca Mahallesi 313 Sok A Blok No:3 <br /> Ilıca Side Antalya</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10 border-r">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 92"
                ><g fill="#374151">{@html Svg.schedule}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5] "
                  >Book By Phone</span
                >
                <p class="flex flex-col justify-center h-8">
                  <span class="text-sm tracking-tight leading-[1]">
                    0242-334-2424</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col justify-center z-10">
            <div class="h-[5.2rem] flex justify-center w-full">
              <svg
                class="h-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 92"><g fill="#374151">{@html Svg.mail}</g></svg
              >
            </div>
            <div class="text-center">
              <div class="flex flex-col">
                <span
                  class="text-2xl tracking-tight text-light-300 leading-[1.5] "
                  >Email Us</span
                >
                <p class="flex flex-col justify-center h-8">
                  <span class="text-sm tracking-tight leading-[1]">
                    info@sideshinedental.com</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="pb-16 mt-20 bg-dark-100">
  <Map title={false} mapBox="mapForm"></Map>

</div>