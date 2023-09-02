// Copyright 2023 Paion Data. All rights reserved.
import { useNavigate } from "react-router-dom";

import { LogtoConfig, LogtoProvider, useHandleSignInCallback } from "@logto/react";

/**
 * Creat LogtoProvider to provide a Logto context
 *
 * @param param0 App content
 *
 * @returns Logto provider component
 */
const OAuth2Provider = ({ children }: any): JSX.Element => {
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

  return <></>;
};
export default OAuth2Provider;
