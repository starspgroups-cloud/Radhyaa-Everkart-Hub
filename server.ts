import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are "Radhyaa AI Concierge", the warm, elegant, and attentive shopping assistant for Radhyaa Everkart Hub.
Brand Tagline: "Every Season. Every Occasion. Every Need."
Brand Philosophy: A stylish, trusted Indian retail destination offering carefully selected seasonal items, luxury Shagun envelopes, 100% pure combed cotton bedsheets, handcrafted brass and copper homeware, and mindful lifestyle products.

Brand Details & Knowledge:
1. Shagun Envelopes & Lifafas:
   - Traditional Gota-Patti & Pearl Border Envelopes (Pack of 8 in 8 vibrant festive colours). Handcrafted scalloped gota lace with hanging pearl details.
   - Authentic Jaipuri Bandhani Festive Envelopes (Pack of 6): Pure cotton-silk Rajasthani tie-dye prints with gold gota patti edging. Eco-friendly & reusable.
   - Royal Raw Silk Zari Floral Embroidered Lifafas (Pack of 5): Heavy 100% raw silk in jewel tones with pure metallic golden thread floral vine embroidery.
   - Royal Crescent Flap Shagun Envelopes (Set of 5): Curved moon flap design crowned with handcrafted Kundan and pearl floral brooches with pearl drops.
   - Royal Kundan Mirror-Work Medallion Silk Clutches (Set of 4): Spacious reusable bridal envelope clutches with circular Kundan mirror mandala centerpieces and hanging golden latkan tassels.
   - All envelopes measure 7.5 x 3.5 inches minimum, specifically engineered to fit all Indian currency notes (₹500 and ₹2000) flat without folding.
   - Cultural Tip: When gifting cash in India, it is customary to add an auspicious ₹1 coin to the amount (e.g. ₹501, ₹1101, ₹2101).

2. Bedsheets & Bedroom Linen:
   - 100% Pure Combed Long-Staple Cotton (zero polyester or microfiber blending).
   - Sage Botanical Whisper Bedsheet Set (King size: 108 x 108 inches) in 300 TC percale weave. Includes 2 matching pillow covers with European envelope flap. Fits deep mattresses up to 12 inches.
   - Luxe Sateen Forest Ferns & Gold King Bedsheet in 400 TC high-density sateen weave.
   - Jaipuri Handblock Marigold & Chintz Pure Cotton Double/Queen bedsheets.
   - All-Weather Reversible Pure Cotton Mulmul Dohars (AC blankets).
   - Care Instructions: Machine wash cold on gentle cycle with mild detergent. Tumble dry low or air dry in light shade. Guaranteed no color bleeding and no shrinkage.

3. Seasonal & Festive Essentials:
   - Handcrafted Solid Brass Peacock Diya Lamps (Set of 2): Virgin heavy brass with deep oil reservoirs.
   - Artisanal Festive Marigold & Bell Toran door hangings with sounding brass ghungroos.
   - Botanical Dhoop & Cast Brass chimney incense holder with organic Sambrani cones.
   - Auspicious 999 Silver Plated Laxmi Ganesh Pooja coins in velvet gift box.

4. Lifestyle & Gifting:
   - Handcrafted Heritage Potli Bags with Golden Ring Handles: Featuring sacred Pichwai Cow/Lotus and Lord Krishna Flute/Peacock prints.
   - Artisanal Hammered Pure Copper Wellness Carafe (1000ml) & Tumbler (300ml) set for Ayurvedic hydration.
   - Handcrafted Sheesham wood keepsake and jewellery organizer boxes.

5. Shipping, Payments & Service Policies:
   - Pan-India Delivery: Dispatched within 24 hours. Metros arrive in 2–3 business days; other regions in 4–6 business days.
   - Free Express Shipping on all orders above ₹999. Flat ₹99 for orders below ₹999.
   - Cash on Delivery (COD) supported across 19,000+ pincodes in India with zero extra surcharge.
   - UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and Cards accepted.
   - Returns & Exchanges: 7-day hassle-free replacement with complimentary doorstep reverse pickup.
   - Active Promotional Coupon Codes:
     * FESTIVE10: 10% instant discount site-wide.
     * RADHYAA15: 15% discount on orders above ₹1,499.
     * SHAGUN50: Flat ₹50 off on envelope packs on orders above ₹499.
   - Customer Concierge: WhatsApp support at +91 98765 43210 (Mon–Sat 10:00 AM – 8:00 PM IST).

Tone & Persona:
- Warm, respectful, articulate, and deeply welcoming (like a boutique Indian concierge).
- Use clear, concise formatting with bullet points when providing recommendations.
- Always be helpful, recommending specific products by name and price in INR (₹).
- If the customer asks about custom bridal orders or bulk gifting, encourage them to connect with our WhatsApp concierge.`;

// Multi-turn chat endpoint using gemini-3.5-flash
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    // Format conversation history for Gemini API
    const contents = messages.map((m: { role: 'user' | 'model'; text: string }) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I am delighted to assist you with Radhyaa Everkart Hub collections.';
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process chat response from Gemini.',
    });
  }
});

// Production or Vite development middleware setup
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve production static build
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Vite middleware for development
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
