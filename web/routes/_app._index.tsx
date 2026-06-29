import { useFindFirst } from "@gadgetinc/react";
import { api } from "../api";

export default function Index() {
  const [{ data: shop, fetching: loadingShop, error: shopError }] = useFindFirst(api.shopifyShop);

  if (loadingShop) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <s-spinner accessibility-label="Loading app details..." size="large" />
      </div>
    );
  }

  if (shopError) {
    return (
      <s-page heading="WhatsApp Chat Button">
        <s-section>
          <s-banner tone="critical" heading="Error">
            {shopError.message}
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
    </s-page>
  );
}
