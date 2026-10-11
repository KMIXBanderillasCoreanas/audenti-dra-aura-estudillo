'use client'

import React from 'react'
import { DynamicQrWithLogo } from './DynamicQrWithLogo'

export interface QRCodeWithLogoProps {
  url?: string
  title?: string
  subtitle?: string
  size?: number
  patientId?: string
  referralCode?: string
  showShareActions?: boolean
  className?: string
}

/**
 * Componente oficial <QRCodeWithLogo />
 * Integra código QR dinámico de alta resolución con el isotipo oficial de Audenti
 * incrustado y centrado sobre fondo blanco circular.
 */
export function QRCodeWithLogo(props: QRCodeWithLogoProps) {
  return <DynamicQrWithLogo {...props} />
}

export default QRCodeWithLogo
