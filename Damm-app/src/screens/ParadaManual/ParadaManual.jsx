import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Stack,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import Title from "../../components/Title.tsx";

export function ParadaManual() {
    const [searchOption, setSearchOption] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchOption(event.target.value);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container justifyContent="center" spacing={3}>
                <Grid container item xs={12}>
                    <Card sx={{ textAlign: "start", width: 1, borderRadius: 2 }} variant="outlined">
                        <CardContent>
                            <Title> Informacio de la Ruta</Title>
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
                        <Card sx={{ textAlign: "start", width: 1, borderRadius: 2 }} variant="outlined">
                            <CardContent>
                                <Title> Nova Parada a la Ruta</Title>
                                <Grid container justifyContent="start" alignItems="start" spacing={2} padding={2}>
                                    <Grid container item xs={6}>
                                        <Grid container item xs={12}>
                                            <FormControl fullWidth sx={{ mb: 2 }}>
                                                <InputLabel id="search-select-label">Nom del local que es vol afegir</InputLabel>
                                                <Select
                                                    labelId="search-select-label"
                                                    value={searchOption}
                                                    onChange={handleSearchChange}
                                                    label="Cerca un bar/restaurant/local"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"Option 1"}>Sala Razzmatazz, Barcelona</MenuItem>
                                                    <MenuItem value={"Option 2"}>Sala Shoko, Madrid</MenuItem>
                                                    <MenuItem value={"Option 3"}>La Taverna de Misti, Vila-Seca</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid container item xs={12}>
                                            <Card sx={{ textAlign: "start", width: 1, borderRadius: 2, mb:2 }} variant="outlined">
                                                <CardHeader subheader="Dades del local seleccionat"/>
                                                <CardContent>
                                                    <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                        <Grid container item xs={6}>
                                                            <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Nom del local:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        La Taverna de Misti
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Adreça:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        Av. de Alcalde Pere Molas, 19, 43480 Vila-seca, Tarragona
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
                                                            <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        L de cervesa a reomplir:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        205L
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Data de l'ultim reompliment:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        24/03/2024
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                            <Card sx={{ textAlign: "start", width: 1, borderRadius: 2, mb: 2 }} variant="outlined">
                                                <CardHeader subheader="Dades de la ruta modificada"/>
                                                <CardContent>
                                                    <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                        <Grid container item xs={6}>
                                                            <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Nova data de fi de ruta:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        19:15 - 4/4/2024
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="red">
                                                                        (+30m)
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Nova longitud de ruta:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        145Km
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="red">
                                                                        (+32km)
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container item xs={6}>
                                                            <Grid container justifyContent="start" alignItems="start" spacing={1}>
                                                                <Grid container item xs={6}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="text.primary">
                                                                        Nou marge de cervesa:
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                                        25L
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid container item xs={3}>
                                                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color="red">
                                                                        (-5L)
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={6}>
                                        <Grid container justifyContent="start" alignItems="start" spacing={1} padding={1}>
                                            <Card sx={{ borderRadius: 2 }}>
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
            </Grid>
        </Container>
    );
}
