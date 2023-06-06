import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import CadastroManifestacao from "../../pages/CadastroManifestacao";
import CadastroUsuario from "../../pages/CadastroUsuario";
import SignIn from "../../pages/Login";
import RouteGuard from "./RouteGuard";
import Dashboard from "../../pages/Dashboard";
import VisualizacaoManifestacao from "../../pages/VisualizacaoManifestacao";
import FirstAccess from "../../pages/FirstAccess";
import RespostaManifestacao from "../../pages/RespostaManifestacao";
import ResetPassword from "../../pages/ResetPassword";

const Rotas = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route
        path="/cadastro/usuario"
        caseSensitive={false}
        element={
          <RouteGuard>
            <CadastroUsuario />
          </RouteGuard>
        }
      />

      <Route
        path="/cadastro/usuario/:matricula"
        caseSensitive={false}
        element={
          <RouteGuard>
            <CadastroUsuario />
          </RouteGuard>
        }
      />
      <Route
        path="/cadastro/manifestacao/:id"
        caseSensitive={false}
        element={
          <RouteGuard>
            <CadastroManifestacao />
          </RouteGuard>
        }
      />
      <Route
        path="/visualizar/manifestacao/:id"
        caseSensitive={false}
        element={
          <RouteGuard>
            <VisualizacaoManifestacao />
          </RouteGuard>
        }
      />
      <Route
        path="/cadastro/manifestacao"
        caseSensitive={false}
        element={
          <RouteGuard>
            <CadastroManifestacao />
          </RouteGuard>
        }
      />
      <Route path="/login" caseSensitive={false} element={<SignIn />} />
      <Route path="/" caseSensitive={false} element={<SignIn />} />
      <Route
        path="/dashboard"
        caseSensitive={false}
        element={
          <RouteGuard>
            <Dashboard />
          </RouteGuard>
        }
      />
      <Route
        path="/reset-password/:id"
        caseSensitive={false}
        element={
          <RouteGuard>
            <ResetPassword />
          </RouteGuard>
        }
      />
      <Route
        path="/primeiro-acesso/:id"
        caseSensitive={false}
        element={<FirstAccess />}
      />
      <Route
        path="/manifestacao/:id/resposta"
        caseSensitive={false}
        element={<RouteGuard><RespostaManifestacao /></RouteGuard>}
      />
    </Routes>
  </BrowserRouter>
);

export default Rotas;
