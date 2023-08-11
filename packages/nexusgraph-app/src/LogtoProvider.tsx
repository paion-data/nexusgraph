// Copyright 2023 Paion Data. All rights reserved.
import { LogtoProvider, LogtoConfig, useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";

/**
 * Creat LogtoProvider to provide a Logto context
 *
 * @param param0 App content
 *
 * @returns Logto provider component
 */
const LogtoProviderWapper = ({ children }: any): JSX.Element => {
  const config: LogtoConfig = {
    endpoint: process.env.LOGTO_ENDPOINT_URL as string,
    appId: process.env.LOGTO_APP_ID as string,
  };
  return <LogtoProvider config={config}>{children}</LogtoProvider>;
};

/**
 * Navigate to root path when finished signIn
 *
 * @returns void
 */
export const Callback = () => {
  const navigate = useNavigate();

  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/");
  });

  if (isLoading) {
    return <div>Redirecting...</div>;
  }
};
export default LogtoProviderWapper;
