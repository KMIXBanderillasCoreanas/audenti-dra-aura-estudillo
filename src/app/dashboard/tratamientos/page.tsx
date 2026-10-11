'use client'

import { useState } from 'react'
import {
  Stethoscope,
  Plus,
  Search,
  DollarSign,
  Clock,
  Sparkles,
  Tag,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react'

interface TreatmentItem {
  id: string
  code: string
  name: string
  category: string
  price: number
  costEstimate: number
  durationMin: number
  commissionPct: number
  description: string
  active: boolean
}

export default function TratamientosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCat, setSelectedCat] = useState('all')

  const treatments: TreatmentItem[] = [
    {
      id: '1',
      code: 'TX-PR01',
      name: 'Profilaxis Dental Profunda & Detartraje Ultrasónico',
      category: 'Prevención',
      price: 1200,
      costEstimate: 180,
      durationMin: 45,
      commissionPct: 8,
      description: 'Remoción de cálculo supragingival y pulido con pasta fluorada profiláctica.',
      active: true,
    },
    {
      id: '2',
      code: 'TX-EN02',
      name: 'Biopulpectomía / Endodoncia Multirradicular',
      category: 'Endodoncia',
      price: 3800,
      costEstimate: 650,
      durationMin: 75,
      commissionPct: 7,
      description: 'Instrumentación rotatoria mecanizada, irrigación con NaOCl y obturación termoplástica.',
      active: true,
    },
    {
      id: '3',
      code: 'TX-OR01',
      name: 'Paquete Tratamiento Ortodoncia con Alineadores Invisibles',
      category: 'Ortodoncia',
      price: 24000,
      costEstimate: 8500,
      durationMin: 60,
      commissionPct: 6,
      description: 'Planificación digital 3D y entrega seriada de férulas activas de movimiento.',
      active: true,
    },
    {
      id: '4',
      code: 'TX-IM01',
      name: 'Colocación Quirúrgica de Implante de Titanio',
      category: 'Implantología',
      price: 18500,
      costEstimate: 5200,
      durationMin: 90,
      commissionPct: 7,
      description: 'Fase quirúrgica con fresado guiado e inserción de fijación oseointegrable.',
      active: true,
    },
    {
      id: '5',
      code: 'TX-PR03',
      name: 'Corona de Zirconio Monolítico CAD/CAM',
      category: 'Prótesis',
      price: 7000,
      costEstimate: 2100,
      durationMin: 60,
      commissionPct: 8,
      description: 'Escaneo intraoral, fresado robótico y cementación adhesiva de alta resistencia.',
      active: true,
    },
    {
      id: '6',
      code: 'TX-ES01',
      name: 'Blanqueamiento Dental LED en Sillón',
      category: 'Estética',
      price: 3200,
      costEstimate: 500,
      durationMin: 60,
      commissionPct: 10,
      description: 'Aplicación de peróxido de hidrógeno al 35% activado por luz LED en 3 ciclos.',
      active: true,
    },
  ]

  const categories = ['all', 'Prevención', 'Endodoncia', 'Ortodoncia', 'Implantología', 'Prótesis', 'Estética']

  const filtered = treatments.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCat === 'all' || t.category === selectedCat
    return matchesSearch && matchesCat
  })

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Catálogo Clínico
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Tratamientos &amp; Lista de Precios</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control de aranceles, insumos estimados y márgenes de comisión profesional.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar procedimiento o código..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 text-xs border border-slate-200/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 w-64 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            + Nuevo Tratamiento
          </button>
        </div>
      </div>

      {/* Filtros de Categoría */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedCat === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Todos los Servicios' : cat}
          </button>
        ))}
      </div>

      {/* Grid de Tratamientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {t.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  {t.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{t.name}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Arancel Paciente</span>
                  <span className="text-xl font-bold text-slate-900">${t.price.toLocaleString('es-MX')} <span className="text-xs font-normal text-slate-500">MXN</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Comisión Dr.</span>
                  <span className="text-sm font-bold text-amber-700">{t.commissionPct}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {t.durationMin} min
                </span>
                <span>Costo insumo: ~${t.costEstimate} MXN</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
