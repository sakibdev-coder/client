# Kindred — Social Development Events Platform

Client URL: [http://localhost:3000](http://localhost:3000)

Kindred is a community-first event platform for discovering, joining, and organising local social development activities. This repository is the Next.js client.

## Features

- Browse upcoming community events in a responsive card grid.
- View the six most recent upcoming events on the public home page.
- Create future-dated cleanup, plantation, donation, education, and community-care events.
- Join an event, then see joined events sorted by event date.
- Manage, update, and delete only the events created by the signed-in user.
- Sign in with email and password, or continue with Google.
- Switch between light and dark DaisyUI themes on mobile, tablet, and desktop.
- See inline validation, loading, and success messages without browser alert pop-ups.

## Run locally

1. Copy `.env.local.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_URL` to the deployed API, including `/api`.
3. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to the Google OAuth web client id.
4. Install dependencies with `npm install`.
5. Start the app with `npm run dev` and open [http://localhost:3000](http://localhost:3000).
