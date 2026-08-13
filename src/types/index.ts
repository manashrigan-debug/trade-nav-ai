export type UserRole = 'Merchant' | 'Exporter' | 'Importer' | 'Logistics Manager' | 'Maritime Operator' | 'Admin';

export type TransportMode = 'Sea' | 'Air' | 'Rail' | 'Road' | 'Multimodal';

export type Priority = 'Cheapest' | 'Fastest' | 'Safest' | 'Balanced' | 'Lowest Carbon';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
}

export interface ISupplier {
  id: string;
  name: string;
  country: string;
  city: string;
  reliabilityScore: number;
  priceScore: number;
  qualityScore: number;
  deliveryScore: number;
  riskScore: number;
  responseTimeHours: number;
  historicalDelayDays: number;
  overallScore: number;
  recommended: boolean;
  categories: string[];
}

export interface IShipment {
  id: string;
  trackingNumber: string;
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  cargoDescription: string;
  cargoCategory: string;
  cargoValueINR: number;
  quantity: number;
  unit: string;
  transportMode: TransportMode;
  eta: string;
  currentStatus: string;
  tradeHealthScore: number;
  cargoRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  customsRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  supplierName: string;
  waypoints: {
    name: string;
    location: [number, number];
    status: 'completed' | 'current' | 'pending';
    mode?: TransportMode;
  }[];
  iotMetrics?: {
    containerNumber: string;
    temperatureCelsius: number;
    humidityPercent: number;
    shockG: number;
    tiltDegrees: number;
    doorOpen: boolean;
    lastUpdated: string;
  };
}

export interface IPort {
  id: string;
  name: string;
  code: string;
  country: string;
  coordinates: [number, number];
  congestionLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  waitingTimeHours: number;
  handlingCostPerTEUINR: number;
  riskScore: number;
  estimatedDelayDays: number;
  suitabilityScore: number;
  specialization: string[];
}

export interface IRouteOption {
  id: string;
  name: string;
  mode: TransportMode;
  modesBreakdown: string[];
  costINR: number;
  transitTimeDays: number;
  riskScore: number;
  cargoSafetyPercent: number;
  reliabilityPercent: number;
  carbonEmissions: 'Low' | 'Medium' | 'High';
  overallScore: number;
  legs: {
    mode: TransportMode;
    from: string;
    to: string;
    durationDays: number;
    costINR: number;
  }[];
}

export interface IDamageCase {
  id: string;
  caseId: string;
  shipmentId: string;
  cargoDescription: string;
  damageCategory: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidencePercent: number;
  affectedQuantity: number;
  totalQuantity: number;
  unitValueINR: number;
  estimatedLossINR: number;
  responsibleParty: string;
  evidenceStatus: {
    invoice: boolean;
    packingList: boolean;
    billOfLading: boolean;
    photos: boolean;
    inspectionReport: boolean;
    deliveryRecord: boolean;
  };
  claimReadinessPercent: number;
  claimDraft?: string;
  status: string;
  createdAt: string;
}

export interface IAlert {
  id: string;
  severity: 'RED' | 'AMBER' | 'BLUE';
  title: string;
  reason: string;
  recommendedAction: string;
  timestamp: string;
  shipmentId?: string;
  category: string;
}
