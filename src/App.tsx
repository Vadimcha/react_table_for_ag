import React from 'react';


import { Table } from './components/myTableComp/Table'
import { Student } from './components/studentComp/Student';
import { useStudents } from './hooks/students';
// import { ErrorMessage } from './components/errorMessageComp/ErrorMessage';

function App() {
  const {students, error, loading} = useStudents()

  return (
    <div className="App">
      <Table />
    </div>
  );
}

export default App;
