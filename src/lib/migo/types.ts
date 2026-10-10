export type Role = "PASSENGER" | "COMMUTER" | "ADMIN" | "SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

export interface Profile {
  fullName: string;
  photoUrl?: string;
  ratingAverage: number;
  ratingCount: number;
  completedRides: number;
  preferredLanguage: string;
  emergencyName?: string;
  emergencyPhone?: string;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  role: Role;
  status: UserStatus;
  profile: Profile;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  type: string;
  make: string;
  model: string;
  color: string;
  registrationNo: string;
  year: number;
  seats: number;
  verificationStatus: "APPROVED" | "PENDING" | "REJECTED";
}

export interface CommuterRoute {
  id: string;
  ownerId: string;
  vehicleId?: string;
  title: string;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  durationMin: number;
  seats: number;
  contributionBdt: number;
  status: "ACTIVE" | "PAUSED";
  departureTime: string;
  daysOfWeek: number[];
}

export interface RideRequest {
  id: string;
  passengerId: string;
  pickupName: string;
  pickupLat: number;
  pickupLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  date: string;
  time: string;
  seats: number;
  status: "OPEN" | "MATCHED" | "CANCELLED";
}

export interface RideMatch {
  id: string;
  requestId: string;
  routeId: string;
  score: number;
  estimatedPickupKm: number;
  contributionBdt: number;
  status: "SUGGESTED" | "SELECTED" | "REQUESTED";
}

export type RideStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Ride {
  id: string;
  requestId: string;
  matchId: string;
  routeId: string;
  commuterId: string;
  passengerId: string;
  status: RideStatus;
  date: string;
  departureTime: string;
  seats: number;
  contributionBdt: number;
  otpCode: string;
  pickupName: string;
  dropName: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  rideId: string;
  participantIds: string[];
}

export interface Payment {
  id: string;
  rideId: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  method: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Verification {
  id: string;
  userId: string;
  vehicleId?: string;
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface Report {
  id: string;
  reason: string;
  status: "OPEN" | "RESOLVED";
  targetType: string;
}
