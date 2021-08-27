# Deno Exploration

This is just a simple project to explore how Deno works and the pros / cons of using deno.

## Getting Started

Like Node, you need to install Deno via your pacakage manager, for mac with homebrew this is:

`brew install deno`

For other platforms and package managers, Deno has some instructions on their site: https://deno.land/.

Once installed, Deno can be started by using the `deno run` command, like so:

`deno run --allow-net --allow-read src/server.tsx`.

## Oak middleware

For HTTP responses, there is a middleware called Oak that will allow you to create an Application in a similar fashion to Koa, the Github for this can be found here: https://github.com/oakserver/oak

## HTML Rendering Example

http://localhost:8000/

## React Rendering Example

http://localhost:8000/?useReact=true

## API list example

http://localhost:8000/api/movies

## API find example

http://localhost:8000/api/movies/537915

## API post example

http://localhost:8000/api/movies

Data to send:

```
{
    "title": "test",
    "poster": "https://image.tmdb.org/t/p/w500/vVPrWngVJ2cfYAncBedQty69Dlf.jpg",
    "overview": "After a zombie apocalypse spreads from a London prison, the UK is brought to its knees. The spread of the virus is temporarily contained but, without a cure, it’s only a matter of time before it breaks its boundaries and the biggest problem of all… any zombies with combat skills are now enhanced. With the South East of England quarantined from the rest of the world using fortified borders, intelligence finds that the scientist responsible for the outbreak is alive and well in London. With his recovery being the only hope of a cure, a squad of eight Special Forces soldiers is sent on a suicide mission to the city, now ruled by the undead, with a single task: get him out alive within 72 hours by any means necessary. What emerges is an unlikely pairing on a course to save humanity against ever-rising odds.",
    "release_date": 1538096400,
    "genres": [
        "Action",
        "Horror"
    ]
}
```

## Pros

- Very similar to Express in it's syntax so it's simple to get started with if you know Express.

- Deno can be considered more lightweight than Express as a lot of the boilerplate requires additional packages.

- Deno requires certain variables to be included in the start command for allowing access to things that may require more security, like being able to read files.

## Cons

- Importing modules does not use NPM so it's a bit different to what you might be used to, instead, you import external packages using URLs, local packages work the same as usual.

- Because it doesn't use NPM you can't manage dependencies from a central place, a way around this is to create a dependencies folder and import files within that for your components, like I have done for the React rendering.

- You have to use file extensions in your import (eg: .ts or .js), otherwise Deno doesn't know what you are importing.

- Support for third-party packages is okay but not as great as the support for the Node platoform, especially when making static sites or SSR sites, where things like Next.JS work really well for.

- The Oak middleware is a bit trickier to setup than similar middlewares on Express

- Getting data from the body within a post API is slightly more complex than Express by default, although there may be a middleware that makes this easier.
