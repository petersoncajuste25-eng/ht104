import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { formatPrice } from '@/lib/utils';

const DEPARTMENTS = [
  'Artibonite',
  'Centre',
  'Grand\'Anse',
  'Nippes',
  'Nord',
  'Nord-Est',
  'Nord-Ouest',
  'Ouest',
  'Sud',
  'Sud-Est',
];

export function Checkout() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    department: 'Ouest',
    phone: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = getTotalPrice();
  const deliveryFee = deliveryMethod === 'delivery' ? 200 : 0;
  const total = subtotal + deliveryFee;
  const upfront = total / 2;
  const onDelivery = total / 2;

  const handlePlaceOrder = () => {
    const orderNum = 'HT' + Date.now().toString().slice(-8);
    setOrderNumber(orderNum);
    setShowSuccess(true);
  };

  const handleWhatsApp = () => {
    const message = `
${language === 'ht' ? 'Nouvo Komand' : language === 'fr' ? 'Nouvelle Commande' : 'New Order'}

${t('order_number')}: ${orderNumber}

${language === 'ht' ? 'Pwodwi yo' : language === 'fr' ? 'Produits' : 'Products'}:
${items.map((item) => `- ${item.product[`name_${language}`]} x${item.quantity}`).join('\n')}

${t('total')}: ${formatPrice(total)}
${t('upfront_50')}: ${formatPrice(upfront)}
${t('delivery_50')}: ${formatPrice(onDelivery)}

${t('delivery_method')}: ${deliveryMethod === 'pickup' ? t('pickup_free') : t('delivery_fee')}
${deliveryMethod === 'delivery' ? `${t('street_address')}: ${address.street}, ${address.city}, ${address.department}` : ''}
    `.trim();

    const whatsappUrl = `https://wa.me/509XXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/products');
  };

  if (items.length === 0 && !showSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          {t('checkout')}
        </h1>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s
                      ? 'bg-[#1e40af] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-32 h-1 mx-2 ${
                      step > s ? 'bg-[#1e40af]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{t('delivery_method')}</span>
            <span>{t('order_review')}</span>
            <span>
              {language === 'ht' && 'Konfime'}
              {language === 'fr' && 'Confirmer'}
              {language === 'en' && 'Confirm'}
            </span>
          </div>
        </div>

        {step === 1 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {t('delivery_method')}
            </h2>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={(value) => setDeliveryMethod(value as 'pickup' | 'delivery')}
            >
              <div className="flex items-center space-x-2 p-4 border-2 rounded-lg mb-3">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                  <span className="font-semibold">{t('pickup_free')}</span>
                  <p className="text-sm text-gray-600">
                    {language === 'ht' && 'Vin pran pwodwi a lakay nou'}
                    {language === 'fr' && 'Récupérez le produit chez nous'}
                    {language === 'en' && 'Pick up the product at our location'}
                  </p>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border-2 rounded-lg">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                  <span className="font-semibold">{t('delivery_fee')}</span>
                  <p className="text-sm text-gray-600">
                    {language === 'ht' && 'Nou pral livre pwodwi a lakay ou'}
                    {language === 'fr' && 'Nous livrerons le produit chez vous'}
                    {language === 'en' && 'We\'ll deliver the product to you'}
                  </p>
                </Label>
              </div>
            </RadioGroup>

            {deliveryMethod === 'delivery' && (
              <div className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="street">{t('street_address')}</Label>
                  <Input
                    id="street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t('city')}</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">{t('department')}</Label>
                    <select
                      id="department"
                      value={address.department}
                      onChange={(e) => setAddress({ ...address, department: e.target.value })}
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">{t('phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+509 XXXX-XXXX"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-[#1e40af] hover:bg-[#1e40af]/90"
            >
              {language === 'ht' && 'Kontinye'}
              {language === 'fr' && 'Continuer'}
              {language === 'en' && 'Continue'}
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">{t('order_review')}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex justify-between py-2 border-b"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.product[`name_${language}`]}
                    </p>
                    {(item.size || item.color) && (
                      <p className="text-sm text-gray-600">
                        {item.size && `${t('select_size')}: ${t(`size_${item.size.toLowerCase()}`)}`}
                        {item.size && item.color && ' • '}
                        {item.color && `${t('select_color')}: ${t(`color_${item.color}`)}`}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      {t('quantity')}: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between">
                  <span>{language === 'ht' ? 'Frè Livrezon' : language === 'fr' ? 'Frais Livraison' : 'Delivery Fee'}</span>
                  <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>{t('total')}</span>
                <span className="text-[#1e40af]">{formatPrice(total)}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                {language === 'ht' && 'Retounen'}
                {language === 'fr' && 'Retour'}
                {language === 'en' && 'Back'}
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#1e40af] hover:bg-[#1e40af]/90"
              >
                {language === 'ht' && 'Kontinye'}
                {language === 'fr' && 'Continuer'}
                {language === 'en' && 'Continue'}
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {language === 'ht' && 'Konfime Komand'}
              {language === 'fr' && 'Confirmer Commande'}
              {language === 'en' && 'Confirm Order'}
            </h2>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2 text-gray-900">{t('payment_breakdown')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#10b981] font-medium">{t('upfront_50')}</span>
                  <span className="font-bold text-[#10b981]">{formatPrice(upfront)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500 font-medium">{t('delivery_50')}</span>
                  <span className="font-bold text-orange-500">{formatPrice(onDelivery)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-bold">{t('total')}</span>
                  <span className="font-bold text-lg text-[#1e40af]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                {language === 'ht' &&
                  'Mwen dakò ak kondisyon peman 50/50 yo'}
                {language === 'fr' &&
                  'J\'accepte les conditions de paiement 50/50'}
                {language === 'en' &&
                  'I agree to 50/50 payment terms'}
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                {language === 'ht' && 'Retounen'}
                {language === 'fr' && 'Retour'}
                {language === 'en' && 'Back'}
              </Button>
              <Button
                onClick={handlePlaceOrder}
                disabled={!agreeTerms}
                className="flex-1 bg-[#10b981] hover:bg-[#10b981]/90"
              >
                {t('place_order')}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-[#10b981]">
              {t('order_success')}
            </DialogTitle>
            <DialogDescription className="text-center pt-4 space-y-4">
              <div className="text-4xl">🎉</div>
              <p className="text-lg font-semibold text-gray-900">
                {t('order_number')}: {orderNumber}
              </p>
              <p className="text-gray-600">{t('payment_instructions')}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90"
            >
              {t('send_whatsapp')}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false);
                clearCart();
                navigate('/products');
              }}
              className="w-full"
            >
              {t('continue_shopping')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
