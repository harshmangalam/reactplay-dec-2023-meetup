import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { SearchIcon } from "~/icons/search";
import { useSearch } from "~/routes/layout";

export const Search = component$(() => {
  const action = useSearch();
  return (
    <Form action={action} class="group relative flex-1" role="search">
      <SearchIcon iconClass="absolute w-5 h-5 left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" />
      <input
        class="rounded-md py-2 pl-10 w-full border-gray-200 shadow"
        type="text"
        aria-label="Search"
        placeholder="Search"
        name="search"
      />
    </Form>
  );
});
