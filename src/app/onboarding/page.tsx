'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Step {
  id: number
  title: string
  desc: string
  icon: string
}

const STEPS: Step[] = [
  { id: 1, title: 'Datos Personales',          desc: 'Perfil básico y contacto',      icon: 'person' },
  { id: 2, title: 'Perfil Profesional',         desc: 'Especialidad y cédula',          icon: 'medical_services' },
  { id: 3, title: 'Seguridad',                  desc: 'Contraseña y 2FA',               icon: 'security' },
  { id: 4, title: 'Configuración de Sucursal',  desc: 'Horarios y gabinete',            icon: 'domain' },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    // Step 1
    full_name: '', phone: '', date_of_birth: '', gender: '', address: '',
    // Step 2
    specialty: '', license_number: '', bio: '', certifications: '',
    // Step 3
    new_password: '', confirm_password: '', enable_2fa: false,
    // Step 4
    preferred_branch: '', schedule_start: '08:00', schedule_end: '18:00', gabinete: '',
  })

  const specialties = [
    'Odontología General', 'Ortodoncia', 'Endodoncia', 'Periodoncia',
    'Implantología', 'Cirugía Oral y Maxilofacial', 'Odontopediatría',
    'Prostodoncia', 'Estética Dental', 'Radiología Oral',
  ]

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function canAdvance(): boolean {
    if (step === 1) return !!(form.full_name && form.phone)
    if (step === 2) return !!(form.specialty && form.license_number)
    if (step === 3) return !!(form.new_password && form.new_password === form.confirm_password && form.new_password.length >= 8)
    return true
  }

  async function handleFinish() {
    // In production: save to Supabase users + employee_profiles
    // Mark onboarding_completed = true
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[#fdf9f1] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E3A033] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#202D4C] text-[20px]">dentistry</span>
            </div>
            <p className="font-headline text-[22px] font-bold text-[#202D4C]">AUDENTI</p>
          </div>
          <h1 className="font-headline text-[28px] font-bold text-[#1c1c17]">Configura tu Perfil Profesional</h1>
          <p className="text-[14px] text-[#555f6f] mt-1">Completa estos pasos para activar tu acceso completo al sistema.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                  step > s.id  ? 'bg-[#202D4C] text-white' :
                  step === s.id ? 'bg-[#E3A033] text-[#121c2a] shadow-lg scale-110' :
                  'bg-[#e6e2da] text-[#837563]'
                )}>
                  {step > s.id
                    ? <span className="material-symbols-outlined text-[18px]">check</span>
                    : <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  }
                </div>
                <span className={cn(
                  'text-[10px] font-bold mt-1 text-center leading-tight max-w-16',
                  step === s.id ? 'text-[#E3A033]' : 'text-[#837563]'
                )}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 mx-2 transition-colors', step > s.id ? 'bg-[#202D4C]' : 'bg-[#e6e2da]')} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h2 className="font-headline text-[20px] font-bold text-[#1c1c17]">{STEPS[step - 1].title}</h2>
            <p className="text-[14px] text-[#555f6f]">{STEPS[step - 1].desc}</p>
          </div>

          {/* STEP 1: Personal Data */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Nombre Completo *</label>
                <input value={form.full_name} onChange={e => update('full_name', e.target.value)}
                  placeholder="Dr. Juan Martínez González" required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Teléfono *</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)}
                  placeholder="+52 55 1234 5678" type="tel"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Fecha de Nacimiento</label>
                <input value={form.date_of_birth} onChange={e => update('date_of_birth', e.target.value)}
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Género</label>
                <select value={form.gender} onChange={e => update('gender', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]">
                  <option value="">Seleccionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer_not_to_say">Prefiero no decir</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Ciudad / Colonia</label>
                <input value={form.address} onChange={e => update('address', e.target.value)}
                  placeholder="Roma Norte, CDMX"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
            </div>
          )}

          {/* STEP 2: Professional Profile */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Especialidad Principal *</label>
                <select value={form.specialty} onChange={e => update('specialty', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]">
                  <option value="">Seleccionar especialidad...</option>
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Cédula Profesional *</label>
                  <input value={form.license_number} onChange={e => update('license_number', e.target.value)}
                    placeholder="12345678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Certificaciones adicionales</label>
                  <input value={form.certifications} onChange={e => update('certifications', e.target.value)}
                    placeholder="COEM, UNAM, IMSS..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Presentación profesional</label>
                <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
                  rows={4} placeholder="Cuéntanos sobre tu experiencia, enfoque clínico y especialización..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033] resize-none" />
              </div>
            </div>
          )}

          {/* STEP 3: Security */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-[13px] text-amber-800 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">warning</span>
                <span>Crea una contraseña segura de mínimo 8 caracteres con letras, números y símbolos para proteger los datos de tus pacientes.</span>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Nueva Contraseña *</label>
                <input value={form.new_password} onChange={e => update('new_password', e.target.value)}
                  type="password" placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Confirmar Contraseña *</label>
                <input value={form.confirm_password} onChange={e => update('confirm_password', e.target.value)}
                  type="password" placeholder="Repite tu contraseña"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]',
                    form.confirm_password && form.new_password !== form.confirm_password
                      ? 'border-red-400' : 'border-[#d5c4af]'
                  )} />
                {form.confirm_password && form.new_password !== form.confirm_password && (
                  <p className="text-[12px] text-red-600 mt-1">Las contraseñas no coinciden</p>
                )}
              </div>

              {/* Password strength */}
              {form.new_password && (
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-[#514535]">Fortaleza:</p>
                  <div className="flex gap-1">
                    {[8, 10, 12].map((len, i) => (
                      <div key={i} className={cn('h-1.5 flex-1 rounded-full',
                        form.new_password.length >= len ? ['bg-red-400', 'bg-yellow-400', 'bg-emerald-500'][i] : 'bg-[#e6e2da]'
                      )} />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#555f6f]">
                    {form.new_password.length < 8 ? 'Demasiado corta' :
                     form.new_password.length < 10 ? 'Débil' :
                     form.new_password.length < 12 ? 'Aceptable' : 'Fuerte ✓'}
                  </p>
                </div>
              )}

              {/* 2FA Toggle */}
              <div className="p-4 rounded-xl bg-[#f7f3eb] flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-[#1c1c17]">Autenticación de dos factores (2FA)</p>
                  <p className="text-[12px] text-[#555f6f]">Recomendado para Dueños y Directores médicos</p>
                </div>
                <button
                  type="button"
                  onClick={() => update('enable_2fa', !form.enable_2fa)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors relative',
                    form.enable_2fa ? 'bg-[#E3A033]' : 'bg-[#d5c4af]'
                  )}
                >
                  <span className={cn(
                    'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
                    form.enable_2fa ? 'translate-x-6' : 'translate-x-0.5'
                  )} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Branch Config */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-[13px] text-emerald-800 flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">check_circle</span>
                <span>Perfil casi listo. Configura tus horarios de trabajo para que la agenda funcione correctamente.</span>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Sucursal Principal</label>
                <select value={form.preferred_branch} onChange={e => update('preferred_branch', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]">
                  <option value="">Seleccionar sucursal...</option>
                  <option value="roma-norte">Consultorio Roma Norte</option>
                  <option value="polanco">Sede Polanco — Gabinete Quirúrgico</option>
                  <option value="del-valle">Sucursal Del Valle</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Hora de inicio</label>
                  <input value={form.schedule_start} onChange={e => update('schedule_start', e.target.value)}
                    type="time"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Hora de cierre</label>
                  <input value={form.schedule_end} onChange={e => update('schedule_end', e.target.value)}
                    type="time"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#514535] mb-1">Gabinete / Sillón asignado</label>
                <input value={form.gabinete} onChange={e => update('gabinete', e.target.value)}
                  placeholder="Gabinete 1, Sillón A..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#d5c4af] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#E3A033]" />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f7f3eb] text-[#514535] text-[13px] font-bold disabled:opacity-40 hover:bg-[#f1ede6] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Anterior
            </button>

            <span className="text-[12px] text-[#837563] font-semibold">
              Paso {step} de {STEPS.length}
            </span>

            {step < STEPS.length ? (
              <button
                type="button"
                onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E3A033] text-[#121c2a] text-[13px] font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                Siguiente
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#202D4C] text-white text-[13px] font-bold hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Activar mi cuenta
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
