
import { Asset, Transaction, Report, User, CorporateNotice, AdminNotification } from './types';
import { supabase } from './lib/supabase';

// --- SISTEMA DE PERSISTENCIA ---
const getStoredYield = () => {
  const saved = localStorage.getItem('CAISHEN_CURRENT_YIELD');
  return saved ? parseFloat(saved) : 0.0225;
};

const getIsPeriodClosed = () => {
  return localStorage.getItem('CAISHEN_PERIOD_STATUS') === 'CLOSED';
};

export const getPublishedNotifications = (): AdminNotification[] => {
  const saved = localStorage.getItem('CAISHEN_PUBLISHED_NOTIFS');
  return saved ? JSON.parse(saved) : [];
};

// --- FUENTE DE VERDAD HISTÓRICA ---
export const FINANCIAL_HISTORY: Record<number, number[]> = {
  2022: [-4.80, -3.60, 2.40, -9.60, -1.20, -7.90, 6.40, -3.90, -8.20, 5.60, 3.20, -6.10],
  2023: [3.40, 2.85, -2.10, 4.25, 3.90, 2.75, -1.65, 5.60, -2.95, 4.80, 2.10, 1.85],
  2024: [3.10, 2.45, -1.80, 4.60, 5.20, 3.85, -2.30, 6.40, 2.90, 4.15, 1.75, 1.95],
  2025: [4.02, -2.00, 6.00, -1.50, 7.00, 4.50, 3.00, 4.17, 2.30, 2.18, 2.40, 2.25]
};

// --- CONFIGURACIÓN FINANCIERA GLOBAL ---
const GLOBAL_AUM = 124425.00;
const TOTAL_PROFIT_2025 = 32120.00;

export const FINANCE_CONFIG = {
  TOTAL_SHARES: 500,
  GLOBAL_AUM: GLOBAL_AUM,
  TOTAL_PROFIT_2025: TOTAL_PROFIT_2025,
  NOMINAL_VALUE_PER_SHARE: 248.85,
  get CURRENT_MONTHLY_YIELD() { return getStoredYield(); },
  ANNUAL_PROJECTION: 0.3976, 
  LAST_SIX_MONTHS_YIELD: 0.174,
  RESERVE_FUND: GLOBAL_AUM * 0.8, 
  RESERVE_GOAL: GLOBAL_AUM * 0.8,
  RESERVE_GOAL_PCT: 100,
  get IS_PERIOD_CLOSED() { return getIsPeriodClosed(); }
};

// Acciones administrativas con integración Supabase
export const adminSetYield = async (yieldValue: number) => {
  localStorage.setItem('CAISHEN_CURRENT_YIELD', yieldValue.toString());
  try {
    const { error } = await supabase
      .from('financial_config')
      .upsert({ id: 'current_config', yield: yieldValue, updated_at: new Date().toISOString() });
    if (error) console.warn("Supabase Sync Error:", error.message);
  } catch (e) {
    console.error("Connection to Supabase failed");
  }
  window.dispatchEvent(new Event('finance_update'));
};

export const adminClosePeriod = async () => {
  localStorage.setItem('CAISHEN_PERIOD_STATUS', 'CLOSED');
  try {
    await supabase
      .from('financial_config')
      .upsert({ id: 'current_config', is_closed: true, closed_at: new Date().toISOString() });
  } catch (e) {}
  window.dispatchEvent(new Event('finance_update'));
};

export const adminPublishNotification = async (notification: AdminNotification) => {
  const published = getPublishedNotifications();
  if (!published.find(n => n.id === notification.id)) {
    const updated = [notification, ...published];
    localStorage.setItem('CAISHEN_PUBLISHED_NOTIFS', JSON.stringify(updated));
    try {
      await supabase.from('notifications').insert(notification);
    } catch (e) {}
    window.dispatchEvent(new Event('global_notification_update'));
  }
};

export const calculateUserFinance = (shares: number) => {
  const participation = shares / FINANCE_CONFIG.TOTAL_SHARES;
  const balance = shares * FINANCE_CONFIG.NOMINAL_VALUE_PER_SHARE;
  const monthlyProfit = balance * FINANCE_CONFIG.CURRENT_MONTHLY_YIELD;
  const annualProfit = balance * FINANCE_CONFIG.ANNUAL_PROJECTION;
  
  return {
    participation: (participation * 100).toFixed(2) + '%',
    balance: balance,
    monthlyProfit: monthlyProfit,
    annualProfit: annualProfit
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
    description: 'Se ha procesado el rendimiento del 2.25% mensual correspondiente al cierre de Diciembre.',
    type: 'Success',
    fullContent: 'La distribución ha sido aplicada proporcionalmente a todas las cuentas activas basada en el AUM de $124,425.00.'
  }
];

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'an-1', event: 'Rentabilidad', description: 'Confirmación de cierre mensual Dic 2025: 2.25%', origin: 'Administrador', impact: 'Crítico', timestamp: 'Hoy, 09:15 AM', status: 'Confirmada' },
  { id: 'an-2', event: 'Sistema', description: 'Recalculo de balance global ejecutado con éxito', origin: 'Automática', impact: 'Informativo', timestamp: 'Hoy, 09:05 AM', status: 'Emitida' },
  { id: 'an-3', event: 'Mercado', description: 'Bitcoin supera umbral de volatilidad del 4% (SPX Correlation)', origin: 'Sistema', impact: 'Relevante', timestamp: 'Hoy, 08:45 AM', status: 'Emitida' },
  { id: 'an-4', event: 'Auditoría', description: 'Verificación de reserva técnica (80% AUM) completada', origin: 'Automática', impact: 'Crítico', timestamp: 'Ayer, 06:30 PM', status: 'Confirmada' },
  { id: 'an-5', event: 'Transacción', description: 'Inyección de capital externo detectada en pool de liquidez', origin: 'Sistema', impact: 'Relevante', timestamp: 'Ayer, 04:15 PM', status: 'Archivada' },
];

export const MOCK_ASSETS: Asset[] = [
  { id: '1', name: 'Divisas (Forex)', category: 'Forex', quantity: '30.9%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.309, return: 12.5, status: 'Abierta' },
  { id: '2', name: 'Renta Variable (Acciones)', category: 'Acciones', quantity: '10.3%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.103, return: 15.8, status: 'Abierta' },
  { id: '3', name: 'Real Estate Portfolio', category: 'Inmobiliario', quantity: '25.8%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.258, return: 8.2, status: 'Abierta' },
  { id: '4', name: 'Materias Primas (Commodities)', category: 'Derivados', quantity: '12.4%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.124, return: 14.1, status: 'Abierta' },
  { id: '5', name: 'Estrategia Cripto/Algo', category: 'Cripto', quantity: '20.6%', currentValue: FINANCE_CONFIG.GLOBAL_AUM * 0.206, return: 22.4, status: 'Abierta' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'Dividendo', amount: 2800.00, date: 'Hoy, 09:00 AM', status: 'Completado', description: 'Distribución Mensual Diciembre' },
];

export const MOCK_WATCHLIST = [
  { id: 'w1', name: 'Bitcoin', symbol: 'BTC/USD', price: '$98,430.00', change: '4.2%', isPositive: true, type: 'crypto' },
  { id: 'w2', name: 'S&P 500', symbol: 'SPX', price: '$5,980.00', change: '1.2%', isPositive: true, type: 'stock' },
];

export const MOCK_REPORTS: Report[] = [
  { 
    id: 'rep1', 
    title: 'Informe de Gestión Diciembre 2025', 
    date: '15 Dic, 2025', 
    category: 'Mensual', 
    summary: 'Rendimiento mensual consolidado del 2.25% y estado de liquidez del fondo.',
    content: "Análisis detallado de la distribución de utilidades y métricas de crecimiento mensual..."
  },
  { 
    id: 'rep2', 
    title: 'Auditoría de Reserva Técnica Q4', 
    date: '10 Dic, 2025', 
    category: 'Auditoría', 
    summary: 'Verificación del cumplimiento del 80% de fondo de reserva ante el AUM global.',
    content: "El proceso de auditoría externa confirma que los activos de respaldo se encuentran debidamente custodiados..."
  },
  { 
    id: 'rep3', 
    title: 'Plan de Expansión Estratégica 2026', 
    date: '05 Dic, 2025', 
    category: 'Estrategia', 
    summary: 'Hoja de ruta para la inclusión de activos inmobiliarios tokenizados en el próximo ejercicio.',
    content: "Nuevos sectores de inversión han sido identificados para diversificar el riesgo de mercado..."
  },
  { 
    id: 'rep4', 
    title: 'Cumplimiento Normativo de Identidad (KYC)', 
    date: '01 Dic, 2025', 
    category: 'Normativa', 
    summary: 'Actualización de protocolos de seguridad y validación de socios bajo estándares internacionales.',
    content: "Se han reforzado los niveles de verificación para garantizar la integridad operativa del grupo..."
  },
  { 
    id: 'rep5', 
    title: 'Matriz de Riesgos y Mitigación Operativa', 
    date: '28 Nov, 2025', 
    category: 'Auditoría', 
    summary: 'Evaluación de la correlación del fondo con el mercado de renta variable y coberturas aplicadas.',
    content: "El informe destaca la resiliencia del portafolio ante fluctuaciones severas en el SPX..."
  },
  { 
    id: 'rep6', 
    title: 'Proyección de Dividendos Anuales 2025', 
    date: '20 Nov, 2025', 
    category: 'Resumen Ejecutivo', 
    summary: 'Análisis comparativo de rendimientos históricos y proyecciones de cierre de año.',
    content: "Estimaciones finales basadas en el crecimiento sostenido del capital bajo administración..."
  }
];
