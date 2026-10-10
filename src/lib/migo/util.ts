export const list = (r: any): any[] =>
  Array.isArray(r)
    ? r
    : (r?.items ??
      r?.rides ??
      r?.payments ??
      r?.users ??
      r?.results ??
      r?.data ??
      []);
export const nameOf = (u: any) =>
  u?.profile?.fullName ?? u?.fullName ?? u?.name ?? u?.email ?? "";
export const human = (k: string) =>
  k
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^./, (c) => c.toUpperCase());
export const PLACES: Record<string, [number, number]> = {
  "Banani 11": [23.7937, 90.4043],
  "Gulshan 1 Circle": [23.7806, 90.4167],
  "Motijheel Shapla Chattar": [23.733, 90.4172],
  "Uttara Sector 7": [23.8759, 90.3795],
  "Dhanmondi 27": [23.7561, 90.3733],
  "Mirpur 10": [23.8069, 90.3687],
  Farmgate: [23.7561, 90.3897],
  Mohakhali: [23.7781, 90.4005],
  "Bashundhara R/A": [23.8193, 90.4526],
};
export const km = (a: number[], b: number[]) => {
  const t = (x: number) => (x * Math.PI) / 180,
    dLa = t(b[0] - a[0]),
    dLn = t(b[1] - a[1]);
  const h =
    Math.sin(dLa / 2) ** 2 +
    Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dLn / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};
export const rv = (r: any, role?: string) => ({
  id: r.id as string,
  status: (r.status ?? "") as string,
  from:
    r.pickupName ?? r.request?.pickupName ?? r.route?.originName ?? "Pickup",
  to:
    r.dropName ??
    r.request?.destinationName ??
    r.route?.destinationName ??
    "Drop-off",
  date: r.date ?? r.request?.date ?? r.scheduledDate ?? "",
  time:
    r.departureTime ??
    r.request?.time ??
    r.route?.schedules?.[0]?.departureTime ??
    "",
  price: r.contributionBdt ?? r.fareBdt ?? r.route?.contributionBdt,
  other:
    (role === "COMMUTER"
      ? nameOf(r.passenger)
      : nameOf(r.commuter ?? r.route?.owner)) || "Ride",
});
