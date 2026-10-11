import { create } from 'zustand'

export type BranchId = 'balbuena' | 'guadalupe-chalma' | 'colonia-roma'

export interface BranchInfo {
  id: BranchId
  name: string
  code: string
  address: string
  doctorInCharge: string
  phone: string
  isUpcoming?: boolean
  statusBadge: string
  // Datos específicos del dashboard para esta sucursal
  dailyMetrics: {
    scheduledAppointments: number
    inChairNow: {
      patient: string
      procedure: string
      time: string
    }
    waitingRoomCount: number
    occupancyPct: number
    confirmedCount: number
    shiftIncome: string
    shiftIncomeRaw: number
    shiftTarget: string
    shiftProgressPct: number
    pendingToCollect: string
    pendingPatients: string
    minorExpenses: string
    pendingSoapNotes: number
    patientsFlow: Array<{
      id: number
      time: string
      name: string
      procedure: string
      status: 'completed' | 'active' | 'waiting' | 'scheduled'
      amount?: string
      paymentMethod?: string
      elapsed?: string
      arrived?: string
      note?: string
    }>
  }
}

export const BRANCHES_DATA: Record<BranchId, BranchInfo> = {
  balbuena: {
    id: 'balbuena',
    name: 'Sucursal Balbuena (Matriz)',
    code: 'DCL-BLB-01',
    address: 'Av. del Taller & Retorno 12, Jardín Balbuena, CDMX',
    doctorInCharge: 'Dra. Aura Estudillo',
    phone: '+52 55 5764 8810',
    statusBadge: 'En vivo • Dirección Médica General',
    dailyMetrics: {
      scheduledAppointments: 8,
      inChairNow: {
        patient: 'Mateo Morales Ruiz',
        procedure: 'Biopulpectomía Pza 16 (Gabinete 1)',
        time: '10:00 AM',
      },
      waitingRoomCount: 2,
      occupancyPct: 88,
      confirmedCount: 8,
      shiftIncome: '$14,200',
      shiftIncomeRaw: 14200,
      shiftTarget: '$16,000 MXN',
      shiftProgressPct: 88,
      pendingToCollect: '$2,800',
      pendingPatients: 'Mateo Morales y Daniela Montes',
      minorExpenses: '-$420',
      pendingSoapNotes: 2,
      patientsFlow: [
        {
          id: 1,
          time: '09:00 AM',
          name: 'Laura Patricia Vega',
          procedure: 'Limpieza Ultrasónica & Profilaxis Profunda',
          status: 'completed',
          amount: '$1,200 MXN',
          paymentMethod: 'Terminal BBVA',
        },
        {
          id: 2,
          time: '10:00 AM',
          name: 'Mateo Morales Ruiz',
          procedure: 'Biopulpectomía Pza 16 • Instrumentación rotatoria',
          status: 'active',
          amount: '$3,800 MXN',
          paymentMethod: 'Pendiente de cobro',
          elapsed: '40 min',
        },
        {
          id: 3,
          time: '11:30 AM',
          name: 'Daniela Montes',
          procedure: 'Revisión Brackets / Cambio de arcos NiTi .016',
          status: 'waiting',
          arrived: 'Llegó hace 12 min',
          note: 'Cita mensual Ortodoncia',
        },
        {
          id: 4,
          time: '13:00 PM',
          name: 'Jorge Luis Rivas',
          procedure: 'Diagnóstico Clínico Integral y Plan Dental',
          status: 'scheduled',
          note: 'Primera vez en Balbuena',
        },
        {
          id: 5,
          time: '16:00 PM',
          name: 'Valeria Santillán',
          procedure: 'Retiro de puntos • Post-cirugía molares',
          status: 'scheduled',
          note: 'Gabinete 2 estéril listo',
        },
      ],
    },
  },
  'guadalupe-chalma': {
    id: 'guadalupe-chalma',
    name: 'Sucursal Guadalupe Chalma',
    code: 'AUD-GCH-02',
    address: 'Av. Morelos 144, Guadalupe Chalma, Gustavo A. Madero, CDMX',
    doctorInCharge: 'Dr. Ramírez López',
    phone: '+52 55 5306 9920',
    statusBadge: 'En vivo • Gabinete Quirúrgico Activo',
    dailyMetrics: {
      scheduledAppointments: 6,
      inChairNow: {
        patient: 'Roberto Garza Treviño',
        procedure: 'Fase Quirúrgica Implante Pza 36',
        time: '10:30 AM',
      },
      waitingRoomCount: 1,
      occupancyPct: 75,
      confirmedCount: 6,
      shiftIncome: '$19,800',
      shiftIncomeRaw: 19800,
      shiftTarget: '$22,000 MXN',
      shiftProgressPct: 90,
      pendingToCollect: '$5,500',
      pendingPatients: 'Roberto Garza y Carmen Morales',
      minorExpenses: '-$680',
      pendingSoapNotes: 1,
      patientsFlow: [
        {
          id: 101,
          time: '08:30 AM',
          name: 'Elena Ruiz (Madre de Mateo)',
          procedure: 'Control Periapical & Radiografía Digital',
          status: 'completed',
          amount: '$850 MXN',
          paymentMethod: 'Efectivo',
        },
        {
          id: 102,
          time: '10:15 AM',
          name: 'Roberto Garza Treviño',
          procedure: 'Fase Quirúrgica Implante de Titanio Pza 36',
          status: 'active',
          amount: '$18,500 MXN',
          paymentMethod: 'Transferencia SPEI',
          elapsed: '25 min',
        },
        {
          id: 103,
          time: '12:00 PM',
          name: 'Carlos Mendoza',
          procedure: 'Toma de impresión Corona Zirconio CAD/CAM',
          status: 'waiting',
          arrived: 'Llegó hace 5 min',
          note: 'Paciente derivado por dolor leve',
        },
        {
          id: 104,
          time: '15:30 PM',
          name: 'Mariana Cordero',
          procedure: 'Cementación definitiva de corona',
          status: 'scheduled',
          note: 'Guía de laboratorio ProArt recibida',
        },
      ],
    },
  },
  'colonia-roma': {
    id: 'colonia-roma',
    name: 'Sucursal Colonia Roma',
    code: 'AUD-RMA-03',
    address: 'Álvaro Obregón 180, Col. Roma Norte, Cuauhtémoc, CDMX',
    doctorInCharge: 'Dra. Gutiérrez & Equipo Especialidades',
    phone: '+52 55 5208 3340',
    isUpcoming: true,
    statusBadge: 'Próxima Apertura • Fase Pre-Operativa & Agendamiento VIP',
    dailyMetrics: {
      scheduledAppointments: 3,
      inChairNow: {
        patient: 'Calibración Sillón Sirona VIP',
        procedure: 'Inspección técnica & Pruebas radiovisiógrafo',
        time: 'En proceso',
      },
      waitingRoomCount: 0,
      occupancyPct: 35,
      confirmedCount: 3,
      shiftIncome: '$6,000',
      shiftIncomeRaw: 6000,
      shiftTarget: '$10,000 MXN (Preventa)',
      shiftProgressPct: 60,
      pendingToCollect: '$0',
      pendingPatients: 'Lista de espera de pre-apertura',
      minorExpenses: '-$1,250',
      pendingSoapNotes: 0,
      patientsFlow: [
        {
          id: 201,
          time: '11:00 AM',
          name: 'Mariana Ruíz (Pre-venta Alineadores)',
          procedure: 'Escaneo Intraoral 3D & Simulación Virtual',
          status: 'active',
          amount: '$6,000 MXN',
          paymentMethod: 'Tarjeta de Crédito',
          elapsed: '15 min',
        },
        {
          id: 202,
          time: '13:00 PM',
          name: 'Ricardo Pérez Gómez',
          procedure: 'Valoración Estética & Diseño de Sonrisa',
          status: 'scheduled',
          note: 'Embajador con 3 referidos',
        },
        {
          id: 203,
          time: '16:00 PM',
          name: 'Familia Morales Ruiz (Grupo Preventivo)',
          procedure: 'Apertura de Expediente Familiar',
          status: 'scheduled',
          note: 'Reserva anticipada paquete familiar',
        },
      ],
    },
  },
}

interface BranchStore {
  currentBranchId: BranchId
  setBranchId: (id: BranchId) => void
  getCurrentBranch: () => BranchInfo
}

export const useBranchStore = create<BranchStore>((set, get) => ({
  currentBranchId: 'balbuena',
  setBranchId: (id) => set({ currentBranchId: id }),
  getCurrentBranch: () => BRANCHES_DATA[get().currentBranchId] || BRANCHES_DATA.balbuena,
}))
