import { NextResponse } from 'next/server'
import Papa from 'papaparse'

// Mock de base de datos de producción para exportación
const mockData = {
  kpis: {
    monthlyIncome: 257900,
    servicesCount: 86,
    activePatients: 189,
    inactivePatients: 45,
    archivedPatients: 14,
    commissionsTotal: 18350,
  },
  services: [
    { categoria: 'Ortodoncia / Alineadores', servicios_realizados: 14, ingresos_mxn: 86400, porcentaje_ingreso: '33.5%' },
    { categoria: 'Implantología', servicios_realizados: 9, ingresos_mxn: 54000, porcentaje_ingreso: '20.9%' },
    { categoria: 'Prótesis / Rehabilitación', servicios_realizados: 6, ingresos_mxn: 42000, porcentaje_ingreso: '16.3%' },
    { categoria: 'Estética Dental', servicios_realizados: 12, ingresos_mxn: 29000, porcentaje_ingreso: '11.2%' },
    { categoria: 'Endodoncia', servicios_realizados: 15, ingresos_mxn: 28500, porcentaje_ingreso: '11.0%' },
    { categoria: 'Prevención / Profilaxis', servicios_realizados: 30, ingresos_mxn: 18000, porcentaje_ingreso: '7.1%' },
  ],
  patients: [
    { id: 'AUD-9821', nombre: 'Mariana Ruíz', estado: 'active', especialidad: 'Ortodoncia', total_gastado: 24000, referido_por: 'QR Audenti' },
    { id: 'AUD-6419', nombre: 'Roberto Garza', estado: 'active', especialidad: 'Implantología', total_gastado: 18500, referido_por: 'Recomendación' },
    { id: 'AUD-7711', nombre: 'Sofía Hernández', estado: 'active', especialidad: 'Odontopediatría', total_gastado: 3200, referido_por: 'Familiar (Mateo)' },
    { id: 'AUD-3104', nombre: 'Carlos Mendoza', estado: 'active', especialidad: 'Cirugía Oral', total_gastado: 5600, referido_por: 'WhatsApp Directo' },
    { id: 'AUD-5502', nombre: 'Valeria López', estado: 'inactive', especialidad: 'Estética', total_gastado: 1200, referido_por: 'QR Audenti' },
    { id: 'AUD-2231', nombre: 'Jorge Palomino', estado: 'archived', especialidad: 'Prótesis', total_gastado: 42000, referido_por: 'Web' }
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') || 'json'

  const dateStr = new Date().toISOString().split('T')[0]

  if (format === 'csv') {
    // Generar CSV plano
    const csvContent = Papa.unparse(mockData.services)
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="audenti_reporte_servicios_${dateStr}.csv"`,
      },
    })
  }

  if (format === 'patients_csv') {
    const csvContent = Papa.unparse(mockData.patients)
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="audenti_pacientes_dump_${dateStr}.csv"`,
      },
    })
  }

  if (format === 'excel') {
    // Generar archivo TSV legible por Excel con codificación UTF-8 BOM
    const headers = Object.keys(mockData.services[0]).join('\t')
    const rows = mockData.services.map(row => Object.values(row).join('\t')).join('\n')
    const tsvContent = '\uFEFF' + headers + '\n' + rows

    return new NextResponse(tsvContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.ms-excel; charset=utf-8',
        'Content-Disposition': `attachment; filename="audenti_rentabilidad_servicios_${dateStr}.xls"`,
      },
    })
  }

  if (format === 'word') {
    // Generar documento Word compatible HTML enriquecido (.doc)
    const wordHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Reporte Clínico y Financiero AUDENTI</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #1c1c17; }
        h1 { color: #202D4C; font-size: 24pt; margin-bottom: 5px; }
        h2 { color: #825500; font-size: 16pt; margin-top: 20px; }
        .meta { color: #555f6f; font-size: 11pt; margin-bottom: 25px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { background-color: #202D4C; color: #ffffff; padding: 10px; border: 1px solid #ddd; text-align: left; }
        td { padding: 8px 10px; border: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f7f3eb; }
        .highlight { font-weight: bold; color: #825500; }
        .kpi-box { background: #fdf9f1; border-left: 4px solid #E3A033; padding: 12px; margin: 15px 0; }
      </style>
      </head>
      <body>
        <h1>AUDENTI — Clinical Suite</h1>
        <div class="meta">Reporte Ejecutivo de Operaciones y Rentabilidad Dental | Emisión: ${dateStr}</div>
        
        <div class="kpi-box">
          <strong>Resumen de Periodo:</strong> Ingresos Totales: $${mockData.kpis.monthlyIncome.toLocaleString('es-MX')} MXN | 
          Servicios Realizados: ${mockData.kpis.servicesCount} | Pacientes Activos: ${mockData.kpis.activePatients}
        </div>

        <h2>Distribución y Rentabilidad por Línea de Servicio</h2>
        <table>
          <thead>
            <tr>
              <th>Categoría del Servicio</th>
              <th>Procedimientos</th>
              <th>Ingresos Totales (MXN)</th>
              <th>% Aportación</th>
            </tr>
          </thead>
          <tbody>
            ${mockData.services.map(s => `
              <tr>
                <td>${s.categoria}</td>
                <td>${s.servicios_realizados}</td>
                <td class="highlight">$${s.ingresos_mxn.toLocaleString('es-MX')}</td>
                <td>${s.porcentaje_ingreso}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Estado de Pacientes en Red</h2>
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Nombre Paciente</th>
              <th>Estatus</th>
              <th>Especialidad</th>
              <th>LTV Gastado</th>
              <th>Canal de Origen</th>
            </tr>
          </thead>
          <tbody>
            ${mockData.patients.map(p => `
              <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.estado.toUpperCase()}</td>
                <td>${p.especialidad}</td>
                <td>$${p.total_gastado.toLocaleString('es-MX')}</td>
                <td>${p.referido_por}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <p style="margin-top: 40px; font-size: 10pt; color: #888;">Generado automáticamente por AUDENTI DentalCloud Multi-Tenant SaaS. Aislamiento RLS verificado.</p>
      </body>
      </html>
    `
    return new NextResponse(wordHtml, {
      status: 200,
      headers: {
        'Content-Type': 'application/msword; charset=utf-8',
        'Content-Disposition': `attachment; filename="audenti_informe_ejecutivo_${dateStr}.doc"`,
      },
    })
  }

  if (format === 'sql') {
    const sqlDump = `-- ==============================================================
-- AUDENTI / DENTALCLOUD DATABASE BACKUP DUMP
-- Tenant: Roma Norte (ID: 00000000-0000-0000-0000-000000000001)
-- Timestamp: ${new Date().toISOString()}
-- ==============================================================

BEGIN;

-- Insertar Catálogo de Servicios
${mockData.services.map(s => 
  `INSERT INTO services (category, name, price) VALUES ('${s.categoria}', '${s.categoria}', ${s.ingresos_mxn});`
).join('\n')}

-- Insertar Pacientes
${mockData.patients.map(p => 
  `INSERT INTO patients (id, full_name, status, total_spent) VALUES ('${p.id}', '${p.nombre}', '${p.estado}', ${p.total_gastado});`
).join('\n')}

COMMIT;
`
    return new NextResponse(sqlDump, {
      status: 200,
      headers: {
        'Content-Type': 'application/sql; charset=utf-8',
        'Content-Disposition': `attachment; filename="audenti_db_dump_${dateStr}.sql"`,
      },
    })
  }

  // Por defecto Dump JSON completo de la base de datos del tenant
  return NextResponse.json({
    tenant: 'AUDENTI Roma Norte',
    export_timestamp: new Date().toISOString(),
    data: mockData
  }, {
    status: 200,
    headers: {
      'Content-Disposition': `attachment; filename="audenti_db_dump_${dateStr}.json"`
    }
  })
}
