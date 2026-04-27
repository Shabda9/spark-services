export default defineNuxtPlugin((nuxtApp) => {
  // @vueuse/motion's `v-motion` directive expects SSR support via getSSRProps().
  // When the real plugin is registered client-side only, SSR needs a safe no-op.
  nuxtApp.vueApp.directive("motion", {
    getSSRProps() {
      return {};
    },
  });
});

