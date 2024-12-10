const PerfumeList = (props) => {
  return (
    <main>
      {props.perfumes.map((perfume) => {
        return  <p key={perfume._id}>{perfume.name}</p>
      })}
    </main>
  )
}

export default PerfumeList