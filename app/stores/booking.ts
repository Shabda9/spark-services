import { defineStore } from "pinia";

export type BookingServiceType =
  | "residential"
  | "office"
  | "end_of_lease";

export type BookingExtra =
  | "deep_clean"
  | "oven"
  | "carpet"
  | "windows"
  | "blinds"
  | "balcony"
  | "garage"
  | "post_construction_detail"
  | "strata_common_areas";

export type BookingContact = {
  name: string;
  phone: string;
  email: string;
  date: string;
};

export type BookingInquiry = {
  service: string;
  message: string;
};

export type BookingLocation = {
  addressLine1: string;
  unitNumber: string;
  suburb: string;
  state: string;
  postcode: string;
};

export const bookingServices: Array<{
  value: BookingServiceType;
  label: string;
  base: number;
  bedroomRate: number;
  bathroomRate: number;
}> = [
  { value: "end_of_lease", label: "End of Lease Cleaning", base: 350, bedroomRate: 55, bathroomRate: 65 },
  { value: "residential", label: "Residential Cleaning", base: 120, bedroomRate: 28, bathroomRate: 35 },
  { value: "office", label: "Office & Commercial", base: 250, bedroomRate: 35, bathroomRate: 45 },
];

export const bookingExtras: Array<{ value: BookingExtra; label: string; price: number; services?: BookingServiceType[] }> = [
  { value: "deep_clean", label: "Deep cleaning upgrade", price: 160, services: ["residential", "end_of_lease"] },
  { value: "oven", label: "Inside oven detail", price: 45, services: ["end_of_lease", "residential"] },
  { value: "carpet", label: "Carpet steam cleaning", price: 140, services: ["end_of_lease", "residential", "office"] },
  { value: "windows", label: "Window and track cleaning", price: 85 },
  { value: "blinds", label: "Blind cleaning", price: 65 },
  { value: "balcony", label: "Balcony pressure wash", price: 90, services: ["end_of_lease", "residential"] },
  { value: "garage", label: "Garage pressure wash", price: 110, services: ["end_of_lease", "residential"] },
  { value: "post_construction_detail", label: "Post-construction detail", price: 180, services: ["residential", "office"] },
  { value: "strata_common_areas", label: "Strata and common areas", price: 120, services: ["office"] },
];

type BookingState = {
  serviceType: BookingServiceType;
  location: BookingLocation;
  bedrooms: number | null;
  bathrooms: number | null;
  extras: BookingExtra[];
  contact: BookingContact;
  inquiry: BookingInquiry;
  estimate: number;
};

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
    serviceType: "end_of_lease",
    location: {
      addressLine1: "",
      unitNumber: "",
      suburb: "",
      state: "",
      postcode: "",
    },
    bedrooms: null,
    bathrooms: null,
    extras: [],
    contact: {
      name: "",
      phone: "",
      email: "",
      date: "",
    },
    inquiry: {
      service: "",
      message: "",
    },
    estimate: 0,
  }),
  getters: {
    selectedService(state) {
      return bookingServices.find((service) => service.value === state.serviceType) ?? bookingServices[0]!;
    },
    selectedExtras(state) {
      return bookingExtras.filter((extra) => state.extras.includes(extra.value));
    },
  },
  actions: {
    setBasics(payload: { serviceType: BookingServiceType; location: BookingLocation }) {
      this.serviceType = payload.serviceType;
      this.location = payload.location;

      this.calculateEstimate();
    },
    setScope(payload: { bedrooms: number; bathrooms: number }) {
      this.bedrooms = payload.bedrooms;
      this.bathrooms = payload.bathrooms;
      this.calculateEstimate();
    },
    toggleExtra(extra: BookingExtra) {
      this.extras = this.extras.includes(extra)
        ? this.extras.filter((selected) => selected !== extra)
        : [...this.extras, extra];

      this.calculateEstimate();
    },
    setContact(payload: BookingContact) {
      this.contact = payload;
    },
    updateContact(payload: Partial<BookingContact>) {
      this.contact = {
        ...this.contact,
        ...payload,
      };
    },
    updateLocation(payload: Partial<BookingLocation>) {
      this.location = {
        ...this.location,
        ...payload,
      };
    },
    updateInquiry(payload: Partial<BookingInquiry>) {
      this.inquiry = {
        ...this.inquiry,
        ...payload,
      };
    },
    calculateEstimate() {
      const service = this.selectedService;
      const bedrooms = this.bedrooms ?? 0;
      const bathrooms = this.bathrooms ?? 0;
      const extrasTotal = this.selectedExtras.reduce((total, extra) => total + extra.price, 0);

      this.estimate = service.base + bedrooms * service.bedroomRate + bathrooms * service.bathroomRate + extrasTotal;
    },
  },
});
