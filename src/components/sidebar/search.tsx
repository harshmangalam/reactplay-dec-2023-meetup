import { $, component$, useSignal } from "@builder.io/qwik";
import { useSearch } from "~/routes/layout";
import { TextInput } from "../ui/text-input";

export const Search = component$(() => {
  const actionSig = useSearch();
  const inputSig = useSignal("");

  const handleSearch = $(() => {
    actionSig.submit({
      search: inputSig.value,
    });
  });
  return (
    <TextInput
      type="search"
      aria-label="Search"
      name="search"
      placeholder={"Search..."}
      bind:value={inputSig}
      onInput$={handleSearch}
    />
  );
});
