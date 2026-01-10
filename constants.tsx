
import { Asset, Transaction, Report, User, CorporateNotice, AdminNotification } from './types';
import { supabase } from './lib/supabase';

// --- SISTEMA DE PERSISTENCIA SEGMENTADA ---
export const getStoredYield = (year: number, month: number) => {
  const saved = localStorage.getItem(`YIELD_${year}_${month}`);
  if (saved) return parseFloat(saved);
  // Fallback al historial estático si no hay dato guardado
  const history = FINANCIAL_HISTORY[year];
  return history ? history[month] / 100 : 0;
};

export const getPayoutStatus = (year: number, month: number): 'PENDING' | 'PAID' => {
  const status = localStorage.getItem(`PAYOUT_STATUS_${year}_${month}`);
  if (status) return status as 'PENDING' | 'PAID';

  // Lógica de estados por defecto solicitada:
  // Años anteriores a 2026 ya están liquidados/pagados por defecto
  if (year < 2026) {
    return 'PAID';
  }

  // 2026 en adelante inicia como PENDING hasta acción del admin
  return 'PENDING';
};

export const adminSetYield = async (year: number, month: number, yieldValue: number) => {
  localStorage.setItem(`YIELD_${year}_${month}`, yieldValue.toString());
  window.dispatchEvent(new Event('finance_update'));
};

export const adminUpdateGlobalPayoutStatus = (year: number, month: number, status: 'PENDING' | 'PAID') => {
  localStorage.setItem(`PAYOUT_STATUS_${year}_${month}`, status);
  // Emitir evento global para sincronización inmediata en todos los componentes
  window.dispatchEvent(new Event('finance_update'));
};

export const adminUpdatePayoutStatus = (year: number, month: number, status: 'PENDING' | 'PAID') => {
  adminUpdateGlobalPayoutStatus(year, month, status);
};

// --- GESTIÓN DE NOTIFICACIONES PUBLICADAS ---
export const adminPublishNotification = (notification: AdminNotification) => {
  const published = getPublishedNotifications();
  if (!published.find(n => n.id === notification.id)) {
    const updated = [...published, notification];
    localStorage.setItem('PUBLISHED_NOTIFICATIONS', JSON.stringify(updated));
    window.dispatchEvent(new Event('notifications_update'));
  }
};

export const getPublishedNotifications = (): AdminNotification[] => {
  const saved = localStorage.getItem('PUBLISHED_NOTIFICATIONS');
  return saved ? JSON.parse(saved) : [];
};

// --- FUENTE DE VERDAD HISTÓRICA ---
export const FINANCIAL_HISTORY: Record<number, number[]> = {
  2022: [-4.80, -3.60, 2.40, -9.60, -1.20, -7.90, 6.40, -3.90, -8.20, 5.60, 3.20, -6.10],
  2023: [3.40, 2.85, -2.10, 4.25, 3.90, 2.75, -1.65, 5.60, -2.95, 4.80, 2.10, 1.85],
  2024: [3.10, 2.45, -1.80, 4.60, 5.20, 3.85, -2.30, 6.40, 2.90, 4.15, 1.75, 1.95],
  2025: [4.02, -2.00, 6.00, -1.50, 7.00, 4.50, 3.00, 4.17, 2.30, 2.18, 2.40, 2.25],
  2026: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const GLOBAL_AUM = 124425.00;

export const FINANCE_CONFIG = {
  TOTAL_SHARES: 500,
  GLOBAL_AUM: GLOBAL_AUM,
  TOTAL_PROFIT_2025: 32120.00,
  NOMINAL_VALUE_PER_SHARE: 248.85,
  CURRENT_MONTHLY_YIELD: 0.0225, 
  ANNUAL_PROJECTION: 0.3976,
  LAST_SIX_MONTHS_YIELD: 0.1845, 
  RESERVE_GOAL_PCT: 100, 
  IS_PERIOD_CLOSED: true
};

export const calculateUserFinance = (shares: number, year: number = 2025) => {
  const participation = shares / FINANCE_CONFIG.TOTAL_SHARES;
  const balance = shares * FINANCE_CONFIG.NOMINAL_VALUE_PER_SHARE;
  
  const history = FINANCIAL_HISTORY[year] || [];
  const annualYield = history.reduce((acc, curr) => acc + (curr / 100), 0);
  
  return {
    participation: (participation * 100).toFixed(2) + '%',
    balance: balance,
    annualProfit: balance * annualYield,
    monthlyProfit: balance * (history[11] / 100 || 0)
  };
};

export const MOCK_USER: User = {
  id: "admin-caishen",
  name: "Administrador CCG",
  role: "Super Admin",
  memberSince: "Enero 2024",
  avatarUrl: "https://picsum.photos/seed/admin/200/200"
};

export const MOCK_NOTICES: CorporateNotice[] = [
  {
    id: 'n1',
    title: 'Cierre de Periodo Diciembre',
    date: 'Actual',
    description: 'Se han dispersado exitosamente los dividendos del 2.25% mensual (Diciembre).',
    type: 'Success',
    fullContent: 'La distribución ha sido completada y pagada proporcionalmente a todas las cuentas activas basada en el AUM de $124,425.00.'
  }
];

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'an-1', event: 'Transacción', description: 'Dispersión de dividendos Dic 2025: COMPLETADA', origin: 'Administrador', impact: 'Crítico', timestamp: 'Hoy, 10:45 AM', status: 'Confirmada' },
];

export const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Divisas (Forex)', category: 'Forex', quantity: '30.9%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.309, return: 12.5, status: 'Abierta' },
  { id: '2', name: 'Renta Variable (Acciones)', category: 'Acciones', quantity: '10.3%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.103, return: 15.8, status: 'Abierta' },
  { id: '3', name: 'Real estate Portfolio', category: 'Inmobiliario', quantity: '25.8%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.258, return: 8.2, status: 'Abierta' },
  { id: '4', name: 'Materias Primas (Commodities)', category: 'Derivados', quantity: '12.4%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.124, return: 14.1, status: 'Abierta' },
  { id: '5', name: 'Estrategia Cripto/Algo', category: 'Cripto', quantity: '20.6%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.206, return: 22.4, status: 'Abierta' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'Dividendo', amount: 2800.00, date: 'Hoy, 10:45 AM', status: 'Completado', description: 'Distribución Pagada Diciembre' },
];

export const MOCK_WATCHLIST = [
  { id: 'w1', name: 'Bitcoin', symbol: 'BTC/USD', price: '$98,430.00', change: '4.2%', isPositive: true, type: 'crypto' },
  { id: 'w2', name: 'S&P 500', symbol: 'SPX', price: '$5,980.00', change: '1.2%', isPositive: true, type: 'stock' },
];

export const MOCK_REPORTS: Report[] = [
  { id: 'rep1', title: 'Informe de Gestión Diciembre 2025', date: '15 Dic, 2025', category: 'Mensual', summary: 'Rendimiento mensual consolidado del 2.25% y estado de liquidez del fondo.' }
];
