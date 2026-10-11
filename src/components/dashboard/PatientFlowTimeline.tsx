'use client'

import {
  Check,
  Activity,
  Armchair,
  MessageCircle,
  Clock,
  Sparkles,
  Camera,
  FileEdit,
  Scan,
  Send,
  X
} from 'lucide-react'

import { useBranchStore } from '@/stores/branchStore'

export function PatientFlowTimeline() {
  const currentBranch = useBranchStore((state) => state.getCurrentBranch())
  const patients = currentBranch.dailyMetrics.patientsFlow

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      {/* Encabezado */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Flujo de Pacientes de Hoy</h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              En vivo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Secuencia operativa en tiempo real con estatus de gabinete</p>
        </div>
      </div>

      {/* Lista de citas */}
      <div className="space-y-3">
        {patients.map((p) => {
          if (p.status === 'completed') {
            return (
              <div key={p.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3 opacity-80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500">{p.time}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">Completado</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.procedure}</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-500 block">Liquidado</span>
                  <span className="text-sm font-bold text-slate-900">{p.amount}</span>
                  <span className="text-[10px] text-slate-500 block">{p.paymentMethod}</span>
                </div>
              </div>
            )
          }

          if (p.status === 'active') {
            return (
              <div key={p.id} className="p-4.5 rounded-xl bg-amber-50/40 border-2 border-amber-300 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-amber-900">{p.time}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 animate-pulse">
                          En Sillón Ahora
                        </span>
                        <span className="text-xs text-slate-500">• {p.elapsed} transcurridos</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950 mt-1">{p.name}</h3>
                      <p className="text-xs font-medium text-slate-700">{p.procedure}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-slate-500 block">Presupuesto fase</span>
                    <span className="text-base font-bold text-slate-950">{p.amount}</span>
                    <span className="text-xs font-bold text-amber-700 block">{p.paymentMethod}</span>
                  </div>
                </div>

                {/* Acciones del paciente en sillón */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-amber-200/80">
                  <a
                    href="/dashboard/expediente"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    <Scan className="w-4 h-4 text-amber-400" />
                    Abrir Odontograma
                  </a>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-800 border border-slate-200 text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    <FileEdit className="w-4 h-4 text-slate-500" />
                    Registrar Hallazgo
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-slate-600 border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors ml-auto"
                  >
                    <Camera className="w-4 h-4 text-slate-500" />
                    Cargar Rx
                  </button>
                </div>
              </div>
            )
          }

          if (p.status === 'waiting') {
            return (
              <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Armchair className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">{p.time}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        En Sala de Espera
                      </span>
                      <span className="text-[11px] text-slate-500">{p.arrived}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">{p.name}</h3>
                    <p className="text-xs text-slate-500">{p.procedure}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors self-start md:self-center shadow-xs"
                >
                  Llamar a sillón
                </button>
              </div>
            )
          }

          return (
            <div key={p.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-200/70 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">{p.time}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                      Confirmado
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.procedure}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 italic">{p.note}</span>
            </div>
          )
        })}
      </div>

      {/* Sugerencia AI Asistente Audenti */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-slate-900">Asistente Audenti</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/60 text-amber-900 uppercase tracking-wide">
                  Optimización de Agenda
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Tienes un espacio libre de <strong>45 min a las 13:30 hrs</strong>. Se detectó a{' '}
              <strong>Claudia Serrano</strong> en lista de espera por urgencia (fractura de resina en premolar).
              ¿Deseas enviar propuesta por WhatsApp?
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Revisar y enviar propuesta
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors"
              >
                Ignorar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
