// Relojes de diciembre (103 únicos). Se usa solo para la carga masiva; puedes borrar este archivo cuando termines.
const RELOJES_DICIEMBRE = [
  {
    "archivo": "cartier-01.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja dorada con bisel de cristales, esfera esqueleto negra y correa de goma negra."
  },
  {
    "archivo": "cartier-02.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja plateada con bisel de cristales, esfera esqueleto plateada y correa de goma gris."
  },
  {
    "archivo": "cartier-03.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja plateada con bisel de cristales, esfera esqueleto negra y correa de goma negra."
  },
  {
    "archivo": "cartier-04.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja negra con bisel de cristales, esfera esqueleto plateada y correa de goma negra."
  },
  {
    "archivo": "cartier-05.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja oro rosa con bisel de cristales, esfera esqueleto negra y correa de goma negra."
  },
  {
    "archivo": "cartier-06.jpg",
    "marca": "Cartier",
    "nombre": "Cartier Santos Skeleton",
    "modelo": "Santos Skeleton",
    "descripcion": "Caja oro rosa con bisel de cristales, esfera esqueleto oro rosa y correa de goma negra."
  },
  {
    "archivo": "patek-01.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja acero, esfera plateada texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-02.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja oro rosa, esfera negra texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-03.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja dorada, esfera dorada texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-04.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja dorada, esfera plateada texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-05.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja negra, esfera negra texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-06.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja dorada, esfera azul turquesa texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-07.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja acero, esfera azul turquesa texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-08.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja acero, esfera negra texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-09.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja dorada, esfera negra texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "patek-10.jpg",
    "marca": "patek",
    "nombre": "Patek Philippe Nautilus",
    "modelo": "Nautilus",
    "descripcion": "Caja oro rosa, esfera champaña texturizada con segundero pequeño y correa de goma negra."
  },
  {
    "archivo": "technomarine-01.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja acero con bisel negro, esfera negra con fecha y segundero pequeño, correa de goma negra."
  },
  {
    "archivo": "technomarine-02.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja acero con bisel negro, esfera plateada con fecha y segundero pequeño, correa de goma negra."
  },
  {
    "archivo": "technomarine-03.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada, esfera dorada con textura de olas y fecha, correa de goma blanca."
  },
  {
    "archivo": "technomarine-04.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja oro rosa con bisel negro, esfera negra con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-05.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja oro rosa con bisel negro, esfera blanca con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-06.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera dorada con fecha y segundero pequeño, correa de goma negra."
  },
  {
    "archivo": "technomarine-07.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera dorada con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-08.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja oro rosa con bisel negro, esfera plateada con fecha y segundero pequeño, correa de goma blanca."
  },
  {
    "archivo": "technomarine-09.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja negra, esfera negra con fecha y segundero pequeño, correa de goma negra."
  },
  {
    "archivo": "technomarine-10.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera negra con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-11.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera negra con fecha y segundero pequeño, correa de goma negra."
  },
  {
    "archivo": "technomarine-12.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja negra, esfera verde con fecha y segundero pequeño, correa de goma verde."
  },
  {
    "archivo": "technomarine-14.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera verde con textura de olas y fecha, correa de goma verde."
  },
  {
    "archivo": "technomarine-15.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera blanca con textura de olas y fecha, correa de goma blanca."
  },
  {
    "archivo": "technomarine-16.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera blanca con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-17.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada, esfera dorada con fecha y segundero pequeño, correa de goma blanca."
  },
  {
    "archivo": "technomarine-18.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja acero, esfera negra con textura de olas y fecha, correa de goma negra."
  },
  {
    "archivo": "technomarine-19.jpg",
    "marca": "TechnoMarine",
    "nombre": "TechnoMarine Cruise",
    "modelo": "Cruise",
    "descripcion": "Caja dorada con bisel negro, esfera plateada con fecha y segundero pequeño, correa de goma blanca."
  },
  {
    "archivo": "rolex-01.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con cristales y patrón con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-02.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con índices con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-03.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-04.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera turquesa con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-05.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números árabes con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-06.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde menta con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-07.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con cristales y patrón con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-08.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con números árabes con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-09.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera gris con números romanos con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-10.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera azul con fecha, bisel azul; caja y pulso acero."
  },
  {
    "archivo": "rolex-11.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con índices con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-12.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera plateada con fecha, bisel negro; caja y pulso acero."
  },
  {
    "archivo": "rolex-13.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con cristales y patrón con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-14.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con cristales y patrón con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-15.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-16.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera café con índices con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-17.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con números árabes con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-18.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números árabes con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-19.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-20.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con números árabes con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-22.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con índices con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-23.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con cristales y patrón con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-24.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera café con números árabes con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-25.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con números romanos con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-26.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con índices con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-27.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con índices con fecha, bisel acanalado; caja y pulso negro."
  },
  {
    "archivo": "rolex-28.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con números árabes con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-29.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera dorada con cristales y patrón con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-30.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera negra con fecha, bisel negro con números dorados; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-32.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera champaña con índices con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-34.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con índices con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-35.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números árabes con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-36.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera turquesa con índices con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-37.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con cristales y patrón con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-38.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera verde con fecha, bisel verde; caja y pulso acero."
  },
  {
    "archivo": "rolex-39.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números romanos con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-40.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con números árabes con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-41.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera turquesa con cristales y patrón con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-42.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con índices con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-43.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con índices con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-45.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul oscuro con cristales y patrón con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-46.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera café con cristales y patrón con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-47.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números árabes con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-49.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con índices con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-52.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con cristales y patrón con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-53.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números romanos con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-54.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera verde con fecha, bisel negro con números dorados; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-56.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con cristales y patrón con fecha, bisel acanalado; caja y pulso negro."
  },
  {
    "archivo": "rolex-57.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números árabes con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-58.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera azul con fecha, bisel azul con detalles dorados; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-59.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera negra con fecha, bisel negro; caja y pulso acero."
  },
  {
    "archivo": "rolex-61.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera morada con números romanos con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-62.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números romanos con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-63.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con números romanos con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-64.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con cristales y patrón con fecha, bisel acanalado; caja y pulso dorado."
  },
  {
    "archivo": "rolex-65.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números árabes con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-66.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con cristales y patrón con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-67.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera negra con fecha, bisel negro con números dorados; caja y pulso dorado."
  },
  {
    "archivo": "rolex-68.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera café con números árabes con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-69.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números romanos con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-70.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera gris con números romanos con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-71.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números árabes con fecha, bisel acanalado; caja y pulso oro rosa."
  },
  {
    "archivo": "rolex-73.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera plateada con números árabes con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-74.jpg",
    "marca": "rolex",
    "nombre": "Rolex Submariner",
    "modelo": "Submariner",
    "descripcion": "Esfera azul con fecha, bisel azul; caja y pulso dorado."
  },
  {
    "archivo": "rolex-75.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con índices con fecha, bisel acanalado; caja y pulso bicolor oro rosa."
  },
  {
    "archivo": "rolex-76.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera negra con números romanos con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-77.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera verde con números romanos con fecha, bisel acanalado; caja y pulso bicolor dorado."
  },
  {
    "archivo": "rolex-78.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera gris con números romanos con fecha, bisel acanalado; caja y pulso acero."
  },
  {
    "archivo": "rolex-79.jpg",
    "marca": "rolex",
    "nombre": "Rolex Datejust",
    "modelo": "Datejust",
    "descripcion": "Esfera azul con números árabes con fecha, bisel acanalado; caja y pulso oro rosa."
  }
];