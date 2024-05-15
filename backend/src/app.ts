// Express
import express from "express";
// Morgan
import morgan from "morgan";
// Cookie parser
import cookieParser from "cookie-parser";
// Cors
import cors from "cors";
// Routes
import {
  activityRoutes,
  authenticationRoutes,
  careerRoutes,
  userRoutes,
  commentRoutes,
  campusBranchRoutes,
  teamRoutes,
  scheduleRoutes,
  studentExcelRoutes
} from "./routes";

// Express app instance
const app = express();

/*  
Morgan is a popular HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. It can be used to log requests to the console or to a file.
*/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Cors
app.use(cors({ origin: true, credentials: true }));

// Cookie parser
app.use(cookieParser());

// Routes
app.use("/api", authenticationRoutes);
app.use("/api/career", careerRoutes);
app.use("/api", userRoutes);
app.use("/api", activityRoutes);
app.use("/api", campusBranchRoutes);
app.use("/api", commentRoutes);
app.use("/api", teamRoutes);
app.use("/api", scheduleRoutes);
app.use("/api", studentExcelRoutes);

export default app;
