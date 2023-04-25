export default function DisplayCard(props) {
  const allVillagers = props.villagers.map(villager => {
      return (
          <li
              key={`villager ${villager.id}`}
          >
              <img 
                  src={villager.image_uri}
                  alt={villager.name["name-USen"]}
                  onClick={() => props.handleClick(villager)}
              />

              <p>{villager.name["name-USen"]}</p>
          </li>
      )
  })
  return (
      <div>
          <ul>
              {allVillagers}
          </ul>
      </div>
  )
}