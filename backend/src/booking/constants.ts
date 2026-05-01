export const BOOKING_SERVICE_TYPES = [
  "residential",
  "office",
  "end_of_lease",
] as const;

export const BOOKING_EXTRA_TYPES = [
  "deep_clean",
  "carpet",
  "balcony",
  "oven",
  "windows",
  "blinds",
  "garage",
  "post_construction_detail",
  "strata_common_areas",
] as const;

export const BOOKING_SERVICE_PRICING: Record<(typeof BOOKING_SERVICE_TYPES)[number], {
  label: string;
  base: number;
  bedroomRate: number;
  bathroomRate: number;
}> = {
  end_of_lease: {
    label: "End of Lease Cleaning",
    base: 350,
    bedroomRate: 55,
    bathroomRate: 65,
  },
  residential: {
    label: "Residential Cleaning",
    base: 120,
    bedroomRate: 28,
    bathroomRate: 35,
  },
  office: {
    label: "Office & Commercial",
    base: 250,
    bedroomRate: 35,
    bathroomRate: 45,
  },
};

export const BOOKING_EXTRA_PRICING: Record<(typeof BOOKING_EXTRA_TYPES)[number], number> = {
  deep_clean: 160,
  carpet: 140,
  balcony: 90,
  oven: 45,
  windows: 85,
  blinds: 65,
  garage: 110,
  post_construction_detail: 180,
  strata_common_areas: 120,
};
