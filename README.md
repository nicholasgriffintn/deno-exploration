# Deno Exploration

This is just a simple project to explore how Deno works and the pros / cons of using deno.

## Getting Started

Like Node, you need to install Deno via your pacakage manager, for mac with homebrew this is:

`brew install deno`

For other platforms and package managers, Deno has some instructions on their site: https://deno.land/.

Once installed, Deno can be started by using the `deno run` command, like so:

`deno run --allow-net --allow-read src/server.tsx`.

Run the following command to start the local server:

`npm run start`

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

- Very similar to Express in its syntax so it's simple to get started with if you know Express.

- Deno can be considered more lightweight than Express as a lot of the boilerplate requires additional packages.

- Deno requires certain variables to be included in the start command for allowing access to things that may require more security, like being able to read files.

- In general the permissions are very good, more about those can be found here: https://deno.land/manual/getting_started/permissions

- There's a decent amount of middleware available for core functionality like GraphQL: https://deno.land/x/gql@0.2.1

- Deno could be run on AWS Lambda looking at various projects, there's even a runtime for it here: https://github.com/hayd/deno-lambda

- Both Node.js and Deno use the V8 engine

- Built on typescript and you don't need to manually configure an environment in order to work with Deno and TypeScript

- Browser based APIs are built into Deno

- Because it doesn't use NPM, there's no massive node_modules folder to worry about.

- Deno has a built in test runner: https://deno.land/manual/testing, however you can pull in mocha if you prefer

## Cons

- Tools like AWS Lambda natively support Node, not Deno, outside of custom runtimes.

- Importing modules does not use NPM so it's a bit different to what you might be used to, instead, you import external packages using URLs, local packages work the same as usual.

- Because it doesn't use NPM you can't manage dependencies from a central place, a way around this is to create a dependencies folder and import files within that for your components, like I have done for the React rendering.

- You have to use file extensions in your import (eg: .ts or .js), otherwise Deno doesn't know what you are importing.

- Support for third-party packages is okay but not as great as the support for the Node platoform, especially when making static sites or SSR sites, where things like Next.JS work really well for.

- The Oak middleware is a bit trickier to setup than similar middlewares on Express

- Getting data from the body within a post API is slightly more complex than Express by default, although there may be a middleware that makes this easier.

- For CPU intensive operations, Node.js is deemed to be much faster than Deno, as shown in this example: https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-4-https-form-data-base-64-decode-e9dac99c00c7

## Pros / Cons

- Deno is considered performant, with some saying that it is more performant than Node.js: https://deno.land/benchmarks, however, some are also saying that Node.js is more performant, so it probably depends on experience. This article talks about performace with a simple app, comparing concurrency changes: https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-1-hello-world-3f3b26dd98b9. It concludes that it is faster in this case at high load, however, not but a lot and these are simple examples.

In an example comparing oak to express, oak is significantly faster here: https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-2-https-hello-name-be84f0afd053

This is a similar case in this example: https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-2-redis-regex-uuid-d69f235a848c however, it's not as dramatic of a difference

- Type checking appears to run at compile time, which may result in slower deployments, however checking outside of runtime may appear to be a benefit to some.
