import { api, unwrap } from "./api";

type Q = Record<string, unknown>;
const get = (u: string, params?: Q) => api.get(u, { params }).then((r) => unwrap<any>(r.data));
const post = (u: string, b?: unknown) => api.post(u, b).then((r) => unwrap<any>(r.data));
const patch = (u: string, b?: unknown) => api.patch(u, b).then((r) => unwrap<any>(r.data));
const del = (u: string) => api.delete(u).then((r) => unwrap<any>(r.data));

export const authService = {
  health: () => get("/health"),
  publicConfig: () => get("/config/public"),
  login: (b: { email: string; password: string }) => post("/auth/login", b),
  registerPassenger: (b: object) => post("/auth/register/passenger", b),
  registerCommuter: (b: object) => post("/auth/register/commuter", b),
  me: () => get("/auth/me"),
  logout: () => post("/auth/logout"),
  refresh: () => post("/auth/refresh"),
  sendOtp: (b: object) => post("/auth/otp/send", b),
  verifyOtp: (b: object) => post("/auth/otp/verify", b),
  forgotPassword: (email: string) => post("/auth/password/forgot", { email }),
  changePassword: (b: object) => patch("/auth/password/change", b),
};

export const userService = {
  me: () => get("/users/me"),
  update: (b: object) => patch("/users/me", b),
  photo: (photoUrl: string) => patch("/users/me/photo", { photoUrl }),
  emergencyContact: (b: object) => patch("/users/me/emergency-contact", b),
  prefs: () => get("/users/me/preferences"),
  updatePrefs: (b: object) => patch("/users/me/preferences", b),
  get: (id: string) => get(`/users/${id}`),
  block: (id: string, reason?: string) => post(`/users/${id}/block`, { reason }),
  unblock: (id: string) => del(`/users/${id}/block`),
};

export const vehicleService = {
  list: () => get("/vehicles"),
  create: (b: object) => post("/vehicles", b),
  get: (id: string) => get(`/vehicles/${id}`),
  update: (id: string, b: object) => patch(`/vehicles/${id}`, b),
  remove: (id: string) => del(`/vehicles/${id}`),
  documents: (id: string, documentUrls: string[]) => post(`/vehicles/${id}/documents`, { documentUrls }),
  verification: (id: string) => get(`/vehicles/${id}/verification`),
};

export const routeService = {
  list: () => get("/routes"),
  create: (b: object) => post("/routes", b),
  addSchedule: (id: string, b: object) => post(`/routes/${id}/schedules`, b),
  pause: (id: string) => post(`/routes/${id}/pause`),
  resume: (id: string) => post(`/routes/${id}/resume`),
  availability: (id: string, b: object) => post(`/routes/${id}/availability`, b),
};

export const matchService = {
  search: (b: object) => post("/matches/search", b),
  get: (id: string) => get(`/matches/${id}`),
  select: (id: string) => post(`/matches/${id}/select`),
  request: (id: string) => post(`/matches/${id}/request`),
  createRequest: (b: object) => post("/ride-requests", b),
  listRequests: () => get("/ride-requests"),
  runMatch: (id: string) => post(`/ride-requests/${id}/match`),
  requestMatches: (id: string) => get(`/ride-requests/${id}/matches`),
  cancelRequest: (id: string) => post(`/ride-requests/${id}/cancel`),
};

export const rideService = {
  search: matchService.search,
  requestMatch: matchService.request,
  list: (params?: Q) => get("/rides", params),
  listRides: () => get("/rides"),
  get: (id: string) => get(`/rides/${id}`),
  getRide: (id: string) => get(`/rides/${id}`),
  accept: (id: string) => post(`/rides/${id}/accept`),
  reject: (id: string) => post(`/rides/${id}/reject`),
  confirm: (id: string) => post(`/rides/${id}/confirm`),
  otp: (id: string) => get(`/rides/${id}/otp`),
  verifyOtp: (id: string, code: string) => post(`/rides/${id}/otp/verify`, { code }),
  complete: (id: string) => post(`/rides/${id}/complete`),
  cancel: (id: string) => post(`/rides/${id}/cancel`),
  noShow: (id: string) => post(`/rides/${id}/no-show`),
  timeline: (id: string) => get(`/rides/${id}/timeline`),
  pushLocation: (id: string, b: object) => post(`/rides/${id}/location`, b),
  location: (id: string) => get(`/rides/${id}/location`),
  locationHistory: (id: string) => get(`/rides/${id}/location/history`),
  shareLocation: (id: string) => post(`/rides/${id}/location/share`),
  stopSharing: (id: string) => del(`/rides/${id}/location/share`),
};

export const paymentService = {
  checkout: (rideId: string) => post("/payments/checkout", { rideId }),
  list: () => get("/payments"),
  get: (id: string) => get(`/payments/${id}`),
  status: (id: string) => get(`/payments/${id}/status`),
  validate: (id: string) => post(`/payments/${id}/validate`),
  refund: (id: string, reason: string) => post(`/payments/${id}/refund`, { reason }),
};

export const chatService = {
  list: () => get("/conversations"),
  open: (rideId: string) => post("/conversations", { rideId }),
  messages: (id: string) => get(`/conversations/${id}/messages`),
  send: (id: string, content: string) => post(`/conversations/${id}/messages`, { content }),
  markRead: (id: string) => patch(`/conversations/${id}/read`),
};

export const reviewService = {
  create: (b: object) => post("/reviews", b),
  forRide: (rideId: string) => get(`/reviews/ride/${rideId}`),
  forUser: (userId: string) => get(`/reviews/user/${userId}`),
};

export const notificationService = {
  list: () => get("/notifications"),
  unread: () => get("/notifications/unread-count"),
  readAll: () => patch("/notifications/read-all"),
  read: (id: string) => patch(`/notifications/${id}/read`),
};

export const safetyService = {
  report: (b: object) => post("/reports", b),
  emergency: (b: object) => post("/safety/emergency", b),
  createTicket: (b: object) => post("/support/tickets", b),
  tickets: () => get("/support/tickets"),
};

/** Admin: generic helpers cover every /admin/* route in the guide (users, verifications, rides, reports, disputes, payments, support, incidents, analytics/*, audit-logs). */
export const adminService = {
  dashboard: () => get("/admin/dashboard"),
  list: (path: string, params?: Q) => get(`/admin/${path}`, params),
  act: (path: string, body?: object) => post(`/admin/${path}`, body),
  update: (path: string, body: object) => patch(`/admin/${path}`, body),
  approveVerification: (id: string, reason?: string) => post(`/admin/verifications/${id}/approve`, { reason }),
  rejectVerification: (id: string, reason: string) => post(`/admin/verifications/${id}/reject`, { reason }),
  setUserStatus: (id: string, b: object) => patch(`/admin/users/${id}/status`, b),
};
