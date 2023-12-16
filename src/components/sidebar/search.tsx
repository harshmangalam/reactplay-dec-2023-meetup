import { component$ } from "@builder.io/qwik";
import { TextInput } from "../ui/text-input";
import { Form } from "@builder.io/qwik-city";
import { Button } from "../ui/button";

export const Search = component$(() => {
  return (
    <Form class="flex items-center gap-2">
      <TextInput
        type="search"
        aria-label="Search"
        name="search"
        placeholder={"Search..."}
      />
      <Button colorScheme={"btn-primary"} type={"submit"}>
        Search
      </Button>
    </Form>
  );
});
