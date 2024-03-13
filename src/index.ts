import { $query, $update, Record, StableBTreeMap, Vec, match, Result, nat64, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';

// Define Patient Record and Payload
type Patient = Record<{
    id: string;
    name: string;
    dob: string; // Date of birth
    gender: string;
    phone: string;
    createdAt: nat64;
    updatedAt: Opt<nat64>;
}>

type PatientPayload = Record<{
    name: string;
    dob: string;
    gender: string;
    phone: string;
}>

// Define Appointment Record and Payload
type Appointment = Record<{
  id: string;
  patientId: string;
  therapistId: string;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: nat64;
}>

type AppointmentPayload = Record<{
  patientId: string;
  therapistId: string;
  date: string;
  startTime: string;
  endTime: string;
}>

// Define Therapist Record and Payload
type Therapist = Record<{
  id: string;
  name: string;
  specialization: string;
  phone: string;
  createdAt: nat64;
  updatedAt: Opt<nat64>;
}>

type TherapistPayload = Record<{
  name: string;
  specialization: string;
  phone: string;
}>


// Define Treatment Record and Payload
type Treatment = Record<{
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: nat64;
  updatedAt: Opt<nat64>;
}>

type TreatmentPayload = Record<{
  name: string;
  description: string;
  price: number;
}>

// Create a map to store patient records
const patientStorage = new StableBTreeMap<string, Patient>(0, 44, 1024);
// Create a map to store appointment records
const appointmentStorage = new StableBTreeMap<string, Appointment>(1, 44, 1024);
// Create a map to store therapist records
const therapistStorage = new StableBTreeMap<string, Therapist>(2, 44, 1024);
// Create a map to store treatment records
const treatmentStorage = new StableBTreeMap<string, Treatment>(3, 44, 1024);

// Add patient function
$update;
export function addPatient(payload: PatientPayload): Result<Patient, string> {
    // Input validation
    if (!payload || !payload.name || !payload.dob || !payload.gender || !payload.phone) {
        return Result.Err("Invalid patient payload. All fields are required.");
    }

    const patient: Patient = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    patientStorage.insert(patient.id, patient);
    return Result.Ok(patient);
}

// Get all patients function
$query;
export function getPatients(): Result<Vec<Patient>, string> {
    return Result.Ok(patientStorage.values());
}

// Get a patient by ID
$query;
export function getPatient(id: string): Result<Patient, string> {
    return match(patientStorage.get(id), {
        Some: (patient) => Result.Ok<Patient, string>(patient),
        None: () => Result.Err<Patient, string>(`Patient with id=${id} not found`)
    });
}

// Update a patient
$update;
export function updatePatient(id: string, payload: PatientPayload): Result<Patient, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid patient ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(patientStorage.get(id), {
        Some: (patient) => {
            const updatedPatient: Patient = {...patient, ...payload, updatedAt: Opt.Some(ic.time())};
            patientStorage.insert(patient.id, updatedPatient);
            return Result.Ok<Patient, string>(updatedPatient);
        },
        None: () => Result.Err<Patient, string>(`Couldn't update a patient with id=${id}. Patient not found`)
    });
}

// Delete a patient
$update;
export function deletePatient(id: string): Result<Patient, string> {
    return match(patientStorage.remove(id), {
        Some: (deletedPatient) => Result.Ok<Patient, string>(deletedPatient),
        None: () => Result.Err<Patient, string>(`Couldn't delete a patient with id=${id}. Patient not found.`)
    });
}

// Add appointment function
$update;
export function addAppointment(payload: AppointmentPayload): Result<Appointment, string> {
    // Input validation
    if (!payload || !payload.patientId || !payload.therapistId || !payload.date || !payload.startTime || !payload.endTime) {
        return Result.Err("Invalid appointment payload. All fields are required.");
    }

    // Additional validation logic can be added here, such as checking for scheduling conflicts

    const appointment: Appointment = { id: uuidv4(), createdAt: ic.time(), ...payload };
    appointmentStorage.insert(appointment.id, appointment);
    return Result.Ok(appointment);
}

// Get all appointments function
$query;
export function getAppointments(): Result<Vec<Appointment>, string> {
    return Result.Ok(appointmentStorage.values());
}

// Update an appointment
$update;
export function updateAppointment(id: string, payload: AppointmentPayload): Result<Appointment, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid appointment ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(appointmentStorage.get(id), {
        Some: (appointment) => {
            const updatedAppointment: Appointment = {...appointment, ...payload};
            appointmentStorage.insert(appointment.id, updatedAppointment);
            return Result.Ok<Appointment, string>(updatedAppointment);
        },
        None: () => Result.Err<Appointment, string>(`Couldn't update an appointment with id=${id}. Appointment not found`)
    });
}

// Delete an appointment
$update;
export function deleteAppointment(id: string): Result<Appointment, string> {
    return match(appointmentStorage.remove(id), {
        Some: (deletedAppointment) => Result.Ok<Appointment, string>(deletedAppointment),
        None: () => Result.Err<Appointment, string>(`Couldn't delete an appointment with id=${id}. Appointment not found.`)
    });
}

// Add therapist function
$update;
export function addTherapist(payload: TherapistPayload): Result<Therapist, string> {
  // Input validation
  if (!payload || !payload.name || !payload.specialization || !payload.phone) {
      return Result.Err("Invalid therapist payload. All fields are required.");
  }

  const therapist: Therapist = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
  therapistStorage.insert(therapist.id, therapist);
  return Result.Ok(therapist);
}

// Get all therapists function
$query;
export function getTherapists(): Result<Vec<Therapist>, string> {
  return Result.Ok(therapistStorage.values());
}

// Add treatment function
$update;
export function addTreatment(payload: TreatmentPayload): Result<Treatment, string> {
  // Input validation
  if (!payload || !payload.name || !payload.description || !payload.price) {
      return Result.Err("Invalid treatment payload. All fields are required.");
  }

  const treatment: Treatment = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
  treatmentStorage.insert(treatment.id, treatment);
  return Result.Ok(treatment);
}

// Get all treatments function
$query;
export function getTreatments(): Result<Vec<Treatment>, string> {
  return Result.Ok(treatmentStorage.values());
}

$query;
export function getTreatment(id: string): Result<Treatment, string> {
    return match(treatmentStorage.get(id), {
        Some: (treatment) => Result.Ok<Treatment, string>(treatment),
        None: () => Result.Err<Treatment, string>(`Treatment with id=${id} not found`)
    });
}

$update;
export function updateTreatment(id: string, payload: TreatmentPayload): Result<Treatment, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid treatment ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(treatmentStorage.get(id), {
        Some: (treatment) => {
            const updatedTreatment: Treatment = {...treatment, ...payload, updatedAt: Opt.Some(ic.time())};
            treatmentStorage.insert(treatment.id, updatedTreatment);
            return Result.Ok<Treatment, string>(updatedTreatment);
        },
        None: () => Result.Err<Treatment, string>(`Couldn't update a treatment with id=${id}. Treatment not found`)
    });
}

$update;
export function deleteTreatment(id: string): Result<Treatment, string> {
    return match(treatmentStorage.remove(id), {
        Some: (deletedTreatment) => Result.Ok<Treatment, string>(deletedTreatment),
        None: () => Result.Err<Treatment, string>(`Couldn't delete a treatment with id=${id}. Treatment not found.`)
    });
}

$query;
export function getTherapist(id: string): Result<Therapist, string> {
    return match(therapistStorage.get(id), {
        Some: (therapist) => Result.Ok<Therapist, string>(therapist),
        None: () => Result.Err<Therapist, string>(`Therapist with id=${id} not found`)
    });
}

$update;
export function deleteTherapist(id: string): Result<Therapist, string> {
    return match(therapistStorage.remove(id), {
        Some: (deletedTherapist) => Result.Ok<Therapist, string>(deletedTherapist),
        None: () => Result.Err<Therapist, string>(`Couldn't delete a therapist with id=${id}. Therapist not found.`)
    });
}

$update;
export function updateTherapist(id: string, payload: TherapistPayload): Result<Therapist, string> {
    // Input validation
    if (!id) {
        return Result.Err("Invalid therapist ID.");
    }
    if (!payload || Object.keys(payload).length === 0) {
        return Result.Err("Invalid payload. At least one field must be provided for update.");
    }

    return match(therapistStorage.get(id), {
        Some: (therapist) => {
            const updatedTherapist: Therapist = {...therapist, ...payload, updatedAt: Opt.Some(ic.time())};
            therapistStorage.insert(therapist.id, updatedTherapist);
            return Result.Ok<Therapist, string>(updatedTherapist);
        },
        None: () => Result.Err<Therapist, string>(`Couldn't update a therapist with id=${id}. Therapist not found`)
    });
}

$query;
export function getAppointmentsByPatient(patientId: string): Result<Vec<Appointment>, string> {
    const appointments = appointmentStorage.values().filter(appointment => appointment.patientId === patientId);
    return Result.Ok(appointments);
}

$query;
export function getAppointmentsByTherapist(therapistId: string): Result<Vec<Appointment>, string> {
    const appointments = appointmentStorage.values().filter(appointment => appointment.therapistId === therapistId);
    return Result.Ok(appointments);
}

$query;
export function getAppointmentsByDateRange(startDate: string, endDate: string): Result<Vec<Appointment>, string> {
    const appointments = appointmentStorage.values().filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= new Date(startDate) && appointmentDate <= new Date(endDate);
    });
    return Result.Ok(appointments);
}

$query;
export function getTreatmentsByPriceRange(minPrice: number, maxPrice: number): Result<Vec<Treatment>, string> {
    const treatments = treatmentStorage.values().filter(treatment => {
        return treatment.price >= minPrice && treatment.price <= maxPrice;
    });
    return Result.Ok(treatments);
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
 getRandomValues: () => {
     let array = new Uint8Array(32);

     for (let i = 0; i < array.length; i++) {
         array[i] = Math.floor(Math.random() * 256);
     }

     return array;
 }
};