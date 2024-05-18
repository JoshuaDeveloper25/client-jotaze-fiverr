import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppProvider";
import logo from "../../images/logo1.webp";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = () => {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();

  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);

  const handleLogOut = () => {
    setUserInfo({});
    navigate("/");
    toast.success("¡Cerrado sesión exitosamente!");
    localStorage.removeItem("userInfo");
    axios.defaults.headers.common["Authorization"] = null;
  };

  return (
    <Box
      sx={{
        background: "#020F1F",
        color: "#fff",
        width: "13rem",
        minHeight: "100vh",
        position: "sticky",
        top: "0",
        bottom: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Box
          component={"div"}
          sx={{
            maxWidth: "6.5rem",
            margin: "0 auto 1rem auto",
            paddingTop: "1rem",
          }}
        >
          {userInfo?.role === "client" ? (
            <Box component={Link} to={"/admin/registrar-servicio"}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                }}
                src={logo}
              ></Box>
            </Box>
          ) : (
            <Box component={Link} to={"/admin/"}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                }}
                src={logo}
              ></Box>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {userInfo?.role === "admin" ? (
            <>
              {/* Inicio */}
              <div>
                <Button
                  to={"/admin/"}
                  component={NavLink}
                  sx={{
                    color: `${
                      location?.pathname === "/admin/" ? "#188754" : "#fff"
                    }`,
                    background: `${
                      location?.pathname === "/admin/"
                        ? "rgba(211, 211, 211, .2)"
                        : "transparent"
                    }`,
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: ".4rem",
                    textTransform: "capitalize",
                    padding: ".3rem 1rem",
                    marginTop: "1.6rem",
                    width: "100%",
                  }}
                >
                  <HouseOutlinedIcon /> Inicio
                </Button>
              </div>

              {/* Usuarios */}
              <div>
                <Button
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: ".4rem",
                    textTransform: "capitalize",
                    padding: ".3rem 1rem",
                    width: "100%",
                  }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl1(event.currentTarget)}
                  aria-haspopup="true"
                  id="basic-button"
                >
                  <PeopleAltIcon /> Usuarios <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  onClose={() => setAnchorEl1(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  open={open}
                >
                  <MenuItem
                    to={`/admin/nuevo-usuario`}
                    component={NavLink}
                    sx={{
                      fontSize: ".8rem",
                      color: `${
                        location?.pathname === "/admin/nuevo-usuario"
                          ? "#188754"
                          : "#000"
                      }`,
                      background: `${
                        location?.pathname === "/admin/nuevo-usuario"
                          ? "rgba(211, 211, 211, .2)"
                          : "transparent"
                      }`,
                    }}
                    onClick={() => setAnchorEl1(null)}
                  >
                    NUEVO USUARIO
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: ".8rem" }}
                    onClick={() => setAnchorEl1(null)}
                  >
                    LISTA DE USUARIOS
                  </MenuItem>
                </Menu>
              </div>

              {/* Clientes */}
              <div>
                <Button
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: ".4rem",
                    textTransform: "capitalize",
                    padding: ".3rem 1rem",
                    width: "100%",
                  }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl2(event.currentTarget)}
                  aria-haspopup="true"
                  id="basic-button"
                >
                  <GroupsIcon /> Clientes <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl2}
                  onClose={() => setAnchorEl2(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  open={open2}
                >
                  <MenuItem
                    to={`/admin/nuevo-cliente`}
                    component={NavLink}
                    sx={{
                      fontSize: ".8rem",
                      color: `${
                        location?.pathname === "/admin/nuevo-cliente"
                          ? "#188754"
                          : "#000"
                      }`,
                      background: `${
                        location?.pathname === "/admin/nuevo-cliente"
                          ? "rgba(211, 211, 211, .2)"
                          : "transparent"
                      }`,
                    }}
                    onClick={() => setAnchorEl2(null)}
                  >
                    NUEVO CLIENTE
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: ".8rem" }}
                    onClick={() => setAnchorEl2(null)}
                  >
                    LISTA DE CLIENTES
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : null}

          {/* Servicios */}
          <div>
            <Button
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "start",
                justifyContent: "start",
                gap: ".4rem",
                textTransform: "capitalize",
                padding: ".3rem 1rem",
                width: "100%",
              }}
              aria-controls={open ? "basic-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => setAnchorEl3(event.currentTarget)}
              aria-haspopup="true"
              id="basic-button"
            >
              <FolderOpenIcon /> Servicios
              <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl3}
              onClose={() => setAnchorEl3(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              open={open3}
            >
              <MenuItem
                sx={{
                  fontSize: ".8rem",
                  color: `${
                    location?.pathname === "/admin/registrar-servicio"
                      ? "#188754"
                      : "#000"
                  }`,
                  background: `${
                    location?.pathname === "/admin/registrar-servicio"
                      ? "rgba(211, 211, 211, .2)"
                      : "transparent"
                  }`,
                }}
                onClick={() => setAnchorEl3(null)}
                to={`/admin/registrar-servicio`}
                component={NavLink}
              >
                AÑADIR SERVICIO
              </MenuItem>

              {userInfo?.role === "client" ? null : (
                <MenuItem
                  to={`/admin/servicio-cliente`}
                  component={NavLink}
                  sx={{
                    fontSize: ".8rem",
                    color: `${
                      location?.pathname === "/admin/servicio-cliente"
                        ? "#188754"
                        : "#000"
                    }`,
                    background: `${
                      location?.pathname === "/admin/servicio-cliente"
                        ? "rgba(211, 211, 211, .2)"
                        : "transparent"
                    }`,
                  }}
                  onClick={() => setAnchorEl3(null)}
                >
                  REGISTRAR SERVICIO X CLIENTE
                </MenuItem>
              )}

              {userInfo?.role === "admin" ? (
                <MenuItem
                  to={`/admin/lista-servicios`}
                  component={NavLink}
                  sx={{
                    fontSize: ".8rem",
                    color: `${
                      location?.pathname === "/admin/lista-servicios"
                        ? "#188754"
                        : "#000"
                    }`,
                    background: `${
                      location?.pathname === "/admin/lista-servicios"
                        ? "rgba(211, 211, 211, .2)"
                        : "transparent"
                    }`,
                  }}
                  onClick={() => setAnchorEl3(null)}
                >
                  LISTA DE SERVICIOS
                </MenuItem>
              ) : null}
            </Menu>
          </div>

          {userInfo?.role === "admin" ? (
            <>
              {/* Reportes */}
              <div>
                <Button
                  sx={{
                    color: "#fff",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    gap: ".4rem",
                    textTransform: "capitalize",
                    padding: ".3rem 1rem",
                    width: "100%",
                  }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event) => setAnchorEl4(event.currentTarget)}
                  aria-haspopup="true"
                  id="basic-button"
                >
                  <ShowChartIcon /> Reportes
                  <KeyboardArrowDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl4}
                  onClose={() => setAnchorEl4(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  open={open4}
                >
                  <MenuItem
                    sx={{ fontSize: ".8rem" }}
                    onClick={() => setAnchorEl4(null)}
                  >
                    SERVICIOS ATENDIDOS X CLIENTE
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: ".8rem" }}
                    onClick={() => setAnchorEl4(null)}
                  >
                    SERVICIOS POR USUARIO
                  </MenuItem>
                </Menu>
              </div>
            </>
          ) : null}
        </Box>
      </div>

      <Box sx={{ textAlign: "center", margin: "0 .6rem .6rem .6rem" }}>
        <Button
          onClick={handleLogOut}
          variant="outlined"
          sx={{ width: "100%" }}
          color="error"
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
