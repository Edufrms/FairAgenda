
export const FAIR_STATUS = {
  PENDING: 'pendiente',
  CONTACTED: 'contactado',
  SCHEDULED: 'reunión agendada',
  FOLLOWUP: 'seguimiento',
  CLOSED: 'cerrado'
};

export const PRIORITY = {
  LOW: 'baja',
  MEDIUM: 'media',
  HIGH: 'alta'
};

export const INITIAL_FAIRS = [
  { id: 'f1', name: 'Mobile World Congress (MWC)', city: 'Barcelona', country: 'España', date: 'Feb 2025', website: 'https://www.mwcbarcelona.com' },
  { id: 'f2', name: 'CES Las Vegas', city: 'Las Vegas', country: 'EEUU', date: 'Ene 2025', website: 'https://www.ces.tech' },
  { id: 'f3', name: 'IFA Berlin', city: 'Berlín', country: 'Alemania', date: 'Sep 2025', website: 'https://www.ifa-berlin.com' },
  { id: 'f4', name: 'Fitur', city: 'Madrid', country: 'España', date: 'Ene 2025', website: 'https://www.ifema.es/fitur' },
  { id: 'f5', name: 'Hannover Messe', city: 'Hannover', country: 'Alemania', date: 'Abr 2025', website: 'https://www.hannovermesse.de' }
];

export const CATEGORIES = ['Electrónica', 'Software', 'Maquinaria', 'Servicios', 'Logística', 'Marketing', 'Otros'];
