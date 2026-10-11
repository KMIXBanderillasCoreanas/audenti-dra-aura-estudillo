'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type ToothCondition =
  | 'healthy' | 'caries' | 'filled' | 'crown' | 'missing'
  | 'implant' | 'root_canal' | 'bridge' | 'fracture' | 'extraction_needed'

interface ToothState {
  condition: ToothCondition
  surfaces: {
    mesial: ToothCondition | null
    distal: ToothCondition | null
    occlusal: ToothCondition | null
    buccal: ToothCondition | null
    lingual: ToothCondition | null
  }
  notes: string
}

const CONDITIONS: { value: ToothCondition; label: string; color: string; icon: string }[] = [
  { value: 'healthy',           label: 'Sano',              color: 'bg-emerald-100 text-emerald-800 border-emerald-300',   icon: '✓' },
  { value: 'caries',           label: 'Caries',            color: 'bg-red-100 text-red-800 border-red-300',               icon: '⬤' },
  { value: 'filled',           label: 'Obturado',          color: 'bg-blue-100 text-blue-800 border-blue-300',            icon: '■' },
  { value: 'crown',            label: 'Corona',            color: 'bg-yellow-100 text-yellow-800 border-yellow-300',      icon: '♦' },
  { value: 'missing',          label: 'Ausente',           color: 'bg-gray-100 text-gray-600 border-gray-300',            icon: '✕' },
  { value: 'implant',          label: 'Implante',          color: 'bg-purple-100 text-purple-800 border-purple-300',      icon: '⊕' },
  { value: 'root_canal',       label: 'Endodoncia',        color: 'bg-orange-100 text-orange-800 border-orange-300',      icon: 'Δ' },
  { value: 'bridge',           label: 'Puente',            color: 'bg-indigo-100 text-indigo-800 border-indigo-300',      icon: '⊢' },
  { value: 'fracture',         label: 'Fractura',          color: 'bg-pink-100 text-pink-800 border-pink-300',            icon: '⚡' },
  { value: 'extraction_needed',label: 'Extracción Ind.',   color: 'bg-rose-200 text-rose-900 border-rose-400',            icon: '✖' },
]

// FDI Notation: Upper right 11-18, Upper left 21-28, Lower left 31-38, Lower right 41-48
const ADULT_TEETH = {
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
  upperLeft:  [21, 22, 23, 24, 25, 26, 27, 28],
  lowerLeft:  [31, 32, 33, 34, 35, 36, 37, 38],
  lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
}

const TOOTH_COLORS: Record<ToothCondition, string> = {
  healthy:            '#d1fae5',
  caries:             '#fecaca',
  filled:             '#bfdbfe',
  crown:              '#fef08a',
  missing:            '#f3f4f6',
  implant:            '#e9d5ff',
  root_canal:         '#fed7aa',
  bridge:             '#c7d2fe',
  fracture:           '#fbcfe8',
  extraction_needed:  '#fda4af',
}

function ToothSVG({
  number,
  state,
  isSelected,
  onClick,
}: {
  number: number
  state: ToothState
  isSelected: boolean
  onClick: () => void
}) {
  const color = TOOTH_COLORS[state.condition]
  const isLower = number >= 31

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 group"
      title={`Pieza ${number}`}
    >
      {/* Tooth number label */}
      {!isLower && (
        <span className="text-[9px] font-bold text-[#555f6f] group-hover:text-[#E3A033]">
          {number}
        </span>
      )}

      {/* SVG Tooth */}
      <svg
        width="28"
        height="40"
        viewBox="0 0 28 40"
        className={cn(
          'transition-transform group-hover:scale-110',
          isSelected && 'ring-2 ring-[#E3A033] ring-offset-1 rounded-sm'
        )}
      >
        {/* Root */}
        <path
          d={isLower
            ? 'M8 0 L6 18 L14 22 L22 18 L20 0 Z'
            : 'M8 40 L6 22 L14 18 L22 22 L20 40 Z'}
          fill="#f5deb3"
          stroke="#d4a76a"
          strokeWidth="1"
        />
        {/* Crown */}
        <rect
          x="4" y={isLower ? '18' : '2'}
          width="20" height="20"
          rx="3"
          fill={color}
          stroke={isSelected ? '#E3A033' : '#d5c4af'}
          strokeWidth={isSelected ? '2' : '1.5'}
        />
        {/* Occlusal mark */}
        {state.surfaces.occlusal && (
          <rect
            x="8" y={isLower ? '22' : '6'}
            width="12" height="12"
            rx="2"
            fill={TOOTH_COLORS[state.surfaces.occlusal]}
            opacity="0.7"
          />
        )}
        {/* Missing cross */}
        {state.condition === 'missing' && (
          <>
            <line x1="4" y1={isLower ? '18' : '2'} x2="24" y2={isLower ? '38' : '22'} stroke="#9ca3af" strokeWidth="2"/>
            <line x1="24" y1={isLower ? '18' : '2'} x2="4" y2={isLower ? '38' : '22'} stroke="#9ca3af" strokeWidth="2"/>
          </>
        )}
      </svg>

      {/* Tooth number label (lower) */}
      {isLower && (
        <span className="text-[9px] font-bold text-[#555f6f] group-hover:text-[#E3A033]">
          {number}
        </span>
      )}
    </button>
  )
}

function initTeeth(): Record<number, ToothState> {
  const all = [
    ...ADULT_TEETH.upperRight, ...ADULT_TEETH.upperLeft,
    ...ADULT_TEETH.lowerLeft,  ...ADULT_TEETH.lowerRight,
  ]
  const record: Record<number, ToothState> = {}
  for (const n of all) {
    record[n] = {
      condition: 'healthy',
      surfaces: { mesial: null, distal: null, occlusal: null, buccal: null, lingual: null },
      notes: '',
    }
  }
  return record
}

export function Odontogram() {
  const [teeth, setTeeth]             = useState<Record<number, ToothState>>(initTeeth)
  const [selected, setSelected]       = useState<number | null>(null)
  const [activeCondition, setActive]  = useState<ToothCondition>('caries')
  const [dentition, setDentition]     = useState<'adult' | 'pediatric'>('adult')

  function applyCondition(number: number) {
    setTeeth((prev) => ({
      ...prev,
      [number]: { ...prev[number], condition: activeCondition },
    }))
    setSelected(number)
  }

  const selectedTooth = selected ? teeth[selected] : null

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#e6e2da] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-headline text-[20px] font-bold text-[#1c1c17]">Odontograma Interactivo</h2>
          <p className="text-[14px] text-[#555f6f]">Haz clic en una pieza para registrar su estado</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDentition('adult')}
            className={cn('px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors',
              dentition === 'adult' ? 'bg-[#E3A033] text-[#121c2a]' : 'bg-[#f7f3eb] text-[#555f6f]'
            )}
          >
            Adulto
          </button>
          <button
            onClick={() => setDentition('pediatric')}
            className={cn('px-3 py-1.5 rounded-lg text-[12px] font-bold transition-colors',
              dentition === 'pediatric' ? 'bg-[#E3A033] text-[#121c2a]' : 'bg-[#f7f3eb] text-[#555f6f]'
            )}
          >
            Pediátrico
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#202D4C] text-white text-[12px] font-bold hover:opacity-90">
            <span className="material-symbols-outlined text-[16px] mr-1">save</span>
            Guardar
          </button>
        </div>
      </div>

      {/* Condition Palette */}
      <div className="px-5 py-3 bg-[#f7f3eb] border-b border-[#e6e2da]">
        <p className="text-[11px] font-semibold uppercase text-[#555f6f] mb-2">Seleccionar condición:</p>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={cn(
                'px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all',
                c.color,
                activeCondition === c.value && 'ring-2 ring-[#E3A033] ring-offset-1 scale-105'
              )}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Odontogram Grid */}
      <div className="p-5 space-y-4">
        {/* Upper jaw */}
        <div className="space-y-1">
          <p className="text-center text-[10px] font-bold uppercase text-[#555f6f] tracking-wider">Maxilar Superior</p>
          <div className="flex justify-center items-end gap-1">
            {/* Upper Right (patient's right = left on screen) */}
            {ADULT_TEETH.upperRight.map((n) => (
              <ToothSVG key={n} number={n} state={teeth[n]} isSelected={selected === n} onClick={() => applyCondition(n)} />
            ))}
            <div className="w-px h-10 bg-[#d5c4af] mx-1 self-end" />
            {/* Upper Left */}
            {ADULT_TEETH.upperLeft.map((n) => (
              <ToothSVG key={n} number={n} state={teeth[n]} isSelected={selected === n} onClick={() => applyCondition(n)} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 py-1">
          <div className="flex-1 border-t-2 border-dashed border-[#d5c4af]" />
          <span className="text-[10px] font-bold text-[#837563] uppercase tracking-widest">Línea media</span>
          <div className="flex-1 border-t-2 border-dashed border-[#d5c4af]" />
        </div>

        {/* Lower jaw */}
        <div className="space-y-1">
          <div className="flex justify-center items-start gap-1">
            {ADULT_TEETH.lowerRight.slice().reverse().map((n) => (
              <ToothSVG key={n} number={n} state={teeth[n]} isSelected={selected === n} onClick={() => applyCondition(n)} />
            ))}
            <div className="w-px h-10 bg-[#d5c4af] mx-1 self-start" />
            {ADULT_TEETH.lowerLeft.map((n) => (
              <ToothSVG key={n} number={n} state={teeth[n]} isSelected={selected === n} onClick={() => applyCondition(n)} />
            ))}
          </div>
          <p className="text-center text-[10px] font-bold uppercase text-[#555f6f] tracking-wider">Maxilar Inferior</p>
        </div>
      </div>

      {/* Selected tooth detail panel */}
      {selected && selectedTooth && (
        <div className="border-t border-[#e6e2da] p-5 bg-[#f7f3eb]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-headline text-[16px] font-bold text-[#1c1c17]">
              Pieza {selected} — {CONDITIONS.find(c => c.value === selectedTooth.condition)?.label}
            </h3>
            <button
              onClick={() => {
                setTeeth(prev => ({
                  ...prev,
                  [selected]: { ...prev[selected], condition: 'healthy',
                    surfaces: { mesial: null, distal: null, occlusal: null, buccal: null, lingual: null },
                    notes: '' }
                }))
              }}
              className="text-[11px] font-bold text-red-600 hover:underline"
            >
              Limpiar pieza
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-[#555f6f] mb-1">
                Notas clínicas
              </label>
              <textarea
                value={selectedTooth.notes}
                onChange={(e) => setTeeth(prev => ({
                  ...prev,
                  [selected]: { ...prev[selected], notes: e.target.value }
                }))}
                className="w-full bg-white rounded-lg border border-[#d5c4af] px-3 py-2 text-[13px] text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-[#E3A033] resize-none"
                rows={3}
                placeholder="Observaciones de la pieza..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold uppercase text-[#555f6f] mb-1">
                Superficies afectadas
              </label>
              {(['mesial', 'distal', 'occlusal', 'buccal', 'lingual'] as const).map((surface) => (
                <div key={surface} className="flex items-center justify-between">
                  <span className="text-[12px] text-[#514535] capitalize">{surface}</span>
                  <select
                    value={selectedTooth.surfaces[surface] ?? ''}
                    onChange={(e) => setTeeth(prev => ({
                      ...prev,
                      [selected]: {
                        ...prev[selected],
                        surfaces: { ...prev[selected].surfaces, [surface]: e.target.value || null }
                      }
                    }))}
                    className="bg-white border border-[#d5c4af] rounded px-2 py-0.5 text-[11px] text-[#1c1c17] focus:outline-none"
                  >
                    <option value="">— sano —</option>
                    {CONDITIONS.slice(1).map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="border-t border-[#e6e2da] px-5 py-3">
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <span key={c.value} className={cn('px-2 py-0.5 rounded border text-[10px] font-bold', c.color)}>
              {c.icon} {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
