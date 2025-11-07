const EMAILJS_CONFIG = {
  SERVICE_ID: "service_76h397n",
  TEMPLATE_ID_SENDER: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SENDER || "",
  TEMPLATE_ID_RECEIVER: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_RECEIVER || "",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
};
if (
  !EMAILJS_CONFIG.SERVICE_ID ||
  !EMAILJS_CONFIG.TEMPLATE_ID_SENDER ||
  !EMAILJS_CONFIG.TEMPLATE_ID_RECEIVER ||
  !EMAILJS_CONFIG.PUBLIC_KEY
) {
  console.error(
    "Erro: Variáveis de ambiente do EmailJS não estão configuradas corretamente. Verifique seu arquivo .env.local"
  );
}

export default EMAILJS_CONFIG;
