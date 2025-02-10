import { useEffect, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar';
import FlightCard from './components/FlightCard';
import { Loader2 } from 'lucide-react';

const API_KEY = '2f294ed55e187b5f969ef2d4d122342e';

function App() {

  const [flights, setFlights] = useState([]);
  const [filteredFlight, setFilteredFlight] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.aviationstack.com/v1/flights?access_key=${API_KEY}`);
      const data = await response.json();
      setFlights(data.data);
      setFilteredFlight(data.data);
    }
    catch (error) {
      console.error("Error fetching flights:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${searchTerm}`);
      const data = await response.json();
      setFilteredFlight(data.data || []);
    }
    catch (error) {
      console.error('Errore nella chiamata flight_iata:', error);
    }
    finally {
      setLoading(false);
    }
  };
  
  return (

      <div className='container mx-auto px-4 py-8'>
        <p className='text-3xl font-bold mb-8 text-center'>Flight Tracker</p>
        <SearchBar onSearch={handleSearch} />
        {loading ? 
          <div>
            <div className='flex justify-center items-center my-10'>
            <Loader2 className='h-10 w-10 animate-spin text-gray-600' />
            </div>
          </div>
          :<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          {filteredFlight.map((flights) => (
            <FlightCard key={flights.flight.iata} flight={flights} />
          ))}
          </div>
        }
      </div>

  )
}

export default App
