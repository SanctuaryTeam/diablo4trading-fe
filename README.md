# sanctuaryteam/diablotrading-fe
diablo4.trading frontend application


## Windows Installation
Follow this setup guide - [Windows Setup Instructions](https://github.com/SanctuaryTeam/.github/wiki/WindowsSetUp)

## Set Up .env
Docker will user this file for project specific environment variables
- Create a [new GitHub personal access token](https://github.com/settings/tokens/new) with the following scopes: `read:packages`

- Update .env File:  run `cp .env.example .env` to create a new .env file. Update the new .env file with SANCTUARYTEAM_AUTH_TOKEN=YOUR_NEW_TOKEN

### Local Shared Package Development

The recommended project structure is to checkout all repositories in the same folder:

```bash
diablo4trading-be
diablo4trading-fe
shared
```

If you set `SHARED_LINK=true` in your `.env` file, docker will run `yarn link` and merge in some options in `tsconfig.json` and `vite.config.ts` that will allow for local package usage of the shared folder. This merging is handled by the script `tsconfig.merged.cjs`. In the environment file the `SHARED_PATH=../shared` is the local path on your system relative to this repository which contains the shared libraries between frontend and backend.

## Running the Application with Docker

To get your application up and running:
- Ensure you have both Docker and Docker Compose installed.
- Navigate to the directory containing your docker-compose.yml file.
```bash
 cd ~/sanctuaryteam/diablo4trading-fe
```
- Run the following command: `docker compose up`
- Access the Application: Once the containers are up and running, you can access the application in your browser using the URL: http://localhost:5173

## Development
**start** - Starts the application in development mode.
```bash
 yarn run start
```

**start:dev** - Starts the application in development mode with watch enabled.
```bash
 yarn run start:dev
```

**start:prod** - Starts the application in production mode.
```bash
 yarn run start:prod
```

**dev** - Starts the Vite development server.
```bash
 yarn run dev
```

**preview** - Previews the production build using Vite.
```bash
 yarn run preview
```

**tsc** - Runs TypeScript compiler (tsc) without emitting any files.
```bash
 yarn run tsc
```

## Translation

**lingui:extract** -  Extracts translations with LinguiJS, and removes obsolete translations.
```bash
 yarn run lingui:extract
```

**lingui:compile** - Compiles translations with LinguiJS and outputs TypeScript files.
```bash
 yarn run lingui:compile
```

## Build & Deployment
**prebuild** - Compiles translations before building.
```bash
 yarn run prebuild
```
**build** - Compiles TypeScript and then builds the project using Vite.
```bash
 yarn run build
```
## Code Quality (Linting & Formatting)
**lint** - Lints TypeScript files with ESLint.
```bash
 yarn run lint
```
**format** - Formats the code using dprint.
```bash
 yarn run format
```
## Testing
**test** - Runs both unit and UI tests.
```bash
 yarn run test
```

**test:unit** - Runs unit tests with Jest using a specific configuration.
```bash
 yarn run test:unit
```
**test:ui** - Runs UI tests with Jest using a specific configuration.
```bash
 yarn run test:ui
```
**test:coverage** - Runs unit tests with Jest, generating coverage information.
```bash
 yarn run test:coverage
```
