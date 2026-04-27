<script setup lang="ts">
import { ShieldCheck, BadgeCheck, UserCheck, Receipt, CalendarClock } from "lucide-vue-next";

type TrustItem = {
  title: string;
  description: string;
  icon: unknown;
};

const items: TrustItem[] = [
  {
    title: "Public Liability",
    description: "Comprehensive cover for on‑site work so your property stays protected.",
    icon: ShieldCheck,
  },
  {
    title: "Fully Insured",
    description: "Professional indemnity and workers compensation for peace of mind.",
    icon: BadgeCheck,
  },
  {
    title: "Police Checked Team",
    description: "Background‑verified team members for every booking.",
    icon: UserCheck,
  },
  {
    title: "No Hidden Costs",
    description: "Transparent quoting with clear inclusions and upfront pricing.",
    icon: Receipt,
  },
  {
    title: "Flexible Scheduling",
    description: "Weekday and weekend slots available to fit around your timetable.",
    icon: CalendarClock,
  },
];
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-7 lg:px-10 lg:py-9">
    <div class="overflow-hidden rounded-sm border border-spark-green/10 bg-white">
      <div class="grid divide-y divide-spark-green/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5">
        <div
          v-for="item in items"
          :key="item.title"
          class="relative p-4 sm:border-t sm:border-spark-green/10 sm:p-5 lg:border-t-0 lg:p-5"
          :class="[
            'sm:border-r sm:border-spark-green/10 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(-n+2)]:border-t-0',
            'lg:border-r-0 lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(-n+2)]:border-t-0',
            'lg:after:absolute lg:after:right-0 lg:after:top-6 lg:after:bottom-6 lg:after:w-px lg:after:bg-spark-green/10',
            'lg:last:after:hidden',
          ]"
        >
          <div class="flex items-start gap-2.5">
            <component :is="item.icon" class="mt-0.5 h-3.5 w-3.5 shrink-0 text-spark-gold" aria-hidden="true" />
            <div class="min-w-0">
              <p class="font-heading text-[10px] font-extrabold tracking-[0.18em] text-spark-green">
                {{ item.title.toUpperCase() }}
              </p>
              <p class="mt-1 text-[12px] leading-relaxed text-spark-green/70">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

