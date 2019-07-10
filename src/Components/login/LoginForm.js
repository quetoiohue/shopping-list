import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import "../../App.css";
import "typeface-roboto";
import GoogleLogin from "react-google-login";
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
import * as fetch from '../../API/login';
import Loading from '../loading/Loading';

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

const LoginForm = props => {
  const classes = useStyles();
  const [state, setState] = useState({
    txtUsername: "",
    txtPassword: "",
    errors: {
      txtUsername: "",
      txtPassword: ""
    },
    isPassword: true,
    isLoading: false,
    isLogin: false
  });

  React.useEffect(() => {
    const get_Token = JSON.parse(localStorage.getItem('token'));
    if (get_Token) {
      props.history.push('/list');
    }
  }, [])

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

  const validateForm = () => {
    const { txtUsername, txtPassword, errors } = state;

    if (
      !errors.txtUsername &&
      !errors.txtPassword &&
      txtUsername &&
      txtPassword
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

  const onSubmit = async () => {
    const { txtUsername, txtPassword } = state;
    const res = await fetch.checkAccount(txtUsername, txtPassword);
    const isExistAccount = res.data.length;
    if (validateForm() && isExistAccount) {
      localStorage.setItem('USER_ID', res.data[0].USER_ID);
      fetch.getToken(txtUsername, txtPassword).then(res => {
        const token = res.data.token;
         localStorage.setItem('token', JSON.stringify(token));
         props.history.push("/list");
      });
      
      return;
    }
    return;
  };
 

  const { txtUsername, txtPassword, errors, isPassword, isLoading } = state;

  return isLoading ? (
    <Loading />
  ) : (
    <>
    <div className="wrap-page ">
      <div className="containter-page flex-center">
        <div className="container-form flex-center">
          <form className="form-login">
            <div className="title-form">
              <h3 className="title">Login</h3>
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
            <div className="wrap-input">
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className={classes.containerInput}
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
            <div className="text-right">
              <span className="text">Forgot password?</span>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={validateForm() ? false : true}
              onClick={onSubmit}
            >
              LOGIN
            </Button>
            <div className="text-option-login">
              <span>Or Sign Up Using</span>
            </div>
            <div className="option-login flex-center">
              <Tooltip title="Facebook" className={classes.m_5}>
                <Fab
                  color="secondary"
                  // onClick={loginWithFacebook}
                  className={`${classes.blue}`}
                >
                  <i
                    className="fab fa-facebook-f"
                    style={{ fontSize: " 24px", color: "white" }}
                  />
                </Fab>
              </Tooltip>
              <Tooltip title="Gmail" className={classes.m_5}>
                <GoogleLogin
                  clientId="168202107270-vcl1dn5eoq8ldimh4nitcio7nc95am6q.apps.googleusercontent.com"
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  render={renderProps => (
                    <Fab
                      color="secondary"
                      onClick={renderProps.onClick}
                      className={`${classes.red}`}
                    >
                      <i
                        className="fab fa-google    "
                        style={{ fontSize: " 24px", color: "white" }}
                      />
                    </Fab>
                  )}
                />
              </Tooltip>
              <Tooltip title="GitHub" className={classes.m_5}>
                <Fab color="secondary" className={`${classes.grey}`}>
                  <i
                    className="fab fa-github"
                    style={{ fontSize: " 24px", color: "white" }}
                  />
                </Fab>
              </Tooltip>
            </div>
            <div className="text-footer-form">
              <span className="text1">Or Sign Up Using</span>
              <Link to="/signup" className="text2">
                SIGN UP
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginForm;
