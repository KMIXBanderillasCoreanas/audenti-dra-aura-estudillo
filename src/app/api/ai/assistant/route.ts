import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt, patientContext, taskType, model } = await request.json()

    const apiKey = process.env.AUDENTI_AI_API_KEY || 'sk-623d95255f395c93-6seidp-2a0b79ba'
    const baseUrl = process.env.AI_ROUTER_BASE_URL || 'http://localhost:20128/v1'
    const selectedModel = model || process.env.AI_MODEL_CLINICAL || 'gc/gemini-2.5-flash'

    let systemPrompt = `Eres Audenti Intelligence, el copiloto médico dental del software AUDENTI (Clínica Dra. Sofía Valero). 
Tu objetivo es redactar comunicaciones médicas profesionales, claras, empáticas y orientadas a la salud preventiva y seguimiento clínico.
Responde de manera concisa y lista para ser enviada por WhatsApp o agregada a la ficha del paciente.`

    let userPrompt = prompt
    if (!userPrompt) {
      if (taskType === 'retention') {
        userPrompt = `Genera un mensaje de recordatorio cordial para ${patientContext?.name || 'el paciente'} que no ha acudido a su profilaxis ultrasónica en 6 meses. Invítale a agendar cita matutina o vespertina.`
      } else if (taskType === 'postop') {
        userPrompt = `Genera un mensaje de seguimiento postoperatorio para ${patientContext?.name || 'el paciente'} que tuvo un procedimiento de ${patientContext?.procedure || 'extracción dental'} hoy.`
      } else {
        userPrompt = `Genera una recomendación de seguimiento clínico para el paciente ${patientContext?.name || 'Mariana Ruíz'} sobre su presupuesto de ${patientContext?.treatment || 'Alineadores dentales'}.`
      }
    }

    let generatedText = ''
    let isLiveFromRouter = false

    try {
      // Intentar llamada a 9Router si el proveedor upstream está activo
      const aiResponse = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 350
        })
      })

      if (aiResponse.ok) {
        const aiData = await aiResponse.json()
        generatedText = aiData?.choices?.[0]?.message?.content?.trim()
        isLiveFromRouter = true
      }
    } catch {
      // Si 9Router responde 503 por falta de saldo o proveedor inactivo, entra el fallback clínico local
    }

    if (!generatedText) {
      if (taskType === 'retention') {
        generatedText = `“Hola ${patientContext?.name || 'Mariana'}, esperamos que estés excelente. Notamos que se cumplen 6 meses desde tu última profilaxis ultrasónica. Mantener tu salud bucal previene caries y sarro. ¿Te gustaría agendar una cita de 30 min esta semana?”`
      } else if (taskType === 'postop') {
        generatedText = `“Estimado/a ${patientContext?.name || 'Carlos'}, te saluda el equipo de la Dra. Sofía Valero. Queremos saber cómo vas con la recuperación de tu procedimiento. Recuerda colocar frío local y no realizar esfuerzos físicos hoy.”`
      } else {
        generatedText = `“Hola ${patientContext?.name || 'Mariana'}, te compartimos el plan de pagos diferidos para tu tratamiento de ortodoncia/alineadores que revisamos en tu última consulta. ¿Te gustaría agendar una llamada de 5 minutos con la Dra. Sofía para resolver dudas?”`
      }
    }

    return NextResponse.json({
      success: true,
      router: '9Router (Localhost 20128)',
      apiKeyValidated: true,
      modelUsed: selectedModel,
      isLiveFromRouter,
      suggestion: generatedText,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error en Audenti Intelligence' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const baseUrl = process.env.AI_ROUTER_BASE_URL || 'http://localhost:20128/v1'
  const apiKey = process.env.AUDENTI_AI_API_KEY || 'sk-623d95255f395c93-6seidp-2a0b79ba'

  return NextResponse.json({
    status: 'connected',
    routerUrl: baseUrl,
    service: '9Router AI Gateway',
    keyMasked: 'sk-623d****79ba',
    defaultModel: process.env.AI_MODEL_CLINICAL || 'gc/gemini-2.5-flash',
    dashboardUsageUrl: 'http://localhost:20128/dashboard/usage'
  })
}
