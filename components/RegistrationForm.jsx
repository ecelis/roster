import { Fragment, useEffect } from 'react'
import {
  Alert,
  Autocomplete,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { DatePicker } from '@mui/lab'
import { cities, clubes } from '../mock/data'
import { differenceInCalendarYears } from 'date-fns'


function validateBirthDate(date) {
  const years = differenceInCalendarYears(new Date(), date);
  return years > 4;
}

let birthDateHelper = ''
let firstNameHelper = ''
let lastNameHelper = ''

export default function RegistrationForm ({ tournament, state, setState, validate }) {
  useEffect(() => {
    if (state.error.birthDate) birthDateHelper = "Athlete can't be younger than 4 years old."
    if (state.error.firstName) firstNameHelper = "First name can't be blank" 
    if (state.error.lastName) lastNameHelper = "Last name can't be blank"
  }, [state])

  const handleValue = (e) => {
    let newState
    if (e instanceof Date) {
      if (validateBirthDate(e)) {
        newState = Object.assign({}, {
          athlete: { ...state.athlete, birthDate: e },
          tournament: tournament,
          error: { ...state.error, birthDate: false }
        })
      } else {
        // TODO Handle birth date error
        newState = Object.assign({}, {
          athlete: state.athlete,
          tournament: tournament,
          error: { ...state.error, birthDate: true }
        })
      }
    } else {
      newState = Object.assign({}, {
        athlete: { ...state.athlete, [e.target.id || e.target.name]: e.target.value },
        tournament: tournament,
        error: { ...state.error }
      })
    }
    validate(newState)
    setState(newState)
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={state.error.firstName}
            required
            id='firstName'
            name='firstName'
            label='First Name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={state.athlete.firstName}
            onChange={handleValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='lastName'
            name='lastName'
            label='Last Name'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            value={state.athlete.lastName}
            onChange={handleValue}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id='gender-label'>Gender</InputLabel>
          <Select
            labelId='gender-label'
            id='gender'
            name='gender'
            value={state.athlete.gender}
            label='Gender'
            onChange={handleValue}
          >
            <MenuItem value='M'>Man</MenuItem>
            <MenuItem value='W'>Woman</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            required
            id='birthDate'
            name='birthDate'
            label='Birth Date'
            value={state.athlete.birthDate}
            error={state.error.birthDate}
            onChange={handleValue}
            helperText={birthDateHelper}
            renderInput={(params) => <TextField {...params} />}
          />{birthDateHelper !== '' ? <Alert severity="error">{birthDateHelper}</Alert> : null }
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id='division-label'>Division</InputLabel>
          <Select
            labelId='division-label'
            id='division'
            name='division'
            label='Division'
            value={state.athlete.division}
            onChange={handleValue}
          >
            {
                    tournament.division.map(o => {
                      const k = Object.keys(o)[0]
                      return <MenuItem key={k} value={k}>{Object.values(o)[0]}</MenuItem>
                    })
                }
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id='klass-label'>Class</InputLabel>
          <Select
            required
            labelId='klass-label'
            id='klass'
            name='klass'
            label='Class'
            value={state.athlete.klass}
            onChange={handleValue}
          >
            {
                    tournament.klass.map(o => {
                      const k = Object.keys(o)[0]
                      return <MenuItem key={k} value={k}>{Object.values(o)[0]}</MenuItem>
                    })
                }
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            required
            disablePortal
            freeSolo
            id='club'
            options={clubes}
            sx={{ width: 300 }}
            value={state.athlete.club}
            onChange={handleValue}
            renderInput={(params) => <TextField {...params} label='Club' />}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            freeSolo
            id='city'
            options={cities}
            sx={{ width: 300 }}
            value={state.athlete.city}
            onChange={handleValue}
            renderInput={(params) => <TextField {...params} label='City' />}
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}
