import logo from './logo.svg';
import { useEffect, useState } from "react"
import DisplayCard from './DisplayCard'
import './App.css';
import axios from "axios"

function App() {
  const [data, setData] = useState({ villagers: [] })
  const [faves, setFaves] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get("http://acnhapi.com/v1/villagers/")
      .then(response => {
        // console.log(response.data)
        const dataArray = Object.values(response.data)
        // console.log(dataArray)
        // const dataArray = []
        // for (const key in response.data) {
        //   dataArray.push(response.data[key])
        // }

        // console.log(dataArray)
        setData({ villagers: dataArray })
      })
      .catch(console.error)
  }, [])

  const handleClick = villager => {
    const villagerIndex = faves.indexOf(villager)
    if (villagerIndex === -1) {
      // prevent duplicates
      setFaves([...faves, villager])
    } else {
      const favesClone = [...faves]
      favesClone.splice(villagerIndex, 1)
      setFaves(favesClone)
    }
  }

  const getFilteredVillagers = () => {
    const searchTerm = search.toLowerCase()
    return data.villagers.filter(villager => {
      const lowerCaseName = villager.name["name-USen"].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }
 
  return (
    <div className="App">
      <label htmlFor="villager-search">Search:</label>
      <input 
        id="villager-search"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <h1>Favorites:</h1>

    <DisplayCard
      villagers={faves}
      handleClick={handleClick}
    />

      <h1>Villagers:</h1>

      <DisplayCard 
        villagers={getFilteredVillagers()} 
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;