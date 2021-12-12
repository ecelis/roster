import { Button, Container, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, useState } from 'react'
import RegistrationForm from './RegistrationForm'
import Review from './Review'
import { post } from '../lib/api'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { useSession } from 'next-auth/react'

const ajv = new Ajv({ allErrors: true })
addFormats(ajv)
const schema = {
  type: 'object',
  properties: {
    athlete: {
      type: 'object',
      properties: {
        firstName: { type: 'string', minLength: 2 },
        lastName: { type: 'string', minLength: 2 },
        gender: { type: 'string', minLength: 1 },
        birthDate: { type: 'string', format: 'date' },
        division: { type: 'string', minLength: 1 },
        klass: { type: 'string', minLength: 1 },
        club: { type: 'string' },
        city: { type: 'string' },
        state: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            id: { type: 'string' }
          }
        }
      },
      required: ['firstName', 'lastName', 'gender', 'division', 'klass', 'club', 'city', 'state']
    },
    tournament: { type: 'object' },
    error: { type: 'object' }
  },
  required: ['athlete'],
  additionalProperties: false
}
const validator = ajv.compile(schema)

const steps = ['Athlete info', 'Review']

function getStepContent (step, tournament, state, setState, validate) {
  switch (step) {
    case 0:
      return (
        <RegistrationForm
          tournament={tournament} state={state} setState={setState} validate={validate}
        />
      )
    case 1:
      return (
        <Review
          tournament={tournament} state={state}
        />
      )
    default:
      throw new Error('Unknown stpe')
  }
}

export default function RegisterSteps ({ tournament }) {
  const { data: session } = useSession()
  const [activeStep, setActiveStep] = useState(0)
  const [state, setState] = useState({
    athlete: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      division: '',
      klass: '',
      club: '',
      city: '',
      state: { label: 'Nuevo León', id: 'NL' },
      email: session.user.email,
      _id: session.user.id
    },
    tournament: tournament,
    error: {
      firstName: false,
      lastName: false,
      birthDate: false
    }
  })
  const [success, setSuccess] = useState('loading') // TODO use success to handle saving
  const [allowNext, setAllowNext] = useState(false)

  const handleNext = (e) => {
    if (e.target.textContent === 'Save') {
      post('athlete', state)
        .then(() => setSuccess('ok')).catch(() => setSuccess('error'))
    }
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const validate = (payload) => {
    const valid = validator(payload)
    // TODO show errors in UI
    setAllowNext(valid)
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
        {activeStep === steps.length
          ? (
            <Typography variant='subtitle1'>You have been registered</Typography>
            )
          : (
            <Fragment>
              {getStepContent(activeStep, tournament, state, setState, validate)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  disabled={!allowNext}
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                </Button>
              </Box>
            </Fragment>)}
      </Fragment>
    </Container>
  )
}
