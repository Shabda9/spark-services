type BookingRequest = {
  serviceType: string;
  addressLine1: string;
  unitNumber: string;
  suburb: string;
  state: string;
  postcode: string;
  bedrooms: number;
  bathrooms: number;
  extras: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
    date: string;
  };
};

export default defineEventHandler(async (event) => {
  const body = await readBody<BookingRequest>(event);
  const nestApiUrl = process.env.NEST_API_URL ?? "http://127.0.0.1:4000";
  const bookingUrl = `${nestApiUrl.replace(/\/$/, "")}/booking`;

  return await $fetch<unknown>(bookingUrl, {
    method: "POST",
    body,
  });
});
