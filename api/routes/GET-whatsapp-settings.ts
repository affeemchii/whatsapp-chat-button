import { RouteContext } from "gadget-server";

/**
 * Route handler for GET /whatsapp-settings
 * Serves settings for the storefront script.
 */
export default async function route({ request, reply, api, logger }: RouteContext) {
  // Set CORS headers so storefront can access this endpoint cross-origin
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "GET");
  reply.header("Content-Type", "application/json");

  try {
    // 1. IDENTIFY THE SHOP
    // Extract shop domain from query parameters or request headers
    const query = (request.query || {}) as Record<string, any>;
    const shopQuery = query.shop;
    const shopHeader = request.headers["x-shopify-shop-domain"];
    const shopDomain = (shopQuery || shopHeader) as string;

    if (!shopDomain) {
      await reply.send({ isEnabled: false });
      return;
    }

    // 2. FIND THE SHOP RECORD
    const shopRecord = await api.shopifyShop.findFirst({
      filter: { domain: { equals: shopDomain } }
    });

    if (!shopRecord) {
      await reply.send({ isEnabled: false });
      return;
    }

    // 3. FIND THE SETTINGS
    const settings = await api.shopSetting.findFirst({
      filter: { shop: { equals: shopRecord.id } } as any
    });

    if (!settings) {
      await reply.send({ isEnabled: false });
      return;
    }

    // 4. RETURN THE RESPONSE
    await reply.send({
      isEnabled: settings.isEnabled,
      whatsappNumber: settings.whatsappNumber,
      buttonColor: settings.buttonColor,
      buttonPosition: settings.buttonPosition
    });
  } catch (error) {
    logger.error({ error }, "Error serving WhatsApp settings");
    await reply.send({ isEnabled: false });
  }
}
