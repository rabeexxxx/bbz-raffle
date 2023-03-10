import { useState } from 'react';
import Celebration from './Celebration';
import { list } from './data';
import bbz_logo from './bbz-logo.svg';
import { useEffect } from 'react';
import Loader from './Loader';
import $ from 'jquery'
function App() {
  // Create Main list 
  // Math.Choose a name from the main list
  // Delete the choosen name from the main list
  // Add the choosen name to the winners list
  // when reach 100 names in winners, stop and show resaults

  const [main_list, setMain_list] = useState([]);
  var winners = [];
  const [final_winners, setFinal_winners] = useState([])
  const [done, setDone] = useState(false);
  const [raffiling, setRaffiling] = useState(false)
  const chooseEmployees = () => {
    // get the name and delete it from main list // loop n times
    for (let i = 0; i < 30; i++) {
      // get the index of shoosen name
      let index_of_the_item = Math.floor(Math.random() * main_list.length);
      let choosen = main_list.splice(index_of_the_item, 1)[0];
      console.log('choosen', choosen)
      winners.push(choosen);
      setFinal_winners(winners);
    }
  };
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const Rdelay = async () => {
    await delay(5000);
    chooseEmployees()
    setDone(true);
  };

  const show_mobile = () => {
    $('.mobile-number').css("display", "block")
  }

  const start_draw = () => {
    setRaffiling(true)
    Rdelay();
  };
  useEffect(() => {
    setMain_list(list);
  }, [])

  return (
    <div className="App">
      <div className='header'><img className="logo" src={bbz_logo} alt="logo" /></div>


      <div className="container">
        {!done ? (raffiling ? <Loader /> : <h1 className="btn-shaffle" onClick={start_draw}>
          RAFFLE
        </h1>

        ) : (
          <>
            <h2 className="cong">CONGRATULATIONS</h2>
            <p className="winner-is">FOR WINNING YOUR FAVOURITE BRANDED FOOTWEAR</p>
            <div className='resaults-grid'>{final_winners.map((winner) => {
              return <div className='card' onClick={show_mobile}><p className="winner" key={winner.mobile}>
                <>{winner.name.toString()}</><br />
                <span className='mobile-number'>{winner.mobile.toString()}</span>
              </p></div>
            })}</div>
            <Celebration />
          </>
        )}



      </div>
    </div>
  );
}

export default App;
