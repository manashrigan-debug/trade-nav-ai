import { initialSuppliers, initialShipments, initialPorts, initialAlerts, initialDamageCases } from '../data/mockData';

const BASE_URL = '/api';

export const apiCall = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('tradenav_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Fallback active for ${endpoint} - API unavailable:`, (err as Error).message);
    throw err;
  }
};

// Client-Side Standby Intelligence Engine Fallback
export const mockTradeAnalysis = (input: any) => {
  const cargoVal = Number(input.cargoValue) || 2000000;
  const qty = Number(input.quantity) || 1000;
  const prio = input.priority || 'Balanced';

  const freightRate = prio === 'Fastest' ? 0.18 : prio === 'Cheapest' ? 0.06 : 0.09;
  const freight = Math.round(cargoVal * freightRate);
  const duty = Math.round(cargoVal * 0.12);
  const insurance = Math.round(cargoVal * 0.015);
  const portHandling = Math.round(cargoVal * 0.025);
  const totalLandedCost = cargoVal + freight + duty + insurance + portHandling;

  const mode = prio === 'Fastest' ? 'Air' : prio === 'Cheapest' ? 'Sea' : 'Multimodal';
  const deliveryDays = mode === 'Air' ? 4 : mode === 'Sea' ? 22 : 14;

  return {
    bestSupplier: `${input.originCity || 'Shanghai'} Tech Logistics Ltd`,
    recommendedRoute: `${input.originCity || 'Shanghai'} → Gateway Hub → ${input.destinationCity || 'Mumbai'}`,
    recommendedTransportMode: mode,
    estimatedLandedCost: totalLandedCost,
    costPerUnit: Math.round(totalLandedCost / qty),
    estimatedDeliveryTimeDays: deliveryDays,
    cargoRisk: input.cargoType?.toLowerCase().includes('glass') ? 'HIGH' : 'LOW',
    customsRisk: 'MEDIUM',
    geopoliticalRisk: 'LOW',
    tradeHealthScore: 88,
    costBreakdown: {
      productCost: cargoVal,
      freight,
      duty,
      insurance,
      localHandling: portHandling
    },
    aiInsights: [
      `Selected transport mode ${mode} balances cost and transit speed based on "${prio}" priority.`,
      `Customs processing estimated at 1.5 days if BL unit count matches invoice.`,
      `CargoGuard advises moisture protection desiccants for container passage.`
    ]
  };
};
