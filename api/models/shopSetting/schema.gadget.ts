import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopSetting" model, go to https://whatsapp-chat-button.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v2",
  storageKey: "JDQTfOyNb4EJ",
  fields: {
    businessHours: { type: "json", storageKey: "lcZy_gqv0oIa" },
    buttonColor: {
      type: "string",
      default: "#25D366 ",
      storageKey: "clmdTbOtgD-M",
    },
    buttonPosition: {
      type: "string",
      default: "bottom-right",
      storageKey: "eVUfd0AfrnP9",
    },
    isEnabled: {
      type: "boolean",
      default: true,
      storageKey: "_O1AYx2qO-La",
    },
    shop: {
      type: "belongsTo",
      parent: { model: "shopifyShop" },
      storageKey: "ptCKudpydPqT",
    },
    whatsappNumber: { type: "string", storageKey: "VSYY2dHn0VcP" },
  },
};
