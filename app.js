/* Destellos Shop · definición de la app.
   Los productos de abajo (seed) se muestran si config.js no tiene sheetId.
   Con la hoja de Google conectada, los productos y fotos vienen de Drive. */
(function () {
  const T = n => "d0000000-0000-4000-8000-00000000000" + n, C = n => "c1000000-0000-4000-8000-00000000000" + n, I = n => "a1000000-0000-4000-8000-0000000000" + String(n).padStart(2, "0");
  const ROPA = ["XS", "S", "M", "L", "XL"];
  const p = (n, cat, nombre, precio, promo, tallas, foto, desc) => ({ id: I(n), categoria_id: C(cat), nombre, descripcion: desc || "", precio: promo || precio, antes: promo ? precio : undefined, promo: !!promo, tallas: tallas.map(t => ({ t, stock: 1 })), fotos: ["img/" + foto + ".webp"], nuevo: true, activo: true, orden: n, creado: "2026-11-25T12:00:00.000Z" });
  window.APP = {
    id: "destellos-catalogo", prefix: "dst", bucket: "dst-imagenes", titulo: "Destellos Shop", icono: "✨", ownerRpc: "dst_reclamar", seedVersion: 2,
    seed: {
      cat_ajustes: [{ id: 1, datos: { nombre: "Destellos Shop", lema: "Envíos a toda Venezuela · Escríbenos por WhatsApp", subtitulo: "Catálogo de ropa", insignia: "Prendas disponibles", whatsapp: "584247419637", moneda: "$", banner: "img/portada.webp", logo: "img/logo.png", envios: "🚚 Envíos a toda Venezuela · Pago móvil o Zelle" } }],
      cat_tallas: [{ id: T(1), nombre: "Ropa", tallas: ROPA, orden: 1 }],
      cat_categorias: [
        { id: C(1), nombre: "Bodys", tallas_id: T(1), orden: 1 }, { id: C(2), nombre: "Blusas", tallas_id: T(1), orden: 2 }, { id: C(3), nombre: "Pantalones", tallas_id: T(1), orden: 3 }, { id: C(4), nombre: "Conjuntos", tallas_id: T(1), orden: 4 }, { id: C(5), nombre: "Temporada", tallas_id: T(1), orden: 5 }],
      cat_productos: [
        p(1, 1, "Body vinotinto de malla", 10, 6, ["S", "M"], "body-vinotinto", "Talla S/M"),
        p(2, 2, "Camisa blanca manga larga", 10, 6, ["S"], "camisa-blanca", "Talla S"),
        p(3, 3, "Pantalón beige ancho de vestir", 10, 8, ["S", "M"], "pantalon-beige", "Talla S/M"),
        p(4, 3, "Jeans baggy balloon", 10, 8, ["S", "M"], "jeans-baggy", "Talla S/M"),
        p(5, 4, "Conjunto deportivo marrón", 10, 8, ["S", "M"], "conjunto-marron", "Talla S/M"),
        p(6, 5, "Pijama satinada rosa de lacitos", 10, 8, ["S", "M"], "pijama-lacitos", "Talla S/M")],
      cat_pedidos: []
    },
    beforeInsert: {
      cat_pedidos(row, read) {
        const ps = read("cat_productos"); let tot = 0;
        row.items = row.items.map(it => {
          const p = ps.find(x => x.id === it.id && x.activo); if (!p) throw new Error("Un producto del pedido ya no está disponible");
          const t = (p.tallas || []).find(x => x.t === it.talla); if (!t) throw new Error("La talla " + it.talla + " no está disponible");
          if (t.stock != null && t.stock <= 0) throw new Error("La talla " + it.talla + " está agotada");
          const q = Math.max(1, Math.min(20, it.cant | 0)); tot += p.precio * q; return { id: p.id, nombre: p.nombre, precio: p.precio, talla: it.talla, cant: q };
        });
        row.total = Math.round(tot * 100) / 100; row.estado = "nuevo";
      }
    }
  };
})();
