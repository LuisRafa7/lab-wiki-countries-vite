import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function CountryDetails() {
  const { countryId } = useParams();
  const [details, setDetails] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const reponse = await axios.get(
        `https://ih-countries-api.herokuapp.com/countries/${countryId}`
      );
      setDetails(reponse.data);
      console.log(reponse.data);
    };
    fetchData();
  }, [countryId]);
  if (details) {
    const lowerCase = details.alpha2Code.toLowerCase();
    return (
      <>
        <img
          src={`https://flagpedia.net/data/flags/icon/72x54/${lowerCase}.png`}
          alt={details.alpha2Code}
        />
        <h2>{details.name.common}</h2>
        <br />
        <h2>Capital:</h2>
        <h2>{details.capital[0]}</h2>
        <h2>Area:</h2>
        <h2>{details.area}</h2>
        <h2>Borders:</h2>
        {details.borders.map((one) => {
          return (
            <>
              <Link to={`/${one}`}>
                <div key={one}>
                  <h2>{one}</h2>
                </div>
              </Link>
            </>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <h3>Loading...</h3>
      </>
    );
  }
}

export default CountryDetails;
