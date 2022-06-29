import { lazy, LazyExoticComponent } from 'react';

export const AuthModule: LazyExoticComponent<() => JSX.Element> = lazy(() => import(/* webpackChunkName: "auth_module"*/ '../auth/AuthModule'))