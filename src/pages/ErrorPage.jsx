import { useRouteError } from "react-router-dom";
import { Box, Typography } from '@mui/material'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography component="h1" variant="h2" sx={{ marginBottom: '20px' }}>
                Oops!
            </Typography>
            <Typography component="h1" variant="h5" sx={{ marginBottom: '10px' }}>
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                {error.statusText || error.message}
            </Typography>
        </Box>
    );
}
