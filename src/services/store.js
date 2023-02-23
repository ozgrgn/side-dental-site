import { writable } from "svelte/store";
export const lang = writable(null);
export const user = writable(null);

const isLocalStorageAvailable = async () => {

  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    const _lang =
      localStorage.getItem("lang") && localStorage.getItem("lang") != "null"
        ? localStorage.getItem("lang")
        : (navigator.language || navigator.userLanguage).split("-")[0];
    lang.set(_lang);

    document.documentElement.setAttribute("lang", _lang);
    lang.subscribe((value) => {
      localStorage.setItem("lang", value);

      user.set(_user);

      const _user = localStorage.getItem("user") && localStorage.getItem("user") != "null"
        ? JSON.parse(localStorage.getItem("user"))
        : null
      user.subscribe((value) => {
        localStorage.setItem("user", JSON.stringify(value));
      });
    });


  } catch (e) {
    lang.set("en");


    return false;
  }
}

// if(isLocalStorageAvailable()){
//   console.log( "available")
// }else{
//   console.log( "unavailable")
// export const user = writable(null);


// }

//  export const user = writable(null);






export const toast = writable({});

export const langs = writable(0);
export const general = writable(0)
export const translate = writable(0)
export const treatments = writable(0)
export const modal = writable(null);
export const modal1 = writable(null);

