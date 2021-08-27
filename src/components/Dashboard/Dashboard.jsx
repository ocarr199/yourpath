// ⬇ What dependencies we need to import
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// ⬇ What we are importing from Material-ui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PersonIcon from "@material-ui/icons/Person";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckIcon from "@material-ui/icons/Check";
import Calendar from "react-calendar";

function Dashboard() {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  // ⬇ What we are grabbing from the redux store
  const user = useSelector((store) => store.user);
  const providers = useSelector((store) => store.provider.allProviders);
  const patients = useSelector((store) => store.patient.allPatients);
  const recommendationNeeded = useSelector((store) => store.recommendation);
  const successes = useSelector((store) => store.patient.allDeactive);

  useEffect(() => {
    dispatch({ type: "FETCH_PROVIDERS" });
    dispatch({ type: "FETCH_ALL_PATIENT", payload: { active: true } });
    dispatch({ type: "FETCH_RECOMMENDATIONS_NEEDED" });
    dispatch({ type: "FETCH_DEACTIVE" });
  }, []);

  return (
    <div className="container">
      <h2>Welcome To The Dashboard!</h2>

      <Grid container>
        <Grid xs={3} item>
          <Card style={{ margin: "10px" }}>
            <Typography>Total Providers</Typography>
            <Typography>{providers.length}</Typography>
            <LocalHospitalIcon />
          </Card>
        </Grid>

        <Grid xs={3} item>
          <Card style={{ margin: "10px" }}>
            <Typography>Total Active Patients</Typography>
            <Typography>{patients.length}</Typography>
            <PersonIcon />
          </Card>
        </Grid>

        <Grid xs={3} item>
          <Card style={{ margin: "10px" }}>
            <Typography>Recommendations Needed</Typography>
            <Typography>{recommendationNeeded.length}</Typography>
            <InboxIcon />
          </Card>
        </Grid>

        <Grid xs={3} item>
          <Card style={{ margin: "10px" }}>
            <Typography>Successes</Typography>
            <Typography>{successes.length}</Typography>
            <CheckIcon />
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={6} item>
          <Card style={{ margin: "10px" }}>
            <Typography>Patients that need Recommendations</Typography>
            <Card>
              {recommendationNeeded.map((rec) => (
                <Card key={rec.id}>
                  <Typography>Patient : {rec.id}</Typography>
                </Card>
              ))}
            </Card>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card>
            <iframe src="https://calendar.google.com/calendar/embed?height=400&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=eW91cnBhdGgudGVzdEBnbWFpbC5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043&showPrint=0&showTabs=0&showCalendars=0&showTz=0"  
            width="400" 
            height="400" 
            frameborder="0" 
            scrolling="no"></iframe>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
