import { Content } from "../../styles/components";
import { isNucleo } from "../../components/services/auth";
import NucleoDashboard from "../../components/Dashboards/NucleoDashboard";
import SetorDashboard from "../../components/Dashboards/SetorDashboard";

function Dashboard() {
  const result = isNucleo();

  return (
    <Content>
      {result ? (
        <NucleoDashboard />
      ) :
        <SetorDashboard />
      }
    </Content>
  );
}

export default Dashboard;
