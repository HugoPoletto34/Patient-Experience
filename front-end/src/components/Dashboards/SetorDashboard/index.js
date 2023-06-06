import { TitleComponent } from "../../../pages/CadastroManifestacao/styles";
import ManifestacaoBySetorTable from "../../Tables/ManifestacaoBySetorTable";

export default function SetorDashboard() {
  return (
    <div>
      <TitleComponent>
        <h1>Manifestações</h1>
        <p>Lista de manifestações dos pacientes por setor</p>
      </TitleComponent>
      <ManifestacaoBySetorTable />
    </div>
  )
}