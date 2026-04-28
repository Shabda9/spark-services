<script setup lang="ts">
type ServiceOption = { label: string; value: string };

const props = withDefaults(
  defineProps<{
    id?: string;
    tagline?: string;
    title?: string;
    subtitle?: string;
    mailtoTo?: string;
    subjectPrefix?: string;
    services?: ServiceOption[];
    defaultService?: string;
    prefillMessage?: string;
  }>(),
  {
    id: "contact",
    tagline: "LET'S SPARK A CONVERSATION",
    title: "Contact us",
    subtitle: "Tell us what you need and we’ll reply as soon as we can.",
    mailtoTo: "hello@sparkservices.com.au",
    subjectPrefix: "Spark Services enquiry",
    defaultService: "general",
    prefillMessage: "",
  }
);
</script>

<template>
  <section :id="props.id" class="relative bg-spark-dark py-12">
    <div class="absolute inset-0 bg-[radial-gradient(900px_380px_at_30%_10%,rgba(245,197,66,0.14)_0%,rgba(245,197,66,0.0)_65%)]" aria-hidden="true" />
    <div class="relative mx-auto max-w-7xl px-6 lg:px-10">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-semibold tracking-[0.26em] text-white/65">
          {{ props.tagline }}
        </p>
        <h2 class="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {{ props.title }}
        </h2>
        <p v-if="props.subtitle" class="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
          {{ props.subtitle }}
        </p>
      </div>

      <div class="mx-auto mt-10 max-w-3xl">
        <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.20)] backdrop-blur-md sm:p-8">
          <ContactUsForm
            :mailto-to="props.mailtoTo"
            :subject-prefix="props.subjectPrefix"
            :services="props.services"
            :default-service="props.defaultService"
            :prefill-message="props.prefillMessage"
          />
        </div>
      </div>
    </div>
  </section>
</template>

