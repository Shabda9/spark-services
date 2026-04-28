<script setup lang="ts">
import { Phone, Menu, X } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const isMobileMenuOpen = ref(false);
const scrollY = ref(0);

const isSolid = computed(() => scrollY.value >= 80 || isMobileMenuOpen.value);

let raf = 0;
function onScroll() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    scrollY.value = window.scrollY || 0;
  });
}

onMounted(() => {
  scrollY.value = window.scrollY || 0;
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  cancelAnimationFrame(raf);
});

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/#services" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
] as const;

const phoneHref = "tel:+61200000000";
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div
      class="transition-colors duration-300"
      :class="[
        isSolid
          ? 'bg-spark-green/95 backdrop-blur supports-[backdrop-filter]:bg-spark-green/85'
          : 'bg-gradient-to-b from-spark-dark/85 via-spark-dark/35 to-transparent',
      ]"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <div class="flex h-[72px] items-center justify-between gap-3">
          <NuxtLink
            to="/"
            aria-label="Spark Services home"
            class="group inline-flex items-center gap-2"
            @click="closeMobileMenu"
          >
            <span
              class="font-heading text-sm font-bold tracking-[0.34em] text-white/95 transition-colors group-hover:text-spark-gold"
            >
              SPARK SERVICES
            </span>
          </NuxtLink>

          <nav class="hidden items-center justify-center gap-8 md:flex" aria-label="Primary">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              :to="item.to"
              class="text-xs tracking-[0.22em] text-white/85 transition-colors hover:text-spark-gold"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>

          <div class="flex items-center gap-2 sm:gap-3">
            <a
              :href="phoneHref"
              class="hidden h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/90 transition hover:border-white/25 hover:bg-white/10 lg:inline-flex"
              aria-label="Call Spark Services"
            >
              <Phone class="h-4 w-4" aria-hidden="true" />
            </a>

            <NuxtLink
              to="/#quote"
              class="inline-flex h-10 items-center justify-center rounded-md bg-spark-gold px-4 font-heading text-xs font-extrabold tracking-[0.18em] text-spark-dark transition hover:bg-spark-gold-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
              aria-label="Get a quote"
              @click="closeMobileMenu"
            >
              GET A QUOTE
            </NuxtLink>

            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/90 transition hover:border-white/25 hover:bg-white/10 md:hidden"
              :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
              :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
              aria-controls="mobile-menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
              <X v-else class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        class="md:hidden"
        :aria-hidden="isMobileMenuOpen ? 'false' : 'true'"
      >
        <ClientOnly>
          <div
            v-show="isMobileMenuOpen"
            v-motion
            :initial="{ opacity: 0, y: -10 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 0.22 } }"
            :leave="{ opacity: 0, y: -10, transition: { duration: 0.16 } }"
            class="border-t border-white/10 bg-spark-green"
          >
            <div class="mx-auto max-w-7xl px-6 py-5 lg:px-10">
              <nav class="flex flex-col gap-1.5" aria-label="Mobile">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.label"
                  :to="item.to"
                  class="rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-spark-gold"
                  @click="closeMobileMenu"
                >
                  {{ item.label }}
                </NuxtLink>

                <a
                  :href="phoneHref"
                  class="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:border-white/25 hover:bg-white/10"
                  aria-label="Call Spark Services"
                >
                  <Phone class="h-4 w-4" aria-hidden="true" />
                  <span>CALL</span>
                </a>
              </nav>
            </div>
          </div>

          <template #fallback>
            <div v-show="isMobileMenuOpen" class="border-t border-white/10 bg-spark-green">
              <div class="mx-auto max-w-7xl px-6 py-5 lg:px-10">
                <nav class="flex flex-col gap-1.5" aria-label="Mobile">
                  <NuxtLink
                    v-for="item in navItems"
                    :key="item.label"
                    :to="item.to"
                    class="rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-spark-gold"
                    @click="closeMobileMenu"
                  >
                    {{ item.label }}
                  </NuxtLink>

                  <a
                    :href="phoneHref"
                    class="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:border-white/25 hover:bg-white/10"
                    aria-label="Call Spark Services"
                  >
                    <Phone class="h-4 w-4" aria-hidden="true" />
                    <span>CALL</span>
                  </a>
                </nav>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

