import { useState, useEffect } from "react";
import { useFindFirst, useAction } from "@gadgetinc/react";
import { api } from "../api";

export default function Index() {
  // 1. LOAD SETTINGS
  // Find the existing shopSetting record for the current shop
  const [{ data: settings, fetching: loadingSettings, error: settingsError }] = useFindFirst(api.shopSetting);
  // Find the current shop record (used to link new settings to the shop if they don't exist yet)
  const [{ data: shop, fetching: loadingShop, error: shopError }] = useFindFirst(api.shopifyShop);

  // Form state
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [buttonColor, setButtonColor] = useState("#25D366");
  const [buttonPosition, setButtonPosition] = useState("bottom-right");
  const [isEnabled, setIsEnabled] = useState(true);

  // Feedback states
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveErrorMsg, setSaveErrorMsg] = useState<string | null>(null);

  // Initialize form state when settings are loaded
  useEffect(() => {
    if (settings) {
      setWhatsappNumber(settings.whatsappNumber || "");
      // Clean up the schema's default buttonColor which has a trailing space
      setButtonColor((settings.buttonColor || "#25D366").trim());
      setButtonPosition(settings.buttonPosition || "bottom-right");
      setIsEnabled(settings.isEnabled !== false); // default to true if undefined
    }
  }, [settings]);

  // 2. SAVE SETTINGS hooks
  const [{ fetching: updating, error: updateActionError }, updateSetting] = useAction(api.shopSetting.update);
  const [{ fetching: creating, error: createActionError }, createSetting] = useAction(api.shopSetting.create);

  const isSaving = updating || creating;

  const handleSave = async () => {
    setSaveSuccess(false);
    setSaveErrorMsg(null);

    // Always trim() the buttonColor value before saving to remove whitespace
    const trimmedColor = buttonColor.trim();

    const payload = {
      whatsappNumber,
      buttonColor: trimmedColor,
      buttonPosition,
      isEnabled,
    };

    try {
      if (settings?.id) {
        // Update existing record
        await updateSetting({
          id: settings.id,
          shopSetting: payload,
        });
      } else {
        // Create new record for the current shop
        if (!shop?.id) {
          setSaveErrorMsg("Cannot save settings: Shopify shop ID could not be loaded.");
          return;
        }
        await createSetting({
          shopSetting: {
            ...payload,
            shop: { _link: shop.id },
          },
        });
      }
      setSaveSuccess(true);
    } catch (err: any) {
      setSaveErrorMsg(err.message || "An unexpected error occurred while saving.");
    }
  };

  // While loading, show a simple loading message
  if (loadingSettings || loadingShop) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <s-text>Loading settings...</s-text>
      </div>
    );
  }

  // Handle load errors
  const loadError = settingsError || shopError;
  if (loadError) {
    return (
      <s-page heading="WhatsApp Chat Button Settings">
        <s-section>
          <s-banner tone="critical" heading="Failed to load settings">
            {loadError.message}
          </s-banner>
        </s-section>
      </s-page>
    );
  }

  return (
    <s-page heading="WhatsApp Chat Button Settings">
      {/* 4. UI REQUIREMENTS - Success and Error banners */}
      {saveSuccess && (
        <s-section>
          <s-banner tone="success" heading="Success">
            Settings saved successfully!
          </s-banner>
        </s-section>
      )}

      {(saveErrorMsg || updateActionError || createActionError) && (
        <s-section>
          <s-banner tone="critical" heading="Error">
            {saveErrorMsg || updateActionError?.message || createActionError?.message}
          </s-banner>
        </s-section>
      )}

      {/* Form wrapper */}
      <div>
        {/* All fields inside a single s-section */}
        <s-section>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* a) WhatsApp Number */}
            <s-text-field
              {...({
                label: "WhatsApp Number",
                placeholder: "+1234567890",
                helpText: "Enter your full WhatsApp number with country code",
                value: whatsappNumber,
                onChange: (e: any) => setWhatsappNumber(e.target.value),
              } as any)}
            />

            {/* b) Button Color with Color Preview */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <s-text-field
                  label="Button Color"
                  value={buttonColor}
                  onChange={(e: any) => setButtonColor(e.target.value)}
                />
              </div>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "4px",
                  border: "1px solid #c9cccf",
                  backgroundColor: buttonColor.trim() || "#25D366",
                  marginBottom: "2px", // align visually with the text input container
                }}
              />
            </div>

            {/* c) Button Position */}
            <s-select
              label="Button Position"
              value={buttonPosition}
              onChange={(e: any) => setButtonPosition(e.target.value)}
            >
              <s-option value="bottom-right">Bottom Right</s-option>
              <s-option value="bottom-left">Bottom Left</s-option>
            </s-select>

            {/* d) Enable Button */}
            <s-checkbox
              {...({
                label: "Enable WhatsApp Button",
                checked: isEnabled,
                helpText: "Show or hide the WhatsApp button on your storefront",
                onChange: (e: any) => setIsEnabled(e.target.checked),
              } as any)}
            />

            {/* Save Settings Button */}
            <div style={{ marginTop: "8px" }}>
              <s-button
                variant="primary"
                onClick={() => {
                  void handleSave();
                }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </s-button>
            </div>
          </div>
        </s-section>
      </div>
    </s-page>
  );
}
