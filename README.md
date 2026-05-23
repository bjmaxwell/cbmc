
# City Boy Movement Canada

This repository is prepared as a Node.js workspace with a Vite React web app and an Expo React Native mobile app scaffold.

## Apps

- Web app: root Vite/React application in `src`.
- Mobile app: Expo shell in `apps/mobile`.
- Admin portal: `/admin`.
- Analytics: `/analytics`, where exports/downloads are allowed.
- Media gallery: `/gallery`, protected from right-click and common save/print shortcuts outside analytics.

## Admin Model

The admin portal models these roles:

- Super Admin: full privileges, admin management, public publishing, page toggles, API tokens, counter overrides, carousel controls, and media protection controls.
- Admin: broad content/admin operations, provincial approvals, API setup, counters, and direct publishing only when toggled on by the Super Admin.
- Provincial Admin: can update assigned provincial page content, excluding provincial executive details/images, and must submit for approval.
- Secretary: can draft articles and upload media for approval by Admin or Super Admin.

All main site pages are represented in the CMS page registry so Admin and Super Admin can disable or enable pages from the GUI.

## Running

Install dependencies:

```bash
npm install
```

Run the web app:

```bash
npm run dev
```

Run the mobile app:

```bash
npm run mobile
```

Build the web app:

```bash
npm run build
```
