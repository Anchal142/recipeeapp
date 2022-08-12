import './App.css';
import Axios from "axios";
import {useState} from 'react';
import RecipeTile from './RecipeTile';


function App() {
  const [query, setquery] = useState("")
  const [recipes,setrecipes] = useState([])
  const [healthLabels, sethealthLabels] = useState("vegan")
  const YOUR_APP_ID = "2ebf3713";
  const YOUR_APP_KEY = "ced4d32bf6acfee0dcfdc920a8ab6ab3";

  var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits) 
    console.log(result.data);
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    getRecipes();
  }
  return (
    <div className="app">
      <h1 onClick={getRecipes}>Food Recipes App</h1>
      <form className='app_searchForm' onSubmit={onSubmit}>
        <input type="text" className='app_input' placeholder='search ingrident' value={query} onChange={(e)=> setquery(e.target.value)}/>     
        <input type="submit" className='app_submit' value="search" /> 
        
        <select className='app_healthLabels'>
          <option onClick={()=>sethealthLabels("vegan")}>Vegan</option>
          <option onClick={()=>sethealthLabels("paleo")}>paleo</option>
          <option onClick={()=>sethealthLabels("dairy-free")}>dairy-free</option>
          <option onClick={()=>sethealthLabels("gluten-free")}>Vegan</option>
          <option onClick={()=>sethealthLabels("low-sugar")}>low-sugar</option>
          <option onClick={()=>sethealthLabels("egg-free")}>egg-free</option>
          <option onClick={()=>sethealthLabels("tree-nut-free")}>tree-nut-free</option>
          <option onClick={()=>sethealthLabels("soy-free")}>soy-free</option>
          <option onClick={()=>sethealthLabels("fish-free")}>fish-free</option>
          <option onClick={()=>sethealthLabels("shelfish-free")}>shelfish-free</option>
        </select>
      </form>

      <div className='app_recipes'>
        {recipes.map(recipe =>{
          return <RecipeTile recipe={recipe}/>;
        })}
      </div>
    </div>
    
   
  );
}

export default App;
