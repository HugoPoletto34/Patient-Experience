import { Container, Content, Logo, NavList, NavLink, Li } from "./styles";
import logo from "../../imgs/logo.jpeg";
import { isAuthenticated, getUserName, logout, getId } from "../services/auth";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExit = () => {
    logout();
    navigate('/login')
    setAnchorEl(null);
  };
  const handleResetPassword = () => {
    navigate('/reset-password/' + getId())
    setAnchorEl(null);
  };
  const obj = isAuthenticated() ? (
    <NavList>
      <li>
        <NavLink href="/dashboard">Dashboard</NavLink>
      </li>
      <Li>
          
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="default"
          ><p>Olá, {getUserName()}</p>
            <AccountCircle  />
          </IconButton></Li>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleExit}>Sair</MenuItem>
            <MenuItem onClick={handleResetPassword}>Mudar de Senha</MenuItem>

          </Menu>
    </NavList>
  ) : (
    <NavList>
      <li>
        <NavLink href="/login">Fazer Login</NavLink>
      </li>
    </NavList>
  );
  return (
    <Container>
      <Content>
        <Logo src={logo} />
        <nav>{obj}</nav>
        
      </Content>
    </Container>
  );
}
