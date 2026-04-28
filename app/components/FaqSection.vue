<script setup lang="ts">
import { computed, ref } from "vue";

type FaqItem = { question: string; answer: string };

const faqItems: FaqItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We provide cleaning, gardening, and removals support. If you’re not sure which service fits, send a quick message and we’ll point you in the right direction.",
  },
  {
    question: "Do you bring your own equipment and supplies?",
    answer:
      "Yes where required we bring standard equipment and supplies. If a job needs something specific, we’ll confirm it with you before the booking is locked in.",
  },
  {
    question: "How do quotes work?",
    answer:
      "Tell us what you need (photos help). We’ll confirm the scope, then provide a clear quote outlining what’s included. If anything changes on-site, we’ll discuss it before proceeding.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We service Sydney metro and surrounding areas. If you’re unsure whether you’re in range, send your suburb and we’ll confirm quickly.",
  },
  {
    question: "Can I reschedule or cancel?",
    answer:
      "Yes. Just let us know as early as possible so we can adjust the run sheet. If we’ve already reserved a time slot for you, we’ll work with you to find the next best option.",
  },
];

const openIndex = ref<number | null>(0);

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index;
}

const title = "Frequently asked questions";
const subtitle = computed(() => "Quick answers to the most common questions about working with Spark Services.");

const prefersReducedMotion =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setElStyles(
  el: Element,
  styles: Partial<Record<"height" | "opacity" | "transform" | "transition", string>>
) {
  const node = el as HTMLElement;
  if (styles.height !== undefined) node.style.height = styles.height;
  if (styles.opacity !== undefined) node.style.opacity = styles.opacity;
  if (styles.transform !== undefined) node.style.transform = styles.transform;
  if (styles.transition !== undefined) node.style.transition = styles.transition;
}

function onBeforeEnter(el: Element) {
  setElStyles(el, { height: "0px", opacity: "0", transform: "translateY(-4px)", transition: "" });
}

function onEnter(el: Element, done: () => void) {
  if (prefersReducedMotion) {
    setElStyles(el, { height: "auto", opacity: "1", transform: "translateY(0)" });
    done();
    return;
  }

  const node = el as HTMLElement;
  const target = node.scrollHeight;

  // Force reflow so the initial height is applied before transitioning
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;

  setElStyles(el, {
    transition: "height 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out, transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
    height: `${target}px`,
    opacity: "1",
    transform: "translateY(0)",
  });

  const onEnd = (e: TransitionEvent) => {
    if (e.propertyName !== "height") return;
    node.removeEventListener("transitionend", onEnd);
    node.style.height = "auto";
    done();
  };
  node.addEventListener("transitionend", onEnd);
}

function onBeforeLeave(el: Element) {
  const node = el as HTMLElement;
  setElStyles(el, { height: `${node.scrollHeight}px`, opacity: "1", transform: "translateY(0)", transition: "" });
}

function onLeave(el: Element, done: () => void) {
  if (prefersReducedMotion) {
    done();
    return;
  }

  const node = el as HTMLElement;

  // Force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;

  setElStyles(el, {
    transition: "height 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease-out, transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
    height: "0px",
    opacity: "0",
    transform: "translateY(-4px)",
  });

  const onEnd = (e: TransitionEvent) => {
    if (e.propertyName !== "height") return;
    node.removeEventListener("transitionend", onEnd);
    done();
  };
  node.addEventListener("transitionend", onEnd);
}
</script>

<template>
  <section class="relative bg-spark-white">
    <div class="absolute inset-0 bg-[radial-gradient(900px_420px_at_18%_0%,rgba(245,197,66,0.18)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
    <div class="relative mx-auto max-w-7xl px-6 pb-10 pt-16 lg:px-10 lg:pb-10" style="padding-top: calc(72px + 4rem + env(safe-area-inset-top));">
      <div class="mx-auto max-w-2xl text-center">
        <h1 class="mt-4 font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-spark-green sm:text-5xl">
          {{ title }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-spark-green/80 sm:text-lg">
          {{ subtitle }}
        </p>
      </div>

      <div class="mx-auto mt-10 max-w-2xl">
        <div class="border border-spark-green/10 bg-white shadow-[0_10px_30px_rgba(13,17,23,0.04)]">
          <dl>
            <template v-for="(item, idx) in faqItems" :key="item.question">
              <div v-if="idx !== 0" class="h-px bg-spark-green/10 mx-5 sm:mx-7" aria-hidden="true" />

              <div class="px-5 py-5 sm:px-7">
                <dt>
                  <button
                    type="button"
                    class="flex w-full items-start justify-between gap-6 text-left"
                    :aria-expanded="openIndex === idx ? 'true' : 'false'"
                    :aria-controls="`faq-panel-${idx}`"
                    @click="toggle(idx)"
                  >
                    <span class="min-w-0 font-heading text-base font-bold tracking-tight text-spark-green sm:text-lg">
                      {{ item.question }}
                    </span>
                    <span
                      class="mt-0.5 inline-flex aspect-square h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-spark-green/10 bg-spark-green/[0.04] text-spark-green/70"
                      aria-hidden="true"
                    >
                      <span class="text-lg leading-none">{{ openIndex === idx ? "–" : "+" }}</span>
                    </span>
                  </button>
                </dt>

                <Transition
                  @before-enter="onBeforeEnter"
                  @enter="onEnter"
                  @before-leave="onBeforeLeave"
                  @leave="onLeave"
                >
                  <dd
                    v-if="openIndex === idx"
                    :id="`faq-panel-${idx}`"
                    class="overflow-hidden pr-12"
                  >
                    <p class="mt-4 text-sm leading-relaxed text-spark-green/75 sm:text-base">
                      {{ item.answer }}
                    </p>
                  </dd>
                </Transition>
              </div>
            </template>
          </dl>
        </div>

        <p class="mt-8 text-center text-sm text-spark-green/65">
          Don’t see your question here? Fill the form below and we’ll help.
        </p>
      </div>
    </div>
  </section>
</template>

