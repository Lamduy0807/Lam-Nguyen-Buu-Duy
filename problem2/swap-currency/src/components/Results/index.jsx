import { Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Results = ({
  inputCurrency,
  inputCurrencyValue,
  outputCurrency,
  outputCurrencyValue,
}) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      sx={{ display: "flex", gap: "20px", marginTop: "20px" }}
    >
      <Typography variant="h5" sx={{ display: "flex", gap: "10px" }}>
        {inputCurrencyValue}{" "}
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${inputCurrency}.svg`}
        />
      </Typography>
      <Typography variant="h5">=</Typography>
      <Typography variant="h5" sx={{ display: "flex", gap: "10px" }}>
        {outputCurrencyValue}
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${outputCurrency}.svg`}
        />
      </Typography>
    </Grid>
  );
};
Results.propTypes = {
  inputCurrency: PropTypes.string,
  inputCurrencyValue: PropTypes.number,
  outputCurrency: PropTypes.string,
  outputCurrencyValue: PropTypes.number,
};
export default Results;
