import './App.css';
import { database } from "./firebaseConfig";
import { collection, collectionGroup, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';


function App() {

  const [personData, setPersonData] = useState([]);
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const personsDBInstance = await getDocs(collection(database, 'persons'));
      const fetchedPersonData = personsDBInstance.docs.map(doc => doc.data());
      setPersonData(fetchedPersonData);

      const EducationsSubcollection = await getDocs(collectionGroup(database, 'educations'));
      const fetchedEducationData = EducationsSubcollection.docs.map(doc => doc.data());
      setEducationData(fetchedEducationData);
    };
    fetchData();
  }, []);


  return (
    <div className="App">
      {personData.map(person => (
        <div>
          <p>Name: {person.firstName + " " + person.lastName}</p>
          <p>City: {person.city}</p>
          <p>Email: {person.email}</p>
        </div>
      ))}
      {educationData.map(education => (
        <div key={education.id}>
          <h4>Education Details:</h4>
          <p>Level: {education.educationLevel}</p>
          <p>Study Name: {education.studyName}</p>
          <p>School Name: {education.scoolName}</p>
          <p>Time of Study from: {education.timeOfStudyFromYear}-{education.timeOfStudyFromMonth}</p>
          <p>Time of Study to: {education.timeOfStudyToYear}-{education.timeOfStudyToMonth}</p>
        </div>
      ))}
    </div>

  );
}

export default App;
