import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

export function Dashboard() {
  const { profile } = useAuth();
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      pending_50: 'bg-orange-100 text-orange-700',
      paid_50: 'bg-blue-100 text-blue-700',
      fully_paid: 'bg-green-100 text-green-700',
    };
    const labels = {
      ht: {
        pending_50: 'Tann 50%',
        paid_50: 'Peye 50%',
        fully_paid: 'Konplè',
      },
      fr: {
        pending_50: 'En attente 50%',
        paid_50: 'Payé 50%',
        fully_paid: 'Complet',
      },
      en: {
        pending_50: 'Pending 50%',
        paid_50: 'Paid 50%',
        fully_paid: 'Fully Paid',
      },
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {labels[language][status as keyof typeof labels.ht]}
      </Badge>
    );
  };

  const getOrderStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-5 h-5 text-gray-500" />,
      confirmed: <CheckCircle className="w-5 h-5 text-blue-500" />,
      ready: <Package className="w-5 h-5 text-orange-500" />,
      delivered: <Truck className="w-5 h-5 text-green-500" />,
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ht' && `Byenvini, ${profile?.full_name}`}
            {language === 'fr' && `Bienvenue, ${profile?.full_name}`}
            {language === 'en' && `Welcome, ${profile?.full_name}`}
          </h1>
          <p className="text-gray-600 mt-2">
            {language === 'ht' && 'Jere kont ou ak komand ou yo'}
            {language === 'fr' && 'Gérez votre compte et vos commandes'}
            {language === 'en' && 'Manage your account and orders'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'An Kour'}
                {language === 'fr' && 'En cours'}
                {language === 'en' && 'Pending'}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.order_status !== 'delivered').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ht' && 'Konplete'}
                {language === 'fr' && 'Complétées'}
                {language === 'en' && 'Completed'}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.order_status === 'delivered').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ht' && 'Komand Nou Yo'}
              {language === 'fr' && 'Mes Commandes'}
              {language === 'en' && 'My Orders'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-[#1e40af] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                {language === 'ht' && 'Ou poko gen komand'}
                {language === 'fr' && "Vous n'avez pas encore de commandes"}
                {language === 'en' && 'You have no orders yet'}
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getOrderStatusIcon(order.order_status)}
                          <h3 className="font-semibold text-lg text-gray-900">
                            {order.order_number}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString(
                            language === 'ht' ? 'ht-HT' : language === 'fr' ? 'fr-FR' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {getPaymentStatusBadge(order.payment_status)}
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {language === 'ht' && 'Total'}
                            {language === 'fr' && 'Total'}
                            {language === 'en' && 'Total'}
                          </p>
                          <p className="text-xl font-bold text-[#1e40af]">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
