'use client'

import {
  CalendarDays,
  Activity,
  CreditCard,
  FileSignature,
  LucideIcon
} from 'lucide-react'

interface Badge {
  label: string
  color: 'gold' | 'neutral' | 'muted' | 'error' | 'success'
  pulse?: boolean
}

interface Progress {
  value: number
  max: number
  label: string
}

interface Action {
  label: string
  href: string
}

export type KpiSector = 'calendar' | 'chair' | 'finance' | 'pending' | 'lab'

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  icon?: string
  lucideIcon?: LucideIcon
  highlight?: boolean
  badge?: Badge
  badges?: Badge[]
  progress?: Progress
  action?: Action
  sector?: KpiSector
}

const sectorStyles: Record<KpiSector, {
  card: string
  iconBox: string
  iconColor: string
  progressBar: string
}> = {
  calendar: {
    card: 'bg-blue-50/60 border-blue-200/90 hover:bg-blue-50/80',
    iconBox: 'bg-blue-100/80 border-blue-200',
    iconColor: 'text-blue-700',
    progressBar: 'bg-blue-500',
  },
  chair: {
    card: 'bg-emerald-50/60 border-emerald-200/90 hover:bg-emerald-50/80',
    iconBox: 'bg-emerald-100/80 border-emerald-200',
    iconColor: 'text-emerald-700',
    progressBar: 'bg-emerald-500',
  },
  finance: {
    card: 'bg-amber-50/60 border-amber-200/90 hover:bg-amber-50/80',
    iconBox: 'bg-amber-100/80 border-amber-200',
    iconColor: 'text-amber-800',
    progressBar: 'bg-amber-500',
  },
  pending: {
    card: 'bg-rose-50/60 border-rose-200/90 hover:bg-rose-50/80',
    iconBox: 'bg-rose-100/80 border-rose-200',
    iconColor: 'text-rose-700',
    progressBar: 'bg-rose-500',
  },
  lab: {
    card: 'bg-purple-50/60 border-purple-200/90 hover:bg-purple-50/80',
    iconBox: 'bg-purple-100/80 border-purple-200',
    iconColor: 'text-purple-700',
    progressBar: 'bg-purple-500',
  },
}

const badgeColors: Record<string, string> = {
  gold:    'bg-amber-100 text-amber-900 border border-amber-200',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  muted:   'bg-slate-50 text-slate-500 border border-slate-200',
  error:   'bg-rose-50 text-rose-700 border border-rose-200',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

export function KpiCard({
  label, value, unit, icon, lucideIcon: LucideComponent, highlight, badge, badges, progress, action, sector
}: KpiCardProps) {
  const customSector = sector ? sectorStyles[sector] : null

  return (
    <div className={`rounded-2xl border p-5 shadow-sm space-y-3 relative overflow-hidden transition-all hover:shadow-md ${
      customSector
        ? customSector.card
        : highlight
          ? 'bg-linear-to-br from-white to-amber-50/30 border-amber-300 ring-1 ring-amber-300'
          : 'bg-white border-slate-200/80'
    }`}>
      {highlight && (
        <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-400/10 rounded-full pointer-events-none" />
      )}


      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
              badgeColors[badge.color]
            }`}>
              {badge.pulse && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
              {badge.label}
            </span>
          )}
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
            customSector ? `${customSector.iconBox} ${customSector.iconColor}` : 'bg-slate-50 border-slate-200/60 text-slate-700'
          }`}>
            {LucideComponent ? (
              <LucideComponent className={`w-4 h-4 ${customSector ? customSector.iconColor : 'text-amber-600'}`} />
            ) : (
              <Activity className={`w-4 h-4 ${customSector ? customSector.iconColor : 'text-amber-600'}`} />
            )}
          </div>
        </div>
      </div>

      {/* Value */}
      <div>
        <span className={`font-bold tracking-tight text-slate-900 block ${
          value.length > 10 ? 'text-xl leading-snug' : 'text-3xl'
        }`}>
          {value}
        </span>
        {unit && <span className="text-xs text-slate-500 mt-0.5 block">{unit}</span>}
      </div>

      {/* Badges list */}
      {badges && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {badges.map((b) => (
            <span key={b.label} className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${badgeColors[b.color]}`}>
              {b.label}
            </span>
          ))}
        </div>
      )}

      {/* Progress */}
      {progress && (
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500 font-medium">{progress.label}</span>
            <span className="font-bold text-slate-900">{progress.value}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
            <div
              className={`h-full rounded-full transition-all ${
                customSector ? customSector.progressBar : 'bg-amber-400'
              }`}
              style={{ width: `${progress.value}%` }}
            />
          </div>
        </div>
      )}

      {/* Action link */}
      {action && (
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">Dra. Sofía Valero</span>
          <a href={action.href} className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline">
            {action.label}
          </a>
        </div>
      )}
    </div>
  )
}
