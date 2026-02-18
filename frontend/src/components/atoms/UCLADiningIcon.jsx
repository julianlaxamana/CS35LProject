// Icons were gathered from here: https://dining.ucla.edu/about-us/nutrition-education/legend/
import Alcohol from '../../assets/ucla-dining-icons/alcohol.png';
import Crustacean from '../../assets/ucla-dining-icons/crustacean-shellfish.png';
import Customizable from '../../assets/ucla-dining-icons/customizable.png';
import Dairy from '../../assets/ucla-dining-icons/dairy.png';
import Eggs from '../../assets/ucla-dining-icons/eggs.png';
import Fish from '../../assets/ucla-dining-icons/fish.png';
import Gluten from '../../assets/ucla-dining-icons/gluten.png';
import Halal from '../../assets/ucla-dining-icons/halal.png';
import HighCarbon from '../../assets/ucla-dining-icons/high-carbon.png';
import LowCarbon from '../../assets/ucla-dining-icons/low-carbon.png';
import Peanut from '../../assets/ucla-dining-icons/peanut.png';
import Sesame from '../../assets/ucla-dining-icons/sesame.png';
import Soy from '../../assets/ucla-dining-icons/soy.png';
import TreeNuts from '../../assets/ucla-dining-icons/tree-nuts.png';
import Vegan from '../../assets/ucla-dining-icons/vegan.png';
import Vegetarian from '../../assets/ucla-dining-icons/vegetarian.png';
import Wheat from '../../assets/ucla-dining-icons/wheat.png';

const UCLADiningIcon = ({ tag, size = 24 }) => {
  const icon_src = tagToIcon(tag);
  return <img src={icon_src} alt={tag} width={size} height={size} />;
}

/**
 * Uses REGEX to parse the tag and determine which icon to use for the tag.
 * The regex patterns are designed to match common variations of the tags (e.g., "high carbon" vs "high-carbon")
 * that may come up from our scraped data.
 * @param {*} tag 
 * @returns The file path of the icon corresponding to the tag, or null if no match is found.
 */
const tagToIcon = (tag) => {
  // Map the tag to the corresponding icon name
  const regex_to_icon_map = {
    "alcohol" : Alcohol,
    "crustacean|shellfish" : Crustacean,
    "custom(izable)?" : Customizable,
    "dairy" : Dairy,
    "egg(s)?" : Eggs,
    "fish" : Fish,
    "gluten" : Gluten,
    "halal" : Halal,
    "high[- ]*carbon" : HighCarbon,
    "low[- ]*carbon" : LowCarbon,
    "peanut" : Peanut,
    "sesame" : Sesame,
    "soy" : Soy,
    "tree[- ]*nut(s)?" : TreeNuts,
    "vegan" : Vegan,
    "vegetarian" : Vegetarian,
    "wheat" : Wheat,
  };

  for (const [regex, icon] of Object.entries(regex_to_icon_map)) {
    if (new RegExp(regex, "i").test(tag)) {
      return icon;
    }
  }

  return null;
}

export default UCLADiningIcon;