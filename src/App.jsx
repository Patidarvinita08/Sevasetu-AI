import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";

import CitizenLayout from "./layouts/CitizenLayout";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportIssue from "./pages/citizen/ReportIssue";
import ComplaintReview from "./pages/citizen/ComplaintReview";
import ComplaintSubmitted from "./pages/citizen/ComplaintSubmitted";
import MyComplaints from "./pages/citizen/MyComplaints";
import ComplaintTracking from "./pages/citizen/ComplaintTracking";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminComplaintDetails from "./pages/admin/AdminComplaintDetails";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            DEFAULT
        ========================== */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* =========================
            LOGIN
        ========================== */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            CITIZEN APPLICATION
        ========================== */}
        <Route
          path="/citizen"
          element={<CitizenLayout />}
        >

          {/* Citizen Dashboard */}
          <Route
            index
            element={<CitizenDashboard />}
          />

          {/* Report Issue */}
          <Route
            path="report"
            element={<ReportIssue />}
          />

          {/* Complaint Review */}
          <Route
            path="review"
            element={<ComplaintReview />}
          />

          {/* Complaint Submitted */}
          <Route
            path="submitted"
            element={<ComplaintSubmitted />}
          />

          {/* My Complaints */}
          <Route
            path="complaints"
            element={<MyComplaints />}
          />

          {/* Complaint Tracking */}
          <Route
            path="complaints/:complaintId"
            element={<ComplaintTracking />}
          />

        </Route>

        {/* =========================
            UNKNOWN ROUTES
        ========================== */}
        <Route
          path="*"
          element={<Navigate to="/citizen" replace />}
        />

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="complaints"
            element={<AdminComplaints />}
          />

          <Route
            path="complaints/:complaintId"
            element={<AdminComplaintDetails />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;