// ⬇ What dependencies we need to import
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// ⬇ What custom components we need to import
import MobileCard from "./MobileCard.jsx";
import image from "../Images/YourPath_Logo_Text.png"
import PatientMap from "../PatientMap/PatientMap"


export default function RecommendationURL() {
  const dispatch = useDispatch();
  // ⬇ Variables we need to declare and use in this component
  const patient = useSelector((store) => store.patient.onePatientProviders);
  // ⬇ Grabbing the patient's id inside the url
  const token = useParams();

  console.log( `token`, token )
  // ⬇ On page load, fetch the patient information if the id and token matches
  useEffect(() => {
    dispatch({ type: "FETCH_PATIENT_DETAIL_CLIENT", payload: token });
  }, []);

  return (
    <div className="container">
        <img src={image} className="mobile-image" alt='Your Path. Supporting Recovery. All Flavors.' />
        <h3 className="center">Your Personalized Recommendations:</h3>
        <div className="container">
      {patient.map((recommendation) => (
        <MobileCard key={recommendation.id} recommendation={recommendation} />
      ))}
      </div>
      <div>
        <h3 className="center">Customized Map:</h3>
        <PatientMap patient={patient}/>
      </div>
    </div>
  );
}
