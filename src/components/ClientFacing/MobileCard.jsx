// ⬇ What dependencies we need to import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// ⬇ What we are importing from Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Chip from "@material-ui/core/Chip";

// ⬇ The styling built in with material ui
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
    maxWidth: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 5,
    fontSize: 12,
  },
}));

export default function MobileCard({ recommendation }) {
  // ⬇ What variables we need to declare
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h2">
          {recommendation.program}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Address: {recommendation.address} {recommendation.city},{" "}
          {recommendation.state}, {recommendation.zip}
        </Typography>
        {recommendation.website && (
          <Typography className={classes.pos} color="textSecondary">
            Website:{" "}
            <a href={recommendation.website}> {recommendation.website} </a>
          </Typography>
        )}
      </CardContent>
      <CardActions className="center">
        {recommendation.phone && (
          <Chip
            icon={<PhoneIcon />}
            label={recommendation.phone}
            onClick={() => window.open(`tel:${recommendation.phone}`)}
          />
        )}
        {recommendation.email && (
          <Chip
            icon={<EmailIcon />}
            label={recommendation.email}
            onClick={() => window.open(`mailto:${recommendation.email}`)}
          />
        )}
      </CardActions>
    </Card>
  );
}
