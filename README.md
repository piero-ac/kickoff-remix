# Welcome to KickOff-EPL

This is website for viewing information about the English Premier League.

## Features

Users can:

<li>View the league standings (team rankings)</li>
<li>View matchdates (upcoming, ongoing, past)</li>
<li>View match data (events, statistics, lineups)</li>
<li>View Team Information (player statistics)</li>

## Stack

Database: MongoDB and Mongoose
Backend: Node and ExpressJS
Frontend: Remix, Typescript

## Website is still a work in progress.

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
