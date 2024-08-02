import React, { useState, useEffect } from "react";

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

// components
import { Link } from "react-router-dom";

const Index = () => {
  const URL = "https://restcountries.com/v3.1";
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${URL}/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.trim() === "") {
      setData([]);
      return;
    }
    setLoading(true);
    fetch(`${URL}/name/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  };

  const displayCountries = data.length > 0 ? data : countries;

  return (
    <>
      <div className="relative max-w-[1180px] mx-auto pt-[100px]">
        <input
          className="shadow-md absolute top-[20px] z-30 right-0 outline-none px-5 py-2 border-[1.5px] border-solid border-gray-400 rounded-md"
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
        />
        {loading ? (
          <div className="flex justify-center items-center mt-5">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-4 justify-center gap-8 mt-5">
            {displayCountries.map((country, index) => (
              <Link
                key={index}
                to={`/country/${country.name.common
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
              >
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={country.flags.png}
                      alt={country.flags.alt}
                      sx={{
                        height: "200px",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {country.name.common}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Population: {country.population}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Region: {country.region}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capital: {country.capital}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
