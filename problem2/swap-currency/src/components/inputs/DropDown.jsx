import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useFormikContext, getIn } from "formik";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

const SelectField = forwardRef(
  ({ label, name, classes, children, ...rest }, ref) => {
    const { touched, errors } = useFormikContext();

    const fieldError = getIn(errors, name);
    const showError = getIn(touched, name) && !!fieldError;

    return (
      <FormControl fullWidth error={showError} ref={ref} classes={classes}>
        {label && (
          <InputLabel sx={{ bgcolor: "main.yellow" }} shrink>
            {label}
          </InputLabel>
        )}

        <Select
          sx={{
            "& div": { display: "flex", alignItems: "center", gap: "10px" },
          }}
          label={label}
          name={name}
          {...rest}
        >
          {children}
        </Select>

        {showError && <FormHelperText>{fieldError}</FormHelperText>}
      </FormControl>
    );
  }
);

SelectField.defaultProps = {
  label: null,
  classes: {},
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
};

export default SelectField;
