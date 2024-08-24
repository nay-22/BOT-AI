import { Box, Grid, Typography } from "@mui/material";

import LogoIcon from '../assets/logo.png';

const Static = ({isMediumScreen}) => {
    return <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: '2em',
        }}>
            <Box sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography textAlign={'center'} fontSize={'28px'} fontWeight={'bold'}>How Can I Help You Today?</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1em' }}>
                    <img width='80px' className="logo-big" src={LogoIcon} alt="" />
                </Box>
            </Box>
            <Grid container spacing={2} sx={{ width: '100%', margin: '0' }}>

                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 1,
                            backgroundColor: 'secondary.light',
                            padding: '2em',
                            borderRadius: '.5em',
                            width: '95%',
                            margin: 'auto'
                        }}
                    >
                        <Typography variant="h5" fontWeight={'bold'}>Hi, what is the weather?</Typography>
                        <Typography color={'text.secondary'}>Get immediate AI generated response</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 1,
                            backgroundColor: 'secondary.light',
                            padding: '2em',
                            borderRadius: '.5em',
                            width: '95%',
                            margin: 'auto'
                        }}
                    >
                        <Typography variant="h5" fontWeight={'bold'}>Hi, what is my location?</Typography>
                        <Typography color={'text.secondary'}>Get immediate AI generated response</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 1,
                            backgroundColor: 'secondary.light',
                            padding: '2em',
                            borderRadius: '.5em',
                            width: '95%',
                            margin: 'auto'
                        }}
                    >
                        <Typography variant="h5" fontWeight={'bold'}>Hi, how are you?</Typography>
                        <Typography color={'text.secondary'}>Get immediate AI generated response</Typography>
                    </Box>
                </Grid>
                {isMediumScreen && <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            boxShadow: 1,
                            backgroundColor: 'secondary.light',
                            padding: '2em',
                            borderRadius: '.5em',
                            width: '95%',
                            margin: 'auto'
                        }}
                    >
                        <Typography variant="h5" fontWeight={'bold'}>Hi, what is the temperature?</Typography>
                        <Typography color={'text.secondary'}>Get immediate AI generated response</Typography>
                    </Box>
                </Grid>}

            </Grid>
        </Box></>;
};

export default Static;