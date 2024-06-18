import React from "react";
import { FormControl, Grid, TextField } from "@mui/material";
import { Field, getIn, useFormikContext } from "formik";
import SelectWithIcon from "../SelectWithIcon";
import PropTypes from "prop-types";

const CurrencyInput = ({ inputName, currencyValue, currencies = [] }) => {
  const { touched, errors: formikError } = useFormikContext();

  const fieldError = getIn(formikError, currencyValue);
  const showError = getIn(touched, currencyValue) && !!fieldError;
  return (
    <Grid item container>
      <FormControl sx={{ width: "100%" }}>
        <Grid item container columnSpacing={1}>
          <Grid item xs={8}>
            <Field
              error={showError}
              type="number"
              name={currencyValue}
              label="Your input token amount"
              helperText={showError ? fieldError : null}
              as={TextField}
              fullWidth
              sx={{
                borderRadious: "none !important",
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  {
                    display: "none",
                  },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
              InputProps={{
                sx: {
                  "& fieldset": {
                    borderRadious: "none !important",
                    borderBottomRightRadius: "none!important",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectWithIcon
              name={inputName}
              currencies={currencies}
              label="Input currency"
            />
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
};
CurrencyInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  currencyValue: PropTypes.string.isRequired,
  currencies: PropTypes.array,
};
export default CurrencyInput;
