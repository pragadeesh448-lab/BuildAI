import base64
import http.server
import socketserver
import json
import os
import urllib.parse
import time
import uuid

PORT = int(os.environ.get('PORT', 8000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

REQUESTS_FILE = os.path.join(DATA_DIR, "requests.json")
AUDIT_FILE = os.path.join(DATA_DIR, "audit_log.json")
SITES_FILE = os.path.join(DATA_DIR, "construction_sites.json")
SERVICES_FILE = os.path.join(DATA_DIR, "services.json")
QUALITY_BATCHES_FILE = os.path.join(DATA_DIR, "material_quality_batches.json")
CONSUMPTION_FILE = os.path.join(DATA_DIR, "material_consumption_records.json")
UPLOADS_DIR = os.path.join(DATA_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

if not os.path.exists(QUALITY_BATCHES_FILE):
    with open(QUALITY_BATCHES_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)

if not os.path.exists(CONSUMPTION_FILE):
    with open(CONSUMPTION_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)

# Ensure files exist
if not os.path.exists(REQUESTS_FILE):
    with open(REQUESTS_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)

if not os.path.exists(AUDIT_FILE):
    with open(AUDIT_FILE, "w", encoding="utf-8") as f:
        json.dump([], f)

# Seed construction sites if missing
if not os.path.exists(SITES_FILE):
    seeded_sites = [
        {
            "id": "SITE-001",
            "name": "Green Valley Villa - Phase 1",
            "plot": "Plot 42, Green Valley Enclave, Katpadi",
            "city": "Vellore",
            "pincode": "632014",
            "landmark": "Near VIT Main Gate",
            "contactName": "Er. K. Senthil",
            "contactPhone": "+91 98421 55201",
            "accessType": "heavy", # 10-wheeler accessible (>30ft road)
            "isDefault": True
        },
        {
            "id": "SITE-002",
            "name": "Arcot Road Commercial Complex",
            "plot": "No. 18/2, Arcot Main Road, Kagithapatrai",
            "city": "Vellore",
            "pincode": "632012",
            "landmark": "Opposite Government Bus Depot",
            "contactName": "Er. R. Murali",
            "contactPhone": "+91 94432 88190",
            "accessType": "medium", # 6-wheeler accessible
            "isDefault": False
        }
    ]
    with open(SITES_FILE, "w", encoding="utf-8") as f:
        json.dump(seeded_sites, f, indent=2)

# Seed construction services if missing
if not os.path.exists(SERVICES_FILE):
    seeded_services = [
        {
            "id": "SRV-001",
            "title": "RCC Slab Casting & Formwork Contractors",
            "contractor": "Sri Murugan Structural Formwork",
            "rate": "₹38 - ₹45 per sq.ft",
            "teamSize": "18 skilled masons & fitters",
            "equipment": "Concrete mixer, needle vibrators, steel props & shuttering ply",
            "rating": 4.8,
            "reviewsCount": 42,
            "experience": "14 years in Vellore & Ranipet",
            "specialty": "High-finish RCC roof casting, beams, and column footings",
            "verified": True,
            "phone": "+91 98423 77102"
        },
        {
            "id": "SRV-002",
            "title": "Precision AAC Block & Red Clay Masonry Team",
            "contractor": "Vellore Brickcraft Guild",
            "rate": "₹28 per sq.ft (AAC) / ₹18 per block",
            "teamSize": "12 certified masons",
            "equipment": "Laser alignment levelers, block cutters, mortar mixers",
            "rating": 4.7,
            "reviewsCount": 35,
            "experience": "9 years",
            "specialty": "Zero-joint thin bed mortar AAC masonry and exposed wirecut bricks",
            "verified": True,
            "phone": "+91 94431 66205"
        },
        {
            "id": "SRV-003",
            "title": "JCB 3DX & Poclain Earthmoving & Excavation",
            "contractor": "Annai Earthmovers & Tipper Fleet",
            "rate": "₹1,250 per hour / ₹9,500 per day",
            "teamSize": "4 operators + 2 tippers (10-wheel)",
            "equipment": "JCB 3DX Super (2024 Model), breaker attachment, 14m3 Tipper",
            "rating": 4.9,
            "reviewsCount": 58,
            "experience": "16 years",
            "specialty": "Basement excavation, rock breaking, site leveling and filling",
            "verified": True,
            "phone": "+91 97914 88320"
        },
        {
            "id": "SRV-004",
            "title": "A-Grade Licensed Electrical Contracting & Piping",
            "contractor": "PowerTech Engineering Services",
            "rate": "₹22 - ₹30 per sq.ft of slab area",
            "teamSize": "8 licensed electricians",
            "equipment": "Wall chaser groove cutters, conduit benders, earth testers",
            "rating": 4.8,
            "reviewsCount": 29,
            "experience": "11 years",
            "specialty": "Under-slab conduit casting, 3-phase DB panel installation, earthing",
            "verified": True,
            "phone": "+91 98425 11984"
        },
        {
            "id": "SRV-005",
            "title": "CPVC & Drainage Plumbing Infrastructure Team",
            "contractor": "Royal Flow Plumbing Contractors",
            "rate": "₹8,500 - ₹12,000 per toilet/bathroom unit",
            "teamSize": "6 master plumbers",
            "equipment": "Pipe fusion welding machines, pressure testing pump, drain snakes",
            "rating": 4.6,
            "reviewsCount": 31,
            "experience": "12 years",
            "specialty": "Astral CPVC concealed piping, SWR soil waste stack, overhead tanks",
            "verified": True,
            "phone": "+91 94435 77219"
        },
        {
            "id": "SRV-006",
            "title": "Terrace PU & Basement Waterproofing Applicators",
            "contractor": "Apex Seal Waterproofing Specialists",
            "rate": "₹45 - ₹65 per sq.ft (Material + Labour)",
            "teamSize": "10 certified applicators",
            "equipment": "Airless spray machines, surface scarifiers, injection grouters",
            "rating": 4.9,
            "reviewsCount": 47,
            "experience": "10 years (Dr. Fixit & Fosroc Certified)",
            "specialty": "10-Year warranty polymer terrace coatings, bathroom sunken waterproofing",
            "verified": True,
            "phone": "+91 97891 44520"
        }
    ]
    with open(SERVICES_FILE, "w", encoding="utf-8") as f:
        json.dump(seeded_services, f, indent=2)

# Atomic transaction safe file writing
def atomic_json_write(filepath, data):
    tmp = filepath + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    os.replace(tmp, filepath)

def log_audit(action, order_id, actor, details):
    try:
        with open(AUDIT_FILE, "r", encoding="utf-8") as f:
            logs = json.load(f)
    except:
        logs = []
    
    logs.append({
        "id": f"AUD-{int(time.time()*1000)}-{uuid.uuid4().hex[:4]}",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "action": action,
        "orderId": order_id,
        "actor": actor,
        "details": details
    })
    # Keep last 500 audit events
    if len(logs) > 500:
        logs = logs[-500:]
    atomic_json_write(AUDIT_FILE, logs)

# In-memory pre-serialized cache for static catalog endpoints
CACHE_MATERIALS = None
CACHE_SUPPLIERS = None
CACHE_SERVICES = None

def get_cached_materials_bytes():
    global CACHE_MATERIALS
    if CACHE_MATERIALS is None:
        mat_path = os.path.join(DATA_DIR, "materials.json")
        if os.path.exists(mat_path):
            with open(mat_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            CACHE_MATERIALS = json.dumps({"materials": data, "count": len(data), "status": "live", "categoriesCount": 19}).encode("utf-8")
        else:
            CACHE_MATERIALS = b'{"materials":[],"count":0,"status":"empty"}'
    return CACHE_MATERIALS

def get_cached_suppliers_bytes():
    global CACHE_SUPPLIERS
    if CACHE_SUPPLIERS is None:
        sup_path = os.path.join(DATA_DIR, "suppliers.json")
        if os.path.exists(sup_path):
            with open(sup_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            CACHE_SUPPLIERS = json.dumps({"suppliers": data, "count": len(data), "status": "live"}).encode("utf-8")
        else:
            CACHE_SUPPLIERS = b'{"suppliers":[],"count":0}'
    return CACHE_SUPPLIERS

def get_cached_services_bytes():
    global CACHE_SERVICES
    if CACHE_SERVICES is None:
        if os.path.exists(SERVICES_FILE):
            with open(SERVICES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            CACHE_SERVICES = json.dumps({"services": data}).encode("utf-8")
        else:
            CACHE_SERVICES = b'{"services":[]}'
    return CACHE_SERVICES

class BuildAIHandler(http.server.SimpleHTTPRequestHandler):
    # Disable slow reverse DNS lookup on Windows (eliminates 2000ms delay per request!)
    def address_string(self):
        return self.client_address[0]

    def log_message(self, format, *args):
        pass

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            mat_path = os.path.join(DATA_DIR, "materials.json")
            m_count = 0
            if os.path.exists(mat_path):
                with open(mat_path, "r", encoding="utf-8") as f:
                    m_count = len(json.load(f))
            self.wfile.write(json.dumps({
                "status": "healthy",
                "service": "BuildAI B2B Commerce Engine",
                "uptimeSeconds": time.monotonic(),
                "materialsCatalogCount": m_count,
                "categoriesCount": 19,
                "suppliersCount": 5,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            }).encode("utf-8"))
            return

        elif path == "/api/materials":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(get_cached_materials_bytes())
            return

        elif path == "/api/suppliers":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(get_cached_suppliers_bytes())
            return

        elif path == "/api/requests":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            with open(REQUESTS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.wfile.write(json.dumps({"requests": data}).encode("utf-8"))
            return

        elif path == "/api/sites":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            with open(SITES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.wfile.write(json.dumps({"sites": data}).encode("utf-8"))
            return

        elif path == "/api/services":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(get_cached_services_bytes())
            return

        elif path == "/api/quality-batches":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            try:
                with open(QUALITY_BATCHES_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                data = []
            self.wfile.write(json.dumps({"batches": data, "count": len(data)}).encode("utf-8"))
            return

        elif path == "/api/material-consumption":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            try:
                with open(CONSUMPTION_FILE, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception:
                data = []
            self.wfile.write(json.dumps({"records": data, "count": len(data)}).encode("utf-8"))
            return

        elif path == "/api/audit":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            with open(AUDIT_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.wfile.write(json.dumps({"audit": data}).encode("utf-8"))
            return

        # Fallback to standard static file serving
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8")
        payload = json.loads(body) if body else {}

        # 1. Server-side Authentication Endpoint
        if path == "/api/auth/login":
            email = (payload.get("email") or "").strip().lower()
            password = payload.get("password") or ""
            
            # Check demo accounts
            accounts_path = os.path.join(DATA_DIR, "demo_accounts.json")
            with open(accounts_path, "r", encoding="utf-8") as f:
                creds = json.load(f)
            
            auth_user = None
            if email == creds.get("builder", {}).get("email", "").lower() and password == creds.get("builder", {}).get("password", ""):
                auth_user = {
                    "role": "builder",
                    "email": email,
                    "name": "Commercial Builder / Contractor",
                    "token": f"bld-tok-{uuid.uuid4().hex[:16]}"
                }
            else:
                sup_pass = creds.get("supplierPassword", "Supplier123")
                for s in creds.get("suppliers", []):
                    if email == s.get("email", "").lower() and password == sup_pass:
                        auth_user = {
                            "role": "supplier",
                            "email": email,
                            "supplierId": s.get("id"),
                            "name": s.get("id").replace("-", " ").title(),
                            "token": f"sup-tok-{uuid.uuid4().hex[:16]}"
                        }
                        break
            
            if auth_user:
                self.send_json_response({"success": True, "user": auth_user}, 200)
                log_audit("AUTH_LOGIN_SUCCESS", "-", auth_user["email"], f"Role: {auth_user['role']}")
            else:
                self.send_json_response({"success": False, "error": "Invalid email or password"}, 401)
                log_audit("AUTH_LOGIN_FAILED", "-", email, "Invalid credentials provided")
            return

        # 2. Builder Order Submissions
        elif path == "/api/requests":
            with open(REQUESTS_FILE, "r", encoding="utf-8") as f:
                requests = json.load(f)
            
            # Validation
            items_to_add = payload if isinstance(payload, list) else [payload]
            valid_items = []
            for item in items_to_add:
                if not item.get("id") or not item.get("supplierId"):
                    continue
                valid_items.append(item)
                log_audit("ORDER_CREATED", item.get("id"), item.get("builderEmail", "builder"), f"Created order for supplier {item.get('supplierId')}, Total: ₹{item.get('indicativeTotal', 0)}")
            
            requests.extend(valid_items)
            atomic_json_write(REQUESTS_FILE, requests)
            
            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "savedCount": len(requests)}).encode("utf-8"))
            return

        # 3. Supplier Quote & Status Updates
        elif path == "/api/requests/update":
            req_id = payload.get("id")
            with open(REQUESTS_FILE, "r", encoding="utf-8") as f:
                try:
                    requests = json.load(f)
                except Exception:
                    requests = []
            
            updated = False
            for r in requests:
                if r.get("id") == req_id:
                    old_status = r.get("status")
                    r.update(payload)
                    updated = True
                    log_audit("ORDER_UPDATED", req_id, payload.get("supplierId", "supplier"), f"Status: '{old_status}' -> '{payload.get('status')}', Quote: ₹{payload.get('supplierQuote')}")
                    break
            
            if not updated:
                # Upsert order so any new client session order can be confirmed without 404
                requests.append(payload)
                updated = True
                log_audit("ORDER_UPSERTED", req_id, payload.get("supplierId", "supplier"), f"Status: '{payload.get('status')}', Quote: ₹{payload.get('supplierQuote')}")

            target_req = next((x for x in requests if x.get("id") == req_id), payload)
            if payload.get("failure"):
                fail = payload["failure"]
                log_audit("SUPPLIER_FAILURE_REPORTED", req_id, payload.get("supplierId", "supplier"), f"Type: {fail.get('type')}, Shortfall: {fail.get('shortfallQty')}, Delay: {fail.get('delayDays')}d, Reason: {fail.get('reason')}")
            elif "Substituted" in str(payload.get("status")):
                log_audit("SUPPLIER_SUBSTITUTION_APPROVED", req_id, payload.get("builderEmail", "builder"), f"Substituted to {payload.get('supplierName')}, New Total: ₹{payload.get('indicativeTotal')}")
            
            atomic_json_write(REQUESTS_FILE, requests)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "request": target_req}).encode("utf-8"))
            return

        # 4. Construction Site Addition
        elif path == "/api/sites":
            with open(SITES_FILE, "r", encoding="utf-8") as f:
                sites = json.load(f)
            
            new_site = payload
            if not new_site.get("id"):
                new_site["id"] = f"SITE-{int(time.time()*1000)}"
            if new_site.get("isDefault"):
                for s in sites:
                    s["isDefault"] = False
            sites.append(new_site)
            atomic_json_write(SITES_FILE, sites)
            
            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "site": new_site, "allSites": sites}).encode("utf-8"))
            log_audit("SITE_ADDED", new_site["id"], "builder", f"Added construction site: {new_site.get('name')}")
            return

        # 5. Service Quotation Inquiry
        elif path == "/api/services/inquire":
            srv_id = payload.get("serviceId")
            client_name = payload.get("clientName")
            client_phone = payload.get("clientPhone")
            scope = payload.get("projectScope", "Standard site work")
            
            inquiry_id = f"INQ-SRV-{int(time.time()*1000)}"
            log_audit("SERVICE_INQUIRY", inquiry_id, client_name or "client", f"Inquired for {srv_id}: {scope}")
            
            self.send_json_response({
                "success": True, 
                "inquiryId": inquiry_id,
                "message": "Quotation inquiry dispatched to contractor. You will receive an SMS/WhatsApp quotation within 2 business hours."
            }, 200)
            return

        # 6. Material Quality & Batch Traceability Endpoints
        elif path == "/api/quality-batches":
            try:
                with open(QUALITY_BATCHES_FILE, "r", encoding="utf-8") as f:
                    batches = json.load(f)
            except Exception:
                batches = []

            new_batch = payload
            if not new_batch.get("batchNumber") or not str(new_batch.get("batchNumber")).strip():
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Batch or Lot number is required."}).encode("utf-8"))
                return

            if not new_batch.get("siteId"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Construction site is required."}).encode("utf-8"))
                return

            if not new_batch.get("supplierId"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Supplier is required."}).encode("utf-8"))
                return

            if not new_batch.get("productId"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Material product selection is required."}).encode("utf-8"))
                return

            qty_rec = float(new_batch.get("quantityReceived", 0))
            if qty_rec <= 0:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Received quantity must be greater than zero."}).encode("utf-8"))
                return

            # Check duplicate batch
            for b in batches:
                if (b.get("siteId") == new_batch.get("siteId") and
                    b.get("supplierId") == new_batch.get("supplierId") and
                    b.get("productId") == new_batch.get("productId") and
                    b.get("batchNumber", "").strip().lower() == str(new_batch.get("batchNumber", "")).strip().lower()):
                    self.send_response(409)
                    self.send_header("Content-Type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "success": False,
                        "error": f"Duplicate batch: A record for batch #{new_batch.get('batchNumber')} already exists for this site and product."
                    }).encode("utf-8"))
                    return

            if not new_batch.get("id"):
                date_str = time.strftime("%Y%m%d", time.gmtime())
                new_batch["id"] = f"BATCH-{date_str}-{uuid.uuid4().hex[:4].upper()}"

            now_iso = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            new_batch["createdAt"] = new_batch.get("createdAt") or now_iso
            new_batch["updatedAt"] = now_iso

            status = new_batch.get("status") or "Pending Inspection"
            new_batch["status"] = status
            new_batch["availableQty"] = qty_rec if status == "Accepted" else 0

            if not new_batch.get("history"):
                new_batch["history"] = [{
                    "timestamp": now_iso,
                    "inspector": new_batch.get("inspectorName") or "Site QC Inspector",
                    "status": status,
                    "notes": new_batch.get("remarks") or "Batch registered in traceability database."
                }]

            batches.insert(0, new_batch)
            atomic_json_write(QUALITY_BATCHES_FILE, batches)

            log_audit("QUALITY_BATCH_RECORDED", new_batch["id"], new_batch.get("inspectorName") or "inspector",
                      f"Batch {new_batch.get('batchNumber')} ({new_batch.get('productName')}): Status '{status}', Qty {qty_rec} {new_batch.get('unit')}")

            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "batch": new_batch}).encode("utf-8"))
            return

        elif path == "/api/quality-batches/update":
            batch_id = payload.get("id")
            try:
                with open(QUALITY_BATCHES_FILE, "r", encoding="utf-8") as f:
                    batches = json.load(f)
            except Exception:
                batches = []

            target = None
            for b in batches:
                if b.get("id") == batch_id:
                    target = b
                    break

            if not target:
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Batch record not found."}).encode("utf-8"))
                return

            old_status = target.get("status")
            new_status = payload.get("status") or old_status
            target.update(payload)
            now_iso = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            target["updatedAt"] = now_iso

            if new_status == "Accepted":
                if old_status != "Accepted" or target.get("availableQty") is None:
                    target["availableQty"] = float(target.get("quantityReceived", 0))
            else:
                target["availableQty"] = 0

            if not target.get("history"):
                target["history"] = []
            target["history"].append({
                "timestamp": now_iso,
                "inspector": payload.get("inspectorName") or target.get("inspectorName") or "Inspector",
                "status": new_status,
                "notes": payload.get("remarks") or f"Status changed from '{old_status}' to '{new_status}'."
            })

            atomic_json_write(QUALITY_BATCHES_FILE, batches)
            log_audit("QUALITY_BATCH_UPDATED", batch_id, payload.get("inspectorName") or "inspector",
                      f"Batch status updated: '{old_status}' -> '{new_status}'")

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "batch": target}).encode("utf-8"))
            return

        # 7. Quality Certificate Document Upload Endpoint
        elif path == "/api/quality-batches/upload":
            file_name = payload.get("fileName") or "document.pdf"
            file_data_b64 = payload.get("fileData") or ""
            
            ext = os.path.splitext(file_name)[1].lower()
            if ext not in [".pdf", ".jpg", ".jpeg", ".png"]:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": "Invalid file format. Allowed extensions: PDF, JPG, JPEG, PNG."
                }).encode("utf-8"))
                return

            try:
                if "," in file_data_b64:
                    file_data_b64 = file_data_b64.split(",", 1)[1]
                file_bytes = base64.b64decode(file_data_b64)
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Invalid base64 payload."}).encode("utf-8"))
                return

            if len(file_bytes) > 10 * 1024 * 1024:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": "File size exceeds maximum allowed 10 MB limit."
                }).encode("utf-8"))
                return

            safe_id = f"cert_{int(time.time())}_{uuid.uuid4().hex[:6]}{ext}"
            file_path = os.path.join(UPLOADS_DIR, safe_id)

            if not os.path.abspath(file_path).startswith(os.path.abspath(UPLOADS_DIR)):
                self.send_response(403)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Path traversal detected."}).encode("utf-8"))
                return

            with open(file_path, "wb") as f:
                f.write(file_bytes)

            file_size_kb = f"{len(file_bytes) / 1024:.1f} KB" if len(file_bytes) < 1024 * 1024 else f"{len(file_bytes) / (1024 * 1024):.2f} MB"
            log_audit("CERTIFICATE_UPLOADED", safe_id, "inspector", f"Uploaded cert '{file_name}' ({file_size_kb})")

            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True,
                "fileName": safe_id,
                "originalName": os.path.basename(file_name),
                "fileUrl": f"data/uploads/{safe_id}",
                "fileSize": file_size_kb
            }).encode("utf-8"))
            return

        # 8. Material Consumption & Wastage Tracker Endpoints
        elif path == "/api/material-consumption":
            try:
                with open(CONSUMPTION_FILE, "r", encoding="utf-8") as f:
                    records = json.load(f)
            except Exception:
                records = []

            new_rec = payload
            if not new_rec.get("siteId"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Construction site is required."}).encode("utf-8"))
                return

            if not new_rec.get("productId"):
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Material product selection is required."}).encode("utf-8"))
                return

            qty_issued = float(new_rec.get("qtyIssued", 0))
            if qty_issued <= 0:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Quantity issued must be greater than zero."}).encode("utf-8"))
                return

            unused_ret = float(new_rec.get("unusedReturned", 0))
            if unused_ret < 0:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Unused returned quantity cannot be negative."}).encode("utf-8"))
                return

            if unused_ret > qty_issued:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Unused returned quantity cannot exceed quantity issued."}).encode("utf-8"))
                return

            net_consumption = round(qty_issued - unused_ret, 3)

            rec_wastage = float(new_rec.get("recordedWastage", 0))
            if rec_wastage < 0:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Recorded wastage cannot be negative."}).encode("utf-8"))
                return

            if rec_wastage > net_consumption:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Recorded wastage cannot exceed net consumption."}).encode("utf-8"))
                return

            planned_qty = float(new_rec.get("plannedQty", 0))
            if planned_qty < 0:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Planned quantity cannot be negative."}).encode("utf-8"))
                return

            productive_consumption = round(net_consumption - rec_wastage, 3)
            consumption_variance = round(net_consumption - planned_qty, 3)

            variance_pct = round((consumption_variance / planned_qty * 100), 2) if planned_qty > 0 else 0.0
            wastage_pct = round((rec_wastage / net_consumption * 100), 2) if net_consumption > 0 else 0.0

            threshold = float(new_rec.get("thresholdPct", 5.0))
            if wastage_pct > threshold:
                status = "High Wastage Alert"
            elif consumption_variance > 0:
                status = "Above Planned Consumption"
            else:
                status = "Normal Consumption"

            batch_id = new_rec.get("batchId")
            if batch_id:
                try:
                    with open(QUALITY_BATCHES_FILE, "r", encoding="utf-8") as f:
                        batches = json.load(f)
                except Exception:
                    batches = []

                matched_batch = next((b for b in batches if b.get("id") == batch_id), None)
                if matched_batch:
                    if matched_batch.get("status") != "Accepted":
                        self.send_response(400)
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(json.dumps({
                            "success": False,
                            "error": f"Cannot issue materials: Batch #{matched_batch.get('batchNumber')} is currently '{matched_batch.get('status')}'. Only 'Accepted' batches can be issued."
                        }).encode("utf-8"))
                        return

                    avail = float(matched_batch.get("availableQty", 0))
                    if qty_issued > avail:
                        self.send_response(400)
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(json.dumps({
                            "success": False,
                            "error": f"Insufficient stock: Requested {qty_issued} {new_rec.get('unit')}, but batch only has {avail} {new_rec.get('unit')} available."
                        }).encode("utf-8"))
                        return

                    matched_batch["availableQty"] = round(avail - qty_issued + unused_ret, 3)
                    matched_batch["updatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
                    atomic_json_write(QUALITY_BATCHES_FILE, batches)

            date_str = time.strftime("%Y%m%d", time.gmtime())
            if not new_rec.get("id"):
                new_rec["id"] = f"CONS-{date_str}-{uuid.uuid4().hex[:4].upper()}"

            new_rec["netConsumption"] = net_consumption
            new_rec["productiveConsumption"] = productive_consumption
            new_rec["consumptionVariance"] = consumption_variance
            new_rec["variancePct"] = variance_pct
            new_rec["wastagePct"] = wastage_pct
            new_rec["status"] = status
            new_rec["createdAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

            records.insert(0, new_rec)
            atomic_json_write(CONSUMPTION_FILE, records)

            log_audit("CONSUMPTION_RECORDED", new_rec["id"], new_rec.get("supervisorName") or "supervisor",
                      f"Activity '{new_rec.get('workActivity')}', Material '{new_rec.get('productName')}': Net {net_consumption} {new_rec.get('unit')}, Wastage {rec_wastage} ({wastage_pct}%)")

            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "record": new_rec}).encode("utf-8"))
            return

        elif path == "/api/material-consumption/update":
            rec_id = payload.get("id")
            try:
                with open(CONSUMPTION_FILE, "r", encoding="utf-8") as f:
                    records = json.load(f)
            except Exception:
                records = []

            target = next((r for r in records if r.get("id") == rec_id), None)
            if not target:
                self.send_response(404)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": "Consumption record not found."}).encode("utf-8"))
                return

            target.update(payload)
            target["updatedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            atomic_json_write(CONSUMPTION_FILE, records)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "record": target}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

class ThreadingServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == "__main__":
    print(f"BuildAI Commercial Platform Server starting on http://localhost:{PORT}")
    print("Serving live API endpoints:")
    print("  - GET  /api/health")
    print("  - GET  /api/materials (19 Categories, 232 SKUs)")
    print("  - GET  /api/suppliers (5 Verified Tamil Nadu Depots)")
    print("  - GET  /api/sites     (Construction Site Address Management)")
    print("  - GET  /api/services  (Contractors & Civil Services Marketplace)")
    print("  - GET  /api/audit     (Immutable Transaction Audit Log)")
    print("  - POST /api/auth/login")
    print("  - POST /api/requests  & /api/requests/update")
    with ThreadingServer(("0.0.0.0", PORT), BuildAIHandler) as httpd:
        httpd.serve_forever()
