# Project Structure

All the files in this folder are for the frontend, and very straightforward

| Component Name        | Purpose                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| Admin                 | Display, Add, Edit, and Deactivate Employees                                                           |
| AltPatients           | Alternative View of Patient Page - Drag and Drop                                                       |
| App                   | Components are routed to this main page                                                                |
| ClientFacing          | The only client-facing component where clients can see their recommendations                           |
| Dashboard             | The landing page of logged in employees                                                                |
| Images                | Contains the Your Path Logos                                                                           |
| LandingPage           | The landing page of the application                                                                    |
| LoginForm             | The form for logging into the application                                                              |
| NewPassword           | Resetting your password and first login flow                                                           |
| Patient               | Displays all Patients, Add A New Patient, View Inactive Patients                                       |
| PatientDetail         | Where you can see all of the details for a specific patient                                            |
| PatientMap            | Google Map Component for the patient. Imported into Patient Detail and the RecommenationURL components |
| ProtectedRoute        | A function for protecting routes based on logged in status                                             |
| Provider              | Where you can see all the providers, Add a Provider, Edit A Provider, View Inactive Providers          |
| ProviderDetail        | Where you can see all of the details for a specific provider. Includes adding specialities/tags.       |
| ProviderMap           | Google Map Component for the provider                                                                  |
| RegisterPage          | The page and form where admin with access levels can add new employees                                 |
| RejectNonAdmin        | Functions to check if the user is logged in and has sufficient access level                            |
| SideNav               | The top appbar and side drawer for navigation                                                          |
| Specialty             | Where you can see all specialties, add new specialties, and edit current specialties                   |
