import { useState, useEffect } from "react";
import { useFindFirst, useAction } from "@gadgetinc/react";
import { api } from "../api";

const TIMEZONES = [
  { value: "Pacific/Honolulu", label: "Hawaii (UTC-10:00)" },
  { value: "America/Anchorage", label: "Alaska (UTC-09:00)" },
  { value: "America/Los_Angeles", label: "Pacific Time - US & Canada (UTC-08:00)" },
  { value: "America/Denver", label: "Mountain Time - US & Canada (UTC-07:00)" },
  { value: "America/Phoenix", label: "Arizona (UTC-07:00)" },
  { value: "America/Chicago", label: "Central Time - US & Canada (UTC-06:00)" },
  { value: "America/New_York", label: "Eastern Time - US & Canada (UTC-05:00)" },
  { value: "America/Halifax", label: "Atlantic Time - Canada (UTC-04:00)" },
  { value: "America/St_Johns", label: "Newfoundland (UTC-03:30)" },
  { value: "America/Sao_Paulo", label: "Brasilia (UTC-03:00)" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (UTC-03:00)" },
  { value: "America/Santiago", label: "Santiago (UTC-03:00)" },
  { value: "America/Bogota", label: "Bogota (UTC-05:00)" },
  { value: "America/Lima", label: "Lima (UTC-05:00)" },
  { value: "America/Mexico_City", label: "Mexico City (UTC-06:00)" },
  { value: "America/Toronto", label: "Toronto (UTC-05:00)" },
  { value: "America/Vancouver", label: "Vancouver (UTC-08:00)" },
  { value: "Atlantic/Reykjavik", label: "Reykjavik (UTC+00:00)" },
  { value: "Europe/London", label: "London (UTC+00:00)" },
  { value: "Europe/Dublin", label: "Dublin (UTC+00:00)" },
  { value: "Europe/Lisbon", label: "Lisbon (UTC+00:00)" },
  { value: "Europe/Paris", label: "Paris (UTC+01:00)" },
  { value: "Europe/Berlin", label: "Berlin (UTC+01:00)" },
  { value: "Europe/Rome", label: "Rome (UTC+01:00)" },
  { value: "Europe/Madrid", label: "Madrid (UTC+01:00)" },
  { value: "Europe/Amsterdam", label: "Amsterdam (UTC+01:00)" },
  { value: "Europe/Brussels", label: "Brussels (UTC+01:00)" },
  { value: "Europe/Stockholm", label: "Stockholm (UTC+01:00)" },
  { value: "Europe/Oslo", label: "Oslo (UTC+01:00)" },
  { value: "Europe/Copenhagen", label: "Copenhagen (UTC+01:00)" },
  { value: "Europe/Zurich", label: "Zurich (UTC+01:00)" },
  { value: "Europe/Vienna", label: "Vienna (UTC+01:00)" },
  { value: "Europe/Warsaw", label: "Warsaw (UTC+01:00)" },
  { value: "Europe/Prague", label: "Prague (UTC+01:00)" },
  { value: "Europe/Budapest", label: "Budapest (UTC+01:00)" },
  { value: "Europe/Bucharest", label: "Bucharest (UTC+02:00)" },
  { value: "Europe/Helsinki", label: "Helsinki (UTC+02:00)" },
  { value: "Europe/Athens", label: "Athens (UTC+02:00)" },
  { value: "Europe/Kiev", label: "Kyiv (UTC+02:00)" },
  { value: "Europe/Istanbul", label: "Istanbul (UTC+03:00)" },
  { value: "Europe/Moscow", label: "Moscow (UTC+03:00)" },
  { value: "Africa/Cairo", label: "Cairo (UTC+02:00)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (UTC+02:00)" },
  { value: "Africa/Lagos", label: "Lagos (UTC+01:00)" },
  { value: "Africa/Nairobi", label: "Nairobi (UTC+03:00)" },
  { value: "Africa/Casablanca", label: "Casablanca (UTC+01:00)" },
  { value: "Asia/Dubai", label: "Dubai (UTC+04:00)" },
  { value: "Asia/Karachi", label: "Islamabad, Karachi (UTC+05:00)" },
  { value: "Asia/Kolkata", label: "Mumbai, Kolkata (UTC+05:30)" },
  { value: "Asia/Dhaka", label: "Dhaka (UTC+06:00)" },
  { value: "Asia/Colombo", label: "Colombo (UTC+05:30)" },
  { value: "Asia/Kathmandu", label: "Kathmandu (UTC+05:45)" },
  { value: "Asia/Almaty", label: "Almaty (UTC+06:00)" },
  { value: "Asia/Yangon", label: "Yangon (UTC+06:30)" },
  { value: "Asia/Bangkok", label: "Bangkok (UTC+07:00)" },
  { value: "Asia/Jakarta", label: "Jakarta (UTC+07:00)" },
  { value: "Asia/Singapore", label: "Singapore (UTC+08:00)" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur (UTC+08:00)" },
  { value: "Asia/Manila", label: "Manila (UTC+08:00)" },
  { value: "Asia/Shanghai", label: "Beijing, Shanghai (UTC+08:00)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (UTC+08:00)" },
  { value: "Asia/Taipei", label: "Taipei (UTC+08:00)" },
  { value: "Asia/Seoul", label: "Seoul (UTC+09:00)" },
  { value: "Asia/Tokyo", label: "Tokyo (UTC+09:00)" },
  { value: "Asia/Riyadh", label: "Riyadh (UTC+03:00)" },
  { value: "Asia/Kuwait", label: "Kuwait (UTC+03:00)" },
  { value: "Asia/Qatar", label: "Qatar (UTC+03:00)" },
  { value: "Asia/Bahrain", label: "Bahrain (UTC+03:00)" },
  { value: "Asia/Muscat", label: "Muscat (UTC+04:00)" },
  { value: "Asia/Beirut", label: "Beirut (UTC+02:00)" },
  { value: "Asia/Jerusalem", label: "Jerusalem (UTC+02:00)" },
  { value: "Asia/Tehran", label: "Tehran (UTC+03:30)" },
  { value: "Asia/Kabul", label: "Kabul (UTC+04:30)" },
  { value: "Asia/Tashkent", label: "Tashkent (UTC+05:00)" },
  { value: "Australia/Perth", label: "Perth (UTC+08:00)" },
  { value: "Australia/Darwin", label: "Darwin (UTC+09:30)" },
  { value: "Australia/Adelaide", label: "Adelaide (UTC+09:30)" },
  { value: "Australia/Sydney", label: "Sydney (UTC+10:00)" },
  { value: "Australia/Melbourne", label: "Melbourne (UTC+10:00)" },
  { value: "Australia/Brisbane", label: "Brisbane (UTC+10:00)" },
  { value: "Pacific/Auckland", label: "Auckland (UTC+12:00)" },
  { value: "Pacific/Fiji", label: "Fiji (UTC+12:00)" },
  { value: "UTC", label: "UTC (UTC+00:00)" }
];

export default function Index() {
  const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const DEFAULT_HOURS = {
    monday: { open: true, start: "09:00", end: "17:00" },
    tuesday: { open: true, start: "09:00", end: "17:00" },
    wednesday: { open: true, start: "09:00", end: "17:00" },
    thursday: { open: true, start: "09:00", end: "17:00" },
    friday: { open: true, start: "09:00", end: "17:00" },
    saturday: { open: false, start: "10:00", end: "14:00" },
    sunday: { open: false, start: "10:00", end: "14:00" },
  };

  const [businessHours, setBusinessHours] = useState(DEFAULT_HOURS);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");
  const [timezoneSearch, setTimezoneSearch] = useState<string>("");
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [hoursSaved, setHoursSaved] = useState(false);
  const [hoursSaveError, setHoursSaveError] = useState<string | null>(null);

  const [{ data: shop, fetching: loadingShop, error: shopError }] = useFindFirst(api.shopifyShop);
  const [{ data: settings, fetching: loadingSettings, error: settingsError }] = useFindFirst(api.shopSetting);

  const [{ fetching: updatingHours }, updateSetting] = useAction(api.shopSetting.update);
  const [{ fetching: creatingHours }, createSetting] = useAction(api.shopSetting.create);

  const isSaving = updatingHours || creatingHours;

  useEffect(() => {
    if (settings?.businessHours) {
      setBusinessHours(settings.businessHours as typeof DEFAULT_HOURS);
    }
    setSelectedTimezone(
      (settings as any)?.timezone || shop?.ianaTimezone || "UTC"
    );
  }, [settings, shop]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById('timezone-dropdown-container');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setShowTimezoneDropdown(false);
        setTimezoneSearch("");
      }
    };
    if (showTimezoneDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTimezoneDropdown]);

  const handleSaveHours = async () => {
    setHoursSaved(false);
    setHoursSaveError(null);
    try {
      if (settings?.id) {
        await updateSetting({
          id: settings.id,
          shopSetting: {
            businessHours,
            timezone: selectedTimezone,
          } as any,
        });
      } else if (shop?.id) {
        await createSetting({
          shopSetting: {
            businessHours,
            timezone: selectedTimezone,
            shop: { _link: shop.id },
          } as any,
        });
      }
      setHoursSaved(true);
    } catch (err: any) {
      setHoursSaveError(err.message || "Failed to save business hours");
    }
  };

  const updateDay = (day: string, field: string, value: any) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day as keyof typeof DEFAULT_HOURS], [field]: value },
    }));
  };

  if (loadingShop || loadingSettings) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <s-spinner accessibility-label="Loading app details..." size="large" />
      </div>
    );
  }

  const loadError = shopError || settingsError;
  if (loadError) {
    return (
      <s-page heading="WhatsApp Chat Button">
        <s-section>
          <s-banner tone="critical" heading="Error">
            {loadError.message}
          </s-banner>
        </s-section>
      </s-page>
    );
  }

  const myshopifyDomain = shop?.myshopifyDomain || "";
  const themeEditorUrl = myshopifyDomain
    ? `https://${myshopifyDomain}/admin/themes/current/editor?context=apps&activateAppId=0aebc762ec32a1a6c5830ce84dc4dc10/whatsapp_button`
    : "";

  const handleOpenThemeEditor = () => {
    if (themeEditorUrl) {
      window.open(themeEditorUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Card styling
  const cardStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "250px",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e1e3e5",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxSizing: "border-box",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "32px",
  };

  const stepBadgeStyle: React.CSSProperties = {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#8c9196",
    fontWeight: 600,
  };

  return (
    <s-page heading="WhatsApp Chat Button">
      {/* Subtitle */}
      <div style={{ marginTop: "-16px", marginBottom: "24px" }}>
        <s-text color="subdued">
          Connect with your customers instantly via WhatsApp
        </s-text>
      </div>

      {/* CSS Pulse Animation Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes whatsapp-pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
          }
          .whatsapp-pulse-animation {
            animation: whatsapp-pulse 2s infinite;
          }
          .step-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .step-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          }
        `
      }} />

      {/* Success Banner */}
      <s-section>
        <s-banner tone="success">
          Your app is installed and ready to configure!
        </s-banner>
      </s-section>

      {/* How It Works Section */}
      <s-section>
        <div style={{ marginTop: "16px", marginBottom: "24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <s-heading>How it works</s-heading>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Step 1 */}
            <div style={cardStyle} className="step-card">
              <div style={iconStyle}>✅</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={stepBadgeStyle}>Step 1 — Install</span>
                <s-heading>App Installed</s-heading>
              </div>
              <s-text color="subdued">
                Your WhatsApp Chat Button app is installed and ready.
              </s-text>
            </div>

            {/* Step 2 */}
            <div style={cardStyle} className="step-card">
              <div style={iconStyle}>🎨</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={stepBadgeStyle}>Step 2 — Customize</span>
                <s-heading>Customize Your Button</s-heading>
              </div>
              <s-text color="subdued">
                Set your WhatsApp number, button color, position, and more in the theme editor.
              </s-text>
            </div>

            {/* Step 3 */}
            <div style={cardStyle} className="step-card">
              <div style={iconStyle}>🚀</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={stepBadgeStyle}>Step 3 — Go Live</span>
                <s-heading>Start Chatting</s-heading>
              </div>
              <s-text color="subdued">
                Customers can now click the button to chat with you directly on WhatsApp.
              </s-text>
            </div>
          </div>
        </div>
      </s-section>

      {/* Main CTA Section */}
      <s-section>
        <div style={{
          padding: "40px 24px",
          backgroundColor: "#f4f6f8",
          borderRadius: "12px",
          border: "1px solid #e1e3e5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          marginTop: "16px",
          marginBottom: "24px"
        }}>
          <s-heading>Customize your button</s-heading>
          <div style={{ maxWidth: "600px" }}>
            <s-text color="subdued">
              Open the theme editor to set your WhatsApp number and customize how the button looks on your store.
            </s-text>
          </div>
          <div style={{ marginTop: "8px" }}>
            <s-button
              variant="primary"
              disabled={!myshopifyDomain}
              onClick={handleOpenThemeEditor}
            >
              Open Theme Editor
            </s-button>
          </div>
        </div>
      </s-section>

      {/* Button Preview Section */}
      <s-section>
        <div style={{ marginTop: "16px", marginBottom: "24px" }}>
          <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <s-heading>Button Preview</s-heading>
            <s-text color="subdued">This is what your WhatsApp button looks like on your storefront</s-text>
          </div>
          
          <div style={{
            position: "relative",
            height: "200px",
            backgroundColor: "#f9fafb",
            borderRadius: "12px",
            border: "1px solid #e1e3e5",
            overflow: "hidden",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
          }}>
            {/* Grid decoration to look like a shop page */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ height: "20px", width: "35%", backgroundColor: "#e1e3e5", borderRadius: "4px" }} />
              <div style={{ height: "12px", width: "75%", backgroundColor: "#f1f2f4", borderRadius: "4px" }} />
              <div style={{ height: "12px", width: "65%", backgroundColor: "#f1f2f4", borderRadius: "4px" }} />
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <div style={{ height: "36px", width: "80px", backgroundColor: "#e1e3e5", borderRadius: "6px" }} />
                <div style={{ height: "36px", width: "120px", backgroundColor: "#f1f2f4", borderRadius: "6px" }} />
              </div>
            </div>

            {/* The floating green circle button */}
            <div
              className="whatsapp-pulse-animation"
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                width: "56px",
                height: "56px",
                backgroundColor: "#25D366",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <svg
                viewBox="0 0 448 512"
                width="28"
                height="28"
                fill="white"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </div>
          </div>
        </div>
      </s-section>

      {/* Need Help Section */}
      <s-section>
        <div style={{ marginTop: "16px", marginBottom: "32px" }}>
          <div style={{ marginBottom: "16px" }}>
            <s-heading>Need help?</s-heading>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ borderLeft: "4px solid #25D366", paddingLeft: "16px" }}>
              <s-heading>How to add the button to your theme</s-heading>
              <s-text color="subdued">
                Go to Online Store → Themes → Customize → App Embeds → Enable WhatsApp Chat Button
              </s-text>
            </div>
            <div style={{ borderLeft: "4px solid #25D366", paddingLeft: "16px" }}>
              <s-heading>How to set your WhatsApp number</s-heading>
              <s-text color="subdued">
                In the theme editor, click on the WhatsApp Chat Button embed and enter your number with country code
              </s-text>
            </div>
          </div>
        </div>
      </s-section>

      {/* Business Hours Section */}
      <s-section>
        <div style={{ marginTop: "16px", marginBottom: "32px" }}>
          <div style={{ marginBottom: "16px" }}>
            <s-heading>Business Hours</s-heading>
            <div style={{ marginTop: "4px" }}>
              <s-text color="subdued">
                Set when you are available to chat. The button will show an offline message outside these hours.
              </s-text>
            </div>
          </div>

          {hoursSaved && (
            <div style={{ marginBottom: "16px" }}>
              <s-banner tone="success">
                Business hours saved successfully!
              </s-banner>
            </div>
          )}

          {hoursSaveError && (
            <div style={{ marginBottom: "16px" }}>
              <s-banner tone="critical" heading="Error">
                {hoursSaveError}
              </s-banner>
            </div>
          )}

          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e1e3e5", padding: "24px", marginBottom: "20px" }}>
            {/* Timezone UI Selector */}
            <div id="timezone-dropdown-container" style={{ marginBottom: "20px", position: "relative" }}>
              <div style={{ fontWeight: "600", marginBottom: "4px", fontSize: "14px" }}>
                Timezone
              </div>
              <div style={{ color: "#6d7175", fontSize: "12px", marginBottom: "8px" }}>
                Shopify detected: {shop?.ianaTimezone || "Not detected"}
              </div>
              
              {/* Selected timezone display - clicking opens dropdown */}
              <div
                onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #c9cccf",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "white",
                  userSelect: "none"
                }}
              >
                <span>
                  {TIMEZONES.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone || "Select timezone..."}
                </span>
                <span style={{ fontSize: "10px", color: "#6d7175" }}>
                  {showTimezoneDropdown ? "▲" : "▼"}
                </span>
              </div>

              {/* Dropdown panel */}
              {showTimezoneDropdown && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #c9cccf",
                  borderRadius: "6px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                  zIndex: 1000,
                  marginTop: "4px"
                }}>
                  {/* Search input inside dropdown */}
                  <div style={{ padding: "8px" }}>
                    <input
                      type="text"
                      placeholder="Search timezone..."
                      value={timezoneSearch}
                      onChange={(e: any) => setTimezoneSearch(e.target.value)}
                      autoFocus
                      style={{
                        width: "100%",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        border: "1px solid #c9cccf",
                        fontSize: "13px",
                        boxSizing: "border-box",
                        outline: "none"
                      }}
                    />
                  </div>

                  {/* Timezone options list */}
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {TIMEZONES
                      .filter(tz =>
                        tz.label.toLowerCase().includes(timezoneSearch.toLowerCase()) ||
                        tz.value.toLowerCase().includes(timezoneSearch.toLowerCase())
                      )
                      .map(tz => (
                        <div
                          key={tz.value}
                          onClick={() => {
                            setSelectedTimezone(tz.value);
                            setShowTimezoneDropdown(false);
                            setTimezoneSearch("");
                          }}
                          style={{
                            padding: "8px 12px",
                            fontSize: "13px",
                            cursor: "pointer",
                            backgroundColor: selectedTimezone === tz.value ? "#f0faf0" : "transparent",
                            color: selectedTimezone === tz.value ? "#008060" : "#333",
                            fontWeight: selectedTimezone === tz.value ? "600" : "normal",
                          }}
                          onMouseEnter={(e: any) => {
                            if (selectedTimezone !== tz.value) {
                              e.currentTarget.style.backgroundColor = "#f6f6f7";
                            }
                          }}
                          onMouseLeave={(e: any) => {
                            if (selectedTimezone !== tz.value) {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          {tz.label}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Business Hours Days */}
            {DAYS.map((day) => {
              const dayHours = businessHours[day as keyof typeof DEFAULT_HOURS] || { open: false, start: "09:00", end: "17:00" };
              const isDayOpen = dayHours.open;
              const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
              
              return (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 0",
                    borderBottom: day === "sunday" ? "none" : "1px solid #e1e3e5",
                    opacity: isDayOpen ? 1 : 0.6,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <div style={{ width: "100px", fontWeight: "500" }}>{capitalizedDay}</div>
                  <s-checkbox
                    {...({
                      checked: isDayOpen,
                      onChange: (e: any) => updateDay(day, "open", e.target.checked),
                      label: "Open",
                    } as any)}
                  />
                  {isDayOpen ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="time"
                        value={dayHours.start}
                        onChange={(e) => updateDay(day, "start", e.target.value)}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #c9cccf", fontSize: "14px", fontFamily: "inherit" }}
                      />
                      <s-text color="subdued">to</s-text>
                      <input
                        type="time"
                        value={dayHours.end}
                        onChange={(e) => updateDay(day, "end", e.target.value)}
                        style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #c9cccf", fontSize: "14px", fontFamily: "inherit" }}
                      />
                    </div>
                  ) : (
                    <s-text color="subdued">Closed</s-text>
                  )}
                </div>
              );
            })}
          </div>

          <div>
            <s-button
              variant="primary"
              onClick={handleSaveHours}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Business Hours"}
            </s-button>
          </div>
        </div>
      </s-section>
    </s-page>
  );
}
