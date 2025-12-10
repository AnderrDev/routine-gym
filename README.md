# Gym Routine App 💪

Aplicación web moderna para visualizar rutinas de entrenamiento semanales y diarias, diseñada con enfoque mobile-first y arquitectura hexagonal.

## 🚀 Características

- **Vista Semanal**: Visualización de los 7 días de rutina con indicador del día actual
- **Vista Diaria**: Detalle completo de ejercicios con series y reps
- **Diseño Mobile-First**: Optimizado para dispositivos móviles
- **Arquitectura Hexagonal**: Código limpio y mantenible
- **Persistencia Local**: Guardado automático en localStorage
- **Diseño Moderno**: Paleta de colores tipo gimnasio con efectos visuales

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript**
- **Vite** - Build tool rápido
- **Tailwind CSS** - Estilos modernos y responsive
- **Arquitectura Hexagonal** - Separación de capas (Domain, Application, Infrastructure)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🏗️ Arquitectura

```
src/
├── domain/              # Capa de dominio (núcleo)
│   ├── entities/        # Entidades de negocio
│   └── ports/           # Interfaces/contratos
├── application/         # Casos de uso
│   └── services/
├── infrastructure/      # Implementaciones concretas
│   ├── persistence/     # localStorage
│   └── ui/              # Componentes React
└── shared/              # Utilidades compartidas
    └── constants/       # Rutina por defecto
```

## 🎨 Diseño

- **Fondo principal**: Negro profundo (#0a0a0a)
- **Cards**: Gris oscuro (#1a1a1a) con efecto glassmorphism
- **Acento primario**: Rojo intenso (#ff4444)
- **Acento secundario**: Naranja (#ff6b35)
- **Responsive**: Mobile-first con breakpoints para tablets y desktop

## 📱 Características Mobile

- Diseño optimizado para pantallas pequeñas
- Botones con tamaño mínimo táctil (44px)
- Tipografía escalable
- Navegación intuitiva con gestos
- Sin zoom accidental en inputs

## 📋 Rutina Incluida

La aplicación incluye una rutina de 7 días (DEFINICIÓN + MASA):
- Día 1: PUSH (Pecho, Hombro, Tríceps)
- Día 2: PULL PESADO (Espalda, Bíceps)
- Día 3: PIERNA (Cuádriceps dominante)
- Día 4: HOMBRO + ABDOMEN
- Día 5: PULL METABÓLICO (Espalda + Brazos)
- Día 6: PIERNA (Femoral + Glúteo)
- Día 7: FULL BODY METABÓLICO + CORE

## 🔧 Desarrollo

El proyecto sigue principios de código limpio y arquitectura hexagonal:
- **Domain**: Lógica de negocio pura, sin dependencias externas
- **Application**: Casos de uso y servicios
- **Infrastructure**: Implementaciones concretas (UI, persistencia)

## 📄 Licencia

MIT

