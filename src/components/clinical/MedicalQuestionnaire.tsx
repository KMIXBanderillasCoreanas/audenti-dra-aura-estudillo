'use client'

import { useState } from 'react'
import {
  PhoneCall,
  Pill,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  Baby,
  Cigarette,
  GlassWater
} from 'lucide-react'

interface QuestionnaireData {
  // Personal
  emergency_contact_name: string
  emergency_contact_phone: string
  blood_type: string
  // Medical
  allergies: string[]
  allergy_input: string
  chronic_diseases: string[]
  disease_input: string
  current_medications: string[]
  medication_input: string
  previous_surgeries: string[]
  surgery_input: string
  // Habits
  pregnancy: boolean
  smoker: boolean
  alcohol_use: string
  // Routing
  chief_complaint: string
  pain_level: number
  assigned_specialty: string
  triage_notes: string
}

const SPECIALTIES = [
  { value: 'prevention',      label: 'Prevención General' },
  { value: 'endodontics',     label: 'Endodoncia' },
  { value: 'periodontics',    label: 'Periodoncia' },
  { value: 'orthodontics',    label: 'Ortodoncia' },
  { value: 'implantology',    label: 'Implantología' },
  { value: 'oral_surgery',    label: 'Cirugía Oral' },
  { value: 'pediatric',       label: 'Odontopediatría' },
  { value: 'aesthetic',       label: 'Estética Dental' },
  { value: 'prosthodontics',  label: 'Prótesis Dental' },
]

function TagInput({
  label, tags, inputKey, data, setData, placeholder
}: {
  label: string; tags: string[]; inputKey: string; data: QuestionnaireData;
  setData: (d: QuestionnaireData) => void; placeholder: string
}) {
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = data[inputKey as keyof QuestionnaireData] as string
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      setData({ ...data, [tags as unknown as string]: [...tags, input.trim()], [inputKey]: '' })
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">{label}</label>
      <div className="min-h-[44px] p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap gap-1.5 focus-within:ring-2 focus-within:ring-amber-400 focus-within:bg-white transition-all">
        {tags.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold">
            {tag}
            <button
              type="button"
              onClick={() => setData({ ...data, [tags as unknown as string]: tags.filter((_, j) => j !== i) })}
              className="text-amber-800 hover:text-rose-600 font-bold ml-0.5"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          value={data[inputKey as keyof QuestionnaireData] as string}
          onChange={(e) => setData({ ...data, [inputKey]: e.target.value })}
          onKeyDown={addTag}
          placeholder={tags.length === 0 ? placeholder : 'Agregar otro...'}
          className="flex-1 min-w-28 bg-transparent text-xs text-slate-900 focus:outline-none placeholder:text-slate-400"
        />
      </div>
      <p className="text-[10px] text-slate-400">Escribe y presiona Enter para agregar etiqueta</p>
    </div>
  )
}

export function MedicalQuestionnaire({ onComplete }: { onComplete?: (data: QuestionnaireData) => void }) {
  const [section, setSection] = useState(0)
  const [data, setData] = useState<QuestionnaireData>({
    emergency_contact_name: '', emergency_contact_phone: '',
    blood_type: '', allergies: ['Penicilina', 'AINE'], allergy_input: '',
    chronic_diseases: ['HTA controlada'], disease_input: '',
    current_medications: ['Losartán 50mg'], medication_input: '',
    previous_surgeries: [], surgery_input: '',
    pregnancy: false, smoker: false, alcohol_use: 'none',
    chief_complaint: 'Dolor y molestia en molar superior derecho al masticar alimentos fríos o calientes.',
    pain_level: 6, assigned_specialty: 'endodontics',
    triage_notes: 'Paciente refiere dolor pulsátil nocturno.',
  })

  const sections = [
    { title: 'Contacto', icon: PhoneCall },
    { title: 'Alergias', icon: Pill },
    { title: 'Padecimientos', icon: HeartPulse },
    { title: 'Hábitos', icon: ShieldCheck },
    { title: 'Motivo & Triaje', icon: Stethoscope },
  ]

  // Auto-suggest specialty based on chief complaint
  function suggestSpecialty(complaint: string): string {
    const c = complaint.toLowerCase()
    if (c.includes('bracket') || c.includes('ortodo') || c.includes('alineador')) return 'orthodontics'
    if (c.includes('implante') || c.includes('ausente')) return 'implantology'
    if (c.includes('dolor') && c.includes('nervio')) return 'endodontics'
    if (c.includes('encía') || c.includes('sangra')) return 'periodontics'
    if (c.includes('niño') || c.includes('infantil')) return 'pediatric'
    if (c.includes('blanqueamiento') || c.includes('estética')) return 'aesthetic'
    if (c.includes('extracción') || c.includes('muela del juicio')) return 'oral_surgery'
    if (c.includes('prótesis') || c.includes('dentadura')) return 'prosthodontics'
    return 'prevention'
  }

  function handleComplaintChange(val: string) {
    setData(prev => ({ ...prev, chief_complaint: val, assigned_specialty: suggestSpecialty(val) }))
  }

  function handleSubmit() {
    onComplete?.(data)
    alert('✅ Cuestionario de admisión clínica guardado exitosamente en el expediente.')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Section tabs */}
      <div className="bg-[#202D4C] px-6 py-4">
        <h2 className="text-base font-bold text-white mb-3 tracking-tight">Cuestionario de Admisión &amp; Triaje</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((s, i) => {
            const Icon = s.icon
            const isCurrent = section === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSection(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all ${
                  isCurrent ? 'bg-amber-400 text-slate-950 shadow-xs' : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {s.title}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Section 0: Emergency Contact */}
        {section === 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Nombre del Contacto</label>
                <input
                  value={data.emergency_contact_name}
                  onChange={e => setData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                  placeholder="María González (mamá)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Teléfono de Emergencia</label>
                <input
                  value={data.emergency_contact_phone}
                  onChange={e => setData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                  placeholder="+52 55 9988 7766"
                  type="tel"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Grupo Sanguíneo</label>
              <div className="flex flex-wrap gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Desconocido'].map(bt => (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, blood_type: bt }))}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      data.blood_type === bt
                        ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section 1: Allergies & Medications */}
        {section === 1 && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span><strong>Alerta Médica:</strong> Registra con exactitud alergias a anestésicos, látex o antibióticos para prevenir reacciones adversas en gabinete.</span>
            </div>
            <TagInput
              label="Alergias conocidas"
              tags={data.allergies}
              inputKey="allergy_input"
              data={data}
              setData={setData}
              placeholder="Penicilina, látex, AINE..."
            />
            <TagInput
              label="Medicamentos en uso"
              tags={data.current_medications}
              inputKey="medication_input"
              data={data}
              setData={setData}
              placeholder="Losartán 50mg, Aspirina..."
            />
          </div>
        )}

        {/* Section 2: Chronic conditions */}
        {section === 2 && (
          <div className="space-y-4">
            <TagInput
              label="Padecimientos sistémicos"
              tags={data.chronic_diseases}
              inputKey="disease_input"
              data={data}
              setData={setData}
              placeholder="Diabetes, HTA, marcapasos..."
            />
            <TagInput
              label="Cirugías o antecedentes"
              tags={data.previous_surgeries}
              inputKey="surgery_input"
              data={data}
              setData={setData}
              placeholder="Extracción de muelas, apéndice..."
            />
          </div>
        )}

        {/* Section 3: Habits */}
        {section === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setData(prev => ({ ...prev, pregnancy: !prev.pregnancy }))}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  data.pregnancy ? 'border-amber-400 bg-amber-50/50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Baby className="w-5 h-5 text-amber-700" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Embarazo actual</span>
                    <span className="text-[11px] text-slate-500">Restricción para radiografías</span>
                  </div>
                </div>
                <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                  data.pregnancy ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-slate-300 bg-white'
                }`}>
                  {data.pregnancy ? '✓' : ''}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setData(prev => ({ ...prev, smoker: !prev.smoker }))}
                className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  data.smoker ? 'border-amber-400 bg-amber-50/50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Cigarette className="w-5 h-5 text-slate-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Tabaquismo activo</span>
                    <span className="text-[11px] text-slate-500">Afecta cicatrización periodontal</span>
                  </div>
                </div>
                <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                  data.smoker ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-slate-300 bg-white'
                }`}>
                  {data.smoker ? '✓' : ''}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Section 4: Chief Complaint + Routing */}
        {section === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">Motivo principal de consulta</label>
              <textarea
                value={data.chief_complaint}
                onChange={e => handleComplaintChange(e.target.value)}
                rows={3}
                placeholder="Describe tu molestia principal: dolor, sangrado, estética o revisión general..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            {/* Escala de Dolor */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Nivel de dolor actual:</span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-amber-400 text-slate-950">
                  {data.pain_level} / 10
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={data.pain_level}
                onChange={e => setData(prev => ({ ...prev, pain_level: Number(e.target.value) }))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>0 Sin dolor</span>
                <span>5 Moderado</span>
                <span>10 Incontrolable</span>
              </div>
            </div>

            {/* Enrutamiento por Especialidad */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Especialidad Odontológica Asignada
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {SPECIALTIES.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setData(prev => ({ ...prev, assigned_specialty: s.value }))}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold text-left transition-all ${
                      data.assigned_specialty === s.value
                        ? 'border-amber-400 bg-amber-400 text-slate-950 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setSection(s => Math.max(0, s - 1))}
            disabled={section === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Anterior
          </button>

          {section < sections.length - 1 ? (
            <button
              type="button"
              onClick={() => setSection(s => s + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
            >
              Siguiente
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              Guardar en Expediente
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
