// Admin Data Store & Persistence Manager

export interface ReservationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  seating: string;
  specialRequest?: string | undefined;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  timestamp: string;
}

export interface WhatsAppClickRecord {
  id: string;
  source: string; // e.g. "Floating Widget", "Specialties", "Footer", "FAQ"
  timestamp: string;
}

export interface FormSubmissionRecord {
  id: string;
  type: "Newsletter" | "Contact Message" | "Merchandise Order" | "General Enquiry";
  contact: string; // email or phone
  name?: string | undefined;
  details: string;
  timestamp: string;
  status: "New" | "Reviewed" | "Resolved";
}

export interface VisitorAnalytics {
  totalViews: number;
  todayViews: number;
  lastVisitedDate: string;
  history: { date: string; views: number }[];
}

export interface AdminCredentials {
  username: string;
  passwordHash: string; // stored for auth comparison
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string | undefined;
  customizations?: string[] | undefined;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | undefined;
  orderType: "Table Service" | "Takeaway Pickup" | "Home Delivery";
  tableOrAddress: string; // e.g. "Table 4" or "Model Town, House #42"
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "Cash on Delivery" | "UPI / QR Code" | "Card on Pickup";
  specialNotes?: string | undefined;
  status: "Pending" | "Preparing" | "Ready / Out for Delivery" | "Completed" | "Cancelled";
  timestamp: string;
  createdTimeMs?: number | undefined;
  cancelledBy?: "Customer" | "Admin" | string | undefined;
}

const STORAGE_KEYS = {
  CREDENTIALS: "cafe_admin_credentials_v1",
  AUTH: "cafe_admin_auth_v1",
  RESERVATIONS: "cafe_admin_reservations_v1",
  WHATSAPP_CLICKS: "cafe_admin_whatsapp_clicks_v1",
  FORM_SUBMISSIONS: "cafe_admin_forms_v1",
  VISITOR_ANALYTICS: "cafe_admin_visitors_v1",
  MAINTENANCE: "cafe_admin_maintenance_v1",
  ORDERS: "cafe_admin_orders_v1",
  USER_LAST_ORDERS: "cafe_user_last_orders_v1",
};

// Initial Seed Data
const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: "998800",
  passwordHash: "pendugpt12345678",
};

const SEED_RESERVATIONS: ReservationRecord[] = [
  {
    id: "RES-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    guests: "2 Guests",
    date: new Date().toISOString().split("T")[0] || "",
    time: "07:00 PM",
    seating: "Outdoor Terrace",
    specialRequest: "Window side table for anniversary celebration",
    status: "Confirmed",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleString(),
  },
  {
    id: "RES-1002",
    name: "Gurpreet Kaur",
    email: "gurpreet.k@example.com",
    phone: "+91 98123 76543",
    guests: "4 Guests",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0] || "",
    time: "06:30 PM",
    seating: "Indoor Cozy",
    specialRequest: "High chair needed for kid",
    status: "Pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleString(),
  },
];

const SEED_ORDERS: OrderRecord[] = [
  {
    id: "ORD-9401",
    customerName: "Sukhwinder Singh",
    customerPhone: "+91 98765 12345",
    customerEmail: "sukhwinder@gmail.com",
    orderType: "Table Service",
    tableOrAddress: "Table #3 (Outdoor Terrace)",
    items: [
      { name: "Caramel Macchiato", quantity: 2, price: 340, size: "Large", customizations: ["Extra Espresso Shot", "Oat Milk"] },
      { name: "Artisan Avocado Toast", quantity: 1, price: 380 },
    ],
    totalAmount: 1060,
    paymentMethod: "UPI / QR Code",
    specialNotes: "Make macchiato extra hot, extra drizzle",
    status: "Preparing",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleString(),
  },
  {
    id: "ORD-9402",
    customerName: "Ramanpreet Kaur",
    customerPhone: "+91 98140 88776",
    customerEmail: "raman.kaur@yahoo.com",
    orderType: "Takeaway Pickup",
    tableOrAddress: "Counter Pickup at 06:45 PM",
    items: [
      { name: "Cold Brew Float", quantity: 1, price: 290, size: "Regular" },
      { name: "Double Chocolate Brownie", quantity: 2, price: 220 },
    ],
    totalAmount: 730,
    paymentMethod: "Cash on Delivery",
    specialNotes: "Pack brownie separately in eco-box",
    status: "Pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toLocaleString(),
  },
  {
    id: "ORD-9403",
    customerName: "Harman Preet",
    customerPhone: "+91 97799 44332",
    orderType: "Home Delivery",
    tableOrAddress: "Urban Estate Phase 2, House #118",
    items: [
      { name: "Ethiopian Yirgacheffe Beans (250g)", quantity: 2, price: 650 },
      { name: "Matcha Oat Latte", quantity: 1, price: 320 },
    ],
    totalAmount: 1620,
    paymentMethod: "UPI / QR Code",
    specialNotes: "Ring doorbell twice on arrival",
    status: "Completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toLocaleString(),
  },
];

const SEED_WHATSAPP_CLICKS: WhatsAppClickRecord[] = [
  { id: "WA-1", source: "Floating Contact Widget", timestamp: new Date(Date.now() - 1000 * 60 * 10).toLocaleString() },
  { id: "WA-2", source: "Specialties Section - Reserve via WhatsApp", timestamp: new Date(Date.now() - 1000 * 60 * 35).toLocaleString() },
];

const SEED_FORM_SUBMISSIONS: FormSubmissionRecord[] = [
  {
    id: "FORM-101",
    type: "Newsletter",
    contact: "simran.singh@gmail.com",
    details: "Subscribed to weekly coffee brew updates & discounts",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleString(),
    status: "New",
  },
];

const SEED_VISITOR_ANALYTICS: VisitorAnalytics = {
  totalViews: 184,
  todayViews: 42,
  lastVisitedDate: new Date().toISOString().split("T")[0] || "",
  history: [
    { date: new Date(Date.now() - 86400000 * 4).toISOString().split("T")[0] || "", views: 28 },
    { date: new Date(Date.now() - 86400000 * 3).toISOString().split("T")[0] || "", views: 35 },
    { date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0] || "", views: 41 },
    { date: new Date(Date.now() - 86400000 * 1).toISOString().split("T")[0] || "", views: 38 },
    { date: new Date().toISOString().split("T")[0] || "", views: 42 },
  ],
};

// Safe JSON LocalStorage Helpers
function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("admin_store_updated"));
  } catch (err) {
    console.error("Failed saving to localStorage:", err);
  }
}

export const adminStore = {
  // Auth Management
  getCredentials(): AdminCredentials {
    return getStoredItem<AdminCredentials>(STORAGE_KEYS.CREDENTIALS, DEFAULT_CREDENTIALS);
  },

  updateCredentials(newUsername: string, newPasswordHash: string): void {
    setStoredItem<AdminCredentials>(STORAGE_KEYS.CREDENTIALS, {
      username: newUsername.trim(),
      passwordHash: newPasswordHash.trim(),
    });
  },

  isLoggedIn(): boolean {
    return getStoredItem<boolean>(STORAGE_KEYS.AUTH, false);
  },

  setLoggedIn(status: boolean): void {
    setStoredItem<boolean>(STORAGE_KEYS.AUTH, status);
  },

  verifyPassword(usernameInput: string, passwordInput: string): boolean {
    const creds = this.getCredentials();
    return (
      usernameInput.trim().toLowerCase() === creds.username.toLowerCase() &&
      passwordInput.trim() === creds.passwordHash
    );
  },

  // Website Maintenance Mode Toggle
  isMaintenanceMode(): boolean {
    return getStoredItem<boolean>(STORAGE_KEYS.MAINTENANCE, false);
  },

  setMaintenanceMode(status: boolean): void {
    setStoredItem<boolean>(STORAGE_KEYS.MAINTENANCE, status);
  },

  // Viewer Tracking
  getVisitorAnalytics(): VisitorAnalytics {
    return getStoredItem<VisitorAnalytics>(STORAGE_KEYS.VISITOR_ANALYTICS, {
      totalViews: 0,
      todayViews: 0,
      lastVisitedDate: "",
      history: [],
    });
  },

  trackPageView(): VisitorAnalytics {
    const current = this.getVisitorAnalytics();
    const todayStr = new Date().toISOString().split("T")[0] || "";

    let todayViews = current.todayViews;
    let history = [...(current.history || [])];

    if (current.lastVisitedDate === todayStr) {
      todayViews += 1;
      const todayEntry = history.find((h) => h.date === todayStr);
      if (todayEntry) {
        todayEntry.views += 1;
      } else {
        history.push({ date: todayStr, views: todayViews });
      }
    } else {
      todayViews = 1;
      history.push({ date: todayStr, views: 1 });
      if (history.length > 14) history.shift();
    }

    const updated: VisitorAnalytics = {
      totalViews: (current.totalViews || 0) + 1,
      todayViews,
      lastVisitedDate: todayStr,
      history,
    };

    setStoredItem(STORAGE_KEYS.VISITOR_ANALYTICS, updated);
    return updated;
  },

  // WhatsApp Click Analytics
  getWhatsAppClicks(): WhatsAppClickRecord[] {
    return getStoredItem<WhatsAppClickRecord[]>(STORAGE_KEYS.WHATSAPP_CLICKS, SEED_WHATSAPP_CLICKS);
  },

  trackWhatsAppClick(source: string): void {
    const clicks = this.getWhatsAppClicks();
    const newRecord: WhatsAppClickRecord = {
      id: `WA-${Date.now().toString().slice(-5)}`,
      source,
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newRecord, ...clicks];
    setStoredItem(STORAGE_KEYS.WHATSAPP_CLICKS, updated);
  },

  // Table Reservations
  getReservations(): ReservationRecord[] {
    return getStoredItem<ReservationRecord[]>(STORAGE_KEYS.RESERVATIONS, SEED_RESERVATIONS);
  },

  addReservation(data: Omit<ReservationRecord, "id" | "timestamp" | "status">): ReservationRecord {
    const reservations = this.getReservations();
    const newReservation: ReservationRecord = {
      ...data,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending",
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newReservation, ...reservations];
    setStoredItem(STORAGE_KEYS.RESERVATIONS, updated);
    return newReservation;
  },

  updateReservationStatus(id: string, status: ReservationRecord["status"]): void {
    const reservations = this.getReservations();
    const updated = reservations.map((res) => (res.id === id ? { ...res, status } : res));
    setStoredItem(STORAGE_KEYS.RESERVATIONS, updated);
  },

  deleteReservation(id: string): void {
    const reservations = this.getReservations();
    const updated = reservations.filter((res) => res.id !== id);
    setStoredItem(STORAGE_KEYS.RESERVATIONS, updated);
  },

  // Food & Coffee Orders Management
  getOrders(): OrderRecord[] {
    return getStoredItem<OrderRecord[]>(STORAGE_KEYS.ORDERS, SEED_ORDERS);
  },

  getUserLastOrders(): string[] {
    return getStoredItem<string[]>(STORAGE_KEYS.USER_LAST_ORDERS, []);
  },

  addUserLastOrder(orderId: string): void {
    const prev = this.getUserLastOrders();
    const updated = [orderId, ...prev.filter((id) => id !== orderId)].slice(0, 10);
    setStoredItem(STORAGE_KEYS.USER_LAST_ORDERS, updated);
  },

  addOrder(data: Omit<OrderRecord, "id" | "timestamp" | "status" | "createdTimeMs">): OrderRecord {
    const orders = this.getOrders();
    const newOrder: OrderRecord = {
      ...data,
      id: `ORD-${Math.floor(8000 + Math.random() * 1900)}`,
      status: "Pending",
      timestamp: new Date().toLocaleString(),
      createdTimeMs: Date.now(),
    };
    const updated = [newOrder, ...orders];
    setStoredItem(STORAGE_KEYS.ORDERS, updated);
    this.addUserLastOrder(newOrder.id);
    return newOrder;
  },

  updateOrderStatus(
    id: string,
    status: OrderRecord["status"],
    cancelledBy?: "Customer" | "Admin" | string | undefined
  ): void {
    const orders = this.getOrders();
    const updated = orders.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          status,
          cancelledBy: status === "Cancelled" ? (cancelledBy || o.cancelledBy || "Admin") : undefined,
        };
      }
      return o;
    });
    setStoredItem(STORAGE_KEYS.ORDERS, updated);
  },

  deleteOrder(id: string): void {
    const orders = this.getOrders();
    const updated = orders.filter((o) => o.id !== id);
    setStoredItem(STORAGE_KEYS.ORDERS, updated);
  },

  // Form Submissions
  getFormSubmissions(): FormSubmissionRecord[] {
    return getStoredItem<FormSubmissionRecord[]>(STORAGE_KEYS.FORM_SUBMISSIONS, SEED_FORM_SUBMISSIONS);
  },

  addFormSubmission(data: Omit<FormSubmissionRecord, "id" | "timestamp" | "status">): FormSubmissionRecord {
    const forms = this.getFormSubmissions();
    const newForm: FormSubmissionRecord = {
      ...data,
      id: `FORM-${Math.floor(100 + Math.random() * 900)}`,
      status: "New",
      timestamp: new Date().toLocaleString(),
    };
    const updated = [newForm, ...forms];
    setStoredItem(STORAGE_KEYS.FORM_SUBMISSIONS, updated);
    return newForm;
  },

  updateFormStatus(id: string, status: FormSubmissionRecord["status"]): void {
    const forms = this.getFormSubmissions();
    const updated = forms.map((f) => (f.id === id ? { ...f, status } : f));
    setStoredItem(STORAGE_KEYS.FORM_SUBMISSIONS, updated);
  },

  deleteFormSubmission(id: string): void {
    const forms = this.getFormSubmissions();
    const updated = forms.filter((f) => f.id !== id);
    setStoredItem(STORAGE_KEYS.FORM_SUBMISSIONS, updated);
  },

  // Clear All Admin Data to Fresh Empty State
  clearAllData(): void {
    setStoredItem(STORAGE_KEYS.RESERVATIONS, []);
    setStoredItem(STORAGE_KEYS.ORDERS, []);
    setStoredItem(STORAGE_KEYS.WHATSAPP_CLICKS, []);
    setStoredItem(STORAGE_KEYS.FORM_SUBMISSIONS, []);
    setStoredItem(STORAGE_KEYS.VISITOR_ANALYTICS, {
      totalViews: 0,
      todayViews: 0,
      lastVisitedDate: "",
      history: [],
    });
  },

  // Reset Storage to Fresh Demo State
  resetToDemoData(): void {
    setStoredItem(STORAGE_KEYS.CREDENTIALS, DEFAULT_CREDENTIALS);
    setStoredItem(STORAGE_KEYS.RESERVATIONS, SEED_RESERVATIONS);
    setStoredItem(STORAGE_KEYS.ORDERS, SEED_ORDERS);
    setStoredItem(STORAGE_KEYS.WHATSAPP_CLICKS, SEED_WHATSAPP_CLICKS);
    setStoredItem(STORAGE_KEYS.FORM_SUBMISSIONS, SEED_FORM_SUBMISSIONS);
    setStoredItem(STORAGE_KEYS.VISITOR_ANALYTICS, SEED_VISITOR_ANALYTICS);
  },
};
