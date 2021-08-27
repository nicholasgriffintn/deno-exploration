import {
  Application,
  Router,
  isHttpError,
  Status,
  send,
} from 'https://deno.land/x/oak/mod.ts';
import movies from './data/movies.tsx';

// Application setup
const app = new Application();
const port: number = 8000;

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

// Main router
const router = new Router();

// Homepage
router.get('/', async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/src/views`,
    index: 'index.html',
  });
});

// Movies API
router
  .get('/api/movies', async (context) => {
    context.response.type = 'json';
    context.response.body = Array.from(movies.values());
  })
  .get('/api/movies/:id', async (context) => {
    if (context.params && context.params.id && movies.has(context.params.id)) {
      context.response.type = 'json';
      context.response.body = movies.get(context.params.id);
    } else {
      context.response.status = Status.NotFound;
      context.response.type = 'json';
      context.response.body = {
        message: '404 - Movie not found',
      };
    }
  })
  .post('/api/movies', async (context) => {
    const body = await context.request.body();

    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = { message: 'No data provided' };
      return;
    }

    const values = await body.value;

    if (values && values.title) {
      movies.set(Math.random().toString(), {
        id: Math.random(),
        title: values.title,
        poster: values.poster,
        overview: values.overview,
        release_date: values.release_date,
        genres: values.genres,
      });

      context.response.status = 200;
      context.response.body = { message: 'Movie posted successfully' };
      return;
    }

    context.response.status = 500;
    context.response.body = { message: 'Something Unexpected Happened' };
    return;
  });

// Catch all route
router.get('/(.*)', async (context) => {
  context.response.status = Status.NotFound;
  context.response.type = 'json';
  context.response.body = {
    message: '404 - Route Not Found',
  };
});

// Add router to app
app.use(router.routes());
app.use(router.allowedMethods());

// Static files
app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = ['/images/logo.svg'];

  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/src/public`,
    });
  }
});

// Error handeling
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          await send(context, context.request.url.pathname, {
            root: `${Deno.cwd()}/src/views`,
            index: '404.html',
          });
          break;
        default:
          await send(context, context.request.url.pathname, {
            root: `${Deno.cwd()}/src/views`,
            index: 'error.html',
          });
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

// Listen on port HTTP
app.listen({ port });
console.log(`server is running on port: ${port}`);
