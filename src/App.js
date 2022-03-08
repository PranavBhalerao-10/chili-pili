
import './App.css';
import StudentDetail from './components/Student-details/StudentDetail.component';
import StudentTable from './components/student-table/StudentTable.component';

function App() {
  return (
    <div className="App">
      <h2>Student Detail</h2>
      <StudentDetail />
      <h2>Student Table</h2>
      <StudentTable />
    </div>
  );
}

export default App;
