import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  Printer,
  Sparkles,
  Plane,
} from 'lucide-react';
import { OrderStatusRecord } from '../types';
import { lookupOrderStatus, SAMPLE_ORDERS } from '../data/orderTracking';
import { BrandLogo } from './BrandLogo';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [queryId, setQueryId] = useState(initialOrderId);
  const [order, setOrder] = useState<OrderStatusRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedAwb, setCopiedAwb] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [recentUserOrders, setRecentUserOrders] = useState<OrderStatusRecord[]>([]);

  useEffect(() => {
    // Load customer's actual placed orders from this browser session
    try {
      const stored = localStorage.getItem('radhyaa_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentUserOrders(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const idToSearch = initialOrderId || recentUserOrders[0]?.id || 'REH-98421';
      setQueryId(idToSearch);
      handleSearch(idToSearch);
    } else {
      setHasSearched(false);
    }
  }, [isOpen, initialOrderId]);

  if (!isOpen) return null;

  const handleSearch = (id: string) => {
    const trimmed = id.trim();
    if (!trimmed) return;
    setHasSearched(true);
    const result = lookupOrderStatus(trimmed);
    setOrder(result);
  };

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusBadge = (status: OrderStatusRecord['status']) => {
    switch (status) {
      case 'Out for Delivery':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500 animate-ping',
          text: 'Out for Delivery Today',
        };
      case 'In Transit':
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-300',
          dot: 'bg-sky-500 animate-ping',
          text: 'In Transit Express',
        };
      case 'Dispatched':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
          dot: 'bg-indigo-500',
          text: 'Dispatched with Courier',
        };
      case 'Quality Inspected':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          text: 'Quality Inspected & Packing',
        };
      case 'Delivered':
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-300',
          dot: 'bg-teal-500',
          text: 'Delivered',
        };
      default:
        return {
          bg: 'bg-stone-50 text-stone-800 border-stone-300',
          dot: 'bg-stone-500',
          text: 'Order Processing',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ECE3D4] overflow-hidden my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#ECE3D4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#112E1F]/20 shrink-0">
              <BrandLogo size="sm" emblemOnly={true} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#112E1F] leading-tight">
                  Track Your Order
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-[#112E1F] text-amber-200 px-2 py-0.5 rounded">
                  Live Dispatch
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Real-time courier updates, AWB tracking & doorstep delivery estimates.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full hover:bg-[#ECE3D4] text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Quick Picks */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#ECE3D4] space-y-3 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(queryId);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter your Order ID (e.g. REH-98421)"
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm border border-[#ECE3D4] rounded-lg bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#112E1F] transition-colors uppercase font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#112E1F] hover:bg-[#1C4832] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-[#DFB76C]" />
              <span>Lookup</span>
            </button>
          </form>

          {/* Quick Click Demo / Recent Orders */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-500">
            <span className="font-medium text-stone-600">Sample Live Orders:</span>
            {Object.keys(SAMPLE_ORDERS).map((key) => {
              const sample = SAMPLE_ORDERS[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setQueryId(key);
                    handleSearch(key);
                  }}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    order?.id === key
                      ? 'bg-[#112E1F] text-white border-[#112E1F] font-semibold'
                      : 'bg-[#FAF8F5] hover:bg-[#ECE3D4] text-[#112E1F] border-[#ECE3D4]'
                  }`}
                >
                  {key} ({sample.status})
                </button>
              );
            })}

            {recentUserOrders.length > 0 && recentUserOrders[0]?.id && !SAMPLE_ORDERS[recentUserOrders[0].id] && (
              <button
                type="button"
                onClick={() => {
                  setQueryId(recentUserOrders[0].id);
                  handleSearch(recentUserOrders[0].id);
                }}
                className={`px-2 py-0.5 rounded border font-semibold flex items-center gap-1 ${
                  order?.id === recentUserOrders[0].id
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Your Placed Order ({recentUserOrders[0].id})</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Tracking Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {order ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Order Status Hero Card */}
              {(() => {
                const badge = getStatusBadge(order.status);
                return (
                  <div className="bg-[#FAF8F5] border border-[#ECE3D4] rounded-xl p-4 sm:p-5 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-base sm:text-lg font-bold text-[#112E1F] tracking-wider">
                            #{order.id}
                          </span>
                          <button
                            onClick={() => handleCopyOrderId(order.id)}
                            className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                            title="Copy Order ID"
                          >
                            {copiedId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="text-xs text-stone-400">· Placed on {order.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                          >
                            <span className="relative flex h-2 w-2">
                              <span
                                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${badge.dot}`}
                              />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                            </span>
                            <span>{badge.text}</span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 mt-2.5 leading-relaxed max-w-xl">
                          {order.statusDescription}
                        </p>
                      </div>

                      {/* Est Delivery Highlight */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#ECE3D4] sm:text-right shrink-0">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                          Estimated Doorstep Delivery
                        </span>
                        <div className="text-base sm:text-lg font-bold text-[#112E1F] mt-0.5 font-serif">
                          {order.estimatedDelivery}
                        </div>
                        <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                          On Schedule · Inspected
                        </span>
                      </div>
                    </div>

                    {/* Logistics Carrier & AWB Bar */}
                    <div className="mt-4 pt-3.5 border-t border-[#ECE3D4] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#245A3E]" />
                        <span className="text-stone-500">Logistics Partner:</span>
                        <strong className="text-stone-800">{order.carrier}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Air Waybill (AWB):</span>
                        <code className="bg-white px-2 py-0.5 rounded border border-[#ECE3D4] font-mono font-semibold text-stone-800">
                          {order.awb}
                        </code>
                        <button
                          onClick={() => handleCopyAwb(order.awb)}
                          className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                          title="Copy AWB Number"
                        >
                          {copiedAwb ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Shipment Timeline */}
              <div className="bg-white border border-[#ECE3D4] rounded-xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span>Real-Time Shipment Journey</span>
                  </h4>
                  <span className="text-[11px] text-stone-400">Live GPS tracking synched</span>
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ECE3D4]">
                  {order.timeline.map((event, idx) => (
                    <div key={idx} className="relative group">
                      {/* Node Icon */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          event.current
                            ? 'bg-[#112E1F] text-amber-300 ring-4 ring-[#DFB76C]/30 shadow-xs'
                            : event.done
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-400'
                        }`}
                      >
                        {event.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h5
                            className={`text-xs sm:text-sm font-semibold ${
                              event.current
                                ? 'text-[#112E1F]'
                                : event.done
                                ? 'text-stone-800'
                                : 'text-stone-400'
                            }`}
                          >
                            {event.status}
                          </h5>
                          <span
                            className={`text-[11px] tabular-nums font-medium ${
                              event.current ? 'text-emerald-700 font-bold' : 'text-stone-400'
                            }`}
                          >
                            {event.time}
                          </span>
                        </div>

                        {event.location && (
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#C5A059]" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">{event.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Destination Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F5] border border-[#ECE3D4] rounded-xl text-xs space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#245A3E] block">
                    Shipping Recipient
                  </span>
                  <div className="font-semibold text-stone-800">{order.customerName}</div>
                  <div className="text-stone-600 leading-relaxed">{order.address}</div>
                  <div className="text-stone-500 pt-1">Phone: {order.phone}</div>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#ECE3D4] rounded-xl text-xs space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#245A3E] block">
                    Payment & Invoice Summary
                  </span>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Status:</span>
                    <strong className="text-stone-800">{order.paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Order Subtotal:</span>
                    <span className="tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Total Savings:</span>
                      <span className="tabular-nums">- ₹{order.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {order.giftWrapped && (
                    <div className="flex justify-between text-[#112E1F] font-medium">
                      <span>Signature Gift Wrapping:</span>
                      <span className="text-emerald-800">Included (+₹49)</span>
                    </div>
                  )}
                  {order.giftMessage && (
                    <div className="p-2 bg-amber-50/80 rounded border border-amber-200/60 text-[11px] text-stone-700 italic">
                      <span className="font-semibold text-stone-800 not-italic block text-[10px] uppercase tracking-wider text-[#245A3E] mb-0.5">
                        Gift Card Calligraphy Note:
                      </span>
                      "{order.giftMessage}"
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[#112E1F] pt-1 border-t border-[#ECE3D4]">
                    <span>Total Amount Paid:</span>
                    <span className="tabular-nums">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="bg-white border border-[#ECE3D4] rounded-xl p-4 sm:p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#112E1F] mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C5A059]" />
                  <span>Items in this Consignment ({order.items.length})</span>
                </h4>

                <div className="divide-y divide-[#ECE3D4]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center gap-3.5 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#ECE3D4] bg-[#FAF8F5] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-stone-800 truncate">{item.name}</h5>
                        {item.size && (
                          <span className="text-[11px] text-stone-500 block">
                            Option: {item.size}
                          </span>
                        )}
                        <span className="text-[11px] text-stone-400">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-stone-800 tabular-nums shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct WhatsApp Concierge Help Button */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-emerald-950">
                      Need custom dispatch instructions or priority delivery?
                    </h5>
                    <p className="text-[11px] text-emerald-800">
                      Our concierge is active on WhatsApp to guide delivery associates.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=Hello%20Radhyaa%20Everkart%20Hub!%20I%20am%20inquiring%20about%20my%20Order%20%23${order.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          ) : hasSearched ? (
            /* Order Not Found State */
            <div className="py-12 px-4 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-[#112E1F]">
                No Order Found for "{queryId}"
              </h4>
              <p className="text-xs text-stone-500 max-w-md mt-1.5 leading-relaxed">
                Please check the Order ID received in your confirmation SMS or WhatsApp update (typically starts with "REH-").
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQueryId('REH-98421');
                    handleSearch('REH-98421');
                  }}
                  className="px-4 py-2 bg-[#112E1F] text-amber-200 text-xs font-semibold rounded-lg hover:bg-[#1C4832] transition-colors"
                >
                  View Sample Order #REH-98421
                </button>
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Radhyaa%20Support,%20I%20am%20trying%20to%20find%20my%20order%20status`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#FAF8F5] border border-[#ECE3D4] text-[#112E1F] text-xs font-semibold rounded-lg hover:bg-[#F5EFE6] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ask Support on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#ECE3D4] flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            Fast, insured pan-India deliveries by Bluedart & Delhivery Air.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold transition-colors ml-auto"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
