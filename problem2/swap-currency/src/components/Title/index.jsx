import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  container: {
    width: "auto",
    padding: "20px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  main: {
    zIndex: 999,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "#666",
    fontSize: "45px",
    textTransform: "uppercase",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: 900,
    width: "100%",
  },
  behind: {
    fontSize: "70px",
    letterSpacing: "10px",
    color: "#efefef",
    lineHeight: 0.7,
    textTransform: "uppercase",
    fontWeight: 800,
    margin: 0,
    textAlign: "center",
    minWidth: "400px",
  },
  hightlight: {
    color: "#da9900",
  },
}));

const Tittle = ({ main, highlight, behind }) => {
  const style = useStyles();
  return (
    <Typography component={"div"} className={style.container}>
      <Typography variant="h1" className={style.main}>
        {main}
        <span className={style.hightlight}>{highlight}</span>
      </Typography>
      <span className={style.behind}>{behind}</span>
    </Typography>
  );
};
Tittle.propTypes = {
  // Add prop types here
  main: PropTypes.string,
  highlight: PropTypes.string,
  behind: PropTypes.string,
};
export default Tittle;
