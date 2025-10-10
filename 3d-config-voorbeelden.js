// =====================================================
// 🎨 EENVOUDIGE 3D CONFIGURATIE - MASTERCLEAN
// =====================================================
// 
// Dit bestand bevat alle belangrijke instellingen voor je 3D-ervaring
// Kopieer en plak deze instellingen naar Scene3D.tsx om wijzigingen toe te passen
//

export const MASTERCLEAN_3D_CONFIG = {
  // 🎨 KLEUREN - Vervang door jouw merkidentiteit
  colors: {
    primary: '#2563eb',      // Hoofdkleur (blauw) - vervang door jouw kleur
    secondary: '#1e40af',    // Donkerdere variant - vervang door jouw kleur  
    accent: '#3b82f6',       // Accent kleur - vervang door jouw kleur
    background: '#f8fafc'    // Achtergrond gradient - vervang door jouw kleur
  },
  
  // ⚡ ANIMATIE INSTELLINGEN
  animation: {
    rotationSpeed: 0.5,           // 0 = geen rotatie, 1 = normaal, 2 = snel
    floatSpeed: 1.5,              // Snelheid van zweef-effect
    floatIntensity: 0.5,          // Sterkte van zweef-effect (0-1)
    rotationIntensity: 0.3,       // Sterkte van rotatie variatie (0-1)
    autoRotateCamera: false,      // true = camera draait automatisch rond
    cameraRotationSpeed: 0.5      // Snelheid camera rotatie (als autoRotate = true)
  },
  
  // 🔧 3D OBJECT INSTELLINGEN  
  logo: {
    size: 1.5,                    // Grootte van hoofdobject
    position: [0, 0, 0],          // X, Y, Z positie
    material: {
      metalness: 0.8,             // Hoe metaalachtig (0-1)
      roughness: 0.1,             // Hoe ruw het oppervlak (0-1)
      distort: 0.3,               // Vervorming effect (0-1)
      distortSpeed: 2             // Snelheid vervorming
    }
  },
  
  // 💫 ACHTERGROND EFFECTEN
  background: {
    showParticles: true,          // true = toon zwevende particles
    particleCount: 100,           // Aantal particles (minder = betere prestaties)
    particleOpacity: 0.6,         // Doorzichtigheid particles (0-1)
    gradientIntensity: 1          // Sterkte achtergrond gradient (0-1)
  },
  
  // 📱 RESPONSIVITEIT
  responsive: {
    disableOnMobile: true,        // true = 3D uit op mobiel voor prestaties
    reduceQualityOnMobile: true,  // true = lagere kwaliteit op mobiel
    mobileParticleCount: 20       // Minder particles op mobiel
  },
  
  // 🎯 CONTENT OVERLAY INSTELLINGEN
  overlay: {
    heroTransparency: 0.1,        // Transparantie Hero sectie (0-1)
    sectionTransparency: 0.85,    // Transparantie andere secties (0-1) 
    blurStrength: 10,             // Blur effect sterkte (px)
    textShadow: true              // Text shadow voor betere leesbaarheid
  }
}

// =====================================================
// 🚀 SNELLE PRESET CONFIGURATIES
// =====================================================

// Minimalistisch - weinig animatie, focus op content
export const PRESET_MINIMAL = {
  ...MASTERCLEAN_3D_CONFIG,
  animation: {
    ...MASTERCLEAN_3D_CONFIG.animation,
    rotationSpeed: 0.1,
    floatSpeed: 0.8,
    floatIntensity: 0.2
  },
  background: {
    ...MASTERCLEAN_3D_CONFIG.background,
    showParticles: false
  }
}

// Energiek - veel beweging en effecten  
export const PRESET_ENERGETIC = {
  ...MASTERCLEAN_3D_CONFIG,
  animation: {
    ...MASTERCLEAN_3D_CONFIG.animation,
    rotationSpeed: 1.2,
    floatSpeed: 2.5,
    floatIntensity: 0.8,
    autoRotateCamera: true
  },
  background: {
    ...MASTERCLEAN_3D_CONFIG.background,
    particleCount: 150
  }
}

// Professioneel - balans tussen effecten en leesbaarheid
export const PRESET_PROFESSIONAL = {
  ...MASTERCLEAN_3D_CONFIG,
  overlay: {
    ...MASTERCLEAN_3D_CONFIG.overlay,
    sectionTransparency: 0.95,
    textShadow: true
  },
  background: {
    ...MASTERCLEAN_3D_CONFIG.background,
    particleCount: 50,
    particleOpacity: 0.4
  }
}

// =====================================================
// 📋 INSTRUCTIES VOOR GEBRUIK:
// =====================================================
/*
1. KOPIEER de gewenste configuratie
2. PLAK in Scene3D.tsx bovenaan en vervang SCENE_CONFIG
3. HERSTART de development server (Ctrl+C en npm run dev)
4. BEKIJK het resultaat op localhost:3000

BIJVOORBEELD voor Professioneel preset:
const SCENE_CONFIG = PRESET_PROFESSIONAL

Of voor custom instellingen:
const SCENE_CONFIG = {
  ...MASTERCLEAN_3D_CONFIG,
  colors: {
    primary: '#jouw-kleur',     // Vervang door jouw kleuren
    secondary: '#jouw-kleur2',  
    accent: '#jouw-kleur3',
    background: '#jouw-achtergrond'
  }
}
*/