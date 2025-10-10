# 🌟 MasterClean Website - 3D Ervaring

Je website is succesvol omgezet naar een interactieve 3D-ervaring met React Three Fiber! Hieronder vind je alle informatie om de 3D-elementen aan te passen.

## 📁 Nieuwe Bestanden & Structuur

```
components/3d/
├── Scene3D.tsx      # Hoofdcomponent voor 3D-scène
└── Layout3D.tsx     # Wrapper component voor 3D + UI

app/
├── page.tsx         # Aangepaste hoofdpagina met 3D-layout
└── globals.css      # Aangepaste CSS met 3D-optimalisaties
```

## 🎨 Aanpassingen Maken

### 1. LOGO & 3D-OBJECT VERVANGEN

In `components/3d/Scene3D.tsx` vind je de `SCENE_CONFIG` sectie:

```typescript
const SCENE_CONFIG = {
  colors: {
    primary: '#2563eb',      // 🎯 VERANDER NAAR JOUW HOOFDKLEUR
    secondary: '#1e40af',    // 🎯 VERANDER NAAR JOUW SECUNDAIRE KLEUR
    accent: '#3b82f6',       // 🎯 VERANDER NAAR JOUW ACCENT KLEUR
    background: '#f8fafc'    // 🎯 ACHTERGRONDKLEUR
  },
  
  rotationSpeed: 0.5,        // 🎯 0 = geen rotatie, 1 = normaal, 2 = snel
  
  floatSettings: {
    speed: 1.5,              // 🎯 SNELHEID VAN ZWEEF-ANIMATIE
    rotationIntensity: 0.3,  // 🎯 ROTATIE INTENSITEIT
    floatIntensity: 0.5      // 🎯 ZWEEF INTENSITEIT
  }
}
```

### 2. EIGEN 3D-MODEL TOEVOEGEN

Voor een eigen 3D-model (vervang de sphere):

1. **Plaats je .glb of .gltf bestand** in de `public/` folder
2. **Vervang de LogoSphere functie** in `Scene3D.tsx`:

```typescript
import { useGLTF } from '@react-three/drei'

function MyLogo3D() {
  const { scene } = useGLTF('/path/naar/jouw-logo.glb')
  
  return (
    <Float {...SCENE_CONFIG.floatSettings}>
      <primitive object={scene} scale={[1, 1, 1]} />
    </Float>
  )
}
```

### 3. KLEUREN AANPASSEN

🎨 **Voor jouw merkidentiteit:**

```typescript
colors: {
  primary: '#jouw-hoofdkleur',      // Bijvoorbeeld: '#ff6b35'
  secondary: '#jouw-secundaire',    // Bijvoorbeeld: '#004e89'  
  accent: '#jouw-accent',           // Bijvoorbeeld: '#00a8cc'
  background: '#jouw-achtergrond'   // Bijvoorbeeld: '#f8f9fa'
}
```

### 4. TEKST AANPASSEN

In de `LogoSphere` functie vind je de placeholder tekst:

```typescript
{/* 3D Tekst placeholder - vervang door je bedrijfsnaam */}
<mesh position={[0, -3, 0]}>
  <boxGeometry args={[3, 0.5, 0.1]} />
  <meshStandardMaterial color={SCENE_CONFIG.colors.secondary} />
</mesh>
```

**Voor echte 3D-tekst:**
1. Installeer een font converter
2. Converteer je font naar Three.js JSON formaat
3. Gebruik de `Text3D` component (uitgecommenteerd in de code)

### 5. CONTENT SECTIES AANPASSEN

In `app/page.tsx` kun je de glaseffecten per sectie instellen:

```typescript
{/* Verschillende varianten beschikbaar: */}
<ContentSection variant="transparent">  {/* Volledig transparant */}
<ContentSection variant="glass">        {/* Semi-transparant met blur */}
<ContentSection variant="solid">        {/* Volledig wit */}
```

## 🎯 Content Zichtbaarheid Verbeteren

Als tekst moeilijk leesbaar is:

### In `components/3d/Layout3D.tsx`:

```typescript
const OVERLAY_CONFIG = {
  sectionBackground: 'bg-white/90 backdrop-blur-sm',  // 🎯 Verhoog naar /95 voor meer dekking
  sectionHover: 'hover:bg-white/98 transition-all duration-300',
}
```

### In `components/Hero.tsx`:

```typescript
{/* Overlay aanpassen voor betere leesbaarheid */}
<div className="absolute inset-0 bg-white/20 backdrop-blur-[4px]" />
```

## 📱 Responsive & Prestaties

### Mobiele Optimalisatie
- 3D-interacties zijn uitgeschakeld op mobiel voor betere prestaties
- Automatische fallback naar statische achtergrond
- Touch-vriendelijke navigatie blijft behouden

### Prestatie Tips
```typescript
// In Scene3D.tsx - voor betere prestaties:
<BackgroundParticles />  // Verwijder deze regel als het te zwaar is

// Verminder particle aantal:
const particlePositions = Array.from({ length: 50 }, () => [  // Was 100
```

## 🚀 Geavanceerde Aanpassingen

### Automatische Camera Rotatie
```typescript
<OrbitControls
  autoRotate={true}      // 🎯 Zet op true
  autoRotateSpeed={0.5}  // 🎯 Pas snelheid aan
/>
```

### Verschillende 3D-scènes per Pagina
```typescript
// In Layout3D.tsx
<Layout3D showParallax={false}>  {/* Schakel 3D uit voor specifieke pagina's */}
```

### Custom Animaties Toevoegen
```typescript
// In Scene3D.tsx, in LogoSphere functie:
useFrame((state) => {
  // 🎯 Voeg eigen animaties toe:
  meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
})
```

## 🛠️ Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build voor productie  
npm start       # Start productie server
```

## 🔧 Troubleshooting

### 3D-scène laadt niet
- Controleer browser console op errors
- Zorg dat WebGL ondersteund wordt
- Ververs de pagina

### Prestatie problemen
- Verlaag het aantal particles
- Zet `autoRotate` op false
- Gebruik `variant="solid"` voor zware secties

### Tekst onleesbaar
- Verhoog de `bg-white/` waarde in OVERLAY_CONFIG
- Voeg text-shadow toe aan belangrijke teksten
- Gebruik `variant="solid"` voor kritieke content

## 📞 Support

Voor vragen over de 3D-implementatie, controleer:
1. Browser console voor error berichten
2. `components/3d/Scene3D.tsx` commentaar sectie
3. `components/3d/Layout3D.tsx` instructies

---

**🎉 Geniet van je nieuwe 3D-website ervaring!**