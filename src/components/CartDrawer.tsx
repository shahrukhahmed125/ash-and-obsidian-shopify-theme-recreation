import React from 'react';
import { Product, COLORS } from '../data/storeData';
import { X, ArrowRight, Minus, Plus } from 'lucide-react';

export interface CartItem {
  key: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onCheckout: () => void;
  onShopClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onShopClick,
}) => {
  const FREE_SHIPPING_THRESHOLD = 100;
  const subtotal = items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
  const totalCount = items.reduce((acc, it) => acc + it.qty, 0);
  const freeShippingPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-51 w-full max-w-[420px] bg-[#100e0e] border-l border-[rgba(232,224,212,0.12)] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-7 py-6 border-b border-[rgba(232,224,212,0.12)]">
          <div className="font-serif text-xl tracking-[0.08em] text-[#e8e0d4]">
            Your Bag ({totalCount})
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1 text-[#e8e0d4] hover:text-white transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-7 py-4.5 border-b border-[rgba(232,224,212,0.12)] flex flex-col gap-2.5">
          <div className="text-xs text-[#b7aea3] font-light">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <span className="text-[#e8e0d4] font-normal">
                You’ve unlocked complimentary shipping.
              </span>
            ) : (
              <span>
                ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} away from free shipping
              </span>
            )}
          </div>
          <div className="h-[2px] bg-[rgba(232,224,212,0.12)] w-full overflow-hidden">
            <div
              className="h-full bg-[#b3262b] transition-all duration-500 ease-out"
              style={{ width: `${freeShippingPct}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-7 py-4">
          {items.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-5">
              <div className="text-[15px] text-[#b7aea3] font-light">
                Your bag is empty.
              </div>
              <button
                onClick={() => {
                  onClose();
                  onShopClick();
                }}
                className="ao-btn ao-btn-primary"
              >
                Shop Drop I &rarr;
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              {items.map((it) => {
                const colorDef = COLORS[it.color] || COLORS.black;
                return (
                  <div
                    key={it.key}
                    className="grid grid-cols-[84px_1fr_auto] gap-4 py-4.5 border-b border-[rgba(232,224,212,0.08)] items-center"
                  >
                    <img
                      src={it.product.img}
                      alt={it.product.name}
                      className="w-[84px] h-[84px] object-cover bg-[#161413]"
                      style={{ filter: colorDef.filter }}
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="text-xs tracking-[0.14em] uppercase text-[#e8e0d4] truncate">
                        {it.product.name}
                      </div>
                      <div className="text-xs text-[#9a928a]">
                        {colorDef.name} &middot; {it.size}
                      </div>
                      <div className="flex items-center border border-[rgba(232,224,212,0.25)] w-max mt-1.5">
                        <button
                          onClick={() => onUpdateQty(it.key, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#e8e0d4] hover:bg-white/5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="min-w-6 text-center text-xs text-[#e8e0d4]">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(it.key, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#e8e0d4] hover:bg-white/5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between h-[84px] py-1">
                      <div className="text-sm text-[#e8e0d4] font-medium">
                        ${(it.product.price * it.qty).toFixed(2)}
                      </div>
                      <button
                        onClick={() => onRemoveItem(it.key)}
                        className="text-[11px] tracking-[0.14em] uppercase text-[#9a928a] hover:text-white underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-7 border-t border-[rgba(232,224,212,0.12)] flex flex-col gap-4 bg-[#0d0b0b]">
            <div className="flex justify-between text-sm tracking-[0.1em] uppercase">
              <span className="text-[#b7aea3]">Subtotal</span>
              <span className="text-[#e8e0d4] font-medium font-serif text-base">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full ao-btn ao-btn-primary group"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
