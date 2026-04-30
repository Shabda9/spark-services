<script setup lang="ts">
import { ChevronDown, Menu, Phone, X } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const isMobileMenuOpen = ref(false);
const isServicesOpen = ref(false);
const isMobileServicesOpen = ref(false);
const scrollY = ref(0);

const isSolid = computed(() => scrollY.value >= 80 || isMobileMenuOpen.value);

let raf = 0;
function onScroll() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    scrollY.value = window.scrollY || 0;
  });
}

const servicesMenuRef = ref<HTMLElement | null>(null);
function closeServicesMenu() {
  isServicesOpen.value = false;
}

function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target as Node | null;
  if (!target) return;
  const root = servicesMenuRef.value;
  if (!root) return;
  if (!root.contains(target)) closeServicesMenu();
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") closeServicesMenu();
}

onMounted(() => {
  scrollY.value = window.scrollY || 0;
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("pointerdown", onDocumentPointerDown, { passive: true });
  document.addEventListener("keydown", onDocumentKeyDown);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  document.removeEventListener("pointerdown", onDocumentPointerDown);
  document.removeEventListener("keydown", onDocumentKeyDown);
  cancelAnimationFrame(raf);
});

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  isMobileServicesOpen.value = false;
}

const navItems = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "FAQ", to: "/faq" },
] as const;

const serviceItems = [
  { label: "Cleaning", to: "/cleaning" },
  // { label: "Removals", to: "/removals" },
  // { label: "Gardening", to: "/gardening" },
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
            <div
              ref="servicesMenuRef"
              class="relative"
            >
              <button
                type="button"
                class="group inline-flex items-center gap-2 text-xs tracking-[0.22em] text-white/85 transition-colors hover:text-spark-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-spark-green"
                aria-haspopup="menu"
                :aria-expanded="isServicesOpen ? 'true' : 'false'"
                @click="isServicesOpen = !isServicesOpen"
              >
                <span>Services</span>
                <ChevronDown
                  class="h-4 w-4 opacity-80 transition group-hover:opacity-100"
                  :class="[isServicesOpen ? 'rotate-180' : 'rotate-0']"
                  aria-hidden="true"
                />
              </button>

              <div
                class="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-lg border border-white/15 bg-spark-green/95 p-1.5 shadow-2xl shadow-black/35 backdrop-blur supports-[backdrop-filter]:bg-spark-green/85"
                role="menu"
                :class="[isServicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none']"
              >
                <div class="flex flex-col gap-1">
                  <NuxtLink
                    v-for="service in serviceItems"
                    :key="service.label"
                    :to="service.to"
                    role="menuitem"
                    class="flex items-center rounded-md px-3 py-2.5 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-spark-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    @click="closeServicesMenu"
                  >
                    <span>{{ service.label }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>

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
              to="/booking"
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
                <button
                  type="button"
                  class="flex items-center justify-between rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-spark-gold"
                  :aria-expanded="isMobileServicesOpen ? 'true' : 'false'"
                  @click="isMobileServicesOpen = !isMobileServicesOpen"
                >
                  <span>Services</span>
                  <ChevronDown
                    class="h-5 w-5 opacity-80 transition"
                    :class="[isMobileServicesOpen ? 'rotate-180' : 'rotate-0']"
                    aria-hidden="true"
                  />
                </button>

                <div v-show="isMobileServicesOpen" class="mb-1 pl-2">
                  <NuxtLink
                    v-for="service in serviceItems"
                    :key="service.label"
                    :to="service.to"
                    class="mt-1 flex items-center rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/85 transition hover:bg-white/10 hover:text-spark-gold"
                    @click="closeMobileMenu"
                  >
                    <span>{{ service.label }}</span>
                  </NuxtLink>
                </div>

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
                  <button
                    type="button"
                    class="flex items-center justify-between rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-spark-gold"
                    :aria-expanded="isMobileServicesOpen ? 'true' : 'false'"
                    @click="isMobileServicesOpen = !isMobileServicesOpen"
                  >
                    <span>Services</span>
                    <ChevronDown
                      class="h-5 w-5 opacity-80 transition"
                      :class="[isMobileServicesOpen ? 'rotate-180' : 'rotate-0']"
                      aria-hidden="true"
                    />
                  </button>

                  <div v-show="isMobileServicesOpen" class="mb-1 pl-2">
                    <NuxtLink
                      v-for="service in serviceItems"
                      :key="service.label"
                      :to="service.to"
                      class="mt-1 flex items-center rounded-md px-3 py-3 font-heading text-sm font-bold tracking-wide text-white/85 transition hover:bg-white/10 hover:text-spark-gold"
                      @click="closeMobileMenu"
                    >
                      <span>{{ service.label }}</span>
                    </NuxtLink>
                  </div>

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

