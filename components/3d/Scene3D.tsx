'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Center,
  useTexture,
  Sphere,
  MeshDistortMaterial
} from '@react-three/drei'
import { Mesh } from 'three'

// =====================================================
// CONFIGURATIE SECTIE - HIER KUN JE ALLES AANPASSEN
// =====================================================

const SCENE_CONFIG = {
  // Camera instellingen
  camera: {
    position: [0, 0, 10] as [number, number, number],
    fov: 75
  },
  
  // Kleuren (gebruik je merk kleuren) - MasterClean blauw/oranje thema
  colors: {
    primary: '#2563eb',      // MasterClean blauw
    secondary: '#1e40af',    // Donker blauw
    accent: '#f97316',       // MasterClean oranje
    background: '#f8fafc'    // Lichte achtergrond
  },
  
  // PERFORMANCE OPTIMALISATIE - lagere waarden voor betere prestaties
  rotationSpeed: 0.2,       // Verminderd voor betere performance
  
  // Float animatie instellingen - geoptimaliseerd
  floatSettings: {
    speed: 0.8,              // Langzamer voor betere performance
    rotationIntensity: 0.1,  // Minder intensief
    floatIntensity: 0.3      // Minder intensief
  },
  
  // Performance instellingen
  performance: {
    enableParticles: false,   // Particles uitgeschakeld voor betere performance
    logoDetail: 'medium',     // 'low', 'medium', 'high'
    enableShadows: false,     // Schaduwen uit voor performance
    pixelRatio: Math.min(window?.devicePixelRatio || 1, 2) // Beperk pixel ratio
  }
}

// =====================================================
// 3D MASTERCLEAN LOGO COMPONENT - GEOPTIMALISEERD
// =====================================================

function MasterCleanLogo3D() {
  const logoRef = useRef<Mesh>(null!)
  const ringRef = useRef<Mesh>(null!)
  
  // Geoptimaliseerde animatie met lagere framerate impact
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (logoRef.current) {
      // Zachte rotatie voor MasterClean logo
      logoRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
      logoRef.current.rotation.y += 0.005 * SCENE_CONFIG.rotationSpeed
    }
    
    if (ringRef.current) {
      // Ring roteert in tegengestelde richting
      ringRef.current.rotation.z += 0.01 * SCENE_CONFIG.rotationSpeed
    }
  })

  // Geoptimaliseerde geometrie voor betere performance
  const logoDetail = SCENE_CONFIG.performance.logoDetail === 'high' ? [64, 32] : 
                    SCENE_CONFIG.performance.logoDetail === 'medium' ? [32, 16] : [16, 12]

  return (
    <Float {...SCENE_CONFIG.floatSettings}>
      <Center>
        <group>
          {/* MasterClean Hoofdlogo - Blauwe sphere met cleaning bubble effect */}
          <Sphere ref={logoRef} args={[1.2, ...logoDetail]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color={SCENE_CONFIG.colors.primary}
              metalness={0.3}
              roughness={0.1}
              transparent
              opacity={0.9}
            />
          </Sphere>
          
          {/* Cleaning "bubble" effecten rondom het logo */}
          <Sphere args={[0.3, 12, 8]} position={[1.8, 0.5, 0.2]}>
            <meshStandardMaterial 
              color={SCENE_CONFIG.colors.accent}
              transparent 
              opacity={0.7}
              metalness={0.1}
              roughness={0.8}
            />
          </Sphere>
          
          <Sphere args={[0.2, 12, 8]} position={[-1.5, -0.3, 0.5]}>
            <meshStandardMaterial 
              color={SCENE_CONFIG.colors.accent}
              transparent 
              opacity={0.6}
              metalness={0.1}
              roughness={0.8}
            />
          </Sphere>
          
          <Sphere args={[0.25, 12, 8]} position={[0.8, -1.2, -0.3]}>
            <meshStandardMaterial 
              color={SCENE_CONFIG.colors.accent}
              transparent 
              opacity={0.5}
              metalness={0.1}
              roughness={0.8}
            />
          </Sphere>
          
          {/* Schoonmaak ring - symboliseert reinheid */}
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[2.0, 0.05, 8, 32]} />
            <meshStandardMaterial 
              color={SCENE_CONFIG.colors.secondary}
              metalness={0.8}
              roughness={0.2}
              transparent 
              opacity={0.8}
            />
          </mesh>
          
          {/* MasterClean tekst placeholder - vervang door echte 3D tekst */}
          <group position={[0, -2.5, 0]}>
            {/* M */}
            <mesh position={[-1.5, 0, 0]}>
              <boxGeometry args={[0.15, 0.6, 0.05]} />
              <meshStandardMaterial color={SCENE_CONFIG.colors.secondary} />
            </mesh>
            <mesh position={[-1.3, 0.2, 0]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.1, 0.3, 0.05]} />
              <meshStandardMaterial color={SCENE_CONFIG.colors.secondary} />
            </mesh>
            <mesh position={[-1.1, 0.2, 0]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.1, 0.3, 0.05]} />
              <meshStandardMaterial color={SCENE_CONFIG.colors.secondary} />
            </mesh>
            <mesh position={[-0.9, 0, 0]}>
              <boxGeometry args={[0.15, 0.6, 0.05]} />
              <meshStandardMaterial color={SCENE_CONFIG.colors.secondary} />
            </mesh>
            
            {/* C */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.25, 0.08, 8, 16, Math.PI]} />
              <meshStandardMaterial color={SCENE_CONFIG.colors.accent} />
            </mesh>
            
            {/* Kleine "Clean" indicator */}
            <mesh position={[1.2, 0, 0]}>
              <sphereGeometry args={[0.1, 8, 6]} />
              <meshStandardMaterial 
                color={SCENE_CONFIG.colors.accent}
                emissive={SCENE_CONFIG.colors.accent}
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>
        </group>
      </Center>
    </Float>
  )
}

// =====================================================
// GEOPTIMALISEERDE ACHTERGROND EFFECTEN
// =====================================================

function OptimizedBackgroundEffects() {
  const particlesRef = useRef<Mesh>(null!)
  
  // Alleen animeren als particles ingeschakeld zijn
  useFrame((state) => {
    if (SCENE_CONFIG.performance.enableParticles && particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02 // Langzamer voor performance
    }
  })

  // Verminderd aantal partikels voor betere performance
  const particleCount = SCENE_CONFIG.performance.enableParticles ? 20 : 0
  const particlePositions = Array.from({ length: particleCount }, () => [
    (Math.random() - 0.5) * 15, // Kleiner gebied
    (Math.random() - 0.5) * 15,
    (Math.random() - 0.5) * 15
  ])

  if (!SCENE_CONFIG.performance.enableParticles) {
    return null // Render niets als particles uitgeschakeld zijn
  }

  return (
    <group ref={particlesRef}>
      {particlePositions.map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <sphereGeometry args={[0.015, 6, 4]} /> {/* Lagere detail voor performance */}
          <meshBasicMaterial 
            color={SCENE_CONFIG.colors.accent} 
            transparent 
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

// =====================================================
// HOOFD 3D SCENE COMPONENT
// =====================================================

interface Scene3DProps {
  className?: string
}

export default function Scene3D({ className = "" }: Scene3DProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{
          position: SCENE_CONFIG.camera.position,
          fov: SCENE_CONFIG.camera.fov
        }}
        dpr={SCENE_CONFIG.performance.pixelRatio} // Performance optimalisatie
        performance={{ min: 0.5 }} // Automatische framerate aanpassing
        style={{
          background: `linear-gradient(135deg, ${SCENE_CONFIG.colors.background} 0%, #e2e8f0 100%)`
        }}
      >
        <Suspense fallback={null}>
          {/* Geoptimaliseerde verlichting - minder lichten voor betere performance */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2}
            castShadow={SCENE_CONFIG.performance.enableShadows}
          />
          
          {/* Omgeving alleen bij hoge kwaliteit */}
          {SCENE_CONFIG.performance.logoDetail === 'high' && (
            <Environment preset="city" />
          )}
          
          {/* MasterClean 3D Logo */}
          <MasterCleanLogo3D />
          
          {/* Geoptimaliseerde achtergrond effecten */}
          <OptimizedBackgroundEffects />
          
          {/* Camera controls - gebruikers kunnen inzoomen/roteren */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxDistance={15}
            minDistance={5}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false} // Zet op true voor automatische rotatie
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// =====================================================
// INSTRUCTIES VOOR AANPASSINGEN:
// =====================================================
/*
1. LOGO VERVANGEN:
   - Vervang de LogoSphere functie door je eigen 3D-model
   - Of laad een .glb/.gltf bestand met useGLTF hook
   - Pas de Text3D aan met je bedrijfsnaam

2. KLEUREN AANPASSEN:
   - Wijzig de colors in SCENE_CONFIG
   - Gebruik je merk kleuren voor consistentie

3. ANIMATIES AANPASSEN:
   - Wijzig rotationSpeed voor snellere/langzamere rotatie
   - Pas floatSettings aan voor andere zweef-animaties
   - Zet autoRotate op true voor automatische camera rotatie

4. PRESTATIES OPTIMALISEREN:
   - Verwijder BackgroundParticles als het te zwaar is
   - Verminder het aantal particlePositions
   - Verlaag de sphereGeometry args voor minder detail

5. RESPONSIVITEIT:
   - Camera position past zich automatisch aan
   - Canvas schaalt mee met schermgrootte
   - OrbitControls werken op mobile en desktop
*/