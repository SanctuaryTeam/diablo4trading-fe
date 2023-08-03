# @sanctuaryteam/web-app

## Pre-requisites

Requires [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/).

## Project setup

1. Create a [new GitHub personal access token](https://github.com/settings/tokens/new) with the following scopes:

    ```
    read:packages
    ```

2. Set env variable `SANCTUARYTEAM_AUTH_TOKEN` to the token value. You should run `cp .env.example .env` and modify this new file to store your token.

3. Run
    ```bash
    yarn install
    ```

## Compiles and hot-reloads for development

```bash
yarn dev
```

## Running Docker development

Make sure Docker is installed.

If you are on Windows, you should be running the files from within a WSL container. Otherwise, you will not be able to hot reload and file access will be slow.

1. Start Ubuntu (or the distro you installed with WSL/Docker)
2. Checkout the repositories or copy it from your local filesystem `cp -r /mnt/c/Users/username/Documents/sanctuaryteam/ ~/` (your file path may vary)
3. Enter the folder in the command line `cd ~/sanctuaryteam/web-app`
4. Run the following command to start development:

```bash
docker compose up
```

5. To modify the files on your Windows machine install [Remote WSL for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
6. In your WSL instance, run `code .` inside of the `web-app` folder.
7. Start VS Code and select the **Remote Explorer** from the left-hand side, and choose the web-app.

## Running commands on Docker service

```bash
docker-compose run web-app yarn add my-package --dev
```

## Running prettier

```bash
yarn run format
```

or to save changes

```bash
yarn run format --write
```
