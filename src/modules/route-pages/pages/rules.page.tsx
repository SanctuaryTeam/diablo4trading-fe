import { Card, Grid, Typography } from '@mui/material';
import React from 'react';

export const RulesPage: React.FC = () => {
    return (
        <React.Fragment>
            <Grid
                container
                spacing={1}
                mt={2}
                display={'flex'}
                justifyContent={'center'}
                alignContent={'center'}
            >
                <Grid
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Typography variant='h4' fontWeight='bold' mt={-1}>
                        {'Sanctuary Rules'}
                    </Typography>
                </Grid>
                <Grid
                    xs={8}
                    mt={2}
                    display={'flex'}
                    justifyContent={'center'}
                    alignContent={'center'}
                >
                    <Grid
                        container
                        spacing={2}
                        m={1}
                        display={'flex'}
                        justifyContent={'center'}
                        alignContent={'center'}
                    >
                        <Grid
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Card
                                elevation={2}
                                sx={{ outlineColor: 'error', width: '100%', boxShadow: '0 0 10px #d32f2f' }}
                            >
                                <Grid
                                    container
                                    display={'flex'}
                                    justifyContent={'flex-start'}
                                    alignItems={'flex-start'}
                                >
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography pl={2} variant='subtitle1' fontWeight='bold' mt={1}>
                                            {'General rules'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography p={2} variant='body1' fontWeight='bold'>
                                            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography pl={2} variant='subtitle1' fontWeight='bold' mt={2}>
                                            {'Trade rules'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography p={2} variant='body1' fontWeight='bold'>
                                            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography pl={2} variant='subtitle1' fontWeight='bold' mt={2}>
                                            {'Service rules'}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        display={'flex'}
                                        justifyContent={'flex-start'}
                                        alignItems={'flex-start'}
                                    >
                                        <Typography p={2} variant='body1' fontWeight='bold'>
                                            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};