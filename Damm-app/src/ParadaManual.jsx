import React from 'react'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Grid,
    Paper, Stack,
    Typography
} from "@mui/material";

const card2 = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Exemple Card
            </Typography>
            <Typography variant="h5" component="div">
                hey
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

export function ParadaManual() {
    return (
        <Grid container justifyContent="start" alignItems="start" spacing={1} >
            <Grid container item xs={12}>
                <Card sx={{textAlign: "start", width:1, borderRadius:2}} variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Informacio de la ruta
                            </Typography>
                            <Divider/>
                            <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                <Grid container item xs={6}>
                                    <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Matricula del camio:
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                0555XXX
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Nom del repartidor:
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                Ricard Salvador Sole
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Telefon de contacte
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                +34 689 901 341
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Parades completades:
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                2 de 6
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Marge de cervesa:
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                200L
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                Temps a la seguent parada
                                            </Typography>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Typography sx={{ fontSize: 14 }} color="green">
                                                23 minuts
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                </Card>
            </Grid>
            <Grid container item xs={12}>
                <Grid container item xs={12}>
                    <Card sx={{textAlign: "start", width:1, borderRadius:2}} variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Nova parada a la ruta
                            </Typography>
                            <Divider/>
                            <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                <Grid container item xs={6}>
                                </Grid>
                                <Grid container item xs={6}>
                                    <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                        <Card sx={{borderRadius:2}} >
                                            <CardHeader
                                                subheader="Mapa de la nova ruta"
                                            />
                                            <CardMedia
                                                component="img"
                                                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
                                                alt="Mapa Ruta"
                                            />
                                            <CardContent>
                                                <Stack spacing={1} direction="row">
                                                    <Button variant="outlined">
                                                        Cancelar
                                                    </Button>
                                                    <Button variant="outlined">
                                                        Afegir nova parada
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container item xs={12}>
                <Card sx={{textAlign: "start", width:1}} variant="outlined">{card2}</Card>
            </Grid>
        </Grid>
    )
}