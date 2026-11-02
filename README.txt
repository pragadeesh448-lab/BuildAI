BUILDAI — B2B CONSTRUCTION COMMERCE & SUPPLIER PROCUREMENT PLATFORM
======================================================================

QUICK START (LIVE API SERVER)
1. Open this folder in VS Code or Terminal.
2. Run the live backend server:
   python server.py
3. Open in your browser:
   http://localhost:8000
   (Note: Static preview also works via direct file:// or standard http.server)

4. Stop the server with Ctrl+C when finished.

LIVE API ENDPOINTS (BACKED BY SHARED JSON DATABASE)
- GET  /api/materials      -> Live 232-product construction catalogue (19 categories)
- GET  /api/suppliers      -> Live 5 canonical Tamil Nadu supplier depots
- GET  /api/requests       -> Shared builder procurement orders & live status
- POST /api/requests       -> Builder submits new multi-supplier order batch
- POST /api/requests/update-> Supplier submits quote, logistics note, or status update

DEMO CREDENTIALS
Builder / Commercial Contractor:
  Email:    builder@buildai.demo
  Password: BuildAI123

Supplier Portal (password for all supplier depots: Supplier123):
  1. Lakshmi Steel & Structural Traders: lakshmi@buildai.demo
  2. Pandian Ply & Timber Specialists:  pandian@buildai.demo
  3. Babu Agencies Multi-Material Mart:  babu@buildai.demo
  4. Geetha Timbers & Flooring:          geetha@buildai.demo
  5. D.K. Paints & Finishing Essentials: dkpaints@buildai.demo

(You can also choose the role and shop from the sign-in modal and click "Fill demo credentials".)

CORE ARCHITECTURE & DELIVERED CAPABILITIES
1. CANONICAL SUPPLIER INTEGRATION
   - Seamless end-to-end integration across Catalogue, Optimizer, Direct Cart, Builder Requests, and Supplier Inbox.
   - Any order submitted by the builder appears instantaneously in the targeted supplier's dashboard.

2. COMPREHENSIVE 232-PRODUCT STRUCTURAL & FINISHING CATALOGUE
   - 19 complete industry-standard construction categories:
     * TMT Steel & Reinforcement (Tata Tiscon 550D, JSW Neosteel, binding wire, stirrups)
     * Sand & Aggregates (River sand, M-sand, P-sand, 20mm/40mm blue metal)
     * Bricks & Blocks (Red clay kiln bricks, AAC lightweight blocks, solid concrete blocks)
     * Pipes & Plumbing (Astral CPVC, Supreme SWR, Sintex tanks, Jaquar fittings)
     * Construction Chemicals & Waterproofing (Dr. Fixit 2K, Sika SBR, Fosroc GP grout)
     * Roofing, Doors & Windows (Tata Shaktee galvalume, Fenesta UPVC, Tata Pravesh)
     * Cement, Flooring, Tiles, Sanitaryware, Electrical, Paints (52 curated shades)
   - Every product includes studio imagery, technical specs, BIS/ISI standards, and illustrative pricing.

3. ENGINEERING QUANTITY CALCULATOR (Header -> "🧮 Material Calculator")
   - Instant civil engineering estimators for:
     * Concrete Slab & RCC (M20/M25 mix -> Bags of cement, tons of sand, 20mm blue metal, kg of TMT steel)
     * Masonry Walls (Red brick, AAC, or solid block counts + mortar cement & sand)
     * Plastering (Internal 12mm / External 18mm with Dr. Fixit waterproofing)
     * Interior Paint (Royale Luxury Emulsion & acrylic primer coverage)
   - One-click "Add Calculated Materials to Procurement Plan" pushes directly to the optimizer.

4. MATERIAL PASSPORT & SPECIFICATION SHEETS
   - Click "📋 Specs" on any product card in the marketplace to inspect the official Material Passport.
   - Displays BIS/ISI compliance codes, green building ratings (IGBC/GRIHA), and packaging details.

5. COMMERCIAL B2B TAX INVOICES & DISPATCH TRACKING
   - When a supplier confirms an order, click "🧾 View GST Tax Invoice & Receipt" in "My Requests".
   - Generates an official, printable HSN-compliant B2B Tax Invoice with CGST/SGST breakdowns and QR seal.

6. AUTOMATIC ALTERNATIVE SUPPLIER RE-ROUTING
   - If a supplier marks an order as "Unable to supply", BuildAI instantly analyzes alternative suppliers based on fulfillment scores, ratings, and delivery fees.
   - One-click "🔄 Re-route Order" shifts the procurement batch to the recommended alternative partner.
