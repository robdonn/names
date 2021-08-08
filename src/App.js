import { useEffect, useState } from 'react';
import Refresh from '@material-ui/icons/Refresh';
import names from './names.json';
import './App.css';

const GENDERS = {
  BOY: 'boy',
  GIRL: 'girl',
};

const MIDDLE = {
  [GENDERS.BOY]: 'Matthew',
  [GENDERS.GIRL]: 'Ann',
};

function App() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState(GENDERS.BOY);
  const [fullName, setFullName] = useState(`${name} Matthew Donnelly`);
  const [tracker, setTracker] = useState(0);

  const getRandomName = (gender) => {
    console.log(tracker);
    if (tracker >= names[gender].length) {
      setTracker(0);
      return names[gender][0];
    }

    setTracker(tracker + 1);
    return names[gender][tracker];
  };

  const onRefresh = () => {
    setName(getRandomName(gender));
  };

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    setFullName(`${name} ${MIDDLE[gender]} Donnelly`);
  }, [name]);

  useEffect(() => {
    onRefresh();
  }, [gender]);

  return (
    <div className="App">
      <div>{fullName}</div>
      <div className="menu">
        <select onChange={onGenderChange} value={gender}>
          {Object.values(GENDERS).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={onRefresh}>
          <Refresh />
        </button>
      </div>
      <div className="collected">Oisín & {name}</div>
    </div>
  );
}

export default App;
