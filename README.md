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

## Navegación y consulta

Greenway es la empresa y Fast Motors Miami es el nombre comercial del vendedor. El horario es diario de 11 a. m. a 6 p. m., hora de Miami; contacto incluye enlace a Google Maps. `featuredIds` en settings selecciona los tres destacados. El catálogo muestra 12 productos inicialmente y permite cargar más; los separadores ilustrados aparecen al cambiar de categoría. Portada: cinco accesos, carrusel de 3 segundos con pausa y navegación, y enlace al producto visible.

Se pueden comparar hasta tres modelos de la misma categoría. Las consultas de precio llevan nombre y color a WhatsApp; los kits tienen asesoramiento específico. Los enlaces `?producto=producto-57` abren una ficha directamente. Las descripciones originales se mantienen sin cambios. No se han agregado testimonios, garantías ni afirmaciones de disponibilidad.
