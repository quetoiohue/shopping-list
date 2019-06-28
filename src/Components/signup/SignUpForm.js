import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../login/LoginForm.css";
import "../../App.css";
import "typeface-roboto";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red, grey } from "@material-ui/core/colors";
import {
  TextField,
  Grid,
  Button,
  Tooltip,
  Fab,
  Chip,
  IconButton
} from "@material-ui/core";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  ErrorOutlineOutlined
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  m_b_23: {
    marginBottom: "23px"
  },
  inputText: {
    width: "100%",
    "& input": {
      fontSize: "16px",
      lineHeight: "1.2",
      color: "#333"
    },
    "& label": {
      fontSize: "15px"
    }
  },
  p_l_10: {
    paddingLeft: "10px"
  },
  containerInput: {
    width: "100%",
    "& svg": {
      fontSize: "24px"
    }
  },
  button: {
    width: "100%",
    height: "50px",
    padding: "0px 20px",
    borderRadius: "25px",
    boxShadow: " 0 5px 30px 0 rgba(3,216,222,.2)",
    transition: "all .4s",
    letterSpacing: ".3px"
    // "&:hover": {
    //   backgroundImage: "linear-gradient(to right ,#00dbde,#fc00ff,#00dbde)"
    // }
  },
  m_5: {
    margin: "5px"
  },
  blue: {
    backgroundColor: blue[800]
  },
  red: {
    backgroundColor: red[600]
  },
  grey: {
    backgroundColor: grey[900]
  },
  input_btnEnd: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)"
  },
  z_1000: {
    zIndex: 1000
  }
}));

const SignUpForm = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    txtUsername: "",
    txtPassword: "",
    validatePassConfirm: "",
    errors: {
      txtUsername: "",
      txtPassword: "",
      validatePassConfirm: ""
    },
    isPassword: true
  });

  const validateUser = () => {
    const { txtUsername } = state;
    if (txtUsername === "") {
      setState({
        ...state,
        errors: {
          txtUsername: "usename is not null."
        }
      });
    } else {
      setState({
        ...state,
        errors: {
          txtUsername: ""
        }
      });
    }
  };

  const validatePass = () => {
    const { txtPassword } = state;
    if (txtPassword === "") {
      setState({
        ...state,
        errors: {
          txtPassword: "password is not null."
        }
      });
    } else if (txtPassword.length <= 6) {
      setState({
        ...state,
        errors: {
          txtPassword: "password has length bigger than 6."
        }
      });
    } else {
      setState({
        ...state,
        errors: {
          txtPassword: ""
        }
      });
    }
  };

  const validatePassConfirm = () => {
    const { txtPassword, txtPasswordConfirm } = state;
    if (txtPasswordConfirm !== txtPassword) {
      setState({
        ...state,
        errors: {
          txtPasswordConfirm: "password is not matched."
        }
      });
    } else {
      setState({
        ...state,
        errors: {
          txtPasswordConfirm: ""
        }
      });
    }
  };

  const validateForm = () => {
    const { txtUsername, txtPassword, errors, txtPasswordConfirm } = state;

    if (
      !errors.txtUsername &&
      !errors.txtPassword &&
      !errors.txtPasswordConfirm &&
      txtUsername &&
      txtPassword &&
      txtPasswordConfirm
    ) {
      return true;
    }
    return false;
  };

  const onChangeInput = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onToggleTypePassword = event => {
    const { isPassword } = state;
    event.preventDefault();
    setState({
      ...state,
      isPassword: !isPassword
    });
  };

  const onSubmit = () => {
    if (validateForm()) {
      const { txtUsername, txtPassword } = state;
      const Account = {
        txtUsername,
        txtPassword,
        listItem: [],
        listItemCheckOff: [],
        isSort: { isAlpha: false, isCategory: false, isOrder: true }
      };
      localStorage.setItem("account", JSON.stringify(Account));
      props.history.push("/");
      return;
    } else return;
  };

  const {
    txtUsername,
    txtPassword,
    errors,
    isPassword,
    txtPasswordConfirm
  } = state;

  return (
    <div className="wrap-page ">
      <div className="containter-page flex-center">
        <div className="container-form flex-center">
          <form className="form-login">
            <div className="title-form">
              <h3 className="title">Sign Up</h3>
            </div>
            <div className="wrap-input m-b-23">
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={`${classes.m_b_23} ${classes.containerInput}`}
              >
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item className={classes.containerInput}>
                  <TextField
                    label="Username"
                    className={classes.inputText}
                    value={txtUsername}
                    onChange={onChangeInput}
                    name="txtUsername"
                    onBlur={validateUser}
                  />
                  {errors.txtUsername ? (
                    <Chip
                      variant="outlined"
                      color="secondary"
                      size="small"
                      icon={<ErrorOutlineOutlined />}
                      label={errors.txtUsername}
                      className={classes.input_btnEnd}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </div>
            <div className="wrap-input m-b-23">
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={`${classes.containerInput} ${classes.m_b_23}`}
              >
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item className={classes.containerInput}>
                  <TextField
                    label="Password"
                    type={isPassword ? "password" : "text"}
                    className={classes.inputText}
                    value={txtPassword}
                    onChange={onChangeInput}
                    onBlur={validatePass}
                    name="txtPassword"
                  />
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={onToggleTypePassword}
                    className={`${classes.input_btnEnd}  ${classes.z_1000}`}
                  >
                    {!isPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  {errors.txtPassword ? (
                    <Chip
                      variant="outlined"
                      color="secondary"
                      size="small"
                      icon={<ErrorOutlineOutlined />}
                      label={errors.txtPassword}
                      className={`${classes.input_btnEnd}`}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </div>
            <div className="wrap-input m-b-23">
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={`${classes.containerInput} ${classes.m_b_23}`}
              >
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item className={classes.containerInput}>
                  <TextField
                    label="Password Confirm"
                    type="password"
                    className={classes.inputText}
                    value={txtPasswordConfirm}
                    onChange={onChangeInput}
                    onBlur={validatePassConfirm}
                    name="txtPasswordConfirm"
                  />
                  {errors.txtPasswordConfirm ? (
                    <Chip
                      variant="outlined"
                      color="secondary"
                      size="small"
                      icon={<ErrorOutlineOutlined />}
                      label={errors.txtPasswordConfirm}
                      className={`${classes.input_btnEnd}`}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={validateForm() ? false : true}
              onClick={onSubmit}
            >
              SIGN UP
            </Button>
            <div className="text-footer-form">
              <Link to="/" className="text2">
                LOG IN
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
