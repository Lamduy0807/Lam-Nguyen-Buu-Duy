import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import useSubmitFormikCallback from "../../hooks/useSubmitFormikCallback";
import CurrencyInput from "../inputs/CurrencyInput";
import { useGetCurrencies } from "../../queries/mutations";
import Results from "../Results";
import SelectWithIcon from "../SelectWithIcon";
import * as Yup from "yup";

const SwapSchema = Yup.object().shape({
  firstCurrency: Yup.number().required("Required"),
  firstCurrencyValue: Yup.number()
    .typeError("You must select the input currency")
    .required("Required"),
  secondCurrency: Yup.number()
    .typeError("You must select the output currency")
    .required("Required"),
});

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
}));

const SwapForm = () => {
  const classes = useStyles();
  const [results, setResults] = useState(null);
  const { data, isLoading } = useGetCurrencies();

  const currencies = useMemo(() => {
    return data?.data?.map((currency, index) => ({
      id: index,
      value: currency?.currency,
      icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency?.currency}.svg`,
      label: currency?.currency,
      price: currency?.price,
    }));
  }, [data]);

  const initialValues = useMemo(
    () => ({
      firstCurrency: 0,
      firstCurrencyValue: 0,
      secondCurrency: null,
    }),
    [data]
  );
  const onSubmit = useSubmitFormikCallback(
    {
      onSubmit: (values) => {
        setResults(
          (
            (values?.firstCurrencyValue *
              currencies[values?.firstCurrency]?.price) /
            currencies[values?.secondCurrency]?.price
          ).toFixed(5)
        );
      },
    },
    [currencies]
  );

  return (
    <div className={classes.container}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          padding: "20px 30px 20px 30px",
          borderRadius: 1,
          bgcolor: "main.yellow",
          display: "flex",
          flexDirection: "column",
          minWidth: "400px",
          maxWidth: "500px",
          marginTop: "50px",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "black" }} />
        ) : (
          <>
            <Grid container alignItems="center" justifyContent="center">
              <Typography variant="div">
                Fill in with the currencies information and click "Swap"
              </Typography>
            </Grid>
            <Formik
              validationSchema={SwapSchema}
              onSubmit={onSubmit}
              initialValues={initialValues}
            >
              {({ isSubmitting, values, errors, resetForm }) => (
                <Form style={{ width: "100%", marginTop: "20px" }}>
                  <Grid container spacing={2}>
                    <CurrencyInput
                      currencies={currencies}
                      inputName="firstCurrency"
                      currencyValue="firstCurrencyValue"
                      errors={errors}
                    />
                    <Grid container item fullWidth>
                      <SelectWithIcon
                        name="secondCurrency"
                        currencies={currencies}
                        label="Output Currency"
                      />
                    </Grid>

                    <Grid
                      container
                      item
                      fullWidth
                      alignContent={"center"}
                      justifyContent={"center"}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: "#000" }}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Swap
                      </Button>
                    </Grid>
                  </Grid>
                  {results && (
                    <Grid container fullWidth>
                      <Results
                        inputCurrencyValue={values?.firstCurrencyValue}
                        outputCurrencyValue={results}
                        inputCurrency={currencies[values?.firstCurrency]?.value}
                        outputCurrency={
                          currencies[values?.secondCurrency]?.value
                        }
                        setResults={setResults}
                      />
                      <Grid
                        container
                        item
                        fullWidth
                        alignContent={"center"}
                        justifyContent={"center"}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          sx={{ backgroundColor: "#000", marginTop: "10px" }}
                          onClick={() => {
                            resetForm();
                            setResults(null);
                          }}
                          disabled={isSubmitting}
                        >
                          Clear
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Form>
              )}
            </Formik>
          </>
        )}
      </Box>
    </div>
  );
};

export default SwapForm;
