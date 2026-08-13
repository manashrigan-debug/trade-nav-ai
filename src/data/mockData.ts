import { ISupplier, IShipment, IPort, IAlert, IDamageCase, IRouteOption } from '../types';

export const initialSuppliers: ISupplier[] = [
  {
    id: 'sup-1',
    name: 'Shenzhen Global Electronics Ltd',
    country: 'China',
    city: 'Shenzhen',
    reliabilityScore: 94,
    priceScore: 82,
    qualityScore: 95,
    deliveryScore: 88,
    riskScore: 18,
    responseTimeHours: 3,
    historicalDelayDays: 1.2,
    overallScore: 90.5,
    recommended: true,
    categories: ['Electronics', 'Semiconductors', 'Microcontrollers']
  },
  {
    id: 'sup-2',
    name: 'Shanghai Tech Supply Co',
    country: 'China',
    city: 'Shanghai',
    reliabilityScore: 89,
    priceScore: 88,
    qualityScore: 86,
    deliveryScore: 91,
    riskScore: 22,
    responseTimeHours: 5,
    historicalDelayDays: 2.1,
    overallScore: 87.0,
    recommended: true,
    categories: ['Electronics', 'Display Panels', 'Capacitors']
  },
  {
    id: 'sup-3',
    name: 'Guangzhou Smart Components',
    country: 'China',
    city: 'Guangzhou',
    reliabilityScore: 78,
    priceScore: 94,
    qualityScore: 80,
    deliveryScore: 75,
    riskScore: 35,
    responseTimeHours: 12,
    historicalDelayDays: 4.5,
    overallScore: 81.2,
    recommended: false,
    categories: ['Hardware', 'Plastic Enclosures', 'Cable Assemblies']
  },
  {
    id: 'sup-4',
    name: 'Ningbo Industrial Trading Group',
    country: 'China',
    city: 'Ningbo',
    reliabilityScore: 92,
    priceScore: 80,
    qualityScore: 91,
    deliveryScore: 89,
    riskScore: 20,
    responseTimeHours: 4,
    historicalDelayDays: 1.8,
    overallScore: 88.3,
    recommended: true,
    categories: ['Industrial Parts', 'Electric Motors', 'Fasteners']
  },
  {
    id: 'sup-5',
    name: 'Vietnam Precision Tech JSC',
    country: 'Vietnam',
    city: 'Ho Chi Minh',
    reliabilityScore: 86,
    priceScore: 85,
    qualityScore: 88,
    deliveryScore: 84,
    riskScore: 24,
    responseTimeHours: 6,
    historicalDelayDays: 2.5,
    overallScore: 85.5,
    recommended: true,
    categories: ['PCB Assembly', 'Transformers', 'Sensors']
  },
  {
    id: 'sup-6',
    name: 'Bangkok Logistics & Trade Solution',
    country: 'Thailand',
    city: 'Bangkok',
    reliabilityScore: 84,
    priceScore: 79,
    qualityScore: 85,
    deliveryScore: 82,
    riskScore: 26,
    responseTimeHours: 8,
    historicalDelayDays: 3.0,
    overallScore: 83.1,
    recommended: false,
    categories: ['Rubber Parts', 'Packaging Materials']
  },
  {
    id: 'sup-7',
    name: 'Osaka Micro Devices Inc',
    country: 'Japan',
    city: 'Osaka',
    reliabilityScore: 98,
    priceScore: 65,
    qualityScore: 99,
    deliveryScore: 96,
    riskScore: 8,
    responseTimeHours: 2,
    historicalDelayDays: 0.3,
    overallScore: 92.4,
    recommended: true,
    categories: ['Sensors', 'High Precision Chips', 'Optics']
  },
  {
    id: 'sup-8',
    name: 'Seoul Advanced Power Systems',
    country: 'South Korea',
    city: 'Busan',
    reliabilityScore: 93,
    priceScore: 72,
    qualityScore: 96,
    deliveryScore: 92,
    riskScore: 14,
    responseTimeHours: 4,
    historicalDelayDays: 0.9,
    overallScore: 89.6,
    recommended: true,
    categories: ['Batteries', 'Power Controllers', 'Inverters']
  },
  {
    id: 'sup-9',
    name: 'Hamburg Industrial Supply GmbH',
    country: 'Germany',
    city: 'Hamburg',
    reliabilityScore: 96,
    priceScore: 60,
    qualityScore: 98,
    deliveryScore: 94,
    riskScore: 10,
    responseTimeHours: 3,
    historicalDelayDays: 0.5,
    overallScore: 88.9,
    recommended: true,
    categories: ['Heavy Machinery', 'Hydraulics', 'Valves']
  },
  {
    id: 'sup-10',
    name: 'Penang Chip Assembly Corp',
    country: 'Malaysia',
    city: 'Penang',
    reliabilityScore: 87,
    priceScore: 86,
    qualityScore: 89,
    deliveryScore: 85,
    riskScore: 21,
    responseTimeHours: 5,
    historicalDelayDays: 2.0,
    overallScore: 86.4,
    recommended: true,
    categories: ['Semiconductors', 'DRAM Modules']
  }
];

export const initialShipments: IShipment[] = [
  {
    id: 'shp-10294',
    trackingNumber: 'TRD10294',
    originCity: 'Shanghai',
    originCountry: 'China',
    destinationCity: 'Pune',
    destinationCountry: 'India',
    cargoDescription: 'High-Precision Microcontrollers & Displays',
    cargoCategory: 'Electronics',
    cargoValueINR: 2460000,
    quantity: 5000,
    unit: 'units',
    transportMode: 'Multimodal',
    eta: '18 Aug 2026',
    currentStatus: 'In Transit - Arabian Sea',
    tradeHealthScore: 86,
    cargoRisk: 'LOW',
    customsRisk: 'MEDIUM',
    supplierName: 'Shanghai Tech Supply Co',
    waypoints: [
      { name: 'Shanghai Port', location: [31.2304, 121.4737], status: 'completed', mode: 'Sea' },
      { name: 'Singapore Transit Hub', location: [1.3521, 103.8198], status: 'completed', mode: 'Sea' },
      { name: 'Mumbai JNPT Port', location: [18.9500, 72.9500], status: 'current', mode: 'Rail' },
      { name: 'ICD Pune Terminal', location: [18.5204, 73.8567], status: 'pending', mode: 'Road' }
    ],
    iotMetrics: {
      containerNumber: 'MSCU1234567',
      temperatureCelsius: 22.4,
      humidityPercent: 54,
      shockG: 0.2,
      tiltDegrees: 1.1,
      doorOpen: false,
      lastUpdated: '10 mins ago'
    }
  },
  {
    id: 'shp-10295',
    trackingNumber: 'TRD10295',
    originCity: 'Shenzhen',
    originCountry: 'China',
    destinationCity: 'Bengaluru',
    destinationCountry: 'India',
    cargoDescription: 'Li-Ion Battery Packs & Energy Inverters',
    cargoCategory: 'Batteries',
    cargoValueINR: 4200000,
    quantity: 800,
    unit: 'packs',
    transportMode: 'Air',
    eta: '15 Aug 2026',
    currentStatus: 'Customs Clearance - BLR Airport',
    tradeHealthScore: 72,
    cargoRisk: 'MEDIUM',
    customsRisk: 'HIGH',
    supplierName: 'Shenzhen Global Electronics Ltd',
    waypoints: [
      { name: 'Shenzhen Baoan Airport', location: [22.6393, 113.8107], status: 'completed', mode: 'Air' },
      { name: 'Bengaluru Airport Customs', location: [13.1986, 77.7066], status: 'current', mode: 'Road' },
      { name: 'Electronic City Hub', location: [12.8452, 77.6602], status: 'pending', mode: 'Road' }
    ],
    iotMetrics: {
      containerNumber: 'AIRB-99812',
      temperatureCelsius: 18.5,
      humidityPercent: 42,
      shockG: 0.1,
      tiltDegrees: 0.4,
      doorOpen: false,
      lastUpdated: '5 mins ago'
    }
  },
  {
    id: 'shp-10296',
    trackingNumber: 'TRD10296',
    originCity: 'Hamburg',
    originCountry: 'Germany',
    destinationCity: 'Chennai',
    destinationCountry: 'India',
    cargoDescription: 'Hydraulic Pumps & Industrial Valves',
    cargoCategory: 'Heavy Machinery',
    cargoValueINR: 8900000,
    quantity: 120,
    unit: 'units',
    transportMode: 'Sea',
    eta: '28 Aug 2026',
    currentStatus: 'En Route - Suez Canal Exit',
    tradeHealthScore: 91,
    cargoRisk: 'LOW',
    customsRisk: 'LOW',
    supplierName: 'Hamburg Industrial Supply GmbH',
    waypoints: [
      { name: 'Hamburg Port', location: [53.5511, 9.9937], status: 'completed', mode: 'Sea' },
      { name: 'Port Said Transit', location: [31.2653, 32.3019], status: 'completed', mode: 'Sea' },
      { name: 'Chennai Port Arrival', location: [13.0827, 80.2707], status: 'pending', mode: 'Road' }
    ]
  },
  {
    id: 'shp-10297',
    trackingNumber: 'TRD10297',
    originCity: 'Osaka',
    originCountry: 'Japan',
    destinationCity: 'Delhi NCR',
    destinationCountry: 'India',
    cargoDescription: 'Optical Sensors & Camera Assemblies',
    cargoCategory: 'Optics',
    cargoValueINR: 15400000,
    quantity: 1200,
    unit: 'units',
    transportMode: 'Air',
    eta: '16 Aug 2026',
    currentStatus: 'Dispatched from Kansai Airport',
    tradeHealthScore: 95,
    cargoRisk: 'LOW',
    customsRisk: 'LOW',
    supplierName: 'Osaka Micro Devices Inc',
    waypoints: [
      { name: 'Kansai Airport', location: [34.4320, 135.2304], status: 'completed', mode: 'Air' },
      { name: 'IGI Airport Delhi', location: [28.5562, 77.1000], status: 'pending', mode: 'Road' },
      { name: 'Noida Warehouse', location: [28.5355, 77.3910], status: 'pending', mode: 'Road' }
    ]
  },
  {
    id: 'shp-10298',
    trackingNumber: 'TRD10298',
    originCity: 'Guangzhou',
    originCountry: 'China',
    destinationCity: 'Mundra',
    destinationCountry: 'India',
    cargoDescription: 'ABS Plastic Enclosures & Cable Drums',
    cargoCategory: 'Hardware',
    cargoValueINR: 1850000,
    quantity: 4500,
    unit: 'pcs',
    transportMode: 'Sea',
    eta: '22 Aug 2026',
    currentStatus: 'Container Moisture Warning Exceeded',
    tradeHealthScore: 61,
    cargoRisk: 'HIGH',
    customsRisk: 'MEDIUM',
    supplierName: 'Guangzhou Smart Components',
    waypoints: [
      { name: 'Guangzhou Nansha Port', location: [22.7561, 113.6083], status: 'completed', mode: 'Sea' },
      { name: 'Strait of Malacca', location: [2.5000, 101.5000], status: 'current', mode: 'Sea' },
      { name: 'Mundra Port', location: [22.8390, 69.7042], status: 'pending', mode: 'Road' }
    ],
    iotMetrics: {
      containerNumber: 'COSCO-88123',
      temperatureCelsius: 31.8,
      humidityPercent: 88,
      shockG: 0.8,
      tiltDegrees: 3.5,
      doorOpen: false,
      lastUpdated: '1 min ago'
    }
  },
  {
    id: 'shp-10299',
    trackingNumber: 'TRD10299',
    originCity: 'Ho Chi Minh',
    originCountry: 'Vietnam',
    destinationCity: 'Kolkata',
    destinationCountry: 'India',
    cargoDescription: 'Transformers & Power Coil Assemblies',
    cargoCategory: 'Electronics',
    cargoValueINR: 3100000,
    quantity: 1500,
    unit: 'units',
    transportMode: 'Sea',
    eta: '20 Aug 2026',
    currentStatus: 'Berthing Delay at Kolkata Syama Prasad Port',
    tradeHealthScore: 78,
    cargoRisk: 'LOW',
    customsRisk: 'HIGH',
    supplierName: 'Vietnam Precision Tech JSC',
    waypoints: [
      { name: 'Cat Lai Port', location: [10.7719, 106.7761], status: 'completed', mode: 'Sea' },
      { name: 'Bay of Bengal', location: [15.0000, 88.0000], status: 'completed', mode: 'Sea' },
      { name: 'Kolkata Port Berth', location: [22.5489, 88.3040], status: 'current', mode: 'Road' }
    ]
  },
  {
    id: 'shp-10300',
    trackingNumber: 'TRD10300',
    originCity: 'Busan',
    originCountry: 'South Korea',
    destinationCity: 'Ahmedabad',
    destinationCountry: 'India',
    cargoDescription: 'Automotive Power Inverters',
    cargoCategory: 'Batteries',
    cargoValueINR: 6400000,
    quantity: 650,
    unit: 'units',
    transportMode: 'Rail',
    eta: '25 Aug 2026',
    currentStatus: 'Discharged at Mundra, Loaded on Rail ICD',
    tradeHealthScore: 88,
    cargoRisk: 'LOW',
    customsRisk: 'LOW',
    supplierName: 'Seoul Advanced Power Systems',
    waypoints: [
      { name: 'Busan New Port', location: [35.0786, 128.8322], status: 'completed', mode: 'Sea' },
      { name: 'Mundra Port Discharge', location: [22.8390, 69.7042], status: 'completed', mode: 'Rail' },
      { name: 'Sanand ICD Ahmedabad', location: [23.0225, 72.5714], status: 'pending', mode: 'Road' }
    ]
  },
  {
    id: 'shp-10301',
    trackingNumber: 'TRD10301',
    originCity: 'Ningbo',
    originCountry: 'China',
    destinationCity: 'Hyderabad',
    destinationCountry: 'India',
    cargoDescription: 'Precision Motors & CNC Controllers',
    cargoCategory: 'Industrial Parts',
    cargoValueINR: 5200000,
    quantity: 2100,
    unit: 'sets',
    transportMode: 'Multimodal',
    eta: '21 Aug 2026',
    currentStatus: 'Customs Clearance Verified',
    tradeHealthScore: 93,
    cargoRisk: 'LOW',
    customsRisk: 'LOW',
    supplierName: 'Ningbo Industrial Trading Group',
    waypoints: [
      { name: 'Ningbo-Zhoushan Port', location: [29.8683, 121.5440], status: 'completed', mode: 'Sea' },
      { name: 'Chennai Port Berth', location: [13.0827, 80.2707], status: 'completed', mode: 'Rail' },
      { name: 'Concor Hyderabad Hub', location: [17.3850, 78.4867], status: 'current', mode: 'Road' }
    ]
  }
];

export const initialPorts: IPort[] = [
  {
    id: 'prt-1',
    name: 'Mumbai JNPT Port (Nhava Sheva)',
    code: 'INNSA',
    country: 'India',
    coordinates: [18.9500, 72.9500],
    congestionLevel: 'MODERATE',
    waitingTimeHours: 18,
    handlingCostPerTEUINR: 32000,
    riskScore: 28,
    estimatedDelayDays: 1.5,
    suitabilityScore: 90,
    specialization: ['Containerized Cargo', 'Electronics', 'Automobile Parts']
  },
  {
    id: 'prt-2',
    name: 'Mundra Port (Adani Ports)',
    code: 'INMUN',
    country: 'India',
    coordinates: [22.8390, 69.7042],
    congestionLevel: 'LOW',
    waitingTimeHours: 6,
    handlingCostPerTEUINR: 28500,
    riskScore: 15,
    estimatedDelayDays: 0.5,
    suitabilityScore: 96,
    specialization: ['Bulk & Deep Sea Container Ships', 'Chemicals', 'Machinery']
  },
  {
    id: 'prt-3',
    name: 'Chennai Port',
    code: 'MAA',
    country: 'India',
    coordinates: [13.0827, 80.2707],
    congestionLevel: 'MODERATE',
    waitingTimeHours: 22,
    handlingCostPerTEUINR: 34000,
    riskScore: 32,
    estimatedDelayDays: 2.0,
    suitabilityScore: 84,
    specialization: ['Automotive Export', 'Heavy Equipment', 'Textiles']
  },
  {
    id: 'prt-4',
    name: 'Syama Prasad Mookerjee Port Kolkata',
    code: 'INCCU',
    country: 'India',
    coordinates: [22.5489, 88.3040],
    congestionLevel: 'HIGH',
    waitingTimeHours: 42,
    handlingCostPerTEUINR: 39000,
    riskScore: 54,
    estimatedDelayDays: 3.5,
    suitabilityScore: 68,
    specialization: ['Riverine Barges', 'Steel', 'Agriculture']
  },
  {
    id: 'prt-5',
    name: 'Singapore Port Hub',
    code: 'SGSIN',
    country: 'Singapore',
    coordinates: [1.3521, 103.8198],
    congestionLevel: 'LOW',
    waitingTimeHours: 4,
    handlingCostPerTEUINR: 45000,
    riskScore: 8,
    estimatedDelayDays: 0.2,
    suitabilityScore: 99,
    specialization: ['Global Transshipment', 'Cold Chain', 'High Tech Electronics']
  },
  {
    id: 'prt-6',
    name: 'Colombo Port Hub',
    code: 'LKCMB',
    country: 'Sri Lanka',
    coordinates: [6.9497, 79.8489],
    congestionLevel: 'MODERATE',
    waitingTimeHours: 14,
    handlingCostPerTEUINR: 29000,
    riskScore: 36,
    estimatedDelayDays: 1.2,
    suitabilityScore: 82,
    specialization: ['South Asian Transshipment', 'Garments', 'Tea']
  }
];

export const initialAlerts: IAlert[] = [
  {
    id: 'alt-1',
    severity: 'RED',
    title: 'Cargo Risk Surge: Container Humidity Exceeded',
    reason: 'Container COSCO-88123 relative humidity hit 88% in Malacca Strait passage.',
    recommendedAction: 'Alert carrier for ventilation check & deploy desiccants upon berth at Mundra.',
    timestamp: '10 mins ago',
    shipmentId: 'TRD10298',
    category: 'IoT Alert'
  },
  {
    id: 'alt-2',
    severity: 'RED',
    title: 'Customs Quantity Mismatch Alert',
    reason: 'Shipment TRD10295 Bill of Lading registers 800 packs, but Commercial Invoice notes 850.',
    recommendedAction: 'Submit revised Packing List before BLR customs officer inspection.',
    timestamp: '2 hours ago',
    shipmentId: 'TRD10295',
    category: 'Customs'
  },
  {
    id: 'alt-3',
    severity: 'AMBER',
    title: 'Kolkata Port Congestion Spikes',
    reason: 'Vessel queue increased berth wait times from 24h to 42h due to tidal constraints.',
    recommendedAction: 'Re-route upcoming shipments via Haldia Dock Complex or rail from Vizag.',
    timestamp: '4 hours ago',
    category: 'Port Congestion'
  },
  {
    id: 'alt-4',
    severity: 'AMBER',
    title: 'Suez Transit Delay (+18h)',
    reason: 'Maritime convoy spacing slowdown affects Hamburg-Chennai vessel scheduling.',
    recommendedAction: 'Update downstream inland trucking slot at Chennai Port.',
    timestamp: '6 hours ago',
    shipmentId: 'TRD10296',
    category: 'ETA Change'
  },
  {
    id: 'alt-5',
    severity: 'BLUE',
    title: 'Supplier Reliability Rating Upgraded',
    reason: 'Shenzhen Global Electronics achieved 94% on-time dispatch rate for Q3.',
    recommendedAction: 'Consider increasing purchase order allocation by 15%.',
    timestamp: '1 day ago',
    category: 'Cargo Risk'
  },
  {
    id: 'alt-6',
    severity: 'AMBER',
    title: 'Claim Documentation Missing (TRD10298)',
    reason: 'Inspection report required to complete 100% claim readiness package.',
    recommendedAction: 'Upload formal surveyor photo evidence.',
    timestamp: '1 day ago',
    shipmentId: 'TRD10298',
    category: 'Claim Missing'
  }
];

export const initialDamageCases: IDamageCase[] = [
  {
    id: 'dmg-101',
    caseId: 'DMG-2026-0811',
    shipmentId: 'TRD10298',
    cargoDescription: 'ABS Plastic Enclosures',
    damageCategory: 'Water Damage',
    severity: 'High',
    confidencePercent: 87,
    affectedQuantity: 120,
    totalQuantity: 5000,
    unitValueINR: 3500,
    estimatedLossINR: 420000,
    responsibleParty: 'Shipping Carrier',
    evidenceStatus: {
      invoice: true,
      packingList: true,
      billOfLading: true,
      photos: true,
      inspectionReport: false,
      deliveryRecord: true
    },
    claimReadinessPercent: 85,
    claimDraft: `SUBJECT: FORMAL CARGO DAMAGE CLAIM - SHIPMENT TRD10298

To: COSCO Shipping Lines & Claims Department
Date: 13 August 2026

We hereby submit a formal claim for cargo damage sustained during maritime transit from Guangzhou Nansha Port to Mundra.

SHIPMENT DETAILS:
- Tracking No: TRD10298
- Container No: COSCO-88123
- Cargo Description: ABS Plastic Enclosures
- Damaged Quantity: 120 units out of 5000 units
- Total Estimated Direct Loss: ₹4,20,000 INR

NATURE OF DAMAGE:
Inspection upon arrival revealed extensive water ingress causing moisture corrosion and packaging degradation. Simulated IoT sensors recorded humidity levels exceeding 88%.

REQUESTED ACTION:
Kindly acknowledge receipt of this notice and initiate surveyor inspection. We request full reimbursement of ₹4,20,000 within 30 business days.

Sincerely,
Trade Nav AI Claim Logistics Team`,
    status: 'Claim Drafted',
    createdAt: '2026-08-11'
  }
];
