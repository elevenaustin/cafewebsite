import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Coffee,
  CheckCircle2,
  Mail,
  Phone,
  User,
  AlertCircle,
  Sparkles,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { CAFE } from "./brew-haven-data";
import { adminStore } from "@/lib/admin-store";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormFieldKey = "name" | "email" | "phone" | "date";
type FormErrors = Partial<Record<FormFieldKey, string>>;

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [guests, setGuests] = useState("2 Guests");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("06:00 PM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seating, setSeating] = useState("Indoor Cozy");
  const [specialRequest, setSpecialRequest] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedBookingId, setSubmittedBookingId] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  if (!isOpen) return null;

  // Validation function
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full Name Validation
    if (!name.trim()) {
      newErrors.name = "Full Name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    // 2. Email Validation (Mandatory)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required for confirmation.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    // 3. Phone Number Validation (Mandatory)
    const digitsOnly = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required for booking alerts.";
    } else if (digitsOnly.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // 4. Date Validation
    if (!date) {
      newErrors.date = "Please select a reservation date.";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past. Please select today or future date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: FormFieldKey) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const clearError = (field: FormFieldKey) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, date: true });

    if (validate()) {
      setIsSubmitting(true);
      
      // 1. Store reservation in Admin Panel (Instant 0-delay sync)
      const newRes = adminStore.addReservation({
        name,
        email,
        phone,
        guests,
        date,
        time,
        seating,
        specialRequest: specialRequest.trim() || undefined,
      });

      setSubmittedBookingId(newRes.id);

      // 2. Build pre-filled WhatsApp message with all customer reservation details
      const whatsappText = `Hello Forget Me Not Coffee! I have submitted a Table Reservation:
📌 Booking ID: ${newRes.id}
👤 Name: ${name}
📞 Phone: ${phone}
✉️ Email: ${email}
👥 Party Size: ${guests} (${seating})
📅 Date: ${date}
🕒 Time: ${time}
${specialRequest.trim() ? `📝 Special Request: ${specialRequest.trim()}` : ""}`;

      const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappText)}`;
      setWhatsappLink(waUrl);

      // Track WhatsApp log in Admin panel as well
      adminStore.trackWhatsAppClick("Table Reservation Form Auto-Send");

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        // Auto-launch WhatsApp pre-filled window
        window.open(waUrl, "_blank");
      }, 600);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setSpecialRequest("");
    setErrors({});
    setTouched({});
    onClose();
  };

  // Minimum date string for HTML date picker (Today)
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#18110b] border border-[#c89355]/40 rounded-3xl max-w-lg w-full p-5 sm:p-8 relative shadow-[0_0_50px_rgba(200,147,85,0.15)] text-[#f4efe9] max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#100b07] border border-white/10 hover:border-[#c89355] text-[#a6988a] hover:text-[#c89355] transition-all flex items-center justify-center shadow-lg z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* SUCCESS CONFIRMATION VIEW */
          <div className="py-4 space-y-5 text-center animate-in zoom-in-95 duration-300 my-auto overflow-y-auto">
            <div className="w-16 h-16 bg-[#c89355]/20 border border-[#c89355] rounded-full flex items-center justify-center mx-auto text-[#c89355] shadow-lg shadow-[#c89355]/20 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89355] block mb-1">
                RESERVATION CONFIRMED
              </span>
              <h3 className="font-serif text-3xl font-semibold text-[#f4efe9]">
                Table Reserved!
              </h3>
              <p className="text-xs text-[#a6988a] max-w-xs mx-auto mt-1 leading-relaxed">
                We are excited to host you at <strong className="text-[#f4efe9]">{CAFE.name}</strong>. Confirmation details sent to your email & phone.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#100b07] border border-[#c89355]/30 p-4.5 rounded-2xl text-left text-xs space-y-2.5 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-[#a6988a]">Booking ID:</span>
                <span className="font-bold font-mono text-[#c89355] text-sm">{submittedBookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a6988a]">Guest Name:</span>
                <span className="font-bold text-[#f4efe9] text-sm">{name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a6988a]">Party Size:</span>
                <span className="font-bold text-[#c89355]">{guests} ({seating})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a6988a]">Date & Time:</span>
                <span className="font-bold text-[#f4efe9]">{date} at {time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a6988a]">Phone:</span>
                <span className="text-[#d4ceb8] font-mono">{phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a6988a]">Email:</span>
                <span className="text-[#d4ceb8] truncate max-w-[180px]">{email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase py-3.5 rounded-xl tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Pre-Filled Details on WhatsApp</span>
                </a>
              )}

              <button
                onClick={handleReset}
                className="w-full bg-[#c89355] hover:bg-[#b87d4b] text-[#100b07] font-bold text-xs uppercase py-3 rounded-xl tracking-wider transition-all shadow-lg"
              >
                DONE & CLOSE
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex items-center gap-2 text-[#c89355] mb-1">
              <Coffee className="w-4 h-4" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em]">
                TABLE RESERVATION
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4efe9] mb-1">
              Reserve Your Spot
            </h3>
            <p className="text-xs text-[#a6988a] mb-5">
              Book a cozy spot at <strong className="text-[#f4efe9]">{CAFE.name}</strong> for dining & artisan coffee.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Number of Guests & Seating Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d4ceb8] font-medium mb-1 flex items-center justify-between">
                    <span>Number of Guests</span>
                    <span className="text-[10px] text-[#c89355] font-bold">*Required</span>
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-[#100b07] border border-[#c89355]/30 rounded-xl px-3.5 py-2.5 text-[#f4efe9] appearance-none focus:outline-none focus:border-[#c89355] transition-colors"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests (Party)</option>
                    </select>
                    <Users className="w-4 h-4 text-[#c89355] absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#d4ceb8] font-medium mb-1">
                    Seating Area
                  </label>
                  <div className="relative">
                    <select
                      value={seating}
                      onChange={(e) => setSeating(e.target.value)}
                      className="w-full bg-[#100b07] border border-[#c89355]/30 rounded-xl px-3.5 py-2.5 text-[#f4efe9] appearance-none focus:outline-none focus:border-[#c89355] transition-colors"
                    >
                      <option>Indoor Cozy</option>
                      <option>Outdoor Terrace</option>
                      <option>Window View Seat</option>
                      <option>Quiet Corner</option>
                    </select>
                    <Sparkles className="w-4 h-4 text-[#c89355] absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d4ceb8] font-medium mb-1 flex items-center justify-between">
                    <span>Date</span>
                    <span className="text-[10px] text-[#c89355] font-bold">*Required</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        clearError("date");
                      }}
                      onBlur={() => handleBlur("date")}
                      className={`w-full bg-[#100b07] border rounded-xl px-3.5 py-2.5 text-[#f4efe9] focus:outline-none transition-colors ${
                        touched.date && errors.date
                          ? "border-red-500/80 bg-red-950/10"
                          : "border-[#c89355]/30 focus:border-[#c89355]"
                      }`}
                    />
                  </div>
                  {touched.date && errors.date && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.date}</span>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[#d4ceb8] font-medium mb-1">Time</label>
                  <div className="relative">
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#100b07] border border-[#c89355]/30 rounded-xl px-3.5 py-2.5 text-[#f4efe9] appearance-none focus:outline-none focus:border-[#c89355] transition-colors"
                    >
                      <option>08:30 AM</option>
                      <option>10:00 AM</option>
                      <option>11:30 AM</option>
                      <option>01:30 PM</option>
                      <option>04:00 PM</option>
                      <option>06:00 PM</option>
                      <option>08:00 PM</option>
                      <option>09:15 PM</option>
                    </select>
                    <Clock className="w-4 h-4 text-[#c89355] absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[#d4ceb8] font-medium mb-1 flex items-center justify-between">
                  <span>Full Name</span>
                  <span className="text-[10px] text-[#c89355] font-bold">*Required</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError("name");
                    }}
                    onBlur={() => handleBlur("name")}
                    className={`w-full bg-[#100b07] border rounded-xl pl-10 pr-3.5 py-2.5 text-[#f4efe9] placeholder-[#a6988a]/60 focus:outline-none transition-colors ${
                      touched.name && errors.name
                        ? "border-red-500/80 bg-red-950/10"
                        : "border-[#c89355]/30 focus:border-[#c89355]"
                    }`}
                  />
                  <User className="w-4 h-4 text-[#c89355] absolute left-3.5 top-3 pointer-events-none" />
                </div>
                {touched.name && errors.name && (
                  <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Email Address (MANDATORY) */}
              <div>
                <label className="block text-[#d4ceb8] font-medium mb-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-[#c89355] font-bold">*Required</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="e.g. alex@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError("email");
                    }}
                    onBlur={() => handleBlur("email")}
                    className={`w-full bg-[#100b07] border rounded-xl pl-10 pr-3.5 py-2.5 text-[#f4efe9] placeholder-[#a6988a]/60 focus:outline-none transition-colors ${
                      touched.email && errors.email
                        ? "border-red-500/80 bg-red-950/10"
                        : "border-[#c89355]/30 focus:border-[#c89355]"
                    }`}
                  />
                  <Mail className="w-4 h-4 text-[#c89355] absolute left-3.5 top-3 pointer-events-none" />
                </div>
                {touched.email && errors.email && (
                  <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Phone Number (MANDATORY) */}
              <div>
                <label className="block text-[#d4ceb8] font-medium mb-1 flex items-center justify-between">
                  <span>Phone Number</span>
                  <span className="text-[10px] text-[#c89355] font-bold">*Required</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="e.g. +91 7717526430"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearError("phone");
                    }}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full bg-[#100b07] border rounded-xl pl-10 pr-3.5 py-2.5 text-[#f4efe9] placeholder-[#a6988a]/60 focus:outline-none transition-colors ${
                      touched.phone && errors.phone
                        ? "border-red-500/80 bg-red-950/10"
                        : "border-[#c89355]/30 focus:border-[#c89355]"
                    }`}
                  />
                  <Phone className="w-4 h-4 text-[#c89355] absolute left-3.5 top-3 pointer-events-none" />
                </div>
                {touched.phone && errors.phone && (
                  <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>

              {/* Special Request (Optional) */}
              <div>
                <label className="block text-[#d4ceb8] font-medium mb-1">
                  Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Celebrating anniversary / High chair needed"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-[#100b07] border border-[#c89355]/30 rounded-xl px-3.5 py-2.5 text-[#f4efe9] placeholder-[#a6988a]/50 focus:outline-none focus:border-[#c89355]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#c89355] to-[#b87d4b] hover:from-[#b87d4b] hover:to-[#a66d3b] text-[#100b07] font-bold text-xs uppercase py-3.5 rounded-xl tracking-wider transition-all mt-2 shadow-lg shadow-[#c89355]/20 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Reservation...</span>
                ) : (
                  <>
                    <span>CONFIRM RESERVATION</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
