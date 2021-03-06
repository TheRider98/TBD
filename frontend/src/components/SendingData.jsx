import React, { useState, useEffect } from "react";
import { Button, Box, CircularProgress, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

let uri = "http://localhost:5000";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  uri = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  uri = "https://tradeu4.herokuapp.com";
}
console.log("URI:" + uri);
const useStyles = makeStyles({
  btn: {
    backgroundColor: "#56F6E4",
    fontFamily: "Poppins",
  },
});

function SendingData(props) {
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  //console.log("Data: " + JSON.stringify(props.data));
  //console.log("Confirm: " + props.confirm);

  useEffect(() => {
    if (token && props.confirm) {
      setLoading(true);
      axios
        .post(`${uri}/posts/create`, props.data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          setLoading(false);
          console.log(response.data);
        })
        window.location.reload(false)
      }
  }, [token, props.confirm, props.data]);

  return (
    <div>
      <Box component="span" m={2} display="block"></Box>
      <Box component="span" display="block">
        <Button
          endIcon={<AddIcon />}
          variant="contained"
          size="large"
          className={classes.btn}
          onClick={() => {
            setToken(getAccessTokenSilently());
          }}
          type="submit"
          fullWidth
        >
          Create
        </Button>
      </Box>
      {loading && <CircularProgress color="secondary" />}
    </div>
  );
}

export default SendingData;
