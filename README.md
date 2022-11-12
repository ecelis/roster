# Roster ArqueriaPRO

## Overview

Registration for archery tournaments and export CSV for load in IANSEO.


## Getting Started

### 1. Clone the repository and install dependancies

```
git clone https://github.com/ecelis/roster.git
cd roster
npm install
```

### 2. Configure your local environment

Copy the env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

#### Database

A MongoDB database is needed to persist user accounts and to support email sign in.


### 3. Start the application

To run your site locally, use:

```
npm run dev
```

To run it it production mode, use:

```
npm build
npm start
```

### 5. Preparing for Production

You must set the `NEXTAUTH_URL` environment variable with the URL of your site, before deploying to production.

e.g. in your `.env.local` file - `NEXTAUTH_URL=https://example.com`

To do this with Vercel, you can use the [Vercel project dashboard](https://vercel.com/dashboard) or their cli via the `vc env` command:

```
vc env add NEXTAUTH_URL production
```

Do not forget to set the environment variables for the Client ID and Client Secret values for all your configured authentication providers in your hosting providers dashboard, i.e. with Vercel as described above.


## License

ISC

