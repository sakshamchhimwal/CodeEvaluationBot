import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./components/SignIn/signinPage";
import UserTypeSelection from "./components/SignIn/chooseRole";
import UserDashboard from "./pages/Talent/userDashBoard";
import UserCodeSuggestions from "./pages/Talent/codeSuggestions";
import UserDocsEditor from "./pages/Talent/docsEditor";
import UserProfile from "./pages/Talent/userProfile";
import ClientSuggestions from "./pages/Client/clientSuggestion";
import ClientProfile from "./pages/Client/clientProfile";
import ClientRequirements from "./pages/Client/clientReq";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./layout";
import ClientProjectInsights from "./pages/Client/clientProjectInsights";
import ResponsiveAppBar from "../src/components/navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SignInPage />,
	},
	{
		path: "role/",
		element: <UserTypeSelection />,
	},
	{
		path: "role/talent/dashboard",
		element: <UserDashboard />,
	},
	{
		path: "role/talent/code/:projID",
		element: <UserCodeSuggestions />,
	},
	{
		path: "role/talent/docs",
		element: <UserDocsEditor />,
	},
	{
		path: "role/talent/profile",
		element: <UserProfile />,
	},
	{
		path: "role/client/dashboard",
		element: <ClientProfile />,
	},
	{
		path: "role/client/suggest/:projID",
		element: <ClientSuggestions />,
	},
	{
		path: "role/client/req",
		element: <ClientRequirements />,
	},
	{
		path: "role/client/project/:projID",
		element: <ClientProjectInsights />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={Theme}>
		<ResponsiveAppBar/>
		<RouterProvider router={router} />
	</ThemeProvider>
);
