export enum BULL_QUEUE {
  APPOINTMENT = 'appointment',
}
export enum BULL_JOB {
  CHECK_APPOINTMENT_STATUS_1H_BEFORE = 'CheckAppointmentStatus1HBefore',
  CHECK_APPOINTMENT_STATUS_3H_BEFORE = 'CheckAppointmentStatus3HBefore',
  CHECK_APPOINTMENT_STATUS_15M_BEFORE = 'CheckAppointmentStatus15MBefore',
  CHECK_APPOINTMENT_STATUS_0M_BEFORE = 'CheckAppointmentStatus0MBefore',
  CHECK_APPOINTMENT_STATUS_15M_AFTER = 'CheckAppointmentStatus15MAfter',
  CHECK_APPOINTMENT_STATUS_30M_AFTER = 'CheckAppointmentStatus30MAfter',
  CHECK_APPOINTMENT_STATUS_1M_AFTER = 'CheckAppointmentStatus1MAfter',
  CHECK_APPOINTMENT_STATUS_1HOUR_AFTER = 'CheckAppointmentStatus1HourAfter',
  CHECK_APPOINTMENT_STATUS_2DAYS_BEFORE = 'CheckAppointmentStatus2DaysBefore',
  CHECK_APPOINTMENT_CREATED_BY_ADMIN_CONSENT_2DAYS_BEFORE = 'CheckAppointmentCreatedByAdminConsent2DaysBefore',
  CHECK_APPOINTMENT_CREATED_BY_ADMIN_CONSENT_1DAY_BEFORE = 'CheckAppointmentCreatedByAdminConsent1DayBefore',
  CHECK_APPOINTMENT_STATUS_1DAY_BEFORE = 'CheckAppointmentStatus1DayBefore',
}
