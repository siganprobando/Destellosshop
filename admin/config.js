/* ============================================================
   PANEL DE DESTELLOS SHOP · CONFIGURACIÓN
   Este archivo es público: NUNCA pongas aquí la clave real.
   La clave real vive solo en el Apps Script (propiedad ADMIN_PIN).
   ============================================================ */
window.PANEL_CONFIG = {
  tienda: "Destellos Shop",
  // URL de la implementación de Apps Script (termina en /exec).
  // Vacía ("") = MODO DEMO con una copia de solo lectura del catálogo.
  apiUrl: "",
  // Clave SOLO para el modo demo (apiUrl vacía). En modo real no se usa.
  pin: "1234",
  vitrinaUrl: "https://siganprobando.github.io/Destellosshop/",
  categorias: ["Bodys", "Blusas", "Pantalones", "Conjuntos", "Temporada"],
  tallas: ["XS", "S", "M", "L", "XL"],
  moneda: "$",
  whatsapp: "584247419637",
  logo: "assets/logo.png",
  colores: {
    fondo: "#0d0f12", tarjeta: "#16191e", tarjeta2: "#1e2228",
    plata: ["#7d8590", "#d9dee5", "#ffffff", "#b8c0ca", "#6e7681"],
    texto: "#f3f5f8", suave: "#9aa3ad", rosa: "#ff4fa3", rosaOscuro: "#e0137f"
  }
};
