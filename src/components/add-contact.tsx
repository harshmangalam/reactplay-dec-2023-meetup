import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import AddIcon from "~/assets/icons/plus.svg?jsx";
export const AddContact = component$(() => {
  return (
    <div class="absolute bottom-12 right-6">
      <Link href="/contacts/new" class="btn btn-circle btn-primary btn-lg">
        <AddIcon class="h-7 w-7" />
      </Link>
    </div>
  );
});
