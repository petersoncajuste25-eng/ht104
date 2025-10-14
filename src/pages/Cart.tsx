import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

export function Cart() {
  const { language, t } = useLanguage();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const upfront = subtotal / 2;
  const delivery = subtotal / 2;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-md p-12">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('empty_cart')}</h2>
            <p className="text-gray-600 mb-8">
              {language === 'ht' && 'Ajoute kèk pwodwi pou kòmanse'}
              {language === 'fr' && 'Ajoutez des produits pour commencer'}
              {language === 'en' && 'Add some products to get started'}
            </p>
            <Link to="/products">
              <Button className="bg-[#1e40af] hover:bg-[#1e40af]/90">
                {t('continue_shopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          {t('shopping_cart')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="p-4"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product[`name_${language}`]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 text-gray-900">
                      {item.product[`name_${language}`]}
                    </h3>
                    {(item.size || item.color) && (
                      <p className="text-sm text-gray-600 mb-2">
                        {item.size && (
                          <span>
                            {t('select_size')}: {t(`size_${item.size.toLowerCase()}`)}
                          </span>
                        )}
                        {item.size && item.color && ' • '}
                        {item.color && (
                          <span>
                            {t('select_color')}: {t(`color_${item.color}`)}
                          </span>
                        )}
                      </p>
                    )}
                    <p className="text-xl font-bold text-[#1e40af]">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() =>
                        removeItem(item.product.id, item.size, item.color)
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.size,
                            item.color
                          )
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.size,
                            item.color
                          )
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600">
                      {t('subtotal')}: {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                {language === 'ht' && 'Rezime Komand'}
                {language === 'fr' && 'Résumé Commande'}
                {language === 'en' && 'Order Summary'}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('subtotal')}</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-[#10b981] font-medium">
                      {t('upfront_50')}
                    </span>
                    <span className="font-bold text-[#10b981]">
                      {formatPrice(upfront)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-500 font-medium">
                      {t('delivery_50')}
                    </span>
                    <span className="font-bold text-orange-500">
                      {formatPrice(delivery)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">{t('total')}</span>
                    <span className="text-2xl font-bold text-[#1e40af]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-6 text-lg">
                  {t('proceed_checkout')}
                </Button>
              </Link>

              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full">
                  {t('continue_shopping')}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
