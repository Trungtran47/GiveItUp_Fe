# GiveItUp Frontend

GiveItUp is the frontend application for a community fundraising and donation platform. It provides experiences for donors, campaign owners/organizations, and administrators, including campaign discovery, donations, payment QR generation, social interactions, profile management, payout processing, maps, and AI-assisted chat.

The application is built with **Next.js 16**, **React 19**, **Redux Toolkit**, **Redux Saga**, **Axios**, **Ant Design**, **Material UI**, **Tailwind CSS**, and **Sass**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Features

### User

- Register and sign in to an account.
- OAuth success flow.
- Password recovery and password reset.
- Browse and discover fundraising campaigns/projects.
- View recommended, related, and top campaigns.
- Search campaigns and view search history.
- View campaign details and updates.
- Discover campaigns by location/city.
- Make donations.
- Generate QR codes for payments and cancel payments.
- View donation information for campaigns.
- Comment on campaigns and react to comments.
- Like content and follow other users.
- Manage personal profile information.
- View public user/organization profiles.
- Manage bank account information.
- Submit and track payout requests.
- Use the built-in AI chat assistant.

### Admin

- View administrative dashboard data.
- Manage user accounts.
- Manage organization accounts.
- Manage campaign/project categories.
- Review and manage campaigns/projects.
- Manage donation records.
- Review and process payout requests.
- Update account and campaign statuses.

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | JavaScript / TypeScript |
| State Management | Redux Toolkit, React Redux |
| Side Effects | Redux Saga |
| HTTP Client | Axios |
| UI Components | Ant Design, Material UI |
| Styling | Tailwind CSS, Sass, Emotion, Styled Components |
| Forms | React Hook Form |
| Animation | Framer Motion |
| Maps | Leaflet, React Leaflet |
| Charts | Recharts |
| Authentication Utilities | js-cookie, jwt-decode |
| Realtime Libraries | STOMP.js, SockJS, EventSource Polyfill |
| QR | react-qr-code |
| Notifications | React Toastify |
| Icons | Lucide React, React Icons, MUI Icons |

## Project Structure

```text
GiveItUp_Fe/
├── public/
├── src/
│   ├── adapter/
│   │   └── axiosClient.js
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── oauth-success/
│   │   │   └── register/
│   │   ├── (user)/
│   │   │   ├── about_us/
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   ├── project/
│   │   │   ├── search/
│   │   │   └── u/[id]/
│   │   ├── admin/
│   │   │   ├── account/
│   │   │   ├── account_organization/
│   │   │   ├── category/
│   │   │   ├── dashboard/
│   │   │   ├── donation/
│   │   │   ├── payout-requests/
│   │   │   └── project/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.tsx
│   ├── assets/
│   ├── components/
│   ├── containers/
│   │   ├── admin/
│   │   └── users/
│   ├── redux/
│   │   ├── auth/
│   │   ├── bank_account/
│   │   ├── category/
│   │   ├── chat_bot/
│   │   ├── comment/
│   │   ├── dashboard/
│   │   ├── donate/
│   │   ├── follow/
│   │   ├── like/
│   │   ├── location/
│   │   ├── payment/
│   │   ├── payout/
│   │   ├── post/
│   │   ├── post_update/
│   │   ├── post_view/
│   │   ├── search_history/
│   │   └── user/
│   └── utils/
├── middleware.js
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### Architecture Overview

The project follows a layered frontend structure:

- **`src/app`**: Next.js App Router pages and layouts.
- **`src/components`**: reusable UI components.
- **`src/containers`**: page-level UI and feature composition.
- **`src/redux`**: Redux state, actions, reducers, sagas, and API factories grouped by domain.
- **`src/adapter`**: shared infrastructure such as the configured Axios client.
- **`src/utils`**: common utilities and helper functions.
