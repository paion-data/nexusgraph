// Copyright 2023 Paion Data. All rights reserved.
import { InteractionMode, useLogto } from "@logto/react";

export interface OAuth2 {
  isLoading: boolean;
  isAuthenticated: boolean;
  getAccessToken?: (resource?: string) => Promise<string | undefined>;
  signIn?: (redirectUri: string, interactionMode?: InteractionMode) => Promise<void>;
}

export function useOAuth2(): OAuth2 {
  const { signIn, isAuthenticated, isLoading, getAccessToken } = useLogto();

  return { signIn, isAuthenticated, isLoading, getAccessToken };
}

export function useDevOAuth2(): OAuth2 {
  return {
    isLoading: false,
    isAuthenticated: true,
  };
}
