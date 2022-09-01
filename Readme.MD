# xzess Api Boilerplate (xApi)
by Tim Koepsel / xzessmedia

A boilerplate for rapid Api development
Powered by Typescript, Express4, Swagger, Prisma


## Api Developer Docs
Checkout the Wiki here #Add Wiki Here

## How to bootstrap new Project
- Bare Clone repository like this `git clone https://github.com/xzessmedia/xzess-Api.git --bare <projectname>`
- Create a new git repository and then push it like this `git push --mirror <your_new_repo_url_here>`
- Delete the local repository
- Clone your new copy `git clone <your_new_repo_url_here>`
- Add Upstream with `git remote add upstream https://github.com/xzessmedia/xzess-Api.git` and `git remote set-url --push upstream DISABLE`

## Update the latest xApi
When you develop your Api it can happen that xApi has been updated
Then you want to get the latest update to your project by

```shell
git fetch upstream
git pull upstream master
```
---

## Update Submodule
Update the Submodule by ``

```shell
git submodule update --init --recursive --force –remote
```
---

## Quick Start

### 1. Installation
First install the project locally

```shell
# install deps
npm install
```
### 2. Setup Environment
- Open `.env` File in root folder and setup your database url
- Edit Configuration `/server/api/cfg/config.json` to your needs
---

### 3. Prepare Database

Design your database tables in your database and install sql files from /data subdirectory
Then run:

```shell
# pull database tables and create models
npx prisma db pull
```

This will generate models from your database in `/prisma` subdirectory

---

### 5. Start developing

Get started developing...

```shell
# run api
npm start

# run in development mode
npm run dev

# run unit tests
npm run test
```

---

### 6. Accessing ORM

You can access the ORM from everywhere using the ORM Keyword
```typescript
ORM.users.findMany()
```

Read the Prisma documentation for further information
https://www.prisma.io/docs/

---

### 7. Creating new Routes
Create your route implementation in a subdirectory of `/server/api`
and link your script in `/server/routes.ts`

Use JSDoc Tags for decorating your swagger documentation

```typescript
/**
 * GET /api/v1/status
 * @summary This is the summary or description of the endpoint
 * @security ApiKey
 * @tags Core
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example response - 200 - example success response
 * {
 *   "Name": "Api Name",
 *   "Status": "Online",
 *   "Time": "",
 *   "Version": "0.1"
 * }
 */

api.get('/status', passport.authenticate('token', {session:false}), async (req: Request, res: Response) => {
    res.send({
        Name: config.name,
        Status: 'Online',
        Time: new Date().toISOString(),
        Version: config.version
    })
});
```

You can setup your swagger file inside `/server/core/module/swagger/swagger.ts`

```typescript
const options = {
    info: {
        version: '1.0.0',
        title: 'xzess api',
        license: {
            name: 'MIT',
            url: 'http://example.com',
        },
        description: 'API desctiption',
        contact: {
            name: 'contact name',
            url: 'http://example.com',
            email: 'test@test.com',
        },
        termsOfService: 'http://example.com',
    },
    servers: [
        {
            url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
            description: 'The production API server',
            variables: {
                username: {
                    default: 'demo',
                    description: 'this value is assigned by the service provider, in this example `gigantic-server.com`',
                },
                port: {
                    enum: [
                        '8443',
                        '443',
                    ],
                    default: '8443',
                },
                basePath: {
                    default: 'v2',
                },
            },
        },
    ],
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
        ApiKey: {
            type: 'apiKey',
            name: 'token',
            in: 'header'
        }


    },
    baseDir: __dirname,
    filesPattern: ['./**/*.js', './**/*.ts','./server/**/*.ts','./server/**/*.js','../api/routes/**/*.js','../routes.js'], // Glob pattern to find your jsdoc files
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
};
```

For further Informations about the swagger parser read here:
https://brikev.github.io/express-jsdoc-swagger-docs/#/configuration?id=full-example

---

### 8. Hints
You can subclass and implement new Connectors or Endpoints

Checkout `/server/core` especially `endpoint.ts databaseconnector.ts basicfilter.ts`

In the current version this is in change because the api has changed a lot and we added prisma as ORM for example

---

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```


#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```
