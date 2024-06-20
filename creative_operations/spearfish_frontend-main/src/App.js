import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import Guard from './components/LoginGuard';
import PageSpinner from './components/page_spinner';
import styles from './global/styles/_variables.scss';
import { getJWT } from './global/utils/security';
import 'react-loading-skeleton/dist/skeleton.css';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getJWT(process.env.REACT_APP_SECRET_KEY);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Routes
const LandingPage = React.lazy(() => import('./pages/main'));
const Dashboard = React.lazy(() => import('./pages/dashboard/pages/home'));
const Categories = React.lazy(() => import('./pages/dashboard/pages/categories'));
const Category = React.lazy(() => import('./pages/dashboard/pages/category'));
const UserProfile = React.lazy(() => import('./pages/dashboard/pages/user_profile'));
const Challenges = React.lazy(() => import('./pages/dashboard/pages/challenges'));
const Budgets = React.lazy(() => import('./pages/dashboard/pages/budgets'));
const Budget = React.lazy(() => import('./pages/dashboard/pages/budget'));
const NewBudget = React.lazy(() => import('./pages/dashboard/pages/budgets/new_budget'));
const SignUp = React.lazy(() => import('./pages/main/auth/signup'));
const VerifyEmail = React.lazy(() => import('./pages/main/auth/verify_email'));
const Login = React.lazy(() => import('./pages/main/auth/login'));
const ForgotPassword = React.lazy(() => import('./pages/main/auth/forgot_password'));
const ResetPassword = React.lazy(() => import('./pages/main/auth/forgot_password/ResetPassword'));

function App() {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Router>
          <main>
            <Helmet>
              <meta name="theme-color" content={styles.bgSecondary1Lighter} />
              <meta name="msapplication-TileColor" content={styles.bgPrimary} />
            </Helmet>
            <Suspense fallback={<PageSpinner pMargin='20px 0' />}>
              <Routes>
                {/* Routes that don't require auth */}
                <Route path="/" exact={true} element={<LandingPage />} />
                <Route path="/signup" exact={true} element={<SignUp />} />
                <Route path="/verify" exact={true} element={<VerifyEmail />} />
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/forgot_password" exact={true} element={<ForgotPassword />} />
                <Route path="/reset" exact={true} element={<ResetPassword />} />
                {/* Routes requiring auth. They are encapsulated with the Guard compomponent */}
                <Route path="/dashboard" exact={true} element={<Guard Component={Dashboard} />} />
                <Route path="/budget/new" exact={true} element={<Guard Component={NewBudget} />} />
                <Route path="/budgets" exact={true} element={<Guard Component={Budgets} />} />
                <Route path="/budgets/:id" exact={true} element={<Guard Component={Budget} />} />
                <Route path="/budgets/:budget_id/dials" exact={true} element={<Guard Component={Categories} />} />
                <Route path="/budgets/:budget_id/dials/:dial_id" exact={true} element={<Guard Component={Category} />} />
                <Route path="/challenges" exact={true} element={<Guard Component={Challenges} />} />
                <Route path="/profile" exact={true} element={<Guard Component={UserProfile} />} />
              </Routes>
            </Suspense>
          </main>
        </Router>
      </ApolloProvider>
    </HelmetProvider>
  );
}

export default App;
