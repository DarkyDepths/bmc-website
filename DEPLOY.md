# Deploy — OVH domain, Vercel hosting, Zimbra email

Domain: `best-bmc.com` (OVH) · Host: Vercel · Email: OVH Zimbra

> **The one thing that can break email:** when you point the domain at Vercel you change
> only the `A` and `CNAME` records. **Never touch the MX records or the TXT record that
> starts with v=spf1.** Those are Zimbra. Delete them and mail stops arriving.

---

## 1 — Push the code

```bash
git add -A
git commit -m "BMC site"
git push origin main
```

Repo: `https://github.com/DarkyDepths/bmc-website`

## 2 — Create the Vercel project

1. Go to **vercel.com** → log in with GitHub.
2. **Add New → Project**.
3. Find `bmc-website` → **Import**.
4. Framework Preset: it should already say **Next.js**. Leave everything else alone.
5. Click **Deploy**.
6. Wait for the build. You get a URL like `bmc-website-xxxx.vercel.app`.

## 3 — Check it before touching DNS

Open the `.vercel.app` URL. Confirm:

- it forwards to `/fr/`
- the loading sheet plays, then the page appears
- the logo is in the header
- `/en/` and `/ar/` work
- `/robots.txt` and `/sitemap.xml` open

If any of that fails, stop here and tell me. Do not change DNS yet.

## 4 — Add the domain in Vercel

1. Project → **Settings** → **Domains**.
2. Type `best-bmc.com` → **Add**.
3. Type `www.best-bmc.com` → **Add**.
4. Vercel will mark `best-bmc.com` as primary and `www` as redirecting to it. If it picks
   the other way round, use the **⋯** menu to set `best-bmc.com` as the primary.
5. Vercel now shows you the DNS records it wants. Keep this tab open.

Expect something like:

| Type  | Name  | Value                  |
| ----- | ----- | ---------------------- |
| A     | `@`   | `76.76.21.21`          |
| CNAME | `www` | `cname.vercel-dns.com` |

**Use the values Vercel shows you, not the ones in this table** — they change.

## 5 — Point the DNS at OVH

1. **ovh.com** → log in → **Web Cloud** → **Domain names** → `best-bmc.com`.
2. Open the **DNS zone** tab.
3. Find the existing `A` record for `best-bmc.com` (the one with an empty or `@` name).
   **Modify** it → put Vercel's IP as the target → confirm.
4. Find the `CNAME` record named `www` → **Modify** → target `cname.vercel-dns.com.`
   (with the trailing dot) → confirm.
5. **Leave every MX record exactly as it is.**
6. **Leave the TXT record starting with v=spf1 exactly as it is.**
7. If OVH offers to "reset the zone" or apply a "web hosting" template, **say no**. That
   wipes the mail records.

## 6 — Wait

DNS takes 15 minutes to a few hours. In Vercel → Settings → Domains, both entries turn
green with a **Valid Configuration** tick. HTTPS is automatic once they do.

Check from a terminal while you wait:

```bash
nslookup best-bmc.com
nslookup -type=mx best-bmc.com
```

The first should show Vercel's IP. The second must **still show your Zimbra mail servers**.
If the MX answer is empty, something wiped it — restore it in the OVH zone before anything
else.

## 7 — Open the site

`https://best-bmc.com`

You should land on the French page. `https://www.best-bmc.com` should bounce to it.

## 8 — Turn the contact form on

The form posts to FormSubmit, which will not deliver anything until the address confirms it
once.

1. Go to `https://best-bmc.com/fr/#contact`.
2. Fill the form with a real message and send it.
3. Open the **abdelmalek.jabbar@best-bmc.com** mailbox in Zimbra.
4. Find the email from **FormSubmit** and click **Activate Form**.
5. Send a second test message from the site.
6. Confirm that one arrives in Zimbra.

Until step 4 is done, every message the site sends is thrown away silently.

If the FormSubmit email never arrives, check the Zimbra spam folder first.

---

## Afterwards

**Updating the site.** Push to `main`. Vercel rebuilds and redeploys on its own. There is
nothing to upload.

```bash
git add -A
git commit -m "what changed"
git push
```

**If you ever move off Vercel.** Run `npm run build` and copy the `out/` folder to any
static host. There is no server to run. Point the host's 404 handler at `/404.html`.

**If the domain changes.** `SITE_URL` in [src/i18n/config.ts](src/i18n/config.ts) is the
single place it is written. Change it there, commit, push.
