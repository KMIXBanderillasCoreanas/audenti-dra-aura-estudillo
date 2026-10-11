'use client'

import { useState } from 'react'
import {
  Users,
  CheckCircle2,
  UserX,
  Archive,
  Search,
  UserPlus,
  FolderOpen,
  CalendarPlus,
  MoreVertical,
  ArrowUpRight,
  Printer
} from 'lucide-react'

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const patients = [
    { initials: 'MR', name: 'Mariana Ruíz',      id: '#AUD-9821', age: 34, status: 'active',   specialty: 'Ortodoncia',       lastVisit: 'Ayer',       spent: '$24,000' },
    { initials: 'RG', name: 'Roberto Garza',      id: '#AUD-6419', age: 45, status: 'active',   specialty: 'Implantología',    lastVisit: 'Hace 3 días',spent: '$18,500' },
    { initials: 'SH', name: 'Sofía Hernández',    id: '#AUD-7711', age: 38, status: 'active',   specialty: 'Odontopediatría',  lastVisit: 'Hace 1 sem', spent: '$3,200' },
    { initials: 'CM', name: 'Carlos Mendoza',     id: '#AUD-3104', age: 29, status: 'active',   specialty: 'Cirugía Oral',     lastVisit: 'Hoy',        spent: '$5,600' },
    { initials: 'VL', name: 'Valeria López',      id: '#AUD-5502', age: 25, status: 'inactive', specialty: 'Estética',         lastVisit: 'Hace 8 meses',spent: '$1,200'},
    { initials: 'JP', name: 'Jorge Palomino',     id: '#AUD-2231', age: 52, status: 'archived', specialty: 'Prótesis',         lastVisit: 'Hace 1 año', spent: '$42,000' },
  ]

  const statusConfig: Record<string, { label: string; badge: string }> = {
    active:   { label: 'Activo',    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    inactive: { label: 'Inactivo',  badge: 'bg-rose-50 text-rose-800 border-rose-200' },
    archived: { label: 'Archivado', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  }

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
              Directorio Médico
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Directorio de Pacientes</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control integral del expediente clínico y estado de fidelización de la red.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, folio o área..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 text-xs border border-slate-200/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 w-64 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            + Registrar Paciente
          </button>
        </div>
      </div>

      {/* Pill Filters */}
      <div className="flex flex-wrap gap-2.5">
        {[
          { id: 'all', label: 'Todos', count: '248', icon: Users, color: 'text-slate-800 bg-white border-slate-200' },
          { id: 'active', label: 'Activos', count: '189', icon: CheckCircle2, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
          { id: 'inactive', label: 'Inactivos (>6m)', count: '45', icon: UserX, color: 'text-rose-800 bg-rose-50 border-rose-200' },
          { id: 'archived', label: 'Archivados', count: '14', icon: Archive, color: 'text-slate-700 bg-slate-100 border-slate-200' },
        ].map((s) => {
          const Icon = s.icon
          const isSelected = statusFilter === s.id
          return (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-2xs ${s.color} ${
                isSelected ? 'ring-2 ring-amber-400 shadow-sm' : 'hover:opacity-90'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.count} {s.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tabla con Estilo Médico */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Paciente</th>
                <th className="px-6 py-3.5">Especialidad</th>
                <th className="px-6 py-3.5">Estado</th>
                <th className="px-6 py-3.5">Última Visita</th>
                <th className="px-6 py-3.5">LTV / Gastado</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.map((p) => {
                const sc = statusConfig[p.status]
                return (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-slate-900 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-300/50">
                          {p.initials}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-snug">{p.name}</p>
                          <p className="text-[11px] text-slate-500">{p.id} • {p.age} años</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{p.specialty}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${sc.badge}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.lastVisit}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{p.spent} <span className="text-[10px] font-normal text-slate-400">MXN</span></td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <a
                          href="/dashboard/expediente"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="Abrir Expediente Clínico"
                        >
                          <FolderOpen className="w-4 h-4" />
                        </a>
                        <a
                          href={`/dashboard/patients/${p.id.replace('#', '')}/print`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-800 hover:bg-amber-50 transition-colors"
                          title="Imprimir Receta / Presupuesto Membretado"
                        >
                          <Printer className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          title="Agendar Cita"
                        >
                          <CalendarPlus className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
