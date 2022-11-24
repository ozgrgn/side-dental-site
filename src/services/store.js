import { writable } from "svelte/store";


const _user = localStorage.getItem("user") && localStorage.getItem("user") != "null"
  ? JSON.parse(localStorage.getItem("user"))
  : null
export const user = writable(_user);
user.subscribe((value) => {
  localStorage.setItem("user", JSON.stringify(value));
});



const _lang =
  localStorage.getItem("lang") && localStorage.getItem("lang") != "null"
    ? localStorage.getItem("lang")
    : (navigator.language || navigator.userLanguage).split("-")[0];

document.documentElement.setAttribute("lang", _lang);
export const lang = writable(_lang);
lang.subscribe((value) => {
  localStorage.setItem("lang", value);
});

export const toast = writable({});



export const modal = writable(null);
export const closeModal = writable(null);
