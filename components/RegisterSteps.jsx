import { Button, Container, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Review from "./Review";
import axios from "axios";

const steps = ['Athlete info', 'Review'];

function getStepContent(step, tournament, state, setState) {
    switch (step) {
        case 0:
            return <RegistrationForm
                tournament={tournament} state={state} setState={setState} />;
        case 1:
            return <Review
                tournament={tournament} state={state} setState={setState} />;
        default:
            throw new Error('Unknown stpe');
    }
}

export default function RegisterSteps({ tournament }) {
    const [activeStep, setActiveStep] = useState(0);
    const [ state, setState ] = useState({
        athlete: {
          firstName: '',
          lastName: '',
          gender: '',
          birthDate: '',
          division: '',
          klass: '',
          club: '',
          city: '',
          state: { label: 'Nuevo León', id: 'NL' }
        },
        tournament: tournament
      });
    const [ success, setSuccess ] = useState('loading');

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    const handleSave = () => {
        console.log(state)
        axios.post('http://localhost:3000/api/athlete', state)
            .then(() => setSuccess('ok')).catch(() => setSuccess('error'));

        return (
            <Fragment>
                <Typography variant="subtitle1">You have been registered</Typography>
            </Fragment>
        );
    }

    return (
        <Container>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Fragment>
                {activeStep === steps.length ? handleSave() : (
                    <Fragment>
                        {getStepContent(activeStep, tournament, state, setState)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}>
                                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                            </Button>
                        </Box>
                    </Fragment>
                )}
            </Fragment>
        </Container>
    );
 }