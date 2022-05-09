import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}>Sign In</button>
    )
  );
};

export default LoginButton;
