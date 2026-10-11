'use client'

import { useState } from 'react'
import {
  Users,
  UserPlus,
  MessageCircle,
  Calendar,
  Award,
  X
} from 'lucide-react'

interface FamilyMember {
  id: string
  name: string
  relationship: string
  age: number
  lastVisit: string
  hasActiveTreatment: boolean
}

export function FamilyNucleusManager({ patientName = 'Mateo Morales Ruiz' }: { patientName?: string }) {
  const [nucleusName, setNucleusName] = useState('Familia Morales Ruiz')
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Mateo Morales Ruiz', relationship: 'Titular / Paciente', age: 32, lastVisit: 'Hoy (En Sillón)', hasActiveTreatment: true },
    { id: '2', name: 'Sofía Hernández (Esposa)', relationship: 'Cónyuge', age: 31, lastVisit: 'Hace 2 semanas', hasActiveTreatment: false },
    { id: '3', name: 'Mateo Morales Jr.', relationship: 'Hijo', age: 8, lastVisit: 'Hace 1 mes', hasActiveTreatment: true },
    { id: '4', name: 'Elena Ruiz (Mamá)', relationship: 'Madre', age: 58, lastVisit: 'Hace 6 meses (Pendiente)', hasActiveTreatment: false },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newMember, setNewMember] = useState({ name: '', relationship: 'Hijo', age: '' })

  const addMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMember.name) return
    setMembers(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newMember.name,
        relationship: newMember.relationship,
        age: Number(newMember.age) || 0,
        lastVisit: 'Sin visitas registradas',
        hasActiveTreatment: false
      }
    ])
    setNewMember({ name: '', relationship: 'Hijo', age: '' })
    setShowAddModal(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Núcleo Familiar &amp; Árbol Genealógico</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Vinculado a: <strong className="text-slate-800 font-bold">{nucleusName}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors shadow-xs"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Vincular Familiar
        </button>
      </div>

      {/* Árbol / Tarjetas de Miembros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {members.map((m) => (
          <div key={m.id} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start justify-between gap-3 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {m.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{m.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {m.relationship}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{m.age > 0 ? `${m.age} años • ` : ''}Última cita: {m.lastVisit}</p>
                {m.hasActiveTreatment ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Tratamiento activo
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Sin tratamiento en curso</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <button type="button" className="p-1.5 rounded-lg hover:bg-white text-slate-500 transition-colors" title="Abrir Chat Familiar">
                <MessageCircle className="w-4 h-4" />
              </button>
              <button type="button" className="p-1.5 rounded-lg hover:bg-white text-slate-500 transition-colors" title="Agendar Cita">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Beneficio de Grupo Familiar */}
      <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-700 shrink-0" />
          <div>
            <span className="text-xs font-bold text-slate-900 block">Plan Preventivo Familiar AUDENTI</span>
            <span className="text-[11px] text-slate-600">3 de 4 miembros tienen profilaxis cubierta con 15% de descuento compartido en sucursal.</span>
          </div>
        </div>
        <button type="button" className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shrink-0 transition-colors shadow-xs">
          Gestionar Saldo
        </button>
      </div>

      {/* Modal Agregar Familiar */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900">Vincular Familiar</h4>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={addMember} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Nombre Completo</label>
                <input
                  required
                  value={newMember.name}
                  onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Ej. Carmen Morales"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Parentesco</label>
                  <select
                    value={newMember.relationship}
                    onChange={e => setNewMember({ ...newMember, relationship: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
                  >
                    <option value="Cónyuge">Cónyuge</option>
                    <option value="Hijo">Hijo/a</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Hermano">Hermano/a</option>
                    <option value="Abuelo">Abuelo/a</option>
                    <option value="Tutor">Tutor Legal</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Edad</label>
                  <input
                    type="number"
                    value={newMember.age}
                    onChange={e => setNewMember({ ...newMember, age: e.target.value })}
                    placeholder="Ej. 12"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 shadow-xs"
                >
                  Guardar Familiar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
