# Deno Exploration

This is just a simple project to explore how Deno works and the pros / cons of using deno.

## Getting Started

Like Node, you need to install Deno via your pacakage manager, for mac with homebrew this is:

`brew install deno`

For other platforms and package managers, Deno has some instructions on their site: https://deno.land/.

Once installed, Deno can be started by using the `deno run` command, like so:

`deno run --allow-net src/server.tsx`.

## Pros

- Very similar to Express in it's syntax so it's simple to get started with if you know Express.

## Cons

- Importing modules does not use NPM so it's a bit different to what you might be used to, instead, you import external packages using URLs, local packages work the same as usual.

- You have to use file extensions in your import (eg: .ts or .js), otherwise Deno doesn't know what you are importing.

- Support for third-party packages is okay but not as great as the support for the Node platoform, especially when making static sites or SSR sites, where things like Next.JS work really well for.
