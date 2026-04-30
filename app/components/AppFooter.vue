<script setup lang="ts">
const year = new Date().getFullYear();

const footerCols = [
  {
    title: "Services",
    links: [
      { label: "Residential Cleaning", to: "/#services" },
      { label: "Office Removals", to: "/#services" },
      { label: "Gardening", to: "/#services" },
      { label: "Window Maintenance", to: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Service Areas", to: "/#areas" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Careers", to: "/careers" },
      { label: "Trust & Safety", to: "/trust" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Support", to: "/booking" },
      { label: "Help Center", to: "/help" },
      { label: "Partner Login", to: "/partner" },
    ],
  },
] as const;
</script>

<template>
  <footer class="bg-spark-green text-white">
    <div class="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-4">
          <NuxtLink to="/" aria-label="Spark Services home" class="inline-flex items-center">
            <span class="font-heading text-sm font-extrabold tracking-[0.34em] text-white/95">
              SPARK SERVICES
            </span>
          </NuxtLink>

          <p class="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Elevating Sydney home services through precision, clear communication, and
            expert care.
          </p>

          <div class="mt-7 flex items-center gap-3">
            <a
              href="mailto:hello@sparkservices.com.au"
              class="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 text-xs font-semibold tracking-wide text-white/85 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Email Spark Services"
            >
              Email
            </a>
            <a
              href="tel:+61200000000"
              class="inline-flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 text-xs font-semibold tracking-wide text-white/85 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Call Spark Services"
            >
              Call
            </a>
          </div>
        </div>

        <div class="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div v-for="col in footerCols" :key="col.title">
            <p class="text-xs font-semibold tracking-[0.28em] text-white/70">
              {{ col.title.toUpperCase() }}
            </p>
            <ul class="mt-5 space-y-3">
              <li v-for="link in col.links" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-white/70 transition hover:text-spark-gold"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-14 border-t border-white/10 pt-6">
        <div class="flex flex-col gap-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ year }} Spark Services. Clean. Clear. Care.</p>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <NuxtLink to="/terms" class="transition hover:text-white/80">Terms</NuxtLink>
            <NuxtLink to="/privacy" class="transition hover:text-white/80">Privacy</NuxtLink>
            <NuxtLink to="/sitemap" class="transition hover:text-white/80">Sitemap</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

