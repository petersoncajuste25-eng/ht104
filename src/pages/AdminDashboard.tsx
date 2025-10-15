import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/utils';
import { Package, DollarSign, Users, ShoppingCart } from 'lucide-react';

export function AdminDashboard() {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('id'),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (productsRes.error) throw productsRes.error;

      const ordersData = ordersRes.data || [];
      setOrders(ordersData);

      const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.total), 0);
      const pendingOrders = ordersData.filter((o) => o.order_status !== 'delivered').length;

      setStats({
        totalOrders: ordersData.length,
        pendingOrders,
        totalRevenue,
        totalProducts: productsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, field: string, value: string) => {
    try {
      const updates: any = { [field]: value };

      if (field === 'order_status') {
        if (value === 'confirmed' && !orders.find(o => o.id === orderId)?.confirmed_at) {
          updates.confirmed_at = new Date().toISOString();
        } else if (value === 'ready' && !orders.find(o => o.id === orderId)?.ready_at) {
          updates.ready_at = new Date().toISOString();
        } else if (value === 'delivered' && !orders.find(o => o.id === orderId)?.delivered_at) {
          updates.delivered_at = new Date().toISOString();
        }
      } else if (field === 'payment_status') {
        if (value === 'paid_50' && !orders.find(o => o.id === orderId)?.first_payment_date) {
          updates.first_payment_date = new Date().toISOString();
        } else if (value === 'fully_paid' && !orders.find(o => o.id === orderId)?.final_payment_date) {
          updates.final_payment_date = new Date().toISOString();
        }
      }

      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1e40af] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {language === 'ht' && 'Tablo Bò Administratè'}
          {language === 'fr' && 'Tableau de Bord Administrateur'}
          {language === 'en' && 'Admin Dashboard'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'Total Komand'}
                {language === 'fr' && 'Total Commandes'}
                {language === 'en' && 'Total Orders'}
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'An Tann'}
                {language === 'fr' && 'En attente'}
                {language === 'en' && 'Pending'}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'Revni Total'}
                {language === 'fr' && 'Revenu Total'}
                {language === 'en' && 'Total Revenue'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'Pwodwi'}
                {language === 'fr' && 'Produits'}
                {language === 'en' && 'Products'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ht' && 'Jesyon Komand'}
              {language === 'fr' && 'Gestion des Commandes'}
              {language === 'en' && 'Order Management'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  {language === 'ht' ? 'Tout' : language === 'fr' ? 'Toutes' : 'All'}
                </TabsTrigger>
                <TabsTrigger value="pending">
                  {language === 'ht' ? 'An Tann' : language === 'fr' ? 'En attente' : 'Pending'}
                </TabsTrigger>
                <TabsTrigger value="confirmed">
                  {language === 'ht' ? 'Konfime' : language === 'fr' ? 'Confirmées' : 'Confirmed'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    language={language}
                    onUpdate={updateOrderStatus}
                  />
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {orders
                  .filter((o) => o.order_status === 'pending')
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      language={language}
                      onUpdate={updateOrderStatus}
                    />
                  ))}
              </TabsContent>

              <TabsContent value="confirmed" className="space-y-4 mt-4">
                {orders
                  .filter((o) => o.order_status === 'confirmed')
                  .map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      language={language}
                      onUpdate={updateOrderStatus}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  language,
  onUpdate,
}: {
  order: Order;
  language: string;
  onUpdate: (id: string, field: string, value: string) => void;
}) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{order.order_number}</h3>
          <p className="text-sm text-gray-600">{order.customer_name || order.customer_email}</p>
          <p className="text-sm text-gray-600">{order.customer_phone}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1e40af]">{formatPrice(order.total)}</p>
          <p className="text-sm text-gray-600">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            {language === 'ht' ? 'Estati Peman' : language === 'fr' ? 'Statut Paiement' : 'Payment Status'}
          </label>
          <select
            value={order.payment_status}
            onChange={(e) => onUpdate(order.id, 'payment_status', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="pending_50">
              {language === 'ht' ? 'An Tann 50%' : language === 'fr' ? 'En attente 50%' : 'Pending 50%'}
            </option>
            <option value="paid_50">
              {language === 'ht' ? 'Peye 50%' : language === 'fr' ? 'Payé 50%' : 'Paid 50%'}
            </option>
            <option value="fully_paid">
              {language === 'ht' ? 'Peye Konplètman' : language === 'fr' ? 'Payé Complètement' : 'Fully Paid'}
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            {language === 'ht' ? 'Estati Komand' : language === 'fr' ? 'Statut Commande' : 'Order Status'}
          </label>
          <select
            value={order.order_status}
            onChange={(e) => onUpdate(order.id, 'order_status', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="pending">
              {language === 'ht' ? 'An Tann' : language === 'fr' ? 'En attente' : 'Pending'}
            </option>
            <option value="confirmed">
              {language === 'ht' ? 'Konfime' : language === 'fr' ? 'Confirmée' : 'Confirmed'}
            </option>
            <option value="ready">
              {language === 'ht' ? 'Pare' : language === 'fr' ? 'Prête' : 'Ready'}
            </option>
            <option value="delivered">
              {language === 'ht' ? 'Livre' : language === 'fr' ? 'Livrée' : 'Delivered'}
            </option>
          </select>
        </div>
      </div>

      {order.delivery_method === 'delivery' && order.delivery_address && (
        <div className="text-sm">
          <p className="font-medium">
            {language === 'ht' ? 'Adrès Livrezon:' : language === 'fr' ? 'Adresse Livraison:' : 'Delivery Address:'}
          </p>
          <p className="text-gray-600">
            {order.delivery_address.street}, {order.delivery_address.city},{' '}
            {order.delivery_address.department}
          </p>
        </div>
      )}
    </div>
  );
}
