import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	CssBaseline,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchAllUserProjects } from "../../apis/user";
import { fetchListAllClientRepo } from "../../apis/client";
const ClientImage = "Client.png"; // Replace with the actual path to your client image
const DeveloperImage = "Talent.png"; // Replace with the actual path to your developer image

function UserTypeSelection() {
	const navigate = useNavigate();
	localStorage.setItem("token", document.cookie.split("=")[1]);

	async function roleSelect(roleType) {
		if (roleType === 0) {
			const res = await fetchListAllClientRepo();
			if (res.status === 200) {
				return navigate("/talent/dashboard");
			} else {
				return navigate(-1);
			}
		}
		if (roleType === 1) {
			const res = await fetchAllUserProjects();
			console.log(res);
			if (res.status === 200) {
				return navigate("talent/dashboard");
			} else {
				return navigate("-1");
			}
		}
	}
	return (
		<Container
			component="main"
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<CssBaseline />
			<Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
				<Typography
					variant="poster"
					component="div"
					gutterBottom
					textAlign={"center"}
					sx={{
						fontSize: "48px",
					}}>
					Choose Your Role
				</Typography>
				<hr style={{ margin: "20px" }} />
				<Grid container justifyContent="center" alignItems="center" spacing={2}>
					{/* Client Button */}
					<Grid
						item
						xs={12}
						md={6}
						style={{ display: "flex", justifyContent: "center" }}>
						{/* <Link to={`http://localhost:83/client/dashboard`} style={{ width: "50%", textDecoration: "none" }}> */}
						<Button
							variant="outlined"
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
								border: "none",
							}}
							onClick={() => {
								roleSelect(0);
							}}>
							<img
								src={ClientImage}
								alt="Client"
								style={{ width: "100px", aspectRatio: "1/1" }}
							/>
							<Typography
								variant="poster"
								textAlign={"center"}
								sx={{
									fontSize: "32px",
									textDecoration: "none",
								}}>
								Client
							</Typography>
						</Button>
						{/* </Link> */}
					</Grid>

					{/* Developer Button */}
					<Grid
						item
						xs={12}
						md={6}
						style={{ display: "flex", justifyContent: "center" }}>
						{/* <Link to={`http://localhost:83/talent/dashboard`} style={{ width: "50%", textDecoration: "none" }}> */}
						<Button
							variant="outlined"
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
							}}
							onClick={() => {
								roleSelect(1);
							}}>
							<img
								src={DeveloperImage}
								alt="Developer"
								style={{ width: "100px", aspectRatio: "1/1" }}
							/>
							<Typography
								variant="poster"
								textAlign={"center"}
								sx={{
									fontSize: "32px",
								}}>
								Talent
							</Typography>
						</Button>
						{/* </Link> */}
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}

export default UserTypeSelection;
