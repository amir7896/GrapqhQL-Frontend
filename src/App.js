import "./App.css";
import Routing from "./routing/Routing";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apolloSetup";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProvideAuth } from "./hooks/useAuth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineController,
  LineElement,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineController,
  LineElement,
  PolarAreaController,
  RadialLinearScale
);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <ProvideAuth>
            <Routing />
          </ProvideAuth>
          <ToastContainer />
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
