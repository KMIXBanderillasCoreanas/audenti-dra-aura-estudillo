'use client'

import { useState } from 'react'
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpDown
} from 'lucide-react'

interface InventoryItem {
  id: string
  code: string
  name: string
  category: string
  stock: number
  minStock: number
  unit: string
  supplier: string
  lastRestock: string
  status: 'optimal' | 'low' | 'critical'
}

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const items: InventoryItem[] = [
    {
      id: '1',
      code: 'INS-001',
      name: 'Anestésico Mepivacaína 3% con Epinefrina',
      category: 'Anestésicos & Farmacia',
      stock: 45,
      minStock: 20,
      unit: 'Cárpules',
      supplier: 'Depósito Dental Odontomex',
      lastRestock: '02/Oct/2026',
      status: 'optimal',
    },
    {
      id: '2',
      code: 'INS-002',
      name: 'Resina Compuesta Nanohíbrida A2 (Jeringa 4g)',
      category: 'Operatoria & Estética',
      stock: 3,
      minStock: 5,
      unit: 'Jeringas',
      supplier: '3M Dental Distribuidor',
      lastRestock: '15/Sep/2026',
      status: 'low',
    },
    {
      id: '3',
      code: 'INS-003',
      name: 'Campos Quirúrgicos Estériles Descartables',
      category: 'Bioseguridad',
      stock: 120,
      minStock: 50,
      unit: 'Unidades',
      supplier: 'BioClean Dental',
      lastRestock: '05/Oct/2026',
      status: 'optimal',
    },
    {
      id: '4',
      code: 'INS-004',
      name: 'Limas Rotatorias NiTi Conicidad ProTaper Gold',
      category: 'Endodoncia',
      stock: 2,
      minStock: 4,
      unit: 'Blisters (6pz)',
      supplier: 'Dentsply Sirona México',
      lastRestock: '20/Ago/2026',
      status: 'critical',
    },
    {
      id: '5',
      code: 'INS-005',
      name: 'Guantes de Nitrilo Morado Talla M (Caja 100pz)',
      category: 'Bioseguridad',
      stock: 8,
      minStock: 6,
      unit: 'Cajas',
      supplier: 'BioClean Dental',
      lastRestock: '28/Sep/2026',
      status: 'optimal',
    },
    {
      id: '6',
      code: 'INS-006',
      name: 'Gel Grabador Ácido Fosfórico al 37%',
      category: 'Operatoria & Estética',
      stock: 4,
      minStock: 3,
      unit: 'Jeringas',
      supplier: 'Ivoclar Vivadent',
      lastRestock: '10/Sep/2026',
      status: 'optimal',
    },
  ]

  const categories = ['all', 'Anestésicos & Farmacia', 'Operatoria & Estética', 'Bioseguridad', 'Endodoncia']

  const filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
            Control de Insumos &amp; Stock
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Inventario Dental &amp; Bioseguridad</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control de caducidades, alertas de mínimo stock y registro de reposición.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar insumo, material o código..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 text-xs border border-slate-200/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 w-64 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            + Agregar Insumo
          </button>
        </div>
      </div>

      {/* Alertas de Stock */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
            4
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">Insumos en Nivel Óptimo</span>
            <span className="text-[11px] text-slate-500">Sin riesgo de desabastecimiento</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
            1
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 block">Stock Cercano al Mínimo</span>
            <span className="text-[11px] text-amber-700">Resina Compuesta A2 por reponer</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl">
            1
          </div>
          <div>
            <span className="text-xs font-bold text-rose-900 block">Alerta Crítica</span>
            <span className="text-[11px] text-rose-700">Limas rotatorias NiTi agotándose</span>
          </div>
        </div>
      </div>

      {/* Tabla de Insumos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  categoryFilter === c
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {c === 'all' ? 'Todos' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Código / Insumo</th>
                <th className="px-6 py-3.5">Categoría</th>
                <th className="px-6 py-3.5">Stock Actual</th>
                <th className="px-6 py-3.5">Mínimo</th>
                <th className="px-6 py-3.5">Proveedor</th>
                <th className="px-6 py-3.5 text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-[11px] font-bold text-slate-500 block">{item.code}</span>
                    <span className="font-bold text-slate-900 block text-xs">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900 text-sm">{item.stock}</span>{' '}
                    <span className="text-[11px] text-slate-500">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{item.minStock} {item.unit}</td>
                  <td className="px-6 py-4 text-slate-600">{item.supplier}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.status === 'optimal'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status === 'low'
                        ? 'bg-amber-100 text-amber-900 border-amber-200'
                        : 'bg-rose-100 text-rose-900 border-rose-200 animate-pulse'
                    }`}>
                      {item.status === 'optimal' ? 'Óptimo' : item.status === 'low' ? 'Bajo' : 'Crítico'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
