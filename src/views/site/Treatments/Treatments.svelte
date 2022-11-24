<script>
  import Input from "$components/Form/Input.svelte";
  import Svg from "../../../assets/svg.json";
  let name;
  let email;
  let phone;
</script>

<div class="relative bg-dark-300 h-96 w-full z-10">
  <img
    class="absolute top-0 h-96 w-full opacity-10 right-0 object-cover z-1"
    src="/assets/img/treatments/back1.jpg"
    alt=""
  />
  <div class="container mx-auto">
    <div class="flex text-lg text-white/90 pt-20">
      Home <div class=" w-1 h-1 m-3 mt-3 bg-white/50 rounded-full" />
      Treatments
    </div>
    <div
      class="text-6xl text-white/90 tracking-tight w-fit pt-8 border-b-4 border-light-300/80 h-28 "
    >
      <span class="">Treatments</span>
    </div>
    <p class="text-white/90 w-1/2 pt-2 md:pt-8">
      Credibly innovate granular internal or organic sources whereas high
      standards in web-readiness. Energistically scale future-proof core
      competencies vis-a-vis impactful experiences. Dramatically synthesize
      integrated schemas with optimal networks.
    </p>
  </div>
</div>
<div class="container mx-auto grid grid-cols-12">
  <div class="col-span-8 pt-10 w-5/6">
    <div class="text-4xl tracking-tight text-light-300">
      For Health and Beauty
    </div>
    <div class="text-6xl font-bold tracking-tight text-dark-300">
      Our Treatments
    </div>
    <p class="pt-4">
      Dental surgery is the surgery of jaw bones and teeth. Therefore, it covers
      quite a number of dental procedures or medical procedures that involve
      artificial modification of dentition. It includes the following procedures
      below.
    </p>
    <h3 class="font-bold pt-4">Dental Surgery Procedures</h3>
    <h4 class=" pt-2">
      <span class="font-bold">1. Endodontic:</span> This is a type of surgery involving
      the root or pulp of the tooth.
    </h4>
    <p class="pt-2">
      <span class="font-bold">a. Root Canal:</span> A root canal surgery is an endodontic
      treatment done by an endodontist or dentist in order to treat a diseased or
      damaged tooth with the tooth root exposed. It involves removing the inflamed
      tooth pulp and tooth root from underneath the enamel and dentin in order to
      relieve pain and save a tooth from extraction (hence creating a root canal).
    </p>
    <p class="pt-2">
      The infected tooth is drilled and has its pulp removed, only to be
      replaced with an inert substance. Afterwards, a crown is placed atop the
      tooth to save it. In the past, a root canal was infamous for its
      painfulness. However, modern endodontic therapy of the root canal is
      nothing like the old days. It’s much more efficient and less painful than
      before.
    </p>
    <div class="grid grid-cols-2 grid-rows-2 gap-4 py-10">
      <img src="/assets/img/treatments/11.jpg" alt="" />
      <img src="/assets/img/treatments/12.jpg" alt="" />
      <img src="/assets/img/treatments/13.jpg" alt="" />
      <img src="/assets/img/treatments/14.jpg" alt="" />
    </div>
  </div>
  <div class="flex flex-col">
    <div class="right-menu w-72 lg:w-96 h-fit bg-light-300 rounded-md -mt-10 z-20">
      <div class="text-4xl text-white w-16 border-b-4 border-white m-8 h-14">
        <span class="-ml-1" />Treatments
      </div>
      <div class="flex flex-col mx-8 text-white text-lg ">
        <div class="border-b border-white/50 font-semibold py-2">
          Hollywood Smile
        </div>
        <div class="border-b border-white/50 font-semibold py-2">Implant</div>
        <div class="border-b border-white/50 font-semibold py-2">
          Hollywood Smile
        </div>
        <div class="border-b border-white/50 font-semibold py-2">Implant</div>
        <div class="border-b border-white/50 font-semibold py-2">
          Hollywood Smile
        </div>
        <div class="border-b border-white/50 font-semibold py-2 mb-10">
          Implant
        </div>
      </div>
    </div>
    <div
      class="w-72 lg:w-96 my-10 border-8 border-dark-300/10 rounded-md flex flex-col p-8"
    >
      <div
        class="lg:text-3xl md:text-2xl font-medium tracking-tight text-light-300 border-b h-12"
      >
        Get In Touch With Us
      </div>
      <div class="flex flex-col">
        <div class="flex py-6 z-10 border-b  ">
          <svg
            class="h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96"
            ><title>Call</title><g id="Call" fill="#374151"
              >{@html Svg.emergency_call}</g
            ></svg
          >
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span class="lg:text-2xl md:text-xl tracking-tight text-light-300 leading-[1.5] "
              >Call us anytime</span
            >
            <span class="lg:text-lg md:text-sm tracking-tight leading-[1] pb-1">
              0242-334-2424</span
            >
          </div>
        </div>
        <div class="flex py-6 z-10">
          <div class="w-20">
            <svg
              class="h-20 w-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 112"
              ><title>Call</title><g id="Call" fill="#374151"
                >{@html Svg.mail}</g
              ></svg
            >
          </div>
          <div class="flex flex-col justify-start pl-1 leading-[1] text-lg">
            <span class="md:text-xl lg:text-2xl tracking-tight text-light-300 leading-[1.5] "
              >Mail Us</span
            >
            <span class="text-sm lg:text-lg tracking-tight leading-[1] pb-1">
              info@sideshinedental.com</span
            >
          </div>
        </div>
      </div>
      <div
        class="lg:text-3xl md:text-2xl font-medium tracking-tight text-light-300 border-b h-12"
      >
        Book An Appointment
      </div>
      <div class="flex gap-4 relative w-full mt-4 flex flex-col">
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={name}
          placeholder={"Your Name"}
          required={true}
        />
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={email}
          placeholder={"Your Mail"}
          required={true}
          type="email"
        />
        <Input
          customClass="h-12 text-[1rem] placeholder:text-[1rem] drop-shadow shadow-lg"
          bind:value={phone}
          placeholder={"Your phone number"}
          required={true}
        />

        <button
          class="h-12 bg-light-300 drop-shadow shadow-lg text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          SEND
        </button>
      </div>
    </div>
  </div>
</div>
