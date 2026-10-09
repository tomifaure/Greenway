# Greenway

Web de catálogo responsive, sin dependencias ni compilación. Los 79 productos y 247 fotos provienen del ZIP Fast Motors Miami adjunto. No se agregaron productos ni precios.

## Ejecutar

Desde `/workspace/Greenway`:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Abrir la web mediante el servidor (no directamente como archivo): el catálogo se carga con `fetch`.

## Actualizar

- `data/catalog.json`: categorías, productos, orden relativo de precios, descripciones y variantes. Cada variante tiene nombre, color hexadecimal y ruta de imagen en `f/`.
- `data/settings.json`: WhatsApp (solo dígitos, con prefijo internacional), email y dirección de Greenway. `null` muestra «pendiente de completar». El WhatsApp del catálogo original está habilitado como contacto Greenway por indicación del usuario.
- `f/`: fotos originales del catálogo.

Los precios se consultan por WhatsApp. No se publican importes, aranceles ni destinos de envío. Las fichas conservan especificaciones, tipos de batería y plazos indicados; `source` conserva los campos técnicos originales.

La web no procesa pagos ni pedidos: la consulta se realiza por WhatsApp una vez configurado el contacto. Puede publicarse en cualquier hosting estático. No requiere servicios externos ni fuentes remotas.

## Presentación comercial

Los importes fueron eliminados del catálogo público. `priceOrder` guarda solo un índice relativo para ordenar productos; no contiene el precio. Para actualizar el orden, modificar esos índices. El rendimiento orientativo de los seis kits solares está en `performance`. Contacto: Fast Motors Miami, WhatsApp +1 (754) 267-2265, 7929 NE 1st Ave, Miami, FL 33138-4305, United States. Las ilustraciones decorativas SVG originales están en `assets/`.

La presentación incluye acentos rojos, azules y blancos, bandera en portada y franjas ilustradas de La Habana, playas y Viñales cada nueve productos visibles. Las 12 bicis y dirt bikes tienen `shippingNotice` para anunciar envíos a Cuba y EE. UU. en tarjetas y fichas, por instrucción del usuario.
