## Physiotherapy Clinic Management System Documentation

This documentation outlines the structure and functionality of a Physiotherapy Clinic Management System implemented in TypeScript using the Azle library. The system comprises modules for managing patients, appointments, therapists, and treatments.

### Modules

1. **Patient Management Module**
   - **Entities**
     - `Patient`: Represents a patient's information including their name, date of birth, gender, phone number, creation timestamp, and optional update timestamp.
     - `PatientPayload`: Payload for creating or updating a patient, containing fields for name, date of birth, gender, and phone number.
   - **Functions**
     - `addPatient(payload: PatientPayload): Result<Patient, string>`: Adds a new patient to the system.
     - `getPatients(): Result<Vec<Patient>, string>`: Retrieves a list of all patients.
     - `getPatient(id: string): Result<Patient, string>`: Retrieves a patient by their unique identifier.
     - `updatePatient(id: string, payload: PatientPayload): Result<Patient, string>`: Updates an existing patient's information.
     - `deletePatient(id: string): Result<Patient, string>`: Deletes a patient from the system.

2. **Appointment Management Module**
   - **Entities**
     - `Appointment`: Represents an appointment scheduled with a patient, including details such as patient ID, therapist ID, date, start time, end time, and creation timestamp.
     - `AppointmentPayload`: Payload for creating or updating an appointment, containing fields for patient ID, therapist ID, date, start time, and end time.
   - **Functions**
     - `addAppointment(payload: AppointmentPayload): Result<Appointment, string>`: Adds a new appointment to the system.
     - `getAppointments(): Result<Vec<Appointment>, string>`: Retrieves a list of all appointments.
     - `updateAppointment(id: string, payload: AppointmentPayload): Result<Appointment, string>`: Updates an existing appointment's information.
     - `deleteAppointment(id: string): Result<Appointment, string>`: Deletes an appointment from the system.
     - `getAppointmentsByPatient(patientId: string): Result<Vec<Appointment>, string>`: Retrieves all appointments for a specific patient.
     - `getAppointmentsByTherapist(therapistId: string): Result<Vec<Appointment>, string>`: Retrieves all appointments for a specific therapist.
     - `getAppointmentsByDateRange(startDate: string, endDate: string): Result<Vec<Appointment>, string>`: Retrieves appointments within a specified date range.

3. **Therapist Management Module**
   - **Entities**
     - `Therapist`: Represents a therapist's information including their name, specialization, phone number, creation timestamp, and optional update timestamp.
     - `TherapistPayload`: Payload for creating or updating a therapist, containing fields for name, specialization, and phone number.
   - **Functions**
     - `addTherapist(payload: TherapistPayload): Result<Therapist, string>`: Adds a new therapist to the system.
     - `getTherapists(): Result<Vec<Therapist>, string>`: Retrieves a list of all therapists.
     - `updateTherapist(id: string, payload: TherapistPayload): Result<Therapist, string>`: Updates an existing therapist's information.
     - `deleteTherapist(id: string): Result<Therapist, string>`: Deletes a therapist from the system.
     - `getTherapist(id: string): Result<Therapist, string>`: Retrieves a therapist by their unique identifier.

4. **Treatment Management Module**
   - **Entities**
     - `Treatment`: Represents a treatment offered by the clinic, including its name, description, price, creation timestamp, and optional update timestamp.
     - `TreatmentPayload`: Payload for creating or updating a treatment, containing fields for name, description, and price.
   - **Functions**
     - `addTreatment(payload: TreatmentPayload): Result<Treatment, string>`: Adds a new treatment to the system.
     - `getTreatments(): Result<Vec<Treatment>, string>`: Retrieves a list of all treatments.
     - `updateTreatment(id: string, payload: TreatmentPayload): Result<Treatment, string>`: Updates an existing treatment's information.
     - `deleteTreatment(id: string): Result<Treatment, string>`: Deletes a treatment from the system.
     - `getTreatment(id: string): Result<Treatment, string>`: Retrieves a treatment by its unique identifier.
     - `getTreatmentsByPriceRange(minPrice: number, maxPrice: number): Result<Vec<Treatment>, string>`: Retrieves treatments within a specified price range.

### Additional Notes

- The system utilizes `StableBTreeMap` from the Azle library for storing records in a stable B-tree data structure.
- Unique identifiers for entities (patients, therapists, appointments, treatments) are generated using the `uuidv4` function from the `uuid` library.
- Input validation is implemented to ensure the integrity of data being added or updated in the system.
- Additional functionalities such as filtering appointments by patient or therapist, and retrieving treatments within a price range are provided for enhanced usability.

---
## Installation

1. Clone the repository

   ```bash
    git clone https://github.com/kilonzi001/physiotherapy-clinic-management-system.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Start the IC local development environment

    ```bash
    dfx start --background --clean
    ```

4. Deploy the canisters to the local development environment

    ```bash
    dfx deploy
    ```