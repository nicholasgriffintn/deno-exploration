import {
  Application,
  Router,
  isHttpError,
  Status,
} from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
const port: number = 8000;

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get('X-Response-Time');
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

const router = new Router();

router.get('/', (context) => {
  context.response.body = `<!DOCTYPE html>
		<html lang="en">
			<head>
			   <meta charset="UTF-8">
			   <meta name="viewport" content="width=device-width, initial-scale=1.0">

			   <title>Deno Exploration</title>
			</head>
			<body>
			   <div id="root">
                    <section class="hero">
                        <div class="hero__content">
	                        <h1 class="hero__content_title">
                                Welcome to my Deno Exploration
                            </h1>
                            <div class="hero__content__image">
                            </div>
                        </div>
                    </section>
				</div>
			</body>
		</html>
    `;
});

app.use(router.routes());
app.use(router.allowedMethods());

// Error handeling
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          context.response.body = `<!DOCTYPE html>
            <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <title>Deno Exploration</title>
                </head>
                <body>
                <div id="root">
                        <section class="hero">
                            <div class="hero__content">
                                <h1 class="hero__content_title">
                                    Whoops! That route was not found!
                                </h1>
                                <div class="hero__content__image">
                                </div>
                            </div>
                        </section>
                    </div>
                </body>
            </html>`;
          break;
        default:
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

app.listen({ port });
console.log(`server is running on port: ${port}`);
