import { component$ } from "@builder.io/qwik";
import { useFavoriteContact } from ".";
import { Form } from "@builder.io/qwik-city";
import { StarIcon } from "~/icons/star";
import { StarSolidIcon } from "~/icons/star-solid";

export const Favorite = component$(({ favorite }: { favorite: boolean }) => {
  const action = useFavoriteContact();
  return (
    <Form action={action}>
      <button
        disabled={action.isRunning}
        class="disabled:cursor-wait disabled:text-gray-500"
        name="favorite"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? (
          <span class="text-orange-500">
            <StarSolidIcon />
          </span>
        ) : (
          <StarIcon />
        )}
      </button>
    </Form>
  );
});
