import { lazy, LazyExoticComponent } from 'react';

export const AuthModule: LazyExoticComponent<() => JSX.Element> = lazy(() => import(/* webpackChunkName: "auth_module"*/ '../auth/AuthModule'))
export const UserModule: LazyExoticComponent<() => JSX.Element> = lazy(() => import(/* webpackChunkName: "user_module"*/ '../user/UserModule'))