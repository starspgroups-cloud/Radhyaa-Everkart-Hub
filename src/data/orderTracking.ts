import { OrderStatusRecord } from '../types';
import { ASSETS } from './assets';

export const SAMPLE_ORDERS: Record<string, OrderStatusRecord> = {
  'REH-98421': {
    id: 'REH-98421',
    date: '05 Oct 2026',
    status: 'Out for Delivery',
    statusDescription: 'Your parcel is with our delivery associate and scheduled for doorstep delivery today.',
    estimatedDelivery: 'Today by 6:00 PM',
    carrier: 'Delhivery Express Air',
    awb: 'DL839201948IN',
    customerName: 'Radhika Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Greens, Sector 150, Noida, UP - 201310',
    paymentMethod: 'Instant UPI (Prepaid)',
    subtotal: 3198,
    discount: 319,
    total: 2879,
    items: [
      {
        name: 'Royal Crescent Flap Shagun Envelopes (Set of 5 with Kundan Brooch)',
        image: ASSETS.prodCurvedKundan,
        quantity: 2,
        size: 'Set of 5 Envelopes',
        price: 699,
      },
      {
        name: 'Sage Botanical Whisper 100% Pure Combed Cotton Bedsheet Set',
        image: ASSETS.categoryBedsheets,
        quantity: 1,
        size: 'King (108" x 108")',
        price: 1799,
      },
    ],
    timeline: [
      {
        status: 'Order Placed & Verified',
        time: '05 Oct, 11:20 AM',
        location: 'Radhyaa Online Portal',
        done: true,
        current: false,
        note: 'Order details verified, inventory allocated.',
      },
      {
        status: 'Quality Inspected & Packaged',
        time: '05 Oct, 03:45 PM',
        location: 'Central Fulfillment Studio, New Delhi',
        done: true,
        current: false,
        note: 'Hand-inspected, wrapped in signature botanical tissue and protective rigid box.',
      },
      {
        status: 'Dispatched via Express Courier',
        time: '05 Oct, 08:15 PM',
        location: 'Delhi Regional Logistics Hub',
        done: true,
        current: false,
        note: 'Handed over to Delhivery Express. AWB #DL839201948IN assigned.',
      },
      {
        status: 'Arrived at Local Destination Center',
        time: '06 Oct, 06:30 AM',
        location: 'Noida Delivery Hub, Sector 63',
        done: true,
        current: false,
        note: 'Scanned and sorted for final delivery run.',
      },
      {
        status: 'Out for Doorstep Delivery',
        time: '06 Oct, 09:15 AM',
        location: 'Sector 150 Area Van',
        done: true,
        current: true,
        note: 'Delivery executive Rajesh Kumar (+91 98112 XXXXX) is out for delivery. Contactless OTP delivery.',
      },
    ],
  },
  'REH-78210': {
    id: 'REH-78210',
    date: '04 Oct 2026',
    status: 'In Transit',
    statusDescription: 'Your package is on an express flight to Mumbai destination sorting center.',
    estimatedDelivery: 'Tomorrow, 07 Oct',
    carrier: 'Bluedart Apex Air',
    awb: 'BD490218320IN',
    customerName: 'Vikram Singhania',
    phone: '+91 99201 12345',
    address: '12 Marine Drive, Nariman Point, Mumbai, Maharashtra - 400021',
    paymentMethod: 'Cash on Delivery (COD)',
    subtotal: 2498,
    discount: 250,
    total: 2248,
    items: [
      {
        name: 'Handcrafted Traditional Solid Brass Peacock Diya Lamps (Set of 2)',
        image: ASSETS.prodBrassDiya,
        quantity: 1,
        size: 'Set of 2 Lamps',
        price: 1499,
      },
      {
        name: 'Authentic Jaipuri Bandhani Festive Shagun Envelopes (Pack of 6)',
        image: ASSETS.prodJaipuriBandhani,
        quantity: 2,
        size: 'Pack of 6',
        price: 499,
      },
    ],
    timeline: [
      {
        status: 'Order Confirmed',
        time: '04 Oct, 02:10 PM',
        location: 'Radhyaa Web Portal',
        done: true,
        current: false,
        note: 'Cash on Delivery verification completed via automated OTP.',
      },
      {
        status: 'Quality Inspected & Sealed',
        time: '05 Oct, 10:00 AM',
        location: 'Jaipur Crafts Hub',
        done: true,
        current: false,
        note: 'Pure brass components polished and enclosed in tamper-proof bubble mailer.',
      },
      {
        status: 'Dispatched to Air Terminal',
        time: '05 Oct, 06:40 PM',
        location: 'IGI Airport Air Cargo Hub, Delhi',
        done: true,
        current: false,
        note: 'Dispatched under Bluedart Express Air Service.',
      },
      {
        status: 'In Transit - Air Freight',
        time: '06 Oct, 08:30 AM',
        location: 'DEL -> BOM Flight Transit',
        done: true,
        current: true,
        note: 'Aircraft in transit to Chhatrapati Shivaji Maharaj Airport Logistics Hub.',
      },
      {
        status: 'Out for Doorstep Delivery',
        time: 'Expected 07 Oct',
        location: 'South Mumbai Delivery Center',
        done: false,
        current: false,
        note: 'Scheduled for morning delivery run upon arrival.',
      },
    ],
  },
  'REH-51204': {
    id: 'REH-51204',
    date: '06 Oct 2026',
    status: 'Quality Inspected',
    statusDescription: 'Your order has passed master quality checks and is scheduled for evening dispatch.',
    estimatedDelivery: '09 Oct 2026',
    carrier: 'Delhivery Surface Express',
    awb: 'DL918204911IN',
    customerName: 'Ananya Mehta',
    phone: '+91 97412 88990',
    address: '42, 100ft Road, Indiranagar, Bengaluru, Karnataka - 560038',
    paymentMethod: 'Credit Card / Visa (Paid)',
    subtotal: 1699,
    discount: 0,
    total: 1699,
    items: [
      {
        name: 'Artisanal Hammered Pure Copper Wellness Carafe & Tumbler Set',
        image: ASSETS.prodCopperBottle,
        quantity: 1,
        size: '1000ml Carafe + Tumbler',
        price: 1699,
      },
    ],
    timeline: [
      {
        status: 'Order Placed & Verified',
        time: '06 Oct, 09:30 AM',
        location: 'Radhyaa Online Portal',
        done: true,
        current: false,
        note: 'Card transaction authorized successfully.',
      },
      {
        status: 'Handcrafted & Quality Inspected',
        time: '06 Oct, 01:15 PM',
        location: 'Central Fulfillment Studio, New Delhi',
        done: true,
        current: true,
        note: 'Copper grade certified (99.2% virgin copper), inspected for satin polish finish.',
      },
      {
        status: 'Dispatched via Courier',
        time: 'Scheduled 06 Oct, 07:00 PM',
        location: 'Delhi Courier Hub',
        done: false,
        current: false,
        note: 'Manifest generated, pickup vehicle assigned.',
      },
      {
        status: 'In Transit to Bengaluru',
        time: 'Expected 07-08 Oct',
        location: 'National Highway Express Route',
        done: false,
        current: false,
        note: 'Express logistics linehaul.',
      },
      {
        status: 'Out for Doorstep Delivery',
        time: 'Expected 09 Oct',
        location: 'Bengaluru East Delivery Hub',
        done: false,
        current: false,
        note: 'Doorstep delivery by local partner.',
      },
    ],
  },
};

/**
 * Searches for an order by ID.
 * First inspects localStorage for customer-placed orders.
 * Falls back to sample demonstration orders.
 * Generates an active dynamically tracked record for any valid REH-xxxx ID.
 */
export function lookupOrderStatus(orderIdInput: string): OrderStatusRecord | null {
  const cleanId = orderIdInput.trim().toUpperCase();
  if (!cleanId) return null;

  // 1. Check local storage
  try {
    const stored = localStorage.getItem('radhyaa_orders');
    if (stored) {
      const orders: OrderStatusRecord[] = JSON.parse(stored);
      const match = orders.find(
        (o) => o.id.toUpperCase() === cleanId || o.id.toUpperCase().replace('-', '') === cleanId.replace('-', '')
      );
      if (match) return match;
    }
  } catch (err) {
    console.error('Failed reading user orders:', err);
  }

  // 2. Check sample orders
  const directSample = SAMPLE_ORDERS[cleanId];
  if (directSample) return directSample;

  const sampleKey = Object.keys(SAMPLE_ORDERS).find(
    (k) => k.replace('-', '') === cleanId.replace('-', '')
  );
  if (sampleKey) return SAMPLE_ORDERS[sampleKey];

  // 3. If it looks like a Radhyaa order ID (e.g. REH-12345 or any 5-7 alphanumeric code), generate dynamic status
  if (cleanId.startsWith('REH') || cleanId.length >= 5) {
    const formattedId = cleanId.startsWith('REH-') ? cleanId : `REH-${cleanId.replace(/^REH/i, '')}`;
    return {
      id: formattedId,
      date: 'Today',
      status: 'Processing',
      statusDescription: 'Your order was successfully registered in our system and is currently being prepared for dispatch.',
      estimatedDelivery: 'In 3-4 Business Days',
      carrier: 'Delhivery Express Air',
      awb: `DL${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      customerName: 'Valued Customer',
      phone: '+91 98XXX XXXXX',
      address: 'Shipping Address on file, India',
      paymentMethod: 'Prepaid / COD Verified',
      subtotal: 1299,
      discount: 100,
      total: 1199,
      items: [
        {
          name: 'Radhyaa Curated Retail Seasonal Items',
          image: ASSETS.categorySeasonal,
          quantity: 1,
          size: 'Standard Pack',
          price: 1199,
        },
      ],
      timeline: [
        {
          status: 'Order Placed & Registered',
          time: 'Today, Just now',
          location: 'Radhyaa Order Management System',
          done: true,
          current: false,
          note: 'Order ID registered, allocation in progress.',
        },
        {
          status: 'Master Quality Check & Packaging',
          time: 'In Progress',
          location: 'Central Fulfillment Studio, New Delhi',
          done: true,
          current: true,
          note: 'Our artisans are verifying stitching, paper grade, and protective packing.',
        },
        {
          status: 'Dispatched to Express Logistics Hub',
          time: 'Scheduled Tomorrow',
          location: 'Delhi Logistics Hub',
          done: false,
          current: false,
          note: 'Express courier consignment will be updated with live GPS tracking.',
        },
        {
          status: 'In Transit',
          time: 'Day 2–3',
          location: 'Air Cargo Route',
          done: false,
          current: false,
          note: 'Fast delivery across 19,000+ Indian pincodes.',
        },
        {
          status: 'Out for Doorstep Delivery',
          time: 'Day 3–4',
          location: 'Your Local Pincode Hub',
          done: false,
          current: false,
          note: 'Safe, contactless delivery with OTP confirmation.',
        },
      ],
    };
  }

  return null;
}
