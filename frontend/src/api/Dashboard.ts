export type KpisResponse = {
  ordersPendingInvoicing: number;
  productsPendingInvoicing: number;
  productsOutOfStock: number;
  ordersRecorded: number;
  ordersPendingPayment: number;
  ordersInvoiced: number;
};

export async function fetchDashboardKpis(token?: string) {
  const siteId = localStorage.getItem('selectedSite') || '0'; // o valor por defecto
  const res = await fetch('/api/dashboard/kpis', {
    headers: {
      'x-site-id': siteId,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as KpisResponse;
}