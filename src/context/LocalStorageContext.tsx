import {createContext, useContext} from 'react';

interface ILocalStorageContext {
  foo: string;
	setFooValue: (val: string) => void;
}

const defaultState = {
	foo: 'bar',
	setFooValue: (val: string) => {}
};

export const LocalStorageContext = createContext<ILocalStorageContext>(defaultState);

export const useLocalStorageContext = () => useContext(LocalStorageContext);