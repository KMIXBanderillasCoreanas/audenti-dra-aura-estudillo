'use client'

import { useState } from 'react'
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
  CheckCircle2,
  AlertCircle,
  Video,
  Phone,
  Filter,
  Volume2,
  VolumeX,
  History,
  Activity,
  CalendarDays,
  Sparkles,
  AlertTriangle,
  UserCheck
} from 'lucide-react'
import { useNotificationSound } from '@/hooks/useNotificationSound'

type TimeHorizon = 'present' | 'past' | 'future'

interface ClinicalAppointment {
  id: string
  date: string
  time: string
  duration: string
  patientName: string
  phone: string
  treatment: string
  doctor: string
  chair: string
  status: 'completed' | 'in_chair' | 'in_waiting' | 'scheduled' | 'no_show' | 'canceled'
  notes?: string
  commissionDue?: number
}

export default function CalendarPage() {
  const { soundEnabled, setSoundEnabled, playTone } = useNotificationSound()

  const [horizon, setHorizon] = useState<TimeHorizon>('present')
  const [chairFilter, setChairFilter] = useState('all')
  const [doctorFilter, setDoctorFilter] = useState('all')

  // Citas agrupadas por Horizonte Temporal
  const appointments: ClinicalAppointment[] = [
    // PRESENTE (Hoy - Sillón en tiempo real)
    {
      id: 'app-now-1',
      date: 'Hoy (10 Oct 2026)',
      time: '10:00 - 11:15',
      duration: '75 min',
      patientName: 'Mateo Morales Ruiz',
      phone: '+52 55 4444 8821',
      treatment: 'Biopulpectomía Pza 16 (Endodoncia mecanizada)',
      doctor: 'Dr. Cortés',
      chair: 'Gabinete 1',
      status: 'in_chair',
      notes: 'Instrumentación rotatoria con limas NiTi. Paciente con anestesia tópica e infiltrativa.',
      commissionDue: 266,
    },
    {
      id: 'app-now-2',
      date: 'Hoy (10 Oct 2026)',
      time: '11:30 - 12:15',
      duration: '45 min',
      patientName: 'Daniela Montes',
      phone: '+52 55 9988 1122',
      treatment: 'Revisión Brackets / Cambio de arcos NiTi .016',
      doctor: 'Dr. Ramírez López',
      chair: 'Gabinete 2',
      status: 'in_waiting',
      notes: 'Llegó a recepción hace 10 min. Consentimiento firmado.',
      commissionDue: 90,
    },
    {
      id: 'app-now-3',
      date: 'Hoy (10 Oct 2026)',
      time: '09:00 - 09:45',
      duration: '45 min',
      patientName: 'Laura Patricia Vega',
      phone: '+52 55 1234 5678',
      treatment: 'Profilaxis Profunda Ultrasónica',
      doctor: 'Dra. Sofía Valero',
      chair: 'Gabinete 1',
      status: 'completed',
      notes: 'Procedimiento finalizado sin incidencias. Pagado vía Terminal.',
      commissionDue: 96,
    },

    // PASADO (Historial Inmutable & Comisiones)
    {
      id: 'app-past-1',
      date: 'Ayer (09 Oct 2026)',
      time: '16:00 - 17:30',
      duration: '90 min',
      patientName: 'Roberto Garza',
      phone: '+52 55 6419 7788',
      treatment: 'Fase Quirúrgica Implante Pza 36',
      doctor: 'Dra. Gutiérrez',
      chair: 'Quirófano',
      status: 'completed',
      notes: 'Oseointegración en curso. Rx de control periapical archivada.',
      commissionDue: 1295,
    },
    {
      id: 'app-past-2',
      date: '08 Oct 2026',
      time: '11:00 - 11:45',
      duration: '45 min',
      patientName: 'Jorge Palomino',
      phone: '+52 55 2231 9900',
      treatment: 'Ajuste de Prótesis Removible',
      doctor: 'Dra. Sofía Valero',
      chair: 'Gabinete 2',
      status: 'no_show',
      notes: 'Inasistencia sin previo aviso. Registrado en el expediente clínico para penalización preventiva.',
      commissionDue: 0,
    },

    // FUTURO (Programación & Citas Recurrentes)
    {
      id: 'app-future-1',
      date: 'Lunes (12 Oct 2026)',
      time: '09:30 - 10:30',
      duration: '60 min',
      patientName: 'Mariana Cordero',
      phone: '+52 55 8811 2233',
      treatment: 'Cementación Corona Zirconio Monolítico Pza 25',
      doctor: 'Dra. Sofía Valero',
      chair: 'Gabinete 1',
      status: 'scheduled',
      notes: 'Pieza de laboratorio en tránsito confirmada por mensajería.',
      commissionDue: 490,
    },
    {
      id: 'app-future-2',
      date: 'Martes (13 Oct 2026)',
      time: '15:00 - 16:00',
      duration: '60 min',
      patientName: 'Carlos Mendoza',
      phone: '+52 55 3104 6677',
      treatment: 'Retiro de Puntos & Control Post-Extracción',
      doctor: 'Dra. Gutiérrez',
      chair: 'Gabinete 2',
      status: 'scheduled',
      notes: 'Llamada postoperatoria de 48 hrs con evolución favorable.',
      commissionDue: 0,
    },
  ]

  // Filtrado de citas
  const filteredAppointments = appointments.filter(app => {
    const matchesChair = chairFilter === 'all' || app.chair === chairFilter
    const matchesDoctor = doctorFilter === 'all' || app.doctor.includes(doctorFilter)

    if (horizon === 'present') {
      return (app.status === 'in_chair' || app.status === 'in_waiting' || app.id.startsWith('app-now')) && matchesChair && matchesDoctor
    } else if (horizon === 'past') {
      return (app.status === 'completed' || app.status === 'no_show' || app.status === 'canceled' || app.id.startsWith('app-past')) && matchesChair && matchesDoctor
    } else {
      return (app.status === 'scheduled' || app.id.startsWith('app-future')) && matchesChair && matchesDoctor
    }
  })

  // Simular llamado de paciente con alerta sonora
  const handleCallToChair = (patientName: string) => {
    playTone('arrival')
    alert(`📢 Alerta enviada: ${patientName} ha sido llamado a Gabinete.`)
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-12">
      {/* Header y Control de Alertas Sonoras */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wide">
              Calendario Médico Clínico
            </span>
            <span className="text-slate-500 text-xs">• Control Temporal Tridimensional</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestión de Citas (Pasado, Presente &amp; Futuro)</h1>
          <p className="text-xs text-slate-500 mt-0.5">Control de sillón en tiempo real, historial inmutable de auditoría y agendamiento sin colisiones.</p>
        </div>

        {/* Botón de Sonido Web Audio & Crear Cita */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              if (!soundEnabled) playTone('arrival')
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Tono de Notificación: {soundEnabled ? 'Activo' : 'Silencio'}</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            + Agendar Cita
          </button>
        </div>
      </div>

      {/* Selector de Horizontes Temporales (Pasado, Presente, Futuro) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Presente */}
        <button
          type="button"
          onClick={() => setHorizon('present')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            horizon === 'present'
              ? 'bg-white border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
              : 'bg-slate-50/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">1. Tiempo Presente</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Sillón en Vivo &amp; Recepción</h3>
          <p className="text-xs text-slate-500 mt-1">Pacientes en gabinete ahora, llamados de sala de espera y cierres de turno.</p>
        </button>

        {/* Pasado */}
        <button
          type="button"
          onClick={() => setHorizon('past')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            horizon === 'past'
              ? 'bg-white border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
              : 'bg-slate-50/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">2. Tiempo Pasado</span>
            <History className="w-4 h-4 text-slate-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Historial Inmutable &amp; Logs</h3>
          <p className="text-xs text-slate-500 mt-1">Procedimientos completados, penalización de No-Shows y cálculo de comisiones.</p>
        </button>

        {/* Futuro */}
        <button
          type="button"
          onClick={() => setHorizon('future')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            horizon === 'future'
              ? 'bg-white border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
              : 'bg-slate-50/70 border-slate-200 hover:bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">3. Tiempo Futuro</span>
            <CalendarDays className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Agendamiento &amp; Recurrencia</h3>
          <p className="text-xs text-slate-500 mt-1">Programación preventiva, detección de colisiones de horario y citas de laboratorio.</p>
        </button>
      </div>

      {/* Barra de Filtros por Doctor y Gabinete */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Filtrar Gabinete:</span>
          {['all', 'Gabinete 1', 'Gabinete 2', 'Quirófano'].map(g => (
            <button
              key={g}
              onClick={() => setChairFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                chairFilter === g
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {g === 'all' ? 'Todos los Gabinetes' : g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Especialista:</span>
          <select
            value={doctorFilter}
            onChange={e => setDoctorFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="all">Todos los Especialistas</option>
            <option value="Valero">Dra. Sofía Valero</option>
            <option value="Ramírez">Dr. Ramírez (Ortodoncia)</option>
            <option value="Cortés">Dr. Cortés (Endodoncia)</option>
            <option value="Gutiérrez">Dra. Gutiérrez (Cirugía)</option>
          </select>
        </div>
      </div>

      {/* Lista de Citas del Horizonte Seleccionado */}
      <div className="space-y-3">
        {filteredAppointments.map(app => {
          return (
            <div
              key={app.id}
              className={`p-5 rounded-2xl border transition-all bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                app.status === 'in_chair'
                  ? 'border-amber-300 ring-2 ring-amber-400/50 bg-amber-50/20'
                  : app.status === 'no_show'
                  ? 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-28 text-center shrink-0">
                  <span className="text-xs font-bold text-slate-500 block">{app.date}</span>
                  <span className="text-sm font-bold text-slate-900 block font-mono">{app.time}</span>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {app.chair}
                  </span>
                </div>

                <div className="h-14 w-px bg-slate-100 hidden lg:block" />

                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{app.patientName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      app.status === 'in_chair'
                        ? 'bg-amber-400 text-slate-950 border-amber-500 animate-pulse'
                        : app.status === 'in_waiting'
                        ? 'bg-blue-100 text-blue-900 border-blue-200'
                        : app.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : app.status === 'no_show'
                        ? 'bg-rose-100 text-rose-900 border-rose-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {app.status === 'in_chair' ? '⚡ En Sillón Ahora' :
                       app.status === 'in_waiting' ? '⏳ En Sala de Espera' :
                       app.status === 'completed' ? '✓ Completada' :
                       app.status === 'no_show' ? '✕ No-Show (Inasistencia)' : '📅 Programada'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-amber-900">{app.treatment}</p>
                  <p className="text-[11px] text-slate-600">
                    Doctor asignado: <strong className="text-slate-900">{app.doctor}</strong> • {app.notes}
                  </p>
                </div>
              </div>

              {/* Acciones y Métricas */}
              <div className="flex items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                {app.commissionDue !== undefined && app.commissionDue > 0 && (
                  <div className="text-right pr-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Comisión Doctor</span>
                    <span className="text-xs font-bold text-emerald-700">+${app.commissionDue} MXN</span>
                  </div>
                )}

                {app.status === 'in_waiting' && (
                  <button
                    type="button"
                    onClick={() => handleCallToChair(app.patientName)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    Llamar a Sillón
                  </button>
                )}

                {app.status === 'in_chair' && (
                  <a
                    href="/dashboard/expediente"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors"
                  >
                    Abrir Odontograma
                  </a>
                )}

                <a
                  href="/dashboard/expediente"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Expediente
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
