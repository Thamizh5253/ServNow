# SERVNOW: Bike Service Booking Platform

# Initial Setup

## Cloning the Repository
```bash
# Clone the repository
git clone https://github.com/Thamizh5253/Bike-Service--Cartrabbit.git

```
## Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend server
npm start


```

## Frontend Setup

```bash
# Open a new terminal window/tab

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start the frontend server
npm start


```
# Features
SERVNOW is a bike service booking platform designed to streamline the process of booking bike services. It caters to two main roles: admin and user. Admins have access to features like managing bookings and services, while users can book services and manage their profiles.

## 1) Admin Panel:

**Authentication:** 
Admins can log in using the provided credentials:
```bash
Email: thamizhmass057@gmail.com
Password: Admin@123
```

**Booking History:** View a history of all service bookings, with the ability to change the status of each booking (e.g., pending, ready for delivery, completed).

**Manage Services:** Create, edit, or delete bike services.

**Email Notifications:** Upon marking a service as ready for delivery, the customer receives an email notification.

## 2) User Panel: 

**Authentication:** Users can log in using the provided credentials:
```bash
Email: thamizh5253@gmail.com
Password: Tham@123
```

**Register:** New users can register for an account.

**Booking Service:** Users can book bike services.

**Service History:** Users can view their booking history.

**Profile Editing:** Users can edit their profile data within the dashboard.

## Additional Tools
**UI Enhancement:** Utilized BerryDashboard and Material UI to improve the user interface.

**Email Triggering:** Integrated Nodemailer for email notifications.

**Image Storage:** Utilized Cloudinary for image storage.

**Authentication:** Implemented JWT token generation and stored it in cookies for user authentication.

