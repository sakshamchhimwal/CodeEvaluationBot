import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const GithubOauthLink = "https://github.com/login/oauth/authorize?scope=repo&client_id=b2a19a6a3931fc6ed7c0";

const SignInPage = () => {
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh', maxHeight: '100vh', overflow: "hidden" }}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Sign In</Typography>
                    </Grid>
                    <Grid item>
                        {/* GitHub Sign In Button */}
                        <a href={GithubOauthLink}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<img src="Github_Logo.png" alt="GitHub Logo" style={{ width: '100px', marginRight: '10px' }} />}
                            >
                                <Typography variant="poster" sx={{
                                    fontSize: "32px"
                                }}>Sign in with GitHub</Typography>
                            </Button>
                        </a>
                    </Grid>
                </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
                {/* Insert your image here */}
                <img
                    src="SignIn.png"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Grid>
        </Grid>
    );
};

export default SignInPage;
