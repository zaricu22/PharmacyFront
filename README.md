# PharmacyFront

[![CI/CD](https://github.com/zaricu22/PharmacyFront/actions/workflows/ghpages-build.yml/badge.svg)](https://github.com/zaricu22/PharmacyFront/actions/workflows/ghpages-build.yml)
[![Angular](https://img.shields.io/badge/Angular-16-DD0031?logo=angular)](https://angular.dev)

An Angular 16 single-page application for managing pharmacy inventory and product statistics, with JWT-based authentication.

---

## Live Demo

[https://zaricu22.github.io/PharmacyFront/](https://zaricu22.github.io/PharmacyFront/)

> First API call may take ~2 minutes — backend runs on Render free tier.

---

## Features

| Screen | What you can do |
|---|---|
| Products | Browse, create, edit, and delete pharmacy products |
| Statistics | View product statistics and charts |
| About | Application information |
| Auth | Register and login; JWT stored in `localStorage` |

---

## Tech Stack

| | Technology |
|---|---|
| Framework | Angular 16 — NgModule-based components |
| Language | TypeScript 5.0 |
| UI | Angular Material 16 |
| Charts | Chart.js 4 + ng2-charts 5 |
| Reactivity | RxJS 7.8 |
| HTTP | Angular `HttpClient` with `TokenInterceptor` (Bearer JWT) |
| Unit tests | Karma + Jasmine |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Test Accounts

| Username | Password | Role |
|----------|----------|------|
| `user1` | `password` | USER |
| `admin1` | `password` | ADMIN |

> **Known issue:** If the Login button redirects to `/product` immediately or the page appears stuck loading, there are stale tokens in `localStorage`. Open DevTools → Application → Local Storage → clear `access-token` and `refresh-token`, then refresh.

---

## Prerequisites

- **Node.js 20+** — `node --version`
- **npm 9+** — `npm --version`
- **Angular CLI 16** — `npm install -g @angular/cli@16`

---

## Installation

```bash
git clone https://github.com/zaricu22/PharmacyFront.git
cd PharmacyFront
npm ci
```

---

## Running Locally

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).

---

## CI/CD Pipeline

Every push to `main` triggers a build (`ng build --base-href`) and deploys the output to the `gh-pages` branch via `peaceiris/actions-gh-pages`.
> GitHub Pages must be configured: **Settings → Pages → Source: `gh-pages` branch, `/ (root)`**.

---

## Environment Variables

Compile-time environment files in `src/environments/`.

| Variable | Dev | Prod |
|---|---|---|
| `apiUrl` | `http://localhost:8080` | `https://pharmacy-cloud-service.onrender.com/PharmacyRest/api/v1` |

---

## API Connection

| Area | Endpoint | Used by |
|---|---|---|
| Auth — login | `POST /auth/authenticate` | `AuthenticationService` |
| Auth — register | `POST /auth/register` | `AuthenticationService` |
| Products | `GET/POST/PUT/DELETE /products` | `ProductService` |
| Statistics | `GET /statistics` | `StatisticService` |
| Manufacturers | `GET /manufacturers` | `ManufacturerService` |

Backend repository: [zaricu22/PharmacyBack](https://github.com/zaricu22/PharmacyBack)

---

## Domain Model

| Model | Fields |
|---|---|
| `IProduct` | `id`, `name`, `price`, `expiryDate`, `manufacturer` |
| `IManufacturer` | `id`, `name` |

---

## Folder Structure

```
src/app/
├── core/
│   ├── auth/
│   │   ├── components/       # LoginComponent, RegisterComponent
│   │   ├── guards/           # authGuard, nonAuthGuard
│   │   ├── interceptors/     # TokenInterceptor (attaches Bearer JWT)
│   │   ├── models/           # AuthenticationRequest/Response, RegisterRequest
│   │   └── services/         # AuthenticationService
│   ├── components/
│   │   ├── header/           # Toolbar with Login/Register/Logout
│   │   ├── sidenav/          # Navigation drawer with router-outlet
│   │   ├── footer/
│   │   └── about/
│   ├── constants/            # API URL
│   ├── dto/                  # ProductNumberDto
│   ├── models/               # IProduct, IManufacturer
│   └── services/             # ManufacturerService
├── features/
│   ├── product/
│   │   ├── components/       # product-view, product-create, product-edit
│   │   └── services/         # ProductService
│   └── statistics/
│       ├── components/       # StatisticsComponent (Chart.js charts)
│       └── services/         # StatisticService
└── shared/
    └── components/
        └── product-dialog/   # Reusable product form dialog
```
