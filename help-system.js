/**
 * BuildAI - Universal Feature Instruction & Guidance System
 * Provides contextual, collapsible 'ⓘ How to use this feature' panels across all 20 features (A through T).
 * Scoped styling with .bai-help- prefix.
 */

(function() {
  'use strict';

  const HELP_REGISTRY = {
    landing: {
      title: 'Landing Page & Quick-Start Guide',
      category: 'System Overview',
      what: 'Introduces the BuildAI construction procurement platform, outlines the core multi-supplier optimization workflows, and provides quick navigation for contractors, project managers, and faculty reviewers.',
      steps: [
        'Review the platform overview highlighting Vellore regional demo suppliers and finish visualization.',
        'Explore the 5-step quick-start guide explaining the procurement lifecycle from BOQ input to site execution.',
        'Click "Start a material plan" to jump straight into project optimization, or "Explore the marketplace" to browse catalogue materials.',
        'Note the synthetic prototype data notice clarifying simulated delivery lead times and pricing models.'
      ],
      result: 'Direct orientation and 1-click navigation into procurement planning, catalogue browsing, or supplier performance tracking.',
      example: 'A civil contractor preparing a G+2 residential villa tender in Vellore starts here to quickly configure foundation rebar, cement, and sand sourcing.',
      notes: 'All supplier ratings and delivery metrics in this prototype are simulated for demonstration. Prices include benchmark Tamil Nadu GST rates.'
    },

    catalogue: {
      title: 'Material Catalogue & Marketplace',
      category: 'Product Sourcing',
      what: 'Comprehensive multi-category construction material catalogue featuring structural, plumbing, electrical, and finish materials with real-time supplier offers and pricing.',
      steps: [
        'Use the category dropdown or quick-filter tabs (Featured, Finishing, Structural, Electrical & plumbing) to narrow down materials.',
        'Search for specific products, brands, or IS standards (e.g., "UltraTech 43", "Tata Tiscon", "PVC") using the live search bar.',
        'Click "📋 Specs" on any material card to inspect its Material Passport, technical specifications, and green compliance data.',
        'Click "⚖️ Compare" to add products to the side-by-side comparison matrix, or "✦ Room" to test surface finishes in the AI visualizer.',
        'Click "+ Add" to immediately add required quantities into your active Material Planner list.'
      ],
      result: 'Filtered material cards displaying unit rates, supplier distribution, technical specifications, and one-click actions for planning or visualization.',
      example: 'Filtering by "Cement" displays 10 distinct products including OPC 43, OPC 53, PPC, PSC, and white cement from UltraTech, ACC, Dalmia, and Ramco.',
      notes: 'Product cards show the lowest available price across verified Vellore suppliers. Stock availability is verified dynamically during planner allocation.'
    },

    planner: {
      title: 'Smart Material Planner',
      category: 'Procurement Engine',
      what: 'Algorithmic material requirement planner that takes Bill of Quantities (BOQ) lines, project budget, delivery deadline, and priority preference, calculating the optimal supplier distribution.',
      steps: [
        'Enter project metadata: Project Name, Site Location (e.g. Vellore), Target Budget in ₹, and Delivery Deadline (1 to 14 days).',
        'Select your main optimization priority: Balanced value, Lowest overall cost, Highest service score, or Fastest delivery.',
        'Check "Allow combination of suppliers" if you want the algorithm to split lines across multiple suppliers for maximum cost savings.',
        'Add material lines with required quantities, or use the "🎙️ Voice Command" button for hands-free Tanglish/English entry.',
        'Click "Optimize supplier combination →" to execute the optimization algorithm.'
      ],
      result: 'A complete supplier allocation breakdown detailing assigned suppliers per line, freight consolidation, total project cost, and explainable selection reasons.',
      example: 'Planning 150 bags UltraTech Cement + 1,200 kg Tata Rebars with 3-day deadline yields a split allocation to Lakshmi Steel & Structural Traders for lowest delivery fee.',
      notes: 'Monsoon Pour-Risk notices appear dynamically in the planner if your selected delivery window coincides with forecast heavy rainfall.'
    },

    optimizer: {
      title: 'Multi-Supplier Best Combo Optimization',
      category: 'Decision Intelligence',
      what: 'Displays the mathematical optimization output comparing single-source sole-supplier tenders against multi-supplier split allocations with transparent savings breakdowns.',
      steps: [
        'Review the Recommended Supplier Combination card showing total delivered cost, delivery fee consolidation, and budget variance.',
        'Inspect individual material line allocations to see why each supplier was chosen (e.g., "Lowest unit rate", "Depot proximity").',
        'Compare the recommended combo with alternative single-supplier quotes shown in the comparison table below.',
        'Click "Submit Purchase Order" to generate official sourcing requests sent directly to the suppliers\' portals.'
      ],
      result: 'Verified procurement plan ready for execution with documented cost savings, delivery schedules, and audit-ready justifications.',
      example: 'Combining Babu Agencies for sand/bricks and Lakshmi Steel for TMT rebars saves ₹8,450 compared to procuring everything from a single distributor.',
      notes: 'Multi-supplier allocations add separate delivery charges per supplier; the algorithm only splits orders when material savings exceed extra transport fees.'
    },

    recovery: {
      title: 'Autonomous Supplier Failure Recovery Engine',
      category: 'Risk Mitigation',
      what: 'Automated resilience system that detects supplier supply-chain failures (stockouts, logistics breakdowns, transport strikes) and recalculates alternative plans without project downtime.',
      steps: [
        'When a supplier flags a disruption via their portal, the system triggers a real-time recovery alert on the affected order.',
        'Click "View Recovery Audit" or open the Recovery Engine banner on the order card.',
        'Inspect the disruption root-cause, affected material lines, and impact on pouring schedules.',
        'Review the autonomous substitution plan comparing alternative local suppliers, price variance, and delay trade-offs.',
        'Click "Authorize Alternative Supplier Plan" to reroute the purchase order and dispatch replacement materials.'
      ],
      result: 'Instant rerouting of delayed materials to an alternative vetted supplier, securing critical site concrete pouring deadlines.',
      example: 'Order #BA-JT75 experienced a rebar stockout at Babu Agencies; Recovery Engine rerouted the 1,200 kg rebar order to Lakshmi Steel within 15 minutes.',
      notes: 'Strict role separation applies: BuildAI calculates the optimal recovery plan autonomously, but never modifies a confirmed order without contractor authorization.'
    },

    supplierPortal: {
      title: 'Live Supplier Order & Dispatch Portal',
      category: 'Vendor Operations',
      what: 'Dedicated interface for registered suppliers to manage incoming purchase orders, update inventory stock levels, accept contracts, schedule dispatches, or report stockout disruptions.',
      steps: [
        'Select the active supplier account from the portal switcher (e.g., Lakshmi Steel, Babu Agencies).',
        'Review new incoming buyer sourcing requests and verify requested material quantities against depot inventory.',
        'Click "Accept & Confirm Order" to accept the contract and schedule dispatch date and vehicle number.',
        'If inventory is depleted, click "Report Stockout Disruption" to immediately alert the builder and trigger the Recovery Engine.',
        'Mark orders as "Dispatched" or "Delivered" to update the live jobsite tracking feed.'
      ],
      result: 'Bi-directional synchronization between suppliers and builders, ensuring immediate visibility into depot fulfillment and transit milestones.',
      example: 'Lakshmi Steel logs into their portal, reviews an order for 150 bags of OPC 43 cement, confirms stock availability, and assigns dispatch truck TN-23-AB-4401.',
      notes: 'Disruptions reported by suppliers are logged immutably in data/audit_log.json for dispute resolution and supplier reliability scoring.'
    },

    orderTracking: {
      title: 'Live Order Tracking & Dispatch Status',
      category: 'Logistics Tracking',
      what: 'Visual 5-stage order progression pipeline tracking purchase orders from initial submission to jobsite unloading.',
      steps: [
        'Open the "Track Orders" modal from the main header or navigation bar.',
        'Locate your purchase order by Order ID (e.g., #BA-20261025091500-LAK1).',
        'Follow the interactive progress stepper: Order Placed → Order Confirmed → Packed & Processing → Out for Delivery → Delivered.',
        'View live courier/vehicle details, supplier contact info, and timestamped dispatch notes.',
        'Click "📦 Verify Site Delivery" once the truck arrives on site to inspect quantities and settle payment.'
      ],
      result: 'Real-time timeline tracking delivery vehicles, estimated time of arrival (ETA), and direct links to GST tax invoices.',
      example: 'Tracking Order #BA-JT75 shows stage 5 (Delivered) at Green Valley Villa with recovery engine audit details.',
      notes: 'Delivered orders can be settled directly through the Site Delivery Verification module with automated adjustments for damaged or short items.'
    },

    gstInvoice: {
      title: 'Official GST Tax Invoice Generator',
      category: 'Financial Compliance',
      what: 'Generates professional, audit-compliant Indian GST Tax Invoices (Form GST INV-1) with HSN codes, SGST/CGST breakdowns, reverse charge declarations, and printable layouts.',
      steps: [
        'Click "View GST Tax Invoice & Receipt" on any confirmed or delivered order card.',
        'Review the bill-to and ship-to addresses, buyer GSTIN, supplier GSTIN, and unique Tax Invoice Number.',
        'Inspect itemized line items with canonical HSN codes (e.g., HSN 2523 for cement, HSN 7214 for TMT steel), taxable amounts, CGST (9%), and SGST (9%).',
        'Verify delivery freight charges, round-off adjustments, and net payable amount in words.',
        'Click "🖨️ Print / Save as PDF" to print or export the official invoice for GST input tax credit (ITC) filing.'
      ],
      result: 'Printable, audit-ready Indian GST Tax Invoice complete with supplier digital authorization and authorized signatory stamp.',
      example: 'Invoice #INV-202610-0042 generates a compliant bill of ₹1,06,125 with ₹8,093.43 CGST and ₹8,093.43 SGST itemized by HSN.',
      notes: 'When site delivery discrepancies are recorded, revised invoices automatically reflect the corrected taxable value and credit note reference.'
    },

    calculator: {
      title: 'Construction Material & Cost Calculator',
      category: 'Estimation Tools',
      what: 'Civil engineering quantity estimation calculator that computes cement, sand, aggregate, brick, and paint requirements based on built-up area and structural specifications.',
      steps: [
        'Select the construction type: Residential Villa, Commercial Building, Boundary Wall, or Flooring/Plastering.',
        'Enter the built-up area in square feet (e.g., 1,500 sq ft) and number of storeys/floors.',
        'Choose the concrete grade specification (e.g., M20 nominal mix 1:1.5:3 or M25 mix).',
        'Review the auto-calculated Bill of Quantities showing cement bags, TMT steel metric tonnes, sand cft, and coarse aggregates.',
        'Click "Transfer Quantities to Material Planner" to immediately load the estimates into the procurement optimizer.'
      ],
      result: 'Precise engineering quantity take-offs with indicative material budget estimates adhering to IS 456 Indian Standard benchmarks.',
      example: 'A 1,200 sq ft residential slab calculation determines 480 bags of cement, 4.2 MT steel, and 1,800 cft sand with an estimated material spend of ₹6,20,000.',
      notes: 'Standard thumb-rules include 5% normal cutting/bending allowance for rebar and 3% handling margin for bagged cement.'
    },

    voicePlanner: {
      title: 'AI Voice Material Planner',
      category: 'Voice Input',
      what: 'Natural language speech recognition interface supporting English, Tamil, and Tanglish (Tamil-English blend) for rapid, hands-free material quantity input on construction jobsites.',
      steps: [
        'Select your preferred language dialect (Tanglish, Tamil தமிழ், or English) from the header selector.',
        'Click the "🎙️ Voice Command" button to activate speech listening.',
        'Speak your material requirements naturally (e.g., "50 bags cement and 200 kg steel venum").',
        'If you specify only a category and quantity (e.g. "cement 100 bags"), a selection modal pops up listing all catalogue cement brands so you can choose the exact product.',
        'Review the transcribed command and parsed material lines, then click "Add to Plan".'
      ],
      result: 'Voice utterances are instantly converted into structured material rows inside the Smart Material Planner with exact product IDs and quantities.',
      example: 'Speaking "Ultratech 43 cement 80 bags" automatically selects SKU bb_cem_001, fills 80 bags, and appends the row to your active requirement form.',
      notes: 'Uses browser Web Speech API with built-in phonetics fallback for Tamil numbers (e.g., nooru, aayiram) and colloquial terms.'
    },

    passport: {
      title: 'Material Passport & Green Compliance',
      category: 'Sustainability & Specs',
      what: 'Digital product passport detailing technical specifications, IS certification codes, environmental product declarations (EPD), carbon footprint (embodied CO2), and recyclability metrics.',
      steps: [
        'Click "📋 Specs" on any material card in the catalogue or order summary.',
        'Inspect the Technical Properties tab for compressive strength, tensile yield, grade standards, and packaging dimensions.',
        'Review the Circularity & Green Score tab for embodied carbon (kg CO2e/kg), recycled content %, and GreenPro / GRIHA compliance.',
        'Check testing requirements and recommended IS sampling standards before placing site orders.',
        'Download the material specification sheet for project documentation and LEED/IGBC green building audits.'
      ],
      result: 'Comprehensive technical and environmental pedigree for the selected building material, verifying standards compliance.',
      example: 'UltraTech OPC 43 passport confirms IS 269:2015 certification, 43 N/mm2 28-day strength, and 820 kg CO2/tonne embodied carbon.',
      notes: 'Green building certifiers require verified EPD certificates; materials with high fly-ash or slag content earn bonus circularity points.'
    },

    compare: {
      title: 'Multi-Product Comparison Matrix',
      category: 'Decision Intelligence',
      what: 'Side-by-side technical and commercial comparison tool evaluating up to 4 competing construction materials across price, strength grade, supplier availability, and lead times.',
      steps: [
        'Click the "⚖️" comparison button on 2 or more products across the catalogue.',
        'Open the Comparison Drawer at the bottom of the screen or click "Compare Selected Materials".',
        'Compare key attributes in the matrix: Unit Rate, Supplier, Brand, IS Standard, Pack Size, and Minimum Order Quantity (MOQ).',
        'Highlight differences with one click to easily spot the highest strength or lowest cost alternative.',
        'Click "Select This Material" to directly swap it into your active planning list.'
      ],
      result: 'Structured tabular comparison facilitating objective material selection for architects, structural engineers, and cost consultants.',
      example: 'Comparing UltraTech OPC 53 (₹425/bag, 53 N/mm2) vs Dalmia DSP Weather-Proof (₹415/bag) highlights Dalmia\'s water-repellent additive benefits for basement slabs.',
      notes: 'Comparisons can be saved to your browser session or printed for client specification reviews.'
    },

    shortlists: {
      title: 'Quick Sourcing Shortlists',
      category: 'Productivity',
      what: 'Personalized bookmarking and procurement shortlist manager allowing contractors to organize materials by work package (e.g., Substructure, Brickwork, Finishes).',
      steps: [
        'Click the "♡" shortlist heart icon on any material card in the catalogue.',
        'Open the Shortlists manager from the navigation bar or header shortcut.',
        'Assign shortlists to specific construction projects or trade packages (e.g., "Villa Phase 1 Flooring").',
        'Monitor price changes or stock movements across your shortlisted items.',
        'Click "Add All to Planner" to immediately load all shortlisted lines into a bulk procurement order.'
      ],
      result: 'Organized material library tailored to your upcoming site phases, accelerating repetitive requisition workflows.',
      example: 'A contractor shortlists 6 tile patterns and 3 adhesive compounds for client selection meetings before finalizing the purchase order.',
      notes: 'Shortlists persist across browser sessions in local storage and can be exported as an itemized Bill of Quantities.'
    },

    visualizer: {
      title: 'Interactive 3D Room Color Visualizer',
      category: 'Architectural Visualization',
      what: 'Interactive photorealistic room finish studio rendering real paint colors, floor tiles, and wood laminates in living spaces with natural and warm lighting simulation.',
      steps: [
        'Select the target room surface: ▦ Floor tiles, ◫ Wall paint, or ▤ Wood panels.',
        'Browse and click available catalogue finish swatches to instantly tint the room render.',
        'Use the Custom Paint Color picker to test any custom hex shade on the walls.',
        'Toggle "☀️ Natural / Warm lighting" to examine how day vs evening lighting affects color warmth.',
        'Click "Find suppliers for this finish →" to immediately locate local Vellore suppliers stocking the chosen material.'
      ],
      result: 'Instant photorealistic visual preview of interior finishes, preventing expensive on-site color disputes with clients.',
      example: 'Selecting Asian Paints Royale Luxury Emulsion (Soft Ivory) on walls paired with Oak LVT Flooring renders a modern warm living room concept.',
      notes: 'Visual previews use realistic lighting blend modes; physical paint samples should still be tested on a 1x1m test patch under ambient site light.'
    },

    logisticsMap: {
      title: 'Regional Supplier Logistics Map',
      category: 'Geographic Intelligence',
      what: 'Interactive geospatial map locating verified Vellore construction material depots, transit routes, and haulage distances to your jobsites.',
      steps: [
        'Open the Local Supplier Network section or click "⌖ View map".',
        'Filter suppliers by material focus (Steel & cement, Plywood & timber, or Multi-category).',
        'Click on any listed supplier (e.g., Lakshmi Steel, Pandian Ply) to highlight their published depot location.',
        'Review delivery radius coverage, transport lead times, and minimum dispatch truck capacities.',
        'Click "Open in Google Maps ↗" for live turn-by-turn navigation or dispatch truck tracking.'
      ],
      result: 'Clear spatial visibility of regional suppliers, enabling contractors to minimize transit times and reduce diesel haulage surcharges.',
      example: 'Locating Babu Agencies in Rangapuram confirms a 4.2 km transport run to Katpadi sites with an estimated 45-minute delivery window.',
      notes: 'Suppliers within a 10 km radius qualify for standard delivery rates; extended transit beyond 15 km incurs incremental per-km freight fees.'
    },

    delivery: {
      title: 'Site Delivery Verification & Discrepancy Settlements',
      category: 'Site Operations Hub',
      what: 'On-site gate inspection tool that records physical deliveries, verifies ordered vs received quantities, logs damaged goods, calculates revised payable amounts, and settles payments.',
      steps: [
        'When a supplier truck arrives at the jobsite, click "+ Record Delivery Verification".',
        'Select the corresponding Purchase Order from the dropdown; ordered lines, quantities, and agreed rates auto-populate.',
        'Enter Actual Received Quantity and Damaged Quantity for each material line.',
        'Inspect the live Discrepancy & Deduction Breakdown: damaged and missing items are automatically deducted from the invoice.',
        'Enter inspector notes and click "Save Verified Delivery".',
        'Click "Pay Revised Bill" on the verified delivery card to settle the exact net payable amount with zero contractor math errors.'
      ],
      result: 'An immutable delivery verification audit, automatically updated supplier reliability score, revised GST invoice, and settled payment log.',
      example: 'On an order of 100 cement bags at ₹395, 2 bags arrive torn. The payable amount automatically updates from ₹39,500 to ₹38,710, deducting ₹790.',
      notes: 'Supplier reliability scores update dynamically based on on-time delivery percentage and verified quantity accuracy.'
    },

    weather: {
      title: 'Monsoon-Aware Weather Forecast & Pour-Risk Advisor',
      category: 'Site Operations Hub',
      what: 'Live meteorological intelligence powered by Open-Meteo API, providing 7-day hourly precipitation forecasts, pour-risk indices, and preventative site protection recommendations.',
      steps: [
        'Open the "🌧️ Monsoon & Pour Advisor" tab inside the Site Procurement Hub.',
        'Review the 7-day weather cards showing daily rain accumulation in mm, precipitation chance %, and pour safety status.',
        'Inspect the Pour-Risk Safety Indicator: Green (Safe to Pour), Amber (Moderate Risk - Retarders required), Red (Critical Pour Hazard - Heavy Rain).',
        'Read actionable Monsoon Advisories: elevated cement pallet heights, 200-micron tarpaulins, and slump adjustments.',
        'If planning in the Material Planner, dynamic pour-risk notices will automatically flag deliveries scheduled on rainy days with 1-click delivery date advancement.'
      ],
      result: '7-day weather radar with proactive risk mitigations, protecting fresh concrete slabs and bulk cement bags from catastrophic monsoon damage.',
      example: 'A forecast of 32 mm heavy rainfall in 4 days flags a "Critical Pour Hazard"; clicking "Advance Delivery" safely reschedules pouring to a clear 2-day window.',
      notes: 'Concrete pouring during active rain causes cement-paste washout and structural pitting; always verify the 48-hour barometric trend before ordering ready-mix.'
    },

    surplus: {
      title: 'Inter-Site Surplus Balancer',
      category: 'Site Operations Hub',
      what: 'Multi-site inventory sharing module that balances excess materials across active construction projects, eliminating redundant buying and dead stock write-offs.',
      steps: [
        'Open the "🔄 Inter-Site Surplus Balancer" tab to view surplus inventory logged across your jobsites.',
        'Click "+ Record Surplus Stock" to register leftover materials (e.g. surplus rebar offcuts, unused cement bags from a completed slab).',
        'When a new material requirement arises, BuildAI automatically evaluates feasible inter-site transfers comparing transport costs against buying new.',
        'Review the feasibility card showing donor site, recipient site, haulage distance, and net financial savings.',
        'Click "Approve & Dispatch Transfer" to generate an inter-site transfer challan and deduct stock from the donor site.'
      ],
      result: 'Optimized stock reallocation across company jobsites with zero dead inventory and verified net savings.',
      example: 'Transferring 40 bags of OPC 43 from completed Green Valley Villa to Arcot Road Complex saves ₹13,800 after deducting ₹2,000 inter-site transport fees.',
      notes: 'Surplus transfers only draw from verified, quality-accepted batches to prevent transferring substandard or degraded materials.'
    },

    quality: {
      title: 'Material Quality & Batch Traceability',
      category: 'Site Operations Hub',
      what: 'Quality compliance and batch tracking system that records material grades, lot numbers, mill test certificates, and physical inspection checklists before stock release.',
      steps: [
        'Click "+ Record New Material Batch" in the Quality & Traceability dashboard.',
        'Select Construction Site, Supplier, and optionally the Related Delivery / Purchase Order (auto-populates materials and quantities).',
        'Verify Material Category, Product Name, Grade/Specification, and enter the physical Batch or Lot Number from the packaging.',
        'Complete the 6-point Quality Checklist: Packaging condition, Grade label match, Batch readability, Physical condition, Test certificate availability, and Quantity verified.',
        'Attach the Mill Test Certificate (MTC) or third-party NABL lab report (PDF, JPG, PNG up to 10 MB).',
        'Record the Inspector Name and select the final Quality Decision: Accept Material, Reject Material, or Quarantine Material.',
        'Click "Save Batch Record" to persist. Accepted batches immediately create usable stock available for consumption and surplus balancing.'
      ],
      result: 'An immutable batch pedigree record, traceable stock balance, and verified quality documentation ready for structural audits.',
      example: 'UltraTech OPC 43 batch UT-VLR-43-9821 is inspected, MTC uploaded, all 6 checks passed, and marked "Accepted", adding 150 bags to usable site stock.',
      notes: 'Rejected materials require mandatory failure reasons and are quarantined from site work packages. Quarantined batches cannot be issued until supporting test reports are approved.'
    },

    consumption: {
      title: 'Material Consumption & Wastage Tracker',
      category: 'Site Operations Hub',
      what: 'Work package material tracker that logs planned vs actual quantities issued, records unused returns, quantifies wastage, highlights >5% variance alerts, and deducts stock from accepted batches.',
      steps: [
        'Click "+ Record Material Consumption" in the Consumption & Wastage dashboard.',
        'Select Construction Site, Activity/Task Name (e.g., Raft Foundation Concreting), Location on Site, Date, and Engineer in-charge.',
        'Choose the Material and select the source Quality Batch from the dropdown (only Accepted batches with available stock appear).',
        'Enter Planned Quantity (BOQ estimate), Quantity Issued to the work crew, Unused Material Returned to stores, and Recorded Wastage/Scrap.',
        'Watch the Live Calculation summary update in real time: Net Consumed = Issued - Returned; Productive = Net - Wastage; Variance % and Wastage % are computed instantly.',
        'If Wastage % exceeds the 5% alert threshold, a high-wastage warning banner appears; select the primary Wastage Reason and enter a Prevention Note.',
        'Click "Save Consumption Record". The Net Consumption is automatically deducted from the source batch stock balance!',
        'Click "📥 Export Consumption CSV" to export complete records for cost audits and project reporting.'
      ],
      result: 'Complete accountability of material utilization per task, automatic stock deduction, actionable wastage reduction insights, and CSV export for project accounting.',
      example: 'Planned: 100 bags, Issued: 108 bags, Returned: 3 bags, Wastage: 5 bags -> Net Consumption: 105 bags, Productive: 100 bags, Variance: +5 bags (5.0%), Wastage: 4.76% (Normal). Batch stock reduces by 105 bags.',
      notes: 'Recorded wastage is already accounted inside Net Consumption (never double-counted). Use "📥 Export Consumption CSV" to download audit reports for cost management.'
    }
  };

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Helper to render the collapsible help drawer
  function renderHelpDrawerHtml(key) {
    const data = HELP_REGISTRY[key];
    if (!data) return '';

    return `
      <div class="bai-help-wrapper" data-help-feature="${key}">
        <button type="button" class="bai-help-btn" onclick="window.BuildAIHelp.toggle('${key}')" aria-expanded="false" title="Click to view comprehensive user instructions for ${escapeHtml(data.title)}">
          <span class="bai-help-btn-icon">ⓘ</span>
          <span class="bai-help-btn-text">How to use this feature</span>
          <span class="bai-help-chevron">▼</span>
        </button>

        <div class="bai-help-panel" id="bai-help-${key}" hidden>
          <div class="bai-help-card">
            <div class="bai-help-header">
              <div>
                <span class="bai-help-pill">${escapeHtml(data.category)}</span>
                <h4 class="bai-help-title">${escapeHtml(data.title)}</h4>
              </div>
              <button type="button" class="bai-help-close-btn" onclick="window.BuildAIHelp.toggle('${key}')" title="Close guide">✕</button>
            </div>

            <div class="bai-help-section">
              <div class="bai-help-label">🎯 What this feature does</div>
              <p class="bai-help-text">${escapeHtml(data.what)}</p>
            </div>

            <div class="bai-help-section">
              <div class="bai-help-label">📋 Step-by-step instructions</div>
              <ol class="bai-help-steps">
                ${data.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
              </ol>
            </div>

            <div class="bai-help-grid">
              <div class="bai-help-box bai-help-box-result">
                <div class="bai-help-label">✅ Expected Result / Output</div>
                <p class="bai-help-text">${escapeHtml(data.result)}</p>
              </div>

              <div class="bai-help-box bai-help-box-example">
                <div class="bai-help-label">💡 Realistic Jobsite Example</div>
                <p class="bai-help-text">${escapeHtml(data.example)}</p>
              </div>
            </div>

            <div class="bai-help-notes">
              <b>⚠️ Important Notes &amp; Tips:</b> ${escapeHtml(data.notes)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function toggleHelp(key) {
    const panel = document.getElementById('bai-help-' + key);
    if (!panel) return;
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;

    const wrapper = panel.closest('.bai-help-wrapper') || panel.parentElement;
    if (wrapper) {
      const btn = wrapper.querySelector('.bai-help-btn');
      if (btn) {
        btn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        btn.classList.toggle('active', isHidden);
        const chev = btn.querySelector('.bai-help-chevron');
        if (chev) chev.textContent = isHidden ? '▲' : '▼';
      }
    }
  }

  // Auto-inject help buttons into static page sections
  function autoDecorateFeatures() {
    const mappings = [
      { id: 'introPage', key: 'landing', target: '.intro-section-heading', prepend: false },
      { id: 'productsSection', key: 'catalogue', target: '.section-head', prepend: false },
      { id: 'procurementSection', key: 'planner', target: '.section-head', prepend: false },
      { id: 'studioSection', key: 'visualizer', target: '.section-head', prepend: false },
      { id: 'suppliersSection', key: 'logisticsMap', target: '.section-head', prepend: false },
    ];

    mappings.forEach(m => {
      const sec = document.getElementById(m.id);
      if (!sec) return;
      if (sec.querySelector(`[data-help-feature="${m.key}"]`)) return;

      const targetEl = sec.querySelector(m.target) || sec.firstElementChild;
      if (targetEl) {
        const holder = document.createElement('div');
        holder.innerHTML = renderHelpDrawerHtml(m.key);
        if (m.prepend) {
          targetEl.parentNode.insertBefore(holder.firstElementChild, targetEl);
        } else {
          targetEl.parentNode.insertBefore(holder.firstElementChild, targetEl.nextSibling);
        }
      }
    });

    // Decorate optimization results if visible
    const optRes = document.getElementById('optimizationResults');
    if (optRes && !optRes.querySelector('[data-help-feature="optimizer"]')) {
      const card = optRes.querySelector('.optimization-card') || optRes.firstElementChild;
      if (card && !card.classList.contains('optimizer-empty')) {
        const holder = document.createElement('div');
        holder.innerHTML = renderHelpDrawerHtml('optimizer');
        card.parentNode.insertBefore(holder.firstElementChild, card);
      }
    }
  }

  // Dynamic observer for modal dialogs across BuildBuy AI
  function setupModalObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;

          // 1. Order Tracking Modal
          if (node.classList && (node.classList.contains('buyer-request-dialog') || node.querySelector('.buyer-request-dialog'))) {
            const dlg = node.classList.contains('buyer-request-dialog') ? node : node.querySelector('.buyer-request-dialog');
            if (dlg && !dlg.classList.contains('invoice-dialog') && !dlg.classList.contains('compare-dialog') && !dlg.classList.contains('shortlist-dialog') && !dlg.classList.contains('calc-dialog')) {
              if (!dlg.querySelector('[data-help-feature="orderTracking"]')) {
                const header = dlg.firstElementChild;
                if (header) {
                  const holder = document.createElement('div');
                  holder.innerHTML = renderHelpDrawerHtml('orderTracking');
                  header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
                }
              }
            }
          }

          // 2. GST Tax Invoice Modal
          if (node.classList && (node.classList.contains('invoice-dialog') || node.querySelector('.invoice-dialog'))) {
            const dlg = node.classList.contains('invoice-dialog') ? node : node.querySelector('.invoice-dialog');
            if (dlg && !dlg.querySelector('[data-help-feature="gstInvoice"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('gstInvoice');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 3. Material Quantity Calculator Modal
          if (node.id === 'materialCalculatorModal' || node.querySelector('.calc-dialog')) {
            const dlg = node.querySelector('.calc-dialog') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="calculator"]')) {
              const header = dlg.querySelector('.buyer-request-header') || dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('calculator');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 4. Comparison Modal
          if (node.querySelector('.compare-dialog') || (node.classList && node.classList.contains('compare-dialog'))) {
            const dlg = node.querySelector('.compare-dialog') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="compare"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('compare');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 5. Shortlists Modal
          if (node.querySelector('.shortlist-dialog') || (node.classList && node.classList.contains('shortlist-dialog'))) {
            const dlg = node.querySelector('.shortlist-dialog') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="shortlists"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('shortlists');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 6. Failure Recovery Modal
          if (node.querySelector('.recovery-dialog') || (node.classList && node.classList.contains('recovery-dialog'))) {
            const dlg = node.querySelector('.recovery-dialog') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="recovery"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('recovery');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 7. Voice Planner Modal
          if (node.id === 'vModalRoot' || node.querySelector('#vStatusTitle') || node.id === 'voiceModal') {
            const dlg = node.querySelector('.voice-modal-card') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="voicePlanner"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('voicePlanner');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }

          // 8. Material Passport
          if (node.querySelector('.passport-dialog') || (node.classList && node.classList.contains('passport-dialog')) || node.id === 'passportModal') {
            const dlg = node.querySelector('.passport-dialog') || node;
            if (dlg && !dlg.querySelector('[data-help-feature="passport"]')) {
              const header = dlg.firstElementChild;
              if (header) {
                const holder = document.createElement('div');
                holder.innerHTML = renderHelpDrawerHtml('passport');
                header.parentNode.insertBefore(holder.firstElementChild, header.nextSibling);
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Public BuildAI Help API
  window.BuildAIHelp = {
    get: (key) => HELP_REGISTRY[key],
    render: (key) => renderHelpDrawerHtml(key),
    toggle: toggleHelp,
    autoDecorate: autoDecorateFeatures
  };

  function initHelpSystem() {
    autoDecorateFeatures();
    setupModalObserver();
    window.addEventListener('load', autoDecorateFeatures);
    document.addEventListener('click', () => setTimeout(autoDecorateFeatures, 150));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelpSystem);
  } else {
    initHelpSystem();
  }

})();
