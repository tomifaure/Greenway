# Greenway

Web de catálogo responsive, sin dependencias ni compilación. Los 79 productos y 247 fotos provienen del ZIP Fast Motors Miami adjunto. No se agregaron productos ni precios.

## Ejecutar

Desde `/workspace/Greenway`:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Abrir la web mediante el servidor (no directamente como archivo): el catálogo se carga con `fetch`.

## Actualizar

- `data/catalog.json`: categorías, productos, precios USD, descripciones y variantes. Cada variante tiene nombre, color hexadecimal y ruta de imagen en `f/`.
- `data/settings.json`: WhatsApp (solo dígitos, con prefijo internacional), email y dirección de Greenway. `null` muestra «pendiente de completar». El WhatsApp del catálogo original está habilitado como contacto Greenway por indicación del usuario.
- `f/`: fotos originales del catálogo.

Los precios ausentes se muestran como pendientes. El precio financiado es el total financiado del catálogo, no una cuota. Las notas, tags, plazos y gastos de envío se conservan en la ficha detallada. `source` preserva además los campos originales de cada producto para permitir revisión y futuras actualizaciones.

La web no procesa pagos ni pedidos: la consulta se realiza por WhatsApp una vez configurado el contacto. Puede publicarse en cualquier hosting estático. No requiere servicios externos ni fuentes remotas.
