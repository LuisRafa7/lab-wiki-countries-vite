import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const reponse = await axios.get(
        "https://ih-countries-api.herokuapp.com/countries"
      );
      setCountries(reponse.data);
    };
    fetchData();
  }, []);
  {
    if (countries) {
      return (
        <>
          <h1>WikiCountries: Your Guide to the World</h1>
          {countries.map((one) => {
            const lowerCase = one.alpha2Code.toLowerCase();
            return (
              <>
                <div key={one.id}>
                  <Link to={`/${one.alpha3Code}`}>
                    <img
                      src={`https://flagpedia.net/data/flags/icon/72x54/${lowerCase}.png`}
                      alt={one.alpha2Code}
                    />
                    <h4>{one.name.common}</h4>
                  </Link>
                </div>
              </>
            );
          })}
        </>
      );
    }
  }
}

export default HomePage;
