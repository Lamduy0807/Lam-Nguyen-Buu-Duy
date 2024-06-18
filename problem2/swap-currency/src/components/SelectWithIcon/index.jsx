import React from "react";
import SelectField from "../inputs/DropDown";
import { Field } from "formik";
import { MenuItem } from "@mui/material";
import PropTypes from "prop-types";

const SelectWithIcon = ({ name, currencies, label }) => {
  return (
    <Field fullWidth type="number" name={name} label={label} as={SelectField}>
      <MenuItem value={null}>Select currency</MenuItem>
      {currencies?.map((currency) => (
        <MenuItem
          key={currency.id}
          value={currency?.id}
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <img src={currency.icon} />
          {currency?.label}
        </MenuItem>
      ))}
    </Field>
  );
};
SelectWithIcon.propTypes = {
  name: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  label: PropTypes.string,
};
export default SelectWithIcon;
