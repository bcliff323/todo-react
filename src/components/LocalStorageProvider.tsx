import {createContext, useState, useContext} from 'react';
import {LocalStorageContext} from '../context/LocalStorageContext';

type Props = {
  children?: React.ReactNode;
};

export default function LocalStorageProvider({children}: Props) {
	const [foo, setFoo] = useState("");

	const setFooValue = (val: string) => {
		setFoo(val);
	};

	const ctx = {
		foo,
		setFooValue
	};
	
	return (
		<LocalStorageContext.Provider value={ctx}>
      {children}
    </LocalStorageContext.Provider>
	)
}