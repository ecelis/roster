import { Grid, Typography } from "@mui/material";
import { Fragment } from "react";

// TODO Get divisions from tournament
function printDivision(d) {
    switch (d) {
        case 'B':
            return 'Barebow'
            break;
        case 'C':
            return 'Compound'
            break;
        case 'R':
            return 'Recurve'
            break;
        case 'L':
            return 'Longbow'
            break;
        default:
            return ''
    }
}

// TODO Get classes from tournament
function printKlass(k) {
    switch (k) {
        case 'P':
            return 'PreInfantil'
            break;
        case 'I':
            return 'Infantil'
            break;
        case 'A':
            return 'Sub 14'
            break;
        case 'B':
            return 'Sub 16'
            break;
        case 'C':
            return 'Sub 18'
            break;
        case 'D':
            return 'Sub 20'
            break;
        case 'Y':
            return 'Mayor'
            break;
        case 'M':
            return 'Master'
            break;
        default:
            return ''
    }
}

export default function Review({state, setState}) {
    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>
                Summary {state.tournament.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{state.athlete.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{state.athlete.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{
                    state.athlete.gender == 'M' ? 'Man' : 'Woman'
                    }</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{state.athlete.birthDate.toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{printDivision(state.athlete.division)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography gutterBottom>{printKlass(state.athlete.klass)}</Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
}