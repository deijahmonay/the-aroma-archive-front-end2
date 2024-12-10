import { Link } from "react-router-dom";

const PerfumeList = (props) => {
  return (
    <main>
      {props.perfumes.map((perfume) => (
        <Link key={perfume._id} to={`/perfumes/${perfume._id}`}>
          <article>
            <header>
              <h2>{perfume.name}</h2>
              <p>
                {perfume.author?.username} posted on{" "}
                {new Date(perfume.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{perfume.brand}</p> 
          </article>
        </Link>
      ))}
    </main>
  )
}

export default PerfumeList