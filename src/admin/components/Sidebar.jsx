import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import { Box, Button, Link as MuiLink } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { Link as RouterLink } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState } from "react";

const Sidebar = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);

  return (
    <Box
      sx={{
        flexDirection: "column",
        background: "#101827",
        display: "flex",
        color: "#fff",
        gap: "1rem",
        width: "12rem",
      }}
    >
      {/* Inicio */}
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
          <PeopleAltIcon /> Usuarios
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
            sx={{ fontSize: ".8rem" }}
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
          <GroupsIcon /> Clientes
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
            sx={{ fontSize: ".8rem" }}
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
            sx={{ fontSize: ".8rem" }}
            onClick={() => setAnchorEl3(null)}
          >
            AÑADIR SERVICIO
          </MenuItem>
          <MenuItem
            sx={{ fontSize: ".8rem" }}
            onClick={() => setAnchorEl3(null)}
          >
            REGISTRAR SERVICIO X CLIENTE
          </MenuItem>
          <MenuItem
            sx={{ fontSize: ".8rem" }}
            onClick={() => setAnchorEl3(null)}
          >
            LISTA DE SERVICIOS
          </MenuItem>
        </Menu>
      </div>

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
    </Box>
  );
};

export default Sidebar;
