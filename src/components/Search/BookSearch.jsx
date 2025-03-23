import React from "react";
import { TextField, Theme } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function BookSearch() {
  return (
    <div>
      <Theme>
        <TextField.Root
          className="w-[100%] h-10"
          placeholder="Search for Books…"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Theme>
    </div>
  );
}

export default BookSearch;
