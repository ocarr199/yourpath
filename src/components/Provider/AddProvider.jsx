// ⬇ What dependencies we need to import
import React, {useState} from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
// ⬇ What we are importing from Material-ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
}));

export default function AddProvider() {
    // ⬇ What variables we need to declare
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [program, setProgram] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [county, setCounty] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [parent_program, setParent_program] = useState('');
    //Saves all user input an object to POST
    const providerToAdd ={
        program: program,
        website: website,
        address: address,
        city: city,
        state: state,
        zip: zip,
        county: county,
        email: email,
        phone: phone,
        parent_program: parent_program
    }

    const handleAddProvider = () => {

        dispatch({
            type: 'POST_PROVIDER',
            payload: providerToAdd
        })
        setProgram('');
        setWebsite('');
        setAddress('');
        setCity('');
        setState('');
        setZip('');
        setCounty('');
        setEmail('');
        setPhone('');
        setParent_program('');
        history.push('/provider');
    }

    


    return (
        <div className="center">
            <form className={classes.root} noValidate autoComplete="off">
                {/* Program Input Field */}
                <TextField id="Program" label="Program"
                onChange={(event) => setProgram(event.target.value)}
                value={program} 
                multiline
                maxRows={4}
                />
                {/* Website Input Field */}
                <TextField id="Website" label="Website"
                    onChange={(event) => setWebsite(event.target.value)}
                    value={website} />
                {/* Address Input Field */}
                <TextField id="Address" label="Address"
                    onChange={(event) => setAddress(event.target.value)}
                    value={address} />
                {/* City Input Field */}
                <TextField id="City" label="City"
                    onChange={(event) => setCity(event.target.value)}
                    value={city} />
                {/* State Input Field */}
                <TextField id="State" label="State"
                    onChange={(event) => setState(event.target.value)}
                    value={state} />
                {/* Zip Input Field */}
                <TextField id="Zip" label="ZIP Code"
                    onChange={(event) => setZip(event.target.value)}
                    value={zip} />
                {/* County Input Field */}
                <TextField id="County" label="County"
                    onChange={(event) => setCounty(event.target.value)}
                    value={county} />
                {/* Email Input Field */}
                <TextField id="Email" label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email} />   
                {/* Phone Input Field */}
                <TextField id="Phone" label="Phone Number"
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone} />
                {/* Parent Program Input Field */}
                <TextField id="Parent_program" label="Parent Program"
                    onChange={(event) => setParent_program(event.target.value)}
                    value={parent_program} />

                {/* <Button variant="contained" color="primary" onClick={handleClose} className="float-left">Cancel</Button> */}
                <Button color="primary" onClick={handleAddProvider} className="float-right">Submit New Provider</Button>

                
            </form>
        </div>
    )
}
