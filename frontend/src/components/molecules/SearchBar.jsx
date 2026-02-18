import Icon from '../atoms/Icon';
import Spacer from '../atoms/Spacer';

import Search from '../../assets/search.svg';
import Filter from '../../assets/filter.svg';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Narrow menu..." className="search-bar-input" />
      <div className="search-bar-icons" >
        <Icon src={Search} alt="Search" />
        <Icon src={Filter} alt="Filter" />
        <Spacer width={8} />
      </div>
    </div>
  );
}

export default SearchBar;