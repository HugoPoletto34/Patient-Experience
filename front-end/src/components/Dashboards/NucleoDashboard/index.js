import { TitleComponent } from "../../../pages/CadastroManifestacao/styles";
import { ColumnContainer } from "../../Layout/Containers";
import AssuntoTable from "../../Tables/AssuntoTable";
import CanalComunicacaoTable from "../../Tables/CanalComunicacaoTable";
import ClassificacaoTable from "../../Tables/ClassificacaoTable";
import CoordenadorTable from "../../Tables/CoordenadorTable";
import GrauParentescoTable from "../../Tables/GrauParentescoTable";
import LeitoTable from "../../Tables/LeitoTable";
import ManifestacaoTable from "../../Tables/ManifestacaoTable";
import SetorTable from "../../Tables/SetorTable";
import TipoTable from "../../Tables/TipoTable";

export default function NucleoDashboard() {
  return (
    <div>
      <ColumnContainer>
        <div>
          <TitleComponent>
            <h1>Manifestações</h1>
            <p>Lista de manifestações dos pacientes</p>
          </TitleComponent>
          <ManifestacaoTable />
        </div>
        <div>
          <TitleComponent>
            <h1>Usuários Cadastrados</h1>
            <p>Lista de coordenadores de setor</p>
          </TitleComponent>
          <CoordenadorTable />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "100%" }}>
            <TitleComponent>
              <h1>Setores</h1>
            </TitleComponent>
            <SetorTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Assuntos</h1>
            </TitleComponent>
            <AssuntoTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Canais de Comunicação</h1>
            </TitleComponent>
            <CanalComunicacaoTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Classificações</h1>
            </TitleComponent>
            <ClassificacaoTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Graus de Parentesco</h1>
            </TitleComponent>
            <GrauParentescoTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Tipos</h1>
            </TitleComponent>
            <TipoTable />
          </div>
          <div style={{ width: "50%", padding: 10 }}>
            <TitleComponent>
              <h1>Leitos</h1>
            </TitleComponent>
            <LeitoTable />
          </div>
        </div>
      </ColumnContainer>
    </div>
  );
}
