// ⬇ What dependencies we need to import
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

// ⬇ What we are importing from Material-ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function EditProvider() {
    // ⬇ What variables we need to declare
    const classes = useStyles();
    // ⬇ What we are grabbing from the redux store
    const provider = useSelector(store => store.editProviderReducer);

    let [program, setProgram] = useState(provider.program);
    let [website, setWebsite] = useState(provider.website);
    let [address, setAddress] = useState(provider.address);
    let [city, setCity] = useState(provider.city);
    let [state, setState] = useState(provider.state);
    let [zip, setZip] = useState(provider.zip);
    let [county, setCounty] = useState(provider.county);
    let [email, setEmail] = useState(provider.email);
    let [phone, setPhone] = useState(provider.phone);
    let [parent_program, setParent_program] = useState(provider.parent_program);
    //Saves all user input an object to POST
    const providerToEdit= {
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

    return (
        <div>
            {/* <h1>Edit Provider</h1> */}
            <form className={classes.root} noValidate autoComplete="off">
                {/* Program Input Field */}
                <TextField id="Program" label="Program"
                    onChange={(event) => setProgram(event.target.value)}
                    value={program} />
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
                <TextField id="Zip" label="Zip"
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
                <TextField id="Phone" label="Phone"
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone} />
                {/* Parent Program Input Field */}
                <TextField id="Parent_program" label="Parent Program"
                    onChange={(event) => setParent_program(event.target.value)}
                    value={parent_program} />

                <Button variant="contained" onClick={dispatchEditProvider}>Submit Your Changes</Button>
            </form>
        </div>
    )
}
