import { component$ } from "@builder.io/qwik";
import MoonIcon from "~/assets/icons/moon.svg?jsx"
export const ThemeSwitcher = component$(() => {
  return (
    <label class="swap swap-rotate">
      {/* <!-- this hidden checkbox controls the state --> */}
      <input type="checkbox" class="theme-controller" value="synthwave" />

      {/* <!-- sun icon --> */}
      <MoonIcon/>

      {/* <!-- moon icon --> */}
    </label>
  );
});
