
export enum FetchInloaderAction {
  INLOADER = 'INLOADER',
  LOADER = 'LOADER',
}
interface ILoader {
  readonly type: typeof FetchInloaderAction.LOADER;
  loader?: boolean;
}
interface IInLoader {
  readonly type: typeof FetchInloaderAction.INLOADER;
  loader?: boolean;
}
export const loader = () => {
  return {
    type: FetchInloaderAction.LOADER
  }
}
export const inLoader = () => {
  return{
    type: FetchInloaderAction.INLOADER
  }
}

export type TLoader = 
| ILoader
| IInLoader;
