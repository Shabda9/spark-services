type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType?: "general_cleaning" | "residential" | "office" | "end_of_lease";
};

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactRequest>(event);
  const nestApiUrl = process.env.NEST_API_URL ?? "http://127.0.0.1:4000";
  const contactUrl = `${nestApiUrl.replace(/\/$/, "")}/contact`;

  return await $fetch<unknown>(contactUrl, {
    method: "POST",
    body,
  });
});
