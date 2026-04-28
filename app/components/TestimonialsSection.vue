<script setup lang="ts">
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl?: string;
};

const title = "Client's Perspective";
const subtitle = "Honest feedback on our Cleaning, Removals, and Gardening operations.";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Property Manager",
    company: "Sydney",
    content:
      "Communication was clear from start to finish. The team arrived on time, worked efficiently, and left everything spotless.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Homeowner",
    company: "Inner West",
    content:
      "Booking was easy and the quote was transparent. Great attention to detail, especially on the kitchen and bathrooms.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Tenant",
    company: "Parramatta",
    content:
      "We combined removals with an end-of-lease clean and it saved us a ton of time. Everything ran smoothly and stress-free.",
    rating: 5,
    avatarUrl: "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

const activeIndex = ref(0);
const autoRotateIntervalMs = 4000;
let intervalId: ReturnType<typeof setInterval> | null = null;

const activeTestimonial = computed(() => testimonials[activeIndex.value]);

function goTo(index: number) {
  activeIndex.value = ((index % testimonials.length) + testimonials.length) % testimonials.length;
}

function prev() {
  goTo(activeIndex.value - 1);
}

function next() {
  goTo(activeIndex.value + 1);
}

function startAutoRotate() {
  stopAutoRotate();
  if (autoRotateIntervalMs <= 0 || testimonials.length <= 1) return;
  intervalId = setInterval(() => {
    next();
  }, autoRotateIntervalMs);
}

function stopAutoRotate() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

onMounted(() => {
  startAutoRotate();
});
onBeforeUnmount(() => {
  stopAutoRotate();
});
</script>

<template>
  <section
    class="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-8"
    @mouseenter="stopAutoRotate"
    @mouseleave="startAutoRotate"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="font-heading text-3xl font-extrabold tracking-tight text-spark-green sm:text-4xl">
        {{ title }}
      </h2>
      <p class="mt-4 text-base leading-relaxed text-spark-green/70 sm:text-lg">
        {{ subtitle }}
      </p>
    </div>

    <div class="mx-auto mt-12 max-w-[1200px] md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8">
      <div
        class="relative"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }"
      >
        <div class="absolute -left-5 -top-5 z-10 lg:-left-6 lg:-top-6">
          <Quote class="h-10 w-10 text-spark-gold/25" :stroke-width="1" aria-hidden="true" />
        </div>

        <div class="relative h-[320px] md:h-[280px]">
          <article
            v-for="(t, idx) in testimonials"
            :key="t.id"
            class="absolute inset-0 rounded-2xl border border-spark-green/10 bg-white transition-all duration-500"
            :class="
              idx === activeIndex
                ? 'opacity-100 translate-x-0 shadow-[0_18px_45px_rgba(13,17,23,0.10)]'
                : 'pointer-events-none translate-x-[100px] opacity-0'
            "
          >
            <div class="flex h-full flex-col p-6 md:p-8">
              <div class="mb-4 flex items-start justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-12 overflow-hidden rounded-full border-2 border-spark-green/10 bg-spark-white">
                    <img
                      v-if="t.avatarUrl"
                      :src="t.avatarUrl"
                      :alt="t.name"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div
                      v-else
                      class="flex h-full w-full items-center justify-center font-heading text-sm font-extrabold text-spark-green/60"
                    >
                      {{ t.name.slice(0, 1).toUpperCase() }}
                    </div>
                  </div>

                  <div class="text-left">
                    <h4 class="font-heading text-base font-extrabold text-spark-green">
                      {{ t.name }}
                    </h4>
                    <p class="text-sm text-spark-green/60">
                      {{ t.role }}, {{ t.company }}
                    </p>
                  </div>
                </div>

                <div class="flex shrink-0">
                  <Star
                    v-for="n in t.rating"
                    :key="n"
                    class="h-4 w-4 fill-spark-gold text-spark-gold"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div class="my-4 h-px w-full bg-spark-green/10" aria-hidden="true" />

              <p class="flex-1 text-base/relaxed italic text-spark-green/80">"{{ t.content }}"</p>

              <p class="mt-4 text-right text-xs text-spark-green/50">Verified Customer</p>
            </div>
          </article>
        </div>
      </div>

      <div
        class="mt-8 flex items-center justify-center gap-4 md:mt-0 md:flex-col"
        v-motion
        :initial="{ opacity: 0, y: 12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 } }"
      >
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-spark-green/15 bg-white text-spark-green/80 transition hover:border-spark-green/25 hover:bg-spark-white focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Previous testimonial"
          @click="prev"
        >
          <ChevronLeft class="h-4 w-4" aria-hidden="true" />
        </button>

        <div class="flex items-center justify-center gap-2 md:flex-col">
          <div
            v-for="(t, idx) in testimonials"
            :key="t.id"
            class="h-2 w-2 cursor-pointer rounded-full transition-colors"
            :class="idx === activeIndex ? 'bg-spark-green' : 'bg-spark-green/15 hover:bg-spark-green/25'"
            role="button"
            tabindex="0"
            :aria-label="`Go to testimonial ${idx + 1}`"
            @click="goTo(idx)"
            @keydown.enter.prevent="goTo(idx)"
            @keydown.space.prevent="goTo(idx)"
          />
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-spark-green/15 bg-white text-spark-green/80 transition hover:border-spark-green/25 hover:bg-spark-white focus:outline-none focus-visible:ring-2 focus-visible:ring-spark-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Next testimonial"
          @click="next"
        >
          <ChevronRight class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>

