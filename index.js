#! /usr/bin/env node

import { program } from "commander";
import add from "./src/commands/add.js";

program
  .command("add")
  .description("Add items to your wishlist")
  .argument(
    "<filename>",
    "Filename of the wishlist items to import. Must include csv."
  )
  .argument("<username>", "user to login")
  .argument("<password>", "password for user")
  .action(add);

program.parse();
