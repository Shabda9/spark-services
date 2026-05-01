<script setup lang="ts">
import FaqSection from "~/components/FaqSection.vue";
import ContactUsSection from "~/components/ContactUsSection.vue";
</script>

<template>
  <main class="bg-spark-white font-body text-spark-green">
    <FaqSection />
    <ContactUsSection
      id="faq-contact"
      title="Still have questions?"
      tagline="LET'S SPARK A CONVERSATION"
      subtitle="Send us a message and we’ll get back to you."
    />
  </main>
</template>

