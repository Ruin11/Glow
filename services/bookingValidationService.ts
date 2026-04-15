// Simulación de una base de datos local de Turnos para el Mock
const MOCK_DB = {
  bookings: {
    'booking-123': {
      id: 'booking-123',
      professionalId: 'prof-456',
      scheduledDate: new Date().toISOString(), // Simula que es para el momento actual
      state: 'PAID_ESCROW',
      secretTokenHash: 'mock-hash-abc', // Lo que el backend usaría para validar
      amount: 1500,
    },
    'booking-old': {
      id: 'booking-old',
      professionalId: 'prof-456',
      scheduledDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Ayer
      state: 'PAID_ESCROW',
      secretTokenHash: 'mock-hash-xyz',
      amount: 2000,
    },
    'booking-completed': {
      id: 'booking-completed',
      professionalId: 'prof-456',
      scheduledDate: new Date().toISOString(),
      state: 'COMPLETED',
      secretTokenHash: 'mock-hash-111',
      amount: 1000,
    }
  }
};

export interface QRPayload {
  bookingId: string;
  secretToken: string;
}

export interface ValidationResult {
  success: boolean;
  message: string;
  bookingDetails?: any;
}

/**
 * MOCK: Valida un turno a partir del contenido desencriptado de un QR
 */
export const validateEscrowQR = async (
  qrPayloadString: string,
  currentProfessionalId: string
): Promise<ValidationResult> => {
  try {
    // 1. Simulación de desencriptación local (usamos parse directo como Mock)
    const payload: QRPayload = JSON.parse(qrPayloadString);
    const { bookingId, secretToken } = payload;
    
    // Simula latencia de red
    await new Promise(resolve => setTimeout(resolve, 800));

    // 2. Buscar Turno en DB
    const booking = (MOCK_DB.bookings as any)[bookingId];
    if (!booking) {
      return { success: false, message: 'Turno no encontrado.' };
    }

    // 3. Validar Pertenencia
    if (booking.professionalId !== currentProfessionalId) {
      return { success: false, message: 'Este turno no te pertenece.' };
    }

    // 4. Validar Firma (Mock de Token)
    // En la vida real, se genera un Hash con el JWT o Crypto. Aquí simulamos una equivalencia plana.
    const isTokenValid = (secretToken === 'abc' && booking.secretTokenHash === 'mock-hash-abc') || 
                         (secretToken === 'xyz' && booking.secretTokenHash === 'mock-hash-xyz') ||
                         (secretToken === '111' && booking.secretTokenHash === 'mock-hash-111');
                         
    if (!isTokenValid) {
      return { success: false, message: 'Firma de ticket inválida (Posible fraude).' };
    }

    // 5. Validar Estado
    if (booking.state !== 'PAID_ESCROW') {
      if (booking.state === 'COMPLETED') {
        return { success: false, message: 'Este ticket ya fue escaneado y utilizado.' };
      }
      return { success: false, message: `Estado inválido para cobrar: ${booking.state}` };
    }

    // 6. Validar Margen de Tiempo (+/- 2 horas de la fecha pactada)
    const bookingDate = new Date(booking.scheduledDate).getTime();
    const now = Date.now();
    const twoHoursInMs = 2 * 60 * 60 * 1000;
    
    if (Math.abs(bookingDate - now) > twoHoursInMs) {
      return { success: false, message: 'El turno está fuera del horario permitido para escanear (+/- 2 horas).' };
    }

    // 7. Simular Llamado a API de MercadoPago (Liberación de Fondos)
    await releaseMercadoPagoFunds(booking.id, booking.amount);

    // 8. Cambiar estado a COMPLETED (en base de datos real)
    booking.state = 'COMPLETED';

    return { 
      success: true, 
      message: 'Cobro liberado exitosamente.',
      bookingDetails: booking 
    };

  } catch (error) {
    console.error('Error parseando QR:', error);
    return { success: false, message: 'Formato de código QR inválido.' };
  }
};

/**
 * MOCK: Simula un HTTP Request a tu API que internamente invoca al SDK de Mercado Pago
 */
const releaseMercadoPagoFunds = async (bookingId: string, amount: number) => {
  console.log(`[MercadoPago Mock] Liberando retenido de $${amount} para la reserva ${bookingId}...`);
  /*
    Ejemplo de Pseudocódigo Backend para MercadoPago:
    
    const mpClient = new MercadoPagoConfig({ accessToken: 'ENV_ACCESS_TOKEN' });
    const payment = new Payment(mpClient);
    
    // Buscas el Payment original de la reserva
    const dbPayment = await Db.getPayment(bookingId);
    
    // Capturas el pago (si estaba solo autorizado) o lo liberas del Escrow Split Payment
    await payment.capture({
      id: dbPayment.mpPaymentId,
      transaction_amount: amount
    });
  */
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`[MercadoPago Mock] ¡Liberación exitosa!`);
};
